"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface Consultant {
  name: string;
  email: string;
}

interface DashboardFiltersProps {
  consultants: Consultant[];
}

export function DashboardFilters({ consultants }: DashboardFiltersProps) {
  const router = useRouter();

  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [period, setPeriod] = useState("21/10/2025 até 21/12/2025");

  return (
    <div className="flex items-end gap-4 flex-wrap justify-end w-full">
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Nome do consultor</label>
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="">John Doe</option>
          {consultants.map((c) => (
            <option key={c.email} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Email do consultor</label>
        <select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm w-60 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="">johndoe@gm...</option>
          {consultants.map((c) => (
            <option key={c.email} value={c.email}>
              {c.email}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Período</label>
        <input
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm w-60 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <button
        onClick={() => {router.push('/views/userForm');}}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
      >
        Criar usuário
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
