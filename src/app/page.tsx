"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LandingPage } from "../components/marketing/landing-page";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("gopay_user");
    // If not logged in, force them to go through auth stage first
    if (!userStr) {
      router.push("/register");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return <LandingPage />;
}
