import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinancyHeaderProps {
  title: string;
  description: string;
  onAdd?: () => void;
  buttonText?: string;
}

export function FinancyHeader({
  title,
  description,
  onAdd,
  buttonText,
}: FinancyHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-base text-gray-600">{description}</p>
        </div>
        <Button onClick={onAdd} className="bg-brand-base" size="sm">
          <Plus size={16} />
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
