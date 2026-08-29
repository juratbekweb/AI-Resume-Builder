import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { paymentProvider } from "@/lib/billing/provider";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { planId, successUrl, cancelUrl } = body;

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
    }

    // Get the user's personal organization
    const orgUser = await prisma.organizationUser.findFirst({
      where: { userId: session.user.id, role: "OWNER" }
    });

    if (!orgUser) {
      return NextResponse.json({ error: "No organization found for user" }, { status: 400 });
    }

    // This calls our pending/abstracted payment provider
    const sessionData = await paymentProvider.createCheckoutSession({
      userId: session.user.id,
      organizationId: orgUser.organizationId,
      planId,
      successUrl: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancelUrl: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/checkout?payment=cancelled`
    });

    return NextResponse.json({ url: sessionData.url });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to initialize checkout" }, { status: 500 });
  }
}
