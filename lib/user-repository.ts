import { prisma } from "./db";

export interface CreateUserData {
  email: string;
  firstName?: string;
  lastName?: string;
}

export async function createUser(data: CreateUserData) {
  return await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateUser(id: number, data: Partial<CreateUserData>) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}
