import { useState, type SubmitEvent } from "react";
import { Loader2 } from "lucide-react";
import { useUpdateCategory } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { InputLabel } from "@/components/input-label";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { iconOptions } from "@/utils/icon-options";
import { colorOptions } from "@/utils/color-options";
import type { Category } from "@/lib/types";

interface EditCategoryModalProps {
  open: boolean;
  category: Category | null;
  onOpenChange: (open: boolean) => void;
}

export function EditCategoryModal({
  open,
  category,
  onOpenChange,
}: EditCategoryModalProps) {
  const updateCategory = useUpdateCategory();

  const [selectedIcon, setSelectedIcon] = useState(
    category?.icon || iconOptions[0].value,
  );
  const [selectedColor, setSelectedColor] = useState(
    category?.color || colorOptions[0].value,
  );

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!category) return;

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("category-title") as string;
    const description = formData.get("category-description") as string;

    await updateCategory.mutateAsync({
      id: category.id,
      title,
      description: description || undefined,
      icon: selectedIcon,
      color: selectedColor,
    });

    onOpenChange(false);
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="max-w-md w-full rounded-xl p-6">
        <Modal.Header className="gap-0.5">
          <Modal.Title className="text-base font-semibold text-gray-800">
            Editar categoria
          </Modal.Title>
          <Modal.Description className="text-sm text-gray-600">
            Atualize os dados da categoria
          </Modal.Description>
        </Modal.Header>

        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputLabel.Root>
              <InputLabel.Label htmlFor="category-title">
                Título
              </InputLabel.Label>
              <InputLabel.Field
                id="category-title"
                placeholder="Ex. Alimentação"
                name="category-title"
                defaultValue={category?.title}
              />
            </InputLabel.Root>

            <InputLabel.Root>
              <InputLabel.Label htmlFor="category-description">
                Descrição
              </InputLabel.Label>
              <InputLabel.Field
                id="category-description"
                placeholder="Descrição da categoria"
                name="category-description"
                defaultValue={category?.description || ""}
              />
              <p className="text-xs text-gray-500">Opcional</p>
            </InputLabel.Root>

            <div className="flex flex-col gap-2">
              <InputLabel.Label>Ícone</InputLabel.Label>
              <div className="grid grid-cols-8 gap-2">
                {iconOptions.map(({ value, Icon }) => {
                  const isActive = selectedIcon === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedIcon(value)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-500 transition",
                        isActive &&
                          "border-brand-base bg-gray-100 text-gray-600",
                      )}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel.Label>Cor</InputLabel.Label>
              <div className="grid grid-cols-7 gap-2">
                {colorOptions.map((item) => {
                  const isActive = selectedColor === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSelectedColor(item.value)}
                      className={cn(
                        "h-7 w-12 rounded-md border p-1",
                        isActive ? item.borderClassName : "border-gray-300",
                      )}
                    >
                      <span
                        className={cn(
                          "block h-full w-full rounded",
                          item.bgClassName,
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-brand-base mt-2"
              disabled={updateCategory.isPending}
            >
              {updateCategory.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
