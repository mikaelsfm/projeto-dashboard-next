import { ArrowUpRight } from "lucide-react";

interface DashboardMetricsProps {
  totalUsers: number;
}

export function DashboardMetrics({ totalUsers }: DashboardMetricsProps) {
  return (
    <div className="p-5 w-60 bg-neutral-900  border border-neutral-700">
      <p className="text-sm text-gray-400 mb-2">Total de clientes</p>
      <div className="flex items-center gap-2">
        <span className="text-5xl font-bold text-green-400">{totalUsers}</span>
        <ArrowUpRight className="w-5 h-5 text-green-500" />
      </div>
      <p className="text-xs text-gray-500 mt-2">nos últimos 7 dias</p>
    </div>
  );
}
