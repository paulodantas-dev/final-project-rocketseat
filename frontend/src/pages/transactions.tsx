import { useState } from "react";
import { CreateTransactionModal } from "@/components/create-transaction-modal";
import { FinancyHeader } from "@/components/financy-header";
import {
  TransactionsFilter,
  type TransactionFilters,
} from "@/components/transactions-filter";
import { TransactionsList } from "@/components/transactions-list";
import type { Transaction } from "@/lib/types";

export function TransactionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    // TODO: Implementar modal de edição
    console.log("Editar transação:", transaction);
  };

  const handleDelete = (transaction: Transaction) => {
    // TODO: Implementar modal de confirmação de exclusão
    console.log("Deletar transação:", transaction);
  };

  const handleFilterChange = (filters: TransactionFilters) => {
    // TODO: Implementar lógica de filtragem das transações com base nos filtros selecionados
    console.log("Filtros aplicados:", filters);
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsCreateModalOpen(true);
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
        <TransactionsList onEdit={handleEdit} onDelete={handleDelete} />
        <CreateTransactionModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
      </div>
    </div>
  );
}
