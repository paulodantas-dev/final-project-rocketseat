import { useState, type SubmitEvent } from "react";
import { Loader2 } from "lucide-react";
import { useCreateCategory } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { InputLabel } from "@/components/input-label";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { iconOptions } from "@/utils/icon-options";
import { colorOptions } from "@/utils/color-options";

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCategoryModal({
  open,
  onOpenChange,
}: CreateCategoryModalProps) {
  const createCategory = useCreateCategory();

  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].value);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("category-title") as string;
    const description = formData.get("category-description") as string;

    await createCategory.mutateAsync({
      title,
      description: description || undefined,
      icon: selectedIcon,
      color: selectedColor,
    });

    form.reset();
    setSelectedIcon(iconOptions[0].value);
    setSelectedColor(colorOptions[0].value);
    onOpenChange(false);
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="max-w-md w-full rounded-xl p-6">
        <Modal.Header className="gap-0.5">
          <Modal.Title className="text-base font-semibold text-gray-800">
            Nova categoria
          </Modal.Title>
          <Modal.Description className="text-sm text-gray-600">
            Organize suas transações com categorias
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
              disabled={createCategory.isPending}
            >
              {createCategory.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Salvar"
              )}
            </Button>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
