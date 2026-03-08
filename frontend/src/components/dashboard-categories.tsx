import { useMemo } from "react";
import { CategoryBadge } from "@/components/category-badge";
import { SectionCard } from "@/components/section-card";
import { useCategories } from "@/hooks/use-categories";
import { useTransactions } from "@/hooks/use-transactions";
import { colorOptions } from "@/utils/color-options";
import { formatCurrency } from "@/utils/format-currency";

interface DashboardCategoriesProps {
  onManageClick?: () => void;
}

export function DashboardCategories({
  onManageClick,
}: DashboardCategoriesProps) {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useTransactions();

  const categoryStats = useMemo(() => {
    const stats = new Map<
      string,
      {
        categoryId: string;
        title: string;
        color: string;
        count: number;
        total: number;
      }
    >();

    for (const transaction of transactions) {
      if (!transaction.category) continue;

      const categoryId = transaction.category.id;
      const existing = stats.get(categoryId);

      if (existing) {
        existing.count += 1;
        existing.total += transaction.amount;
      } else {
        stats.set(categoryId, {
          categoryId,
          title: transaction.category.title,
          color: transaction.category.color,
          count: 1,
          total: transaction.amount,
        });
      }
    }

    // Ordenar por total (maior para menor)
    return Array.from(stats.values()).sort((a, b) => b.total - a.total);
  }, [transactions]);

  const isLoading = isLoadingCategories || isLoadingTransactions;

  return (
    <SectionCard.Root>
      <SectionCard.Header
        title="Categorias"
        actionLabel="Gerenciar"
        onActionClick={onManageClick}
      />
      <SectionCard.Body>
        {isLoading ? (
          <p className="text-sm text-gray-500">Carregando categorias...</p>
        ) : categoryStats.length ? (
          categoryStats.map((stat) => {
            const categoryColor = colorOptions.find(
              (item) => item.value === stat.color,
            );

            return (
              <div
                key={stat.categoryId}
                className="flex items-center justify-between gap-3"
              >
                <CategoryBadge
                  lightBgClassName={categoryColor?.lightBgClassName}
                  textClassName={categoryColor?.textClassName}
                  className="px-3 py-1.5 text-sm font-medium"
                >
                  {stat.title}
                </CategoryBadge>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {stat.count} {stat.count === 1 ? "item" : "itens"}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 text-right">
                    {formatCurrency(stat.total)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">
            Nenhuma transação com categoria ainda.
          </p>
        )}
      </SectionCard.Body>
    </SectionCard.Root>
  );
}
