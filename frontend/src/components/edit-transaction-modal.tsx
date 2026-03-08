import { useEffect, useState, type SubmitEvent } from "react";
import { ArrowDownCircle, ArrowUpCircle, Loader2 } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { useUpdateTransaction } from "@/hooks/use-transactions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DatePickerLabel } from "@/components/datepicker-label";
import { InputLabel } from "@/components/input-label";
import { Modal } from "@/components/modal";
import { SelectLabel } from "@/components/select-label";
import type { Transaction, TransactionType } from "@/lib/types";

interface EditTransactionModalProps {
  open: boolean;
  transaction: Transaction | null;
  onOpenChange: (open: boolean) => void;
}

type TransactionKind = TransactionType;

const transactionTypeOptions: Array<{
  value: TransactionKind;
  label: string;
  Icon: typeof ArrowDownCircle;
}> = [
  { value: "EXPENSE", label: "Despesa", Icon: ArrowDownCircle },
  { value: "INCOME", label: "Receita", Icon: ArrowUpCircle },
];

function parseCurrencyToNumber(value: string) {
  const normalized = value
    .replace(/\s/g, "")
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".");

  return Number.parseFloat(normalized);
}

function formatAmountToInput(amount: number) {
  return amount.toFixed(2).replace(".", ",");
}

export function EditTransactionModal({
  open,
  transaction,
  onOpenChange,
}: EditTransactionModalProps) {
  const { data: categories } = useCategories();
  const updateTransaction = useUpdateTransaction();

  const [transactionType, setTransactionType] =
    useState<TransactionKind>("EXPENSE");
  const [transactionDate, setTransactionDate] = useState<Date | undefined>();
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !transaction) return;

    setTransactionType(transaction.type);
    setTransactionDate(new Date(transaction.date));
    setCategoryId(transaction.category?.id || transaction.categoryId || "");
    setDescription(transaction.description);
    setAmountInput(formatAmountToInput(transaction.amount));
    setFormError(null);
  }, [open, transaction]);

  const categoryItems =
    categories?.map((category) => ({
      value: category.id,
      label: category.title,
    })) ?? [];

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setFormError(null);

    if (!transaction) return;

    if (!transactionDate) {
      setFormError("Selecione uma data para a transação.");
      return;
    }

    if (!categoryId) {
      setFormError("Selecione uma categoria.");
      return;
    }

    const normalizedDescription = description.trim();
    const amount = parseCurrencyToNumber(amountInput.trim());

    if (!normalizedDescription) {
      setFormError("Informe a descrição da transação.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Informe um valor válido maior que zero.");
      return;
    }

    const dateForApi = new Date(transactionDate);
    dateForApi.setHours(12, 0, 0, 0);

    await updateTransaction.mutateAsync({
      id: transaction.id,
      description: normalizedDescription,
      amount,
      type: transactionType,
      date: dateForApi.toISOString(),
      categoryId,
    });

    onOpenChange(false);
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="w-full max-w-md rounded-xl p-6">
        <Modal.Header className="gap-0.5">
          <Modal.Title className="text-base font-semibold text-gray-800">
            Editar transação
          </Modal.Title>
          <Modal.Description className="text-sm text-gray-600">
            Atualize os dados da transação
          </Modal.Description>
        </Modal.Header>

        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-1 rounded-md border border-gray-200 p-2">
              {transactionTypeOptions.map(({ value, label, Icon }) => {
                const isActive = transactionType === value;

                return (
                  <button
                    key={value}
                    type="button"
                    className={cn(
                      "flex h-12 items-center bg-gray-100 justify-center gap-3 rounded-md border text-sm font-medium transition-colors",
                      isActive && value === "EXPENSE"
                        ? "border-red-base text-gray-800"
                        : isActive
                          ? "border-feedback-success text-gray-800"
                          : "border-transparent text-gray-600",
                    )}
                    onClick={() => setTransactionType(value)}
                  >
                    <Icon
                      size={16}
                      className={cn(
                        isActive && value === "EXPENSE"
                          ? "text-red-base"
                          : isActive
                            ? "text-feedback-success"
                            : "text-gray-400",
                      )}
                    />
                    {label}
                  </button>
                );
              })}
            </div>

            <InputLabel.Root>
              <InputLabel.Label htmlFor="edit-transaction-description">
                Descrição
              </InputLabel.Label>
              <InputLabel.Field
                id="edit-transaction-description"
                name="edit-transaction-description"
                placeholder="Ex. Almoço no restaurante"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </InputLabel.Root>

            <div className="grid grid-cols-2 gap-3">
              <DatePickerLabel.Root>
                <DatePickerLabel.Label>Data</DatePickerLabel.Label>
                <DatePickerLabel.Field
                  value={transactionDate}
                  onChange={setTransactionDate}
                  placeholder="Selecione"
                />
              </DatePickerLabel.Root>

              <InputLabel.Root>
                <InputLabel.Label htmlFor="edit-transaction-amount">
                  Valor
                </InputLabel.Label>
                <InputLabel.Field
                  id="edit-transaction-amount"
                  name="edit-transaction-amount"
                  placeholder="0,00"
                  value={amountInput}
                  onChange={(event) => setAmountInput(event.target.value)}
                  startIcon={
                    <span className="text-xs font-semibold text-gray-500">
                      R$
                    </span>
                  }
                />
              </InputLabel.Root>
            </div>

            <SelectLabel.Root>
              <SelectLabel.Label>Categoria</SelectLabel.Label>
              <SelectLabel.Field
                value={categoryId}
                onValueChange={setCategoryId}
                items={categoryItems}
                placeholder="Selecione"
                disabled={!categoryItems.length}
              />
            </SelectLabel.Root>

            {formError ? (
              <p className="text-sm text-red-base">{formError}</p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="mt-1 w-full bg-brand-base"
              disabled={updateTransaction.isPending}
            >
              {updateTransaction.isPending ? (
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
