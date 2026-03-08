import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CreateTransactionModal } from "@/components/create-transaction-modal";
import { DashboardCategories } from "@/components/dashboard-categories";
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentTransactions } from "@/components/recent-transactions";

export function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-full bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col gap-6">
        <DashboardStats />
        <div className="grid gap-6 md:grid-cols-[66%_34%]">
          <RecentTransactions
            onViewAll={() => navigate({ to: "/transactions" })}
            onAddTransaction={() => setIsCreateModalOpen(true)}
          />
          <DashboardCategories
            onManageClick={() => navigate({ to: "/categories" })}
          />
        </div>
        <CreateTransactionModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
      </div>
    </div>
  );
}
