import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CategoryBadgeProps {
  children: ReactNode;
  lightBgClassName?: string;
  textClassName?: string;
  className?: string;
}

export function CategoryBadge({
  children,
  lightBgClassName,
  textClassName,
  className,
}: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-sm/snug font-medium capitalize",
        lightBgClassName,
        textClassName,
        className,
      )}
    >
      {children}
    </span>
  );
}
