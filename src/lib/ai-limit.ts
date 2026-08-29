import { prisma } from "@/lib/prisma";

const MAX_FREE_COUNTS = 3;

export const checkApiLimit = async (userId: string) => {
  if (!userId) {
    return false;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: userId
    }
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const increaseApiLimit = async (userId: string) => {
  if (!userId) {
    return;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: userId
    }
  });

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prisma.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const getApiLimitCount = async (userId: string) => {
  if (!userId) {
    return 0;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
