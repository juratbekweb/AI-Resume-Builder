import { auth, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "../../auth";
import type { Session, User } from "next-auth";
import type { AuthService } from "./auth-service";

export class NextAuthAuthService implements AuthService {
  async getSession(): Promise<Session | null> {
    return auth();
  }

  async signIn(credentials: Record<string, unknown>): Promise<User | null> {
    const result = await nextAuthSignIn("credentials", {
      ...credentials,
      redirect: false,
    });

    return (result as { user?: User } | undefined)?.user ?? null;
  }

  async signOut(): Promise<void> {
    await nextAuthSignOut({ redirect: false });
  }

  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return Boolean(session?.user);
  }
}
