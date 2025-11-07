"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UserForm } from "../../components/users/userForm";
import { ArrowLeft } from "lucide-react";
import { createUser } from "../../components/actions";
import { UserType } from "@prisma/client";

interface User {
  name: string;
  email: string;
  phone?: string;
  document?: string;
  address?: string;
  type?: string;
  consultantId?: string;
  clientIds?: number[];
}

export default function CreateUserPage() {
  const router = useRouter();

  const handleSaveUser = async (payloadFromForm: {
    name: string;
    email: string;
    phone: string;
    document: string;
    address: string;
    type: string;
    consultantId?: string;
    clientIds?: number[];
  }) => {

    const actionPayload = {
      ...payloadFromForm,
      type: payloadFromForm.type === "consultant"
        ? UserType.CONSULTANT
        : UserType.CLIENT,
    };

    try {
      const newUser = await createUser(actionPayload);

      console.log("Usuário criado:", newUser);
      alert("Usuário criado com sucesso!");
      router.back();

    } catch (err: any) {
      console.error(err);
      alert(`Erro ao criar usuário: ${err.message}`);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Dashboard
        </button>

        <div className="flex items-center gap-3">
          <button className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-sm font-semibold transition-all">
            Criar usuário
          </button>
          <button className="bg-neutral-800 hover:bg-neutral-700 px-5 py-2 rounded-lg text-sm font-semibold text-gray-300 transition-all">
            Deletar usuário
          </button>
        </div>
      </div>

      <UserForm saveUser={handleSaveUser} />
    </main>
  );
}
