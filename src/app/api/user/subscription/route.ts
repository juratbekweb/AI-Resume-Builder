import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getUserSubscription } from "@/lib/billing/subscription";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ isPremium: false, features: {} });
    }

    const sub = await getUserSubscription(session.user.id);
    
    return NextResponse.json(sub);
  } catch (error) {
    console.error("Subscription fetch error:", error);
    return NextResponse.json({ isPremium: false, features: {} }, { status: 500 });
  }
}
