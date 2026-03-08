import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type DatePickerLabelRootProps = React.ComponentProps<"div">;

function DatePickerLabelRoot({
  className,
  ...props
}: DatePickerLabelRootProps) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

type DatePickerLabelTextProps = React.ComponentProps<typeof Label>;

function DatePickerLabelText({
  className,
  ...props
}: DatePickerLabelTextProps) {
  return <Label className={cn(className)} {...props} />;
}

interface DatePickerLabelFieldProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function DatePickerLabelField({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
  disabled = false,
}: DatePickerLabelFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-12 justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "PPP", { locale: ptBR })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export const DatePickerLabel = {
  Root: DatePickerLabelRoot,
  Label: DatePickerLabelText,
  Field: DatePickerLabelField,
};
