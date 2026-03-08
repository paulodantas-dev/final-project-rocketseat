import { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2, Edit2 } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { useCategories } from "@/hooks/use-categories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { iconOptions } from "@/utils/icon-options";
import { colorOptions } from "@/utils/color-options";
import type { Transaction } from "@/lib/types";

interface TransactionsListProps {
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

const columnHelper = createColumnHelper<Transaction>();

export function TransactionsList({ onEdit, onDelete }: TransactionsListProps) {
  const { data: transactions = [], isLoading } = useTransactions();
  const { data: categories = [] } = useCategories();

  const categoryMap = useMemo(
    () => new Map(categories.map((cat) => [cat.id, cat])),
    [categories],
  );

  const columns = [
    columnHelper.accessor("description", {
      header: "DESCRIÇÃO",
      cell: (info) => {
        const transaction = info.row.original;
        const category = categoryMap.get(transaction.categoryId);

        if (!category) return info.getValue();

        const Icon = iconOptions.find(
          (item) => item.value === category.icon,
        )?.Icon;
        const categoryColor = colorOptions.find(
          (item) => item.value === category.color,
        );

        return (
          <div className="flex items-center gap-3">
            {Icon && categoryColor ? (
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-md",
                  categoryColor.lightBgClassName,
                  categoryColor.textClassName,
                )}
              >
                <Icon size={16} />
              </div>
            ) : null}
            <span className="text-sm font-medium text-gray-800">
              {info.getValue()}
            </span>
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => new Date(row.date), {
      id: "date",
      header: "DATA",
      cell: (info) => {
        const date = info.getValue();
        return (
          <span className="text-sm text-gray-700">
            {format(date, "dd/MM/yy", { locale: ptBR })}
          </span>
        );
      },
    }),

    columnHelper.accessor(
      (row) => {
        const category = categoryMap.get(row.categoryId);
        return category?.title || "-";
      },
      {
        id: "category",
        header: "CATEGORIA",
        cell: (info) => {
          const transaction = info.row.original;
          const category = categoryMap.get(transaction.categoryId);

          if (!category) return "-";

          const categoryColor = colorOptions.find(
            (item) => item.value === category.color,
          );

          return (
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                categoryColor?.lightBgClassName,
                categoryColor?.textClassName,
              )}
            >
              {category.title}
            </span>
          );
        },
      },
    ),

    columnHelper.accessor("type", {
      header: "TIPO",
      cell: (info) => {
        const type = info.getValue();
        const isExpense = type === "EXPENSE";

        return (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-2 rounded-full",
                isExpense ? "bg-red-base" : "bg-feedback-success",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                isExpense ? "text-red-base" : "text-feedback-success",
              )}
            >
              {isExpense ? "Saída" : "Entrada"}
            </span>
          </div>
        );
      },
    }),

    columnHelper.accessor("amount", {
      header: "VALOR",
      cell: (info) => {
        const amount = info.getValue();
        const transaction = info.row.original;
        const isExpense = transaction.type === "EXPENSE";

        return (
          <span
            className={cn(
              "text-sm font-semibold",
              isExpense ? "text-red-base" : "text-feedback-success",
            )}
          >
            {isExpense ? "- " : "+ "}R$ {amount.toFixed(2).replace(".", ",")}
          </span>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "AÇÕES",
      cell: (info) => {
        const transaction = info.row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onEdit?.(transaction)}
              className="text-gray-600 hover:text-blue-base"
            >
              <Edit2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onDelete?.(transaction)}
              className="text-gray-600 hover:text-red-base"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        );
      },
    }),
  ] as ColumnDef<Transaction>[];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-neutral-white p-6 text-sm text-gray-500">
        Carregando transações...
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-neutral-white p-6 text-sm text-gray-500">
        Nenhuma transação registrada.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-neutral-white overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="px-4 py-3">
                  <span className="text-xs font-semibold uppercase text-gray-700">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-4 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
