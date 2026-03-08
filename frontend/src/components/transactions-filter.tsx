import { useState } from "react";
import { Search } from "lucide-react";
import { InputLabel } from "@/components/input-label";
import { SelectLabel } from "@/components/select-label";
import { DatePickerLabel } from "@/components/datepicker-label";
import { useCategories } from "@/hooks/use-categories";

interface TransactionsFilterProps {
  onFilterChange?: (filters: TransactionFilters) => void;
}

export interface TransactionFilters {
  search: string;
  type: string;
  categoryId: string;
  period: Date | undefined;
}

const transactionTypes = [
  { value: "all", label: "Todos" },
  { value: "income", label: "Receita" },
  { value: "expense", label: "Despesa" },
];

export function TransactionsFilter({
  onFilterChange,
}: TransactionsFilterProps) {
  const { data: categories } = useCategories();

  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("all");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [period, setPeriod] = useState<Date | undefined>(undefined);

  const categoryItems = [
    { value: "all", label: "Todas" },
    ...(categories?.map((cat) => ({
      value: cat.id,
      label: cat.title,
    })) || []),
  ];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange?.({ search: value, type, categoryId, period });
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    onFilterChange?.({ search, type: value, categoryId, period });
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    onFilterChange?.({ search, type, categoryId: value, period });
  };

  const handlePeriodChange = (date: Date | undefined) => {
    setPeriod(date);
    onFilterChange?.({ search, type, categoryId, period: date });
  };

  return (
    <div className="grid gap-4 md:grid-cols-4 p-6 bg-neutral-white rounded-lg border border-gray-200">
      <InputLabel.Root>
        <InputLabel.Label htmlFor="filter-search">Buscar</InputLabel.Label>
        <InputLabel.Field
          id="filter-search"
          placeholder="Buscar por descrição"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          startIcon={<Search size={16} />}
        />
      </InputLabel.Root>

      <SelectLabel.Root>
        <SelectLabel.Label>Tipo</SelectLabel.Label>
        <SelectLabel.Field
          value={type}
          onValueChange={handleTypeChange}
          items={transactionTypes}
          placeholder="Todos"
        />
      </SelectLabel.Root>

      <SelectLabel.Root>
        <SelectLabel.Label>Categoria</SelectLabel.Label>
        <SelectLabel.Field
          value={categoryId}
          onValueChange={handleCategoryChange}
          items={categoryItems}
          placeholder="Todas"
        />
      </SelectLabel.Root>

      <DatePickerLabel.Root>
        <DatePickerLabel.Label>Período</DatePickerLabel.Label>
        <DatePickerLabel.Field
          value={period}
          onChange={handlePeriodChange}
          placeholder="Novembro / 2025"
        />
      </DatePickerLabel.Root>
    </div>
  );
}
