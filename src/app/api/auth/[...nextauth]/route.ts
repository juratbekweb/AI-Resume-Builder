import { authRateLimiter } from "@/lib/security/rate-limiter";
import { NextRequest } from "next/server";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";
import {
  checkAccountLockout,
  recordFailedLoginAttempt,
  recordSuccessfulLogin,
} from "@/lib/security/account-lockout";

// Full NextAuth v4 options (same as src/auth.ts but used here for App Router)
const authOptions = {
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;

        const lockoutResult = await checkAccountLockout(email);
        if (lockoutResult.isLocked) {
          throw new Error(
            `Account is locked. Please try again in ${Math.ceil(
              (lockoutResult.lockoutExpires!.getTime() - Date.now()) / 60000
            )} minutes.`
          );
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            passwordHash: true,
            role: true,
          },
        });

        if (!user || !user.passwordHash) {
          await recordFailedLoginAttempt(email);
          return null;
        }

        const bcrypt = await import("bcryptjs");
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          await recordFailedLoginAttempt(email);
          return null;
        }

        await recordSuccessfulLogin(email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
};

// next-auth v4 App Router handler.
// NextAuth(options) returns a function that accepts (req, context).
// When context.params is present, it uses NextAuthRouteHandler internally.
const nextAuthHandler = NextAuth(authOptions);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  const rateLimitResponse = authRateLimiter.middleware(request);
  if (rateLimitResponse) return rateLimitResponse;
  return nextAuthHandler(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  const rateLimitResponse = authRateLimiter.middleware(request);
  if (rateLimitResponse) return rateLimitResponse;
  // @ts-expect-error next-auth v4 handler accepts (NextRequest, context)
  return nextAuthHandler(request, context);
}
