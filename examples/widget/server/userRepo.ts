import prisma from "../db/prisma";
import type { Prisma } from "@prisma/client";

export function upsert(externalId: string, attributes: Prisma.UserUpdateInput) {
  const create: Prisma.UserCreateInput = { externalId, attributes };

  return prisma.user.upsert({
    where: { externalId },
    update: { attributes },
    create,
  });
}
