import prisma from "@/lib/prisma";

export function list(skip?: number, take?: number) {
  return prisma.restaurants.findMany({ skip, take });
}

export function byId(id: number) {
  return prisma.restaurants.findUniqueOrThrow({ where: { id } });
}

export function create(data: { name: string; location: string; }) {
  return prisma.restaurants.create({ data });
}

export function update(data: any, id: number) {
  return prisma.restaurants.update({
    where: {
      id: id,
    },
    data: { ...data },
  });
}
