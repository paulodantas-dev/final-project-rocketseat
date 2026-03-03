import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

import { Card } from "@/components/card";

export function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card.Root>
        <Card.Header>
          <Card.Icon>
            <Wallet size={20} />
          </Card.Icon>
          <Card.Label>Saldo total</Card.Label>
        </Card.Header>
        <Card.Value>R$ 12.847,32</Card.Value>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Icon iconColor="text-feedback-success">
            <ArrowUpCircle size={20} />
          </Card.Icon>
          <Card.Label>Receitas do mês</Card.Label>
        </Card.Header>
        <Card.Value>R$ 4.250,00</Card.Value>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Icon iconColor="text-feedback-danger">
            <ArrowDownCircle size={20} />
          </Card.Icon>
          <Card.Label>Despesas do mês</Card.Label>
        </Card.Header>
        <Card.Value>R$ 2.180,45</Card.Value>
      </Card.Root>
    </div>
  );
}
