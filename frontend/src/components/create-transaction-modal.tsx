import { useState, type SubmitEvent } from "react";
import { ArrowDownCircle, ArrowUpCircle, Loader2 } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { useCreateTransaction } from "@/hooks/use-transactions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DatePickerLabel } from "@/components/datepicker-label";
import { InputLabel } from "@/components/input-label";
import { Modal } from "@/components/modal";
import { SelectLabel } from "@/components/select-label";

interface CreateTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TransactionKind = "EXPENSE" | "INCOME";

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

export function CreateTransactionModal({
  open,
  onOpenChange,
}: CreateTransactionModalProps) {
  const { data: categories } = useCategories();
  const createTransaction = useCreateTransaction();

  const [transactionType, setTransactionType] =
    useState<TransactionKind>("EXPENSE");
  const [transactionDate, setTransactionDate] = useState<Date | undefined>();
  const [categoryId, setCategoryId] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const categoryItems =
    categories?.map((category) => ({
      value: category.id,
      label: category.title,
    })) ?? [];

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setFormError(null);

    if (!transactionDate) {
      setFormError("Selecione uma data para a transação.");
      return;
    }

    if (!categoryId) {
      setFormError("Selecione uma categoria.");
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const description = (
      formData.get("transaction-description") as string
    ).trim();
    const amountRaw = (formData.get("transaction-amount") as string).trim();
    const amount = parseCurrencyToNumber(amountRaw);

    if (!description) {
      setFormError("Informe a descrição da transação.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Informe um valor válido maior que zero.");
      return;
    }

    const dateForApi = new Date(transactionDate);
    dateForApi.setHours(12, 0, 0, 0);

    await createTransaction.mutateAsync({
      description,
      amount,
      type: transactionType,
      date: dateForApi.toISOString(),
      categoryId,
    });

    form.reset();
    setTransactionType("EXPENSE");
    setTransactionDate(undefined);
    setCategoryId("");
    setFormError(null);
    onOpenChange(false);
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="w-full max-w-md rounded-xl p-6">
        <Modal.Header className="gap-0.5">
          <Modal.Title className="text-base font-semibold text-gray-800">
            Nova transação
          </Modal.Title>
          <Modal.Description className="text-sm text-gray-600">
            Registre sua despesa ou receita
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
              <InputLabel.Label htmlFor="transaction-description">
                Descrição
              </InputLabel.Label>
              <InputLabel.Field
                id="transaction-description"
                name="transaction-description"
                placeholder="Ex. Almoço no restaurante"
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
                <InputLabel.Label htmlFor="transaction-amount">
                  Valor
                </InputLabel.Label>
                <InputLabel.Field
                  id="transaction-amount"
                  name="transaction-amount"
                  placeholder="0,00"
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
              disabled={createTransaction.isPending}
            >
              {createTransaction.isPending ? (
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
