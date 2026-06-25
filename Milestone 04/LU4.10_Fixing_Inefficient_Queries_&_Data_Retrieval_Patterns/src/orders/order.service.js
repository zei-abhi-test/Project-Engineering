import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'], // Leaves query logging on to expose the N+1 crime
});

export async function getOrders() {
  return prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ordersWithUsers;
}

export async function getOrderById(id) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}