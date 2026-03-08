import { useState } from "react";
import { SquarePen, Tag, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/use-categories";
import { iconOptions } from "@/utils/icon-options";
import { colorOptions } from "@/utils/color-options";
import { DeleteCategoryModal } from "@/components/delete-category-modal";
import { EditCategoryModal } from "@/components/edit-category-modal";
import type { Category } from "@/lib/types";

export function CategoriesList() {
  const { data: categories, isLoading } = useCategories();

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-neutral-white p-6 text-sm text-gray-500">
        Carregando categorias...
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-neutral-white p-6 text-sm text-gray-500">
        Nenhuma categoria criada ainda.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const Icon =
            iconOptions.find((item) => item.value === category.icon)?.Icon ??
            Tag;

          const categoryColor =
            colorOptions.find((item) => item.value === category.color) ??
            colorOptions[1];

          const totalItems: number = 0;

          return (
            <article
              key={category.id}
              className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-neutral-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-md",
                    categoryColor.lightBgClassName,
                    categoryColor.textClassName,
                  )}
                >
                  <Icon size={16} />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="cursor-pointer flex size-8 items-center justify-center rounded-md border border-gray-300 bg-neutral-white text-red-base transition-colors hover:bg-gray-100"
                    onClick={() => {
                      setCategoryToDelete(category);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash size={16} />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer flex size-8 items-center justify-center rounded-md border border-gray-300 bg-neutral-white text-gray-600 transition-colors hover:bg-gray-100"
                    onClick={() => {
                      setCategoryToEdit(category);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <SquarePen size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <h3 className="text-base/normal font-semibold text-gray-800 capitalize">
                  {category.title}
                </h3>
                <p className="text-sm/snug text-gray-600 font-medium capitalize">
                  {category.description || "Sem descrição"}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1 text-sm/snug font-medium capitalize",
                    categoryColor.lightBgClassName,
                    categoryColor.textClassName,
                  )}
                >
                  {category.title}
                </span>

                <span className="text-sm/snug text-gray-600">
                  {totalItems} {totalItems === 1 ? "item" : "itens"}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <DeleteCategoryModal
        open={isDeleteModalOpen}
        category={categoryToDelete}
        onOpenChange={setIsDeleteModalOpen}
      />
      <EditCategoryModal
        open={isEditModalOpen}
        category={categoryToEdit}
        onOpenChange={setIsEditModalOpen}
      />
    </>
  );
}
