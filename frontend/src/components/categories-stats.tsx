import { Tag, TrendingUp, Utensils } from "lucide-react";
import { Card } from "@/components/card";
import { useCategories } from "@/hooks/use-categories";

export function CategoriesStats() {
  const { data: categories } = useCategories();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card.Root>
        <div className="flex items-start gap-3">
          <Card.Icon iconColor="text-gray-700" layout="highlight">
            <Tag size={20} />
          </Card.Icon>
          <Card.Value>{categories?.length ?? "-"}</Card.Value>
        </div>
        <Card.Label layout="highlight">Total de categorias</Card.Label>
      </Card.Root>

      <Card.Root>
        <div className="flex items-start gap-3">
          <Card.Icon iconColor="text-purple-base" layout="highlight">
            <TrendingUp size={20} />
          </Card.Icon>
          <Card.Value>27</Card.Value>
        </div>
        <Card.Label layout="highlight">Total de transações</Card.Label>
      </Card.Root>

      <Card.Root>
        <div className="flex items-start gap-3">
          <Card.Icon iconColor="text-blue-base" layout="highlight">
            <Utensils size={20} />
          </Card.Icon>
          <Card.Value>Alimentação</Card.Value>
        </div>
        <Card.Label layout="highlight">Categoria mais utilizada</Card.Label>
      </Card.Root>
    </div>
  );
}
