"use client";

import React, { useState } from "react";
import { states } from "../../utils/utils";
import { ClientSelector } from "./clientSelector";

interface FormInputProps {
  label: string;
  placeholder: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  id,
  type = "text",
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm mb-1 text-gray-400">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-green-500 text-white placeholder:text-gray-500"
    />
  </div>
);

interface FormSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  children,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm mb-1 text-gray-400">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-green-500 text-white"
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  </div>
);

interface UserFormProps {
  saveUser: (user: any) => void;
}

export function UserForm({ saveUser }: UserFormProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [userType, setUserType] = useState("");
  const [state, setState] = useState("");
  const [clientIds, setClientIds] = useState<number[]>([]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    address: "",
    zipcode: "",
    complement: "",
    consultantId: "",
  });

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleCpfChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const masked = digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    handleChange("document", masked);
  };

  const handleCepChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const masked = digits.replace(/(\d{5})(\d)/, "$1-$2");
    handleChange("zipcode", masked);
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const masked = digits
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
    handleChange("phone", masked);
  };

  const handleSubmit = () => {
    const requiredFields = ["name", "email", "phone", "document", "address"];
    const emptyFields = requiredFields.filter(
      (field) => !user[field as keyof typeof user]
    );
    if (emptyFields.length > 0 || !state || !userType) {
      alert("Preencha todos os campos obrigatórios antes de salvar.");
      return;
    }
  
    const fullAddress = `${user.address}, ${state} - ${user.zipcode}`;
    const payload = {
      ...user,
      address: fullAddress,
      type: userType,
      clientIds: userType === "consultant" ? clientIds : [],
    };
    saveUser(payload);
  };

  const handleClientSelect = (selected: number[]) => {
    setClientIds(selected);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Criar usuário</h1>

      <div className="flex flex-col gap-6">
        <FormSelect
          label="Tipo do usuário"
          id="userType"
          value={userType}
          onChange={setUserType}
          placeholder="Selecione o tipo do usuário"
        >
          <option value="consultant">Consultor</option>
          <option value="client">Cliente</option>
        </FormSelect>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Nome"
            id="name"
            placeholder="Digite o nome"
            value={user.name}
            onChange={(value) => handleChange("name", value)}
          />
          <FormInput
            label="Telefone"
            id="phone"
            placeholder="(99) 99999-9999"
            value={user.phone}
            onChange={handlePhoneChange}
          />
        </div>

        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Digite o email"
          value={user.email}
          onChange={(value) => handleChange("email", value)}
        />

        <div className="flex items-center gap-6 border-b border-neutral-800 mb-4">
          <button
            onClick={() => setActiveTab("info")}
            className={`pb-3 text-sm font-semibold transition-all ${activeTab === "info"
                ? "text-white border-b-2 border-green-500"
                : "text-gray-500 hover:text-gray-300"
              }`}
            disabled={userType !== "consultant"}
          >
            Informações básicas
          </button>
          {userType === "consultant" && (
            <button
              onClick={() => setActiveTab("clients")}
              className={`pb-3 text-sm font-semibold transition-all ${activeTab === "clients"
                  ? "text-white border-b-2 border-green-500"
                  : "text-gray-500 hover:text-gray-300"
                }`}
            >
              Adicionar clientes
            </button>
          )}
        </div>

        {activeTab === "info" && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="CPF"
                id="cpf"
                placeholder="999.999.999-99"
                value={user.document}
                onChange={handleCpfChange}
              />
              <FormInput
                label="CEP"
                id="zipcode"
                placeholder="99999-999"
                value={user.zipcode}
                onChange={handleCepChange}
              />
              <FormSelect
                label="Estado"
                id="state"
                placeholder="Selecione o estado"
                value={state}
                onChange={setState}
              >
                {states.map((st, index) => (
                  <option key={index} value={st.abbreviation}>
                    {st.name}
                  </option>
                ))}
              </FormSelect>
              <div className="flex flex-col gap-6 md:col-span-2">
                <FormInput
                  label="Endereço"
                  id="address"
                  placeholder="Digite o endereço"
                  value={user.address}
                  onChange={(value) => handleChange("address", value)}
                />
                <FormInput
                  label="Complemento"
                  id="complement"
                  placeholder="Digite o complemento"
                  value={user.complement}
                  onChange={(value) => handleChange("complement", value)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "clients" && userType === "consultant" && (
          <ClientSelector onSelect={handleClientSelect} />
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
          >
            Salvar usuário
          </button>
        </div>
      </div>
    </div>
  );
}
