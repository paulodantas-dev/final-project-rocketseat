import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectLabelRootProps = React.ComponentProps<"div">;

function SelectLabelRoot({ className, ...props }: SelectLabelRootProps) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

type SelectLabelTextProps = React.ComponentProps<typeof Label>;

function SelectLabelText({ className, ...props }: SelectLabelTextProps) {
  return <Label className={cn(className)} {...props} />;
}

interface SelectLabelFieldProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  items?: Array<{ value: string; label: string }>;
  className?: string;
  disabled?: boolean;
}

function SelectLabelField({
  value,
  onValueChange,
  placeholder = "Selecione...",
  items = [],
  className,
  disabled = false,
}: SelectLabelFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const SelectLabel = {
  Root: SelectLabelRoot,
  Label: SelectLabelText,
  Field: SelectLabelField,
};
