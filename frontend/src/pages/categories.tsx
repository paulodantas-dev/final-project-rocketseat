import { useState } from "react";
import { CreateCategoryModal } from "@/components/create-category-modal";
import { FinancyHeader } from "@/components/financy-header";
import { CategoriesList } from "@/components/categories-list";
import { CategoriesStats } from "@/components/categories-stats";

export function CategoriesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="h-full bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col gap-8">
        <FinancyHeader
          title="Categorias"
          description="Organize suas transações por categorias"
          onAdd={() => setIsCreateModalOpen(true)}
          buttonText="Nova categoria"
        />
        <CategoriesStats />
        <CategoriesList />
        <CreateCategoryModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
      </div>
    </div>
  );
}
