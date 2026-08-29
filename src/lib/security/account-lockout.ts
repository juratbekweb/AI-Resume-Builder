import { prisma } from "@/lib/prisma";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export interface AccountLockoutResult {
  isLocked: boolean;
  remainingAttempts?: number;
  lockoutExpires?: Date;
}

export async function checkAccountLockout(email: string): Promise<AccountLockoutResult> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      lockedUntil: true,
      failedLoginAttempts: true,
    },
  });

  if (!user) {
    return { isLocked: false, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  // Check if account is locked
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return {
      isLocked: true,
      lockoutExpires: user.lockedUntil,
    };
  }

  // Account is not locked (lockout expired or never locked)
  if (user.lockedUntil && user.lockedUntil <= new Date()) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lockedUntil: null,
        failedLoginAttempts: 0,
      },
    });
    return { isLocked: false, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  const remainingAttempts = MAX_FAILED_ATTEMPTS - (user.failedLoginAttempts || 0);
  return {
    isLocked: false,
    remainingAttempts: Math.max(0, remainingAttempts),
  };
}

export async function recordFailedLoginAttempt(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      failedLoginAttempts: true,
    },
  });

  if (!user) {
    return;
  }

  const newAttempts = (user.failedLoginAttempts || 0) + 1;

  if (newAttempts >= MAX_FAILED_ATTEMPTS) {
    // Lock the account
    const lockoutExpires = new Date(Date.now() + LOCKOUT_DURATION_MS);
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: newAttempts,
        lockedUntil: lockoutExpires,
      },
    });

    // Log security event
    await logSecurityEvent(user.id, "ACCOUNT_LOCKED", {
      email,
      lockoutDuration: LOCKOUT_DURATION_MS,
      attempts: newAttempts,
    });
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: newAttempts,
      },
    });
  }
}

export async function recordSuccessfulLogin(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });

  if (!user) {
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });

  await logSecurityEvent(user.id, "LOGIN_SUCCESS", {
    email,
  });
}

async function logSecurityEvent(userId: string, type: string, metadata: Record<string, unknown>): Promise<void> {
  try {
    await prisma.securityEvent.create({
      data: {
        userId,
        type,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: metadata as any,
      },
    });
  } catch (error) {
    console.error("Failed to log security event:", error);
  }
}
