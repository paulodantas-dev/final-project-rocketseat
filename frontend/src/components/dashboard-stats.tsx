import { useMemo } from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

import { Card } from "@/components/card";
import { useTransactions } from "@/hooks/use-transactions";
import { formatCurrency } from "@/utils/format-currency";

export function DashboardStats() {
  const { data: transactions = [], isLoading } = useTransactions();

  const { totalBalance, monthIncome, monthExpense } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let balance = 0;
    let income = 0;
    let expense = 0;

    for (const transaction of transactions) {
      const amount = transaction.amount;
      const isIncome = transaction.type === "INCOME";

      balance += isIncome ? amount : -amount;

      const transactionDate = new Date(transaction.date);
      const isCurrentMonth =
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear;

      if (!isCurrentMonth) continue;

      if (isIncome) {
        income += amount;
      } else {
        expense += amount;
      }
    }

    return {
      totalBalance: balance,
      monthIncome: income,
      monthExpense: expense,
    };
  }, [transactions]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card.Root>
        <Card.Header>
          <Card.Icon>
            <Wallet size={20} />
          </Card.Icon>
          <Card.Label>Saldo total</Card.Label>
        </Card.Header>
        <Card.Value>
          {isLoading ? "-" : formatCurrency(totalBalance)}
        </Card.Value>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Icon iconColor="text-feedback-success">
            <ArrowUpCircle size={20} />
          </Card.Icon>
          <Card.Label>Receitas do mês</Card.Label>
        </Card.Header>
        <Card.Value>{isLoading ? "-" : formatCurrency(monthIncome)}</Card.Value>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Icon iconColor="text-feedback-danger">
            <ArrowDownCircle size={20} />
          </Card.Icon>
          <Card.Label>Despesas do mês</Card.Label>
        </Card.Header>
        <Card.Value>
          {isLoading ? "-" : formatCurrency(monthExpense)}
        </Card.Value>
      </Card.Root>
    </div>
  );
}
