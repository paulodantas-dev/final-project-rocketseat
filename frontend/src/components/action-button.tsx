import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "danger" | "neutral";
}

export function ActionButton({
  children,
  color = "neutral",
  className,
  type,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={cn(
        "cursor-pointer flex size-8 items-center justify-center rounded-md border border-gray-300 bg-neutral-white transition-colors hover:bg-gray-100",
        color === "danger" ? "text-red-base" : "text-gray-600",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
