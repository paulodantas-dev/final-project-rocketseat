import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { useDeleteCategory } from "@/hooks/use-categories";
import type { Category } from "@/lib/types";

interface DeleteCategoryModalProps {
  open: boolean;
  category: Category | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCategoryModal({
  open,
  category,
  onOpenChange,
}: DeleteCategoryModalProps) {
  const deleteCategory = useDeleteCategory();

  async function handleConfirmDelete() {
    if (!category) return;

    await deleteCategory.mutateAsync(category.id);
    onOpenChange(false);
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="max-w-md w-full rounded-xl p-6">
        <Modal.Header className="gap-0.5">
          <Modal.Title className="text-base font-semibold text-gray-800">
            Excluir categoria
          </Modal.Title>
          <Modal.Description className="text-sm text-gray-600">
            Tem certeza que deseja excluir a categoria "{category?.title}"?
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
              disabled={deleteCategory.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              size="lg"
              className="flex-1 bg-red-base hover:bg-red-600"
              onClick={handleConfirmDelete}
              disabled={deleteCategory.isPending}
            >
              {deleteCategory.isPending ? (
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
