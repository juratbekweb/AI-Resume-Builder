import type { Session, User } from "next-auth";

export interface AuthService {
  getSession(): Promise<Session | null>;
  signIn(credentials: Record<string, unknown>): Promise<User | null>;
  signOut(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
}
