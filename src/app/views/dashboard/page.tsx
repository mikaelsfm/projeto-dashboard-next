import React, { Suspense } from "react";
import { UsersTable } from "../../components/UsersTable";
import { DashboardMetrics } from "../../components/DashboardMetrics";
import { DashboardFilters } from "../../components/DashboardFilters";
import { TableSkeleton } from "../../components/skeletons/TableSkeleton";
import "../../styles/globals.css";
import { getAllUsersWithRelations } from "../../components/actions";

export default async function DashboardPage() {
  try {
    const users = await getAllUsersWithRelations();
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const totalUsers = users.filter(
      (user: any) => new Date(user.createdAt) >= last7Days
    ).length;

    const consultants = users
      .filter((user: any) => user.type === "CONSULTANT")
      .map((user: any) => ({ name: user.name, email: user.email }));

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
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return (
      <main className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <p className="text-red-500">Erro ao carregar os dados do dashboard.</p>
      </main>
    );
  }
}