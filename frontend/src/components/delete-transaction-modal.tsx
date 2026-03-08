import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { useDeleteTransaction } from "@/hooks/use-transactions";
import type { Transaction } from "@/lib/types";

interface DeleteTransactionModalProps {
  open: boolean;
  transaction: Transaction | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTransactionModal({
  open,
  transaction,
  onOpenChange,
}: DeleteTransactionModalProps) {
  const deleteTransaction = useDeleteTransaction();

  async function handleConfirmDelete() {
    if (!transaction) return;

    await deleteTransaction.mutateAsync(transaction.id);
    onOpenChange(false);
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="max-w-md w-full rounded-xl p-6">
        <Modal.Header className="gap-0.5">
          <Modal.Title className="text-base font-semibold text-gray-800">
            Excluir transação
          </Modal.Title>
          <Modal.Description className="text-sm text-gray-600">
            Tem certeza que deseja excluir a transação "
            {transaction?.description}"?
          </Modal.Description>
        </Modal.Header>

        <Modal.Body>
          <p className="text-sm text-gray-600 mb-6">
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={deleteTransaction.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              size="lg"
              className="flex-1 bg-red-base hover:bg-red-600"
              onClick={handleConfirmDelete}
              disabled={deleteTransaction.isPending}
            >
              {deleteTransaction.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Excluir"
              )}
            </Button>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
