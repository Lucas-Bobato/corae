import prisma from "@/lib/prisma";

export function list(skip?: number, take?: number) {
  return prisma.reviews.findMany({
    skip,
    take,
    orderBy: [
      {
        userId: 'asc'
      },
      {
        createdAt: 'desc'
      }
    ],
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      restaurant: {
        select: {
          id: true,
          name: true,
          location: true
        }
      }
    }
  });
}

export function byId(id: number) {
  return prisma.reviews.findUniqueOrThrow({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      restaurant: {
        select: {
          id: true,
          name: true,
          location: true
        }
      }
    }
  });
}

export function create(data: {
  content: string;
  rating: number;
  userId: number;
  restaurantId: number;
}) {
  return prisma.reviews.create({
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      restaurant: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
}

export function deleteReview(id: number) {
  return prisma.reviews.delete({
    where: {
      id
    }
  });
}