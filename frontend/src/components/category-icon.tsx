import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CategoryIconProps {
  icon: LucideIcon;
  lightBgClassName?: string;
  textClassName?: string;
  size?: number;
  className?: string;
}

export function CategoryIcon({
  icon: Icon,
  lightBgClassName,
  textClassName,
  size = 16,
  className,
}: CategoryIconProps) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-md",
        lightBgClassName,
        textClassName,
        className,
      )}
    >
      <Icon size={size} />
    </div>
  );
}
