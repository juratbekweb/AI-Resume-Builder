import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      username?: string | null;
      displayName?: string | null;
      avatar?: string | null;
      theme?: string | null;
      language?: string | null;
      sessionVersion?: number;
      twoFactorEnabled?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    username?: string | null;
    displayName?: string | null;
    avatar?: string | null;
    theme?: string | null;
    language?: string | null;
    sessionVersion?: number;
    twoFactorEnabled?: boolean;
  }
}
