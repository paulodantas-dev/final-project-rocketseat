import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Trash,
  SquarePen,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useTransactions,
  type TransactionFilters,
} from "@/hooks/use-transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionButton } from "@/components/action-button";
import { CategoryIcon } from "@/components/category-icon";
import { CategoryBadge } from "@/components/category-badge";
import { cn } from "@/lib/utils";
import { iconOptions } from "@/utils/icon-options";
import { colorOptions } from "@/utils/color-options";
import type { Transaction } from "@/lib/types";

interface TransactionsListProps {
  filters?: TransactionFilters;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

const columnHelper = createColumnHelper<Transaction>();

export function TransactionsList({
  filters,
  onEdit,
  onDelete,
}: TransactionsListProps) {
  const { data: transactions = [], isLoading } = useTransactions(filters);

  const getColumnClassName = (columnId: string) => {
    switch (columnId) {
      case "description":
        return "w-[33%]";
      case "date":
        return "w-[120px] text-center";
      case "category":
        return "w-[160px] text-center";
      case "type":
        return "w-[120px] text-center";
      case "amount":
        return "w-[120px] text-right";
      case "actions":
        return "w-[120px] text-right";
      default:
        return "";
    }
  };

  const columns = [
    columnHelper.accessor("description", {
      header: "DESCRIÇÃO",
      cell: (info) => {
        const transaction = info.row.original;
        const category = transaction.category;

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
              <CategoryIcon
                icon={Icon}
                lightBgClassName={categoryColor.lightBgClassName}
                textClassName={categoryColor.textClassName}
                size={20}
                className="size-10 shrink-0"
              />
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
          <span className="text-sm font-medium text-gray-600">
            {format(date, "dd/MM/yy", { locale: ptBR })}
          </span>
        );
      },
    }),

    columnHelper.accessor((row) => row.category?.title || "-", {
      id: "category",
      header: "CATEGORIA",
      cell: (info) => {
        const category = info.row.original.category;

        if (!category) return "-";

        const categoryColor = colorOptions.find(
          (item) => item.value === category.color,
        );

        return (
          <CategoryBadge
            lightBgClassName={categoryColor?.lightBgClassName}
            textClassName={categoryColor?.textClassName}
            className="text-xs px-3 py-1"
          >
            {category.title}
          </CategoryBadge>
        );
      },
    }),

    columnHelper.accessor("type", {
      header: "TIPO",
      cell: (info) => {
        const type = info.getValue();
        const isExpense = type === "EXPENSE";

        const Icon = isExpense ? ArrowDownCircle : ArrowUpCircle;

        return (
          <div className="flex items-center justify-center gap-2">
            <Icon
              size={16}
              className={cn(
                isExpense ? "text-red-base" : "text-feedback-success",
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
          <span className={cn("text-sm font-semibold text-gray-800")}>
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
          <div className="flex items-center justify-end gap-2">
            <ActionButton
              color="danger"
              onClick={() => onDelete?.(transaction)}
            >
              <Trash size={16} />
            </ActionButton>
            <ActionButton onClick={() => onEdit?.(transaction)}>
              <SquarePen size={16} />
            </ActionButton>
          </div>
        );
      },
    }),
  ] as ColumnDef<Transaction>[];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
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
    <div className="rounded-xl border border-gray-200 bg-neutral-white overflow-hidden">
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "px-6 py-4",
                    getColumnClassName(header.column.id),
                  )}
                >
                  <span className="text-xs uppercase text-gray-500">
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
            <TableRow key={row.id} className="border-b border-gray-200">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    "px-6 py-4",
                    getColumnClassName(cell.column.id),
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
        <div className="text-sm text-gray-600">
          {table.getRowModel().rows.length > 0 ? (
            <>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              a{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                transactions.length,
              )}{" "}
              | {transactions.length} resultado
              {transactions.length !== 1 ? "s" : ""}
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-neutral-white text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
            (pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                onClick={() => table.setPageIndex(pageIndex)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                  table.getState().pagination.pageIndex === pageIndex
                    ? "border-green-base bg-green-base text-neutral-white"
                    : "border-gray-300 bg-neutral-white text-gray-600 hover:bg-gray-100",
                )}
              >
                {pageIndex + 1}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-neutral-white text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
