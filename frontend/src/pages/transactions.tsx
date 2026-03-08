import { useState } from "react";
import { CreateTransactionModal } from "@/components/create-transaction-modal";
import { DeleteTransactionModal } from "@/components/delete-transaction-modal";
import { EditTransactionModal } from "@/components/edit-transaction-modal";
import { FinancyHeader } from "@/components/financy-header";
import {
  TransactionsFilter,
  type TransactionFilters,
} from "@/components/transactions-filter";
import { TransactionsList } from "@/components/transactions-list";
import type { Transaction } from "@/lib/types";
import type { TransactionFilters as QueryFilters } from "@/hooks/use-transactions";

export function TransactionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<
    QueryFilters | undefined
  >(undefined);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleFilterChange = (filters: TransactionFilters) => {
    // Converter filtros do formato UI para o formato da query
    const queryFilters: QueryFilters = {};

    if (filters.search) {
      queryFilters.search = filters.search;
    }

    if (filters.type && filters.type !== "all") {
      queryFilters.type = filters.type.toUpperCase() as "INCOME" | "EXPENSE";
    }

    if (filters.categoryId && filters.categoryId !== "all") {
      queryFilters.categoryId = filters.categoryId;
    }

    if (filters.period) {
      const startDate = new Date(filters.period);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(filters.period);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);

      queryFilters.startDate = startDate.toISOString();
      queryFilters.endDate = endDate.toISOString();
    }

    setAppliedFilters(
      Object.keys(queryFilters).length > 0 ? queryFilters : undefined,
    );
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsCreateModalOpen(true);
  };

  const handleEditModalChange = (open: boolean) => {
    setIsEditModalOpen(open);
    if (!open) {
      setSelectedTransaction(null);
    }
  };

  const handleDeleteModalChange = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setSelectedTransaction(null);
    }
  };

  return (
    <div className="h-full bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col gap-8">
        <FinancyHeader
          title="Transações"
          description="Gerencie todas as suas transações financeiras"
          onAdd={handleAddTransaction}
          buttonText="Nova transação"
        />
        <TransactionsFilter onFilterChange={handleFilterChange} />
        <TransactionsList
          filters={appliedFilters}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <CreateTransactionModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
        <EditTransactionModal
          open={isEditModalOpen}
          transaction={selectedTransaction}
          onOpenChange={handleEditModalChange}
        />
        <DeleteTransactionModal
          open={isDeleteModalOpen}
          transaction={selectedTransaction}
          onOpenChange={handleDeleteModalChange}
        />
      </div>
    </div>
  );
}
