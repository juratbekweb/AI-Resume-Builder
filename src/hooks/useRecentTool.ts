"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function useRecentTool(toolId: string, title: string, subTitle: string, route: string) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetch("/api/tools/recents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, title, subTitle, route }),
      }).catch((err) => console.error("Failed to record recent tool:", err));
    }
  }, [status, session, toolId, title, subTitle, route]);
}
