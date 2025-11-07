import React, { Suspense } from "react";
import { UsersTable } from "../../components/UsersTable";
import { DashboardMetrics } from "../../components/DashboardMetrics";
import { DashboardFilters } from "../../components/DashboardFilters";
import { TableSkeleton } from "../../components/skeletons/TableSkeleton";
import "../../styles/globals.css";

async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/users`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
}

export default async function DashboardPage() {
  const users = await getUsers();

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const totalUsers = users.filter(
    (u: any) => new Date(u.createdAt) >= last7Days
  ).length;

  const consultants = users
    .filter((u: any) => u.type === "CONSULTANT")
    .map((u: any) => ({ name: u.name, email: u.email }));

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="flex justify-between items-start gap-6 mb-8">
        <DashboardMetrics totalUsers={totalUsers} />
        <DashboardFilters consultants={consultants} />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <UsersTable users={users} />
      </Suspense>
    </main>
  );
}
