import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        clients: { select: { id: true, name: true, email: true } },
        consultant: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(users);
  } catch (err: any) {
    console.error("Erro ao buscar usuários:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const userType = data.type?.toUpperCase();
    const consultantId = data.consultantId ? Number(data.consultantId) : null;
    const clientIds = Array.isArray(data.clients) ? data.clients.map(Number) : [];

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        document: data.document,
        address: data.address,
        type: userType,
        consultantId,
        clients: userType === "CONSULTANT" && clientIds.length > 0
          ? { connect: clientIds.map((id: number) => ({ id })) }
          : undefined,
      },
      include: {
        clients: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    console.error("Erro ao criar usuário:", err);
    return NextResponse.json(
      { error: "Erro ao criar usuário", details: err.message },
      { status: 500 }
    );
  }
}
