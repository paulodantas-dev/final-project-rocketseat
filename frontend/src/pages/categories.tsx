import { useState } from "react";
import { CreateCategoryModal } from "@/components/create-category-modal";
import { CategoriesHeader } from "@/components/categories-header";
import { CategoriesStats } from "@/components/categories-stats";

export function CategoriesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="h-full bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col gap-8">
        <CategoriesHeader onAddCategory={() => setIsCreateModalOpen(true)} />
        <CategoriesStats />
        <CreateCategoryModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
      </div>
    </div>
  );
}
