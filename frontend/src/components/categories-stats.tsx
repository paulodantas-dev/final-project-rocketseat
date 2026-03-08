import { useMemo } from "react";
import { Tag, TrendingUp, Utensils } from "lucide-react";
import { Card } from "@/components/card";
import { useCategories } from "@/hooks/use-categories";
import { useTransactions } from "@/hooks/use-transactions";

export function CategoriesStats() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: transactions = [], isLoading: isTransactionsLoading } =
    useTransactions();

  const { totalTransactions, mostUsedCategory } = useMemo(() => {
    if (!transactions.length) {
      return {
        totalTransactions: 0,
        mostUsedCategory: "-",
      };
    }

    const categoryUsage = new Map<string, { title: string; count: number }>();

    for (const transaction of transactions) {
      const categoryKey = transaction.categoryId;
      const categoryTitle = transaction.category?.title ?? "Sem categoria";

      const current = categoryUsage.get(categoryKey);

      if (current) {
        current.count += 1;
      } else {
        categoryUsage.set(categoryKey, {
          title: categoryTitle,
          count: 1,
        });
      }
    }

    let topCategory = "-";
    let topCount = 0;

    for (const usage of categoryUsage.values()) {
      if (usage.count > topCount) {
        topCount = usage.count;
        topCategory = usage.title;
      }
    }

    return {
      totalTransactions: transactions.length,
      mostUsedCategory: topCategory,
    };
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card.Root>
        <div className="flex items-start gap-3">
          <Card.Icon iconColor="text-gray-700" layout="highlight">
            <Tag size={20} />
          </Card.Icon>
          <Card.Value>
            {isCategoriesLoading ? "-" : categories?.length}
          </Card.Value>
        </div>
        <Card.Label layout="highlight">Total de categorias</Card.Label>
      </Card.Root>

      <Card.Root>
        <div className="flex items-start gap-3">
          <Card.Icon iconColor="text-purple-base" layout="highlight">
            <TrendingUp size={20} />
          </Card.Icon>
          <Card.Value>
            {isTransactionsLoading ? "-" : totalTransactions}
          </Card.Value>
        </div>
        <Card.Label layout="highlight">Total de transações</Card.Label>
      </Card.Root>

      <Card.Root>
        <div className="flex items-start gap-3">
          <Card.Icon iconColor="text-blue-base" layout="highlight">
            <Utensils size={20} />
          </Card.Icon>
          <Card.Value>
            {isTransactionsLoading ? "-" : mostUsedCategory}
          </Card.Value>
        </div>
        <Card.Label layout="highlight">Categoria mais utilizada</Card.Label>
      </Card.Root>
    </div>
  );
}
