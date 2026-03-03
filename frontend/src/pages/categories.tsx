import { CategoriesHeader } from "@/components/categories-header";
import { CategoriesStats } from "@/components/categories-stats";

export function CategoriesPage() {
  return (
    <div className="h-full bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col gap-8">
        <CategoriesHeader />
        <CategoriesStats />
      </div>
    </div>
  );
}
