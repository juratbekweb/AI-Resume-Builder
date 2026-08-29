import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

/**
 * DEV ONLY: This endpoint force-upgrades the user to premium in the database.
 * Used to safely migrate away from localStorage while payment provider is pending.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planSlug } = await request.json(); // e.g. 'premium', 'pro'

    // Get the user's personal organization
    let orgUser = await prisma.organizationUser.findFirst({
      where: { userId: session.user.id, role: "OWNER" }
    });

    // If the user was created before Organizations existed, create one now to fix legacy state
    if (!orgUser) {
      const org = await prisma.organization.create({
        data: {
          name: `${session.user.name || 'User'}'s Personal Workspace`,
          slug: `personal-${Date.now()}`
        }
      });
      orgUser = await prisma.organizationUser.create({
        data: {
          organizationId: org.id,
          userId: session.user.id,
          role: "OWNER"
        }
      });
    }

    // Ensure the Plan exists in the database
    let plan = await prisma.plan.findUnique({ where: { slug: planSlug } });
    if (!plan) {
      plan = await prisma.plan.create({
        data: {
          name: planSlug === 'premium' ? "DocNova Premium" : "DocNova Pro",
          slug: planSlug,
          features: {
            isPremium: true
          }
        }
      });
    }

    // Upsert subscription
    await prisma.subscription.create({
      data: {
        organizationId: orgUser.organizationId,
        planId: plan.id,
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 days
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Dev upgrade error:", error);
    return NextResponse.json({ error: "Failed to upgrade" }, { status: 500 });
  }
}
