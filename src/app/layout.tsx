import { ReactNode } from "react";
import { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Painel de Vendas",
  description: "Dashboard de gerenciamento de usuários",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  );
}