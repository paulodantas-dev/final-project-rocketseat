import { DashboardStats } from "@/components/dashboard-stats";
import { RecentTransactions } from "@/components/recent-transactions";

export function DashboardPage() {
  return (
    <div className="h-full bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col gap-6">
        <DashboardStats />
        <div className="grid gap-6 md:grid-cols-2">
          <RecentTransactions />
          <div>Categories placeholder</div>
        </div>
      </div>
    </div>
  );
}
