import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createClient(data: {
  name: string;
  email: string;
  consultantId: string;
}) {
  if (!data.name || !data.email || !data.consultantId)
    throw new Error("Dados inválidos.");

  await prisma.user.create({ data });
  revalidatePath("/dashboard");
}

export async function updateClient(
  id: string,
  data: { name?: string; email?: string; consultantId?: string }
) {
  await prisma.user.update({
    where: { id },
    data,
  });
  revalidatePath("/dashboard");
}

export async function deleteClient(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/dashboard");
}

export async function getConsultants() {
  return prisma.user.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}
