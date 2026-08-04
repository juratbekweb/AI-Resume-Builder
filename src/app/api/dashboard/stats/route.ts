import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Type assertion for session
type Session = {
  user?: {
    id: string;
    email?: string;
    name?: string;
  };
};

export async function GET() {
  try {
    const session = (await getServerSession(auth)) as Session;
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        organizations: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's organization IDs
    const organizationIds = user.organizations.map(org => org.organizationId);

    // Fetch user-specific stats
    const [totalResumes, drafts, published] = await Promise.all([
      prisma.resume.count({
        where: {
          organizationId: {
            in: organizationIds,
          },
        },
      }),
      prisma.resume.count({
        where: {
          organizationId: {
            in: organizationIds,
          },
          status: "DRAFT",
        },
      }),
      prisma.resume.count({
        where: {
          organizationId: {
            in: organizationIds,
          },
          status: "PUBLISHED",
        },
      }),
    ]);

    // Fetch recent resumes for this user
    const recentResumes = await prisma.resume.findMany({
      where: {
        organizationId: {
          in: organizationIds,
        },
      },
      include: {
        personalInfo: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 4,
    });

    const formattedResumes = recentResumes.map(resume => ({
      id: resume.id,
      title: resume.personalInfo?.fullName || resume.title || "Untitled Resume",
      updated: formatTimeAgo(resume.updatedAt),
      status: resume.status.toLowerCase(),
    }));

    return NextResponse.json({
      stats: {
        totalResumes,
        drafts,
        published,
      },
      recentResumes: formattedResumes,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return "Hozir";
  if (hours < 24) return `${hours} soat oldin`;
  if (days < 7) return `${days} kun oldin`;
  if (days < 30) return `${Math.floor(days / 7)} hafta oldin`;
  return `${Math.floor(days / 30)} oy oldin`;
}