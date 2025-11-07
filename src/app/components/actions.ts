import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { UserType } from "@prisma/client"; // IMPORTANTE: Importe o Enum

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