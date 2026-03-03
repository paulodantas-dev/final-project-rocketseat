import { InfoIcon, Plus } from "lucide-react";
import { SectionCard } from "@/components/section-card";

interface Transaction {
  id: string;
  title: string;
  date: string;
  category: {
    name: string;
    icon: React.ReactNode;
    color: "success" | "info" | "warning" | "danger";
  };
  amount: string;
  type: "income" | "expense";
  info?: React.ReactNode;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onViewAll?: () => void;
  onAddTransaction?: () => void;
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    title: "Pagamento de Salário",
    date: "01/12/25",
    category: {
      name: "Receita",
      icon: null,
      color: "success",
    },
    amount: "+ R$ 4.250,00",
    type: "income",
    info: <InfoIcon size={16} />,
  },
  {
    id: "2",
    title: "Jantar no Restaurante",
    date: "30/11/25",
    category: {
      name: "Alimentação",
      icon: null,
      color: "info",
    },
    amount: "- R$ 89,50",
    type: "expense",
    info: <InfoIcon size={16} />,
  },
  {
    id: "3",
    title: "Posto de Gasolina",
    date: "29/11/25",
    category: {
      name: "Transporte",
      icon: null,
      color: "warning",
    },
    amount: "- R$ 100,00",
    type: "expense",
    info: <InfoIcon size={16} />,
  },
  {
    id: "4",
    title: "Compras no Mercado",
    date: "28/11/25",
    category: {
      name: "Mercado",
      icon: null,
      color: "warning",
    },
    amount: "- R$ 156,80",
    type: "expense",
    info: <InfoIcon size={16} />,
  },
  {
    id: "5",
    title: "Retorno de Investimento",
    date: "26/11/25",
    category: {
      name: "Investimento",
      icon: null,
      color: "success",
    },
    amount: "+ R$ 340,25",
    type: "income",
    info: <InfoIcon size={16} />,
  },
];

export function RecentTransactions({
  transactions = defaultTransactions,
  onViewAll,
  onAddTransaction,
}: RecentTransactionsProps) {
  return (
    <SectionCard.Root>
      <SectionCard.Header
        title="Transações Recentes"
        actionLabel="Ver todas"
        onActionClick={onViewAll}
      />
      <SectionCard.Body>
        {transactions.map((transaction) => (
          <SectionCard.Item key={transaction.id}>
            <SectionCard.ItemIcon>
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-light text-blue-base">
                {/* Ícone dinâmico aqui */}
                <span className="text-lg">💳</span>
              </div>
            </SectionCard.ItemIcon>
            <SectionCard.ItemContent>
              <SectionCard.ItemTitle>{transaction.title}</SectionCard.ItemTitle>
              <SectionCard.ItemSubtitle>
                {transaction.date}
              </SectionCard.ItemSubtitle>
            </SectionCard.ItemContent>
            <SectionCard.Badge variant={transaction.category.color}>
              {transaction.category.name}
            </SectionCard.Badge>
            <SectionCard.ItemValue>
              <span className="text-sm font-medium text-gray-800">
                {transaction.amount}
              </span>
              {transaction.info && (
                <SectionCard.ItemButton>
                  {transaction.info}
                </SectionCard.ItemButton>
              )}
            </SectionCard.ItemValue>
          </SectionCard.Item>
        ))}
      </SectionCard.Body>
      <SectionCard.Footer>
        <button
          onClick={onAddTransaction}
          className="flex items-center gap-2 text-sm font-medium text-brand-base hover:opacity-80 transition-opacity"
          type="button"
        >
          <Plus size={16} />
          Nova transação
        </button>
      </SectionCard.Footer>
    </SectionCard.Root>
  );
}
