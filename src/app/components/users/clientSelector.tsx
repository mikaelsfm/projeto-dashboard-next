"use client";

import React, { useEffect, useState } from "react";

interface Client {
  id: number;
  name: string;
  email: string;
}

interface ClientSelectorProps {
  onSelect: (selected: number[]) => void;
}

export function ClientSelector({ onSelect }: ClientSelectorProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/users?type=CLIENT");
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
      }
    };
    fetchClients();
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    if (!selectedClients.includes(selectedId)) {
      const updated = [...selectedClients, selectedId];
      setSelectedClients(updated);
      onSelect(updated);
    }
  };

  const handleRemove = (id: number) => {
    const updated = selectedClients.filter((cid) => cid !== id);
    setSelectedClients(updated);
    onSelect(updated);
  };

  return (
    <div className="flex flex-col gap-4 border border-neutral-800 rounded-lg p-4">
      <label className="text-sm text-gray-400">
        Selecione um cliente para associar:
      </label>
      <select
        className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500"
        onChange={handleSelect}
        value=""
      >
        <option value="" disabled hidden>
          Escolher cliente...
        </option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name} - {client.email}
          </option>
        ))}
      </select>

      {selectedClients.length > 0 && (
        <div className="mt-3">
          <p className="text-gray-400 text-sm mb-2">Clientes selecionados:</p>
          <ul className="space-y-2">
            {clients
              .filter((c) => selectedClients.includes(c.id))
              .map((client) => (
                <li
                  key={client.id}
                  className="flex justify-between items-center bg-neutral-900 px-3 py-2 rounded-md"
                >
                  <span className="text-sm text-white">{client.name}</span>
                  <button
                    onClick={() => handleRemove(client.id)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remover
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
