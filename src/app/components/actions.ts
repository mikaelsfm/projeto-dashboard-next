"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { UserType } from "@prisma/client";

export async function createClient(data: {
  name: string;
  email: string;
  phone: string;
  document: string;
  address: string;
  consultantId: string;
}) {
  if (!data.name || !data.email || !data.consultantId)
    throw new Error("Dados inválidos.");

  const consultantIdAsInt = parseInt(data.consultantId, 10);

  if (isNaN(consultantIdAsInt)) {
    throw new Error("ID do consultor inválido.");
  }

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      document: data.document,
      address: data.address,
      type: UserType.CLIENT,
      consultantId: consultantIdAsInt,
    },
  });
  revalidatePath("/dashboard");
}

export async function updateClient(
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    document?: string;
    address?: string;
    consultantId?: string;
  }
) {
  const userIdAsInt = parseInt(id, 10);
  if (isNaN(userIdAsInt)) {
    throw new Error("ID do cliente inválido.");
  }

  const consultantIdAsInt = data.consultantId
    ? parseInt(data.consultantId, 10)
    : undefined;

  const updateData = {
    ...data,
    consultantId: consultantIdAsInt,
  };

  await prisma.user.update({
    where: { id: userIdAsInt },
    data: updateData,
  });
  revalidatePath("/dashboard");
}

export async function deleteClient(id: string) {
  const userIdAsInt = parseInt(id, 10);
  if (isNaN(userIdAsInt)) {
    throw new Error("ID do cliente inválido.");
  }

  await prisma.user.delete({ where: { id: userIdAsInt } });
  revalidatePath("/dashboard");
}

export async function getConsultants() {
  return prisma.user.findMany({
    where: { type: UserType.CONSULTANT },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}
export async function getAllUsersWithRelations() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        clients: { select: { id: true, name: true, email: true } },
        consultant: { select: { id: true, name: true, email: true } },
      },
    });
    return users;
  } catch (err: any) {
    console.error("Erro ao buscar usuários:", err);
    return [];
  }
}

export async function createUser(data: {
  name: string;
  email: string;
  phone: string;
  document: string;
  address: string;
  type: UserType;
  consultantId?: string; 
  clientIds?: number[]; 
}) {
  try {
    const consultantIdAsInt = data.consultantId
      ? parseInt(data.consultantId, 10)
      : null;

    if (data.consultantId && isNaN(consultantIdAsInt as number)) {
      throw new Error("ID do Consultor inválido");
    }

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        document: data.document,
        address: data.address,
        type: data.type,
        consultantId: consultantIdAsInt,
        clients:
          data.type === "CONSULTANT" && data.clientIds && data.clientIds.length > 0
            ? { connect: data.clientIds.map((id: number) => ({ id })) }
            : undefined,
      },
      include: {
        clients: true,
      },
    });
    
    revalidatePath("/views/dashboard");
    return newUser;

  } catch (err: any) {
    console.error("Erro ao criar usuário:", err);
    throw new Error(err.message || "Erro ao criar usuário");
  }
}