import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowDownCircle, ArrowUpCircle, Plus, Tag } from "lucide-react";
import { CategoryBadge } from "@/components/category-badge";
import { CategoryIcon } from "@/components/category-icon";
import { SectionCard } from "@/components/section-card";
import { useTransactions } from "@/hooks/use-transactions";
import { cn } from "@/lib/utils";
import { colorOptions } from "@/utils/color-options";
import { iconOptions } from "@/utils/icon-options";
import { formatCurrency } from "@/utils/format-currency";

interface RecentTransactionsProps {
  onViewAll?: () => void;
  onAddTransaction?: () => void;
}

export function RecentTransactions({
  onViewAll,
  onAddTransaction,
}: RecentTransactionsProps) {
  const { data: fetchedTransactions = [], isLoading } = useTransactions();

  const visibleTransactions = fetchedTransactions.slice(0, 5);

  return (
    <SectionCard.Root>
      <SectionCard.Header
        title="Transações Recentes"
        actionLabel="Ver todas"
        onActionClick={onViewAll}
      />
      <SectionCard.Body>
        {isLoading ? (
          <p className="text-sm text-gray-500">Carregando transações...</p>
        ) : visibleTransactions.length ? (
          visibleTransactions.map((transaction) => {
            const category = transaction.category;
            const CategoryLucideIcon =
              iconOptions.find((item) => item.value === category?.icon)?.Icon ||
              Tag;
            const categoryColor = colorOptions.find(
              (item) => item.value === category?.color,
            );
            const isExpense = transaction.type === "EXPENSE";
            const TransactionTypeIcon = isExpense
              ? ArrowDownCircle
              : ArrowUpCircle;

            return (
              <SectionCard.Item key={transaction.id}>
                <SectionCard.ItemIcon>
                  <CategoryIcon
                    icon={CategoryLucideIcon}
                    lightBgClassName={categoryColor?.lightBgClassName}
                    textClassName={categoryColor?.textClassName}
                  />
                </SectionCard.ItemIcon>

                <SectionCard.ItemContent>
                  <SectionCard.ItemTitle>
                    {transaction.description}
                  </SectionCard.ItemTitle>
                  <SectionCard.ItemSubtitle>
                    {format(new Date(transaction.date), "dd/MM/yy", {
                      locale: ptBR,
                    })}
                  </SectionCard.ItemSubtitle>
                </SectionCard.ItemContent>

                <CategoryBadge
                  lightBgClassName={categoryColor?.lightBgClassName}
                  textClassName={categoryColor?.textClassName}
                  className="px-3 py-1 text-xs"
                >
                  {category?.title ?? "Sem categoria"}
                </CategoryBadge>

                <SectionCard.ItemValue>
                  <span className="text-sm font-semibold text-gray-800">
                    {isExpense ? "- " : "+ "}
                    {formatCurrency(transaction.amount)}
                  </span>
                  <TransactionTypeIcon
                    size={14}
                    className={cn(
                      isExpense ? "text-red-base" : "text-feedback-success",
                    )}
                  />
                </SectionCard.ItemValue>
              </SectionCard.Item>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">Nenhuma transação registrada.</p>
        )}
      </SectionCard.Body>
      <SectionCard.Footer>
        <button
          onClick={onAddTransaction}
          className="flex items-center gap-2 text-sm font-medium text-brand-base hover:opacity-80 transition-opacity"
          type="button"
        >
          <Plus size={16} />
          Nova transação
        </button>
      </SectionCard.Footer>
    </SectionCard.Root>
  );
}
