"use client";

import React from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  document?: string | null;
  age?: number | null;
  address?: string | null;
  createdAt: string;
  updatedAt: string;
};

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead className="border-b border-neutral-800">
        <tr>
          {[
            "Nome",
            "Email",
            "Telefone",
            "CPF",
            "Idade",
            "Endereço",
            "Criado em",
            "Atualizado em",
          ].map((header) => (
            <th
              key={header}
              className="text-left py-3 px-4 font-semibold text-gray-300"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-b border-neutral-800 hover:bg-neutral-900/60 transition"
          >
            <td className="py-3 px-4">{user.name}</td>
            <td className="py-3 px-4">{user.email}</td>
            <td className="py-3 px-4">{user.phone ?? "(00) 00000-0000"}</td>
            <td className="py-3 px-4">{user.document ?? "000.000.000-00"}</td>
            <td className="py-3 px-4">{user.age ? `${user.age} anos` : "—"}</td>
            <td className="py-3 px-4 truncate max-w-[200px]">
              {user.address ?? "—"}
            </td>
            <td
              className="py-3 px-4 text-gray-400"
              suppressHydrationWarning
            >
              {new Date(user.createdAt).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </td>
            <td
              className="py-3 px-4 text-gray-400"
              suppressHydrationWarning
            >
              {new Date(user.createdAt).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
                timeZone: "America/Sao_Paulo",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
