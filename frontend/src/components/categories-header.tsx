import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoriesHeaderProps {
  onAddCategory?: () => void;
}

export function CategoriesHeader({ onAddCategory }: CategoriesHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <p className="text-base text-gray-600">
            Organize suas transações por categorias
          </p>
        </div>
        <Button onClick={onAddCategory} className="bg-brand-base" size="sm">
          <Plus size={16} />
          Nova categoria
        </Button>
      </div>
    </div>
  );
}
