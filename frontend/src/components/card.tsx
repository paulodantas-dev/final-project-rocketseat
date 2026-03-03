import * as React from "react";
import { cn } from "@/lib/utils";

type CardLayout = "stats" | "highlight";

type CardRootProps = React.ComponentProps<"article"> & {
  layout?: CardLayout;
};

function CardRoot({
  className,
  layout = "stats",
  children,
  ...props
}: CardRootProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-3xl border border-gray-200 bg-neutral-white p-6",
        className,
      )}
      data-layout={layout}
      {...props}
    >
      {children}
    </article>
  );
}

type CardHeaderProps = React.ComponentProps<"div">;

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props} />
  );
}

type CardIconProps = React.ComponentProps<"span"> & {
  iconColor?: string;
  layout?: CardLayout;
};

function CardIcon({
  className,
  iconColor = "text-purple-base",
  layout = "stats",
  ...props
}: CardIconProps) {
  return (
    <span
      className={cn(
        "shrink-0",
        layout === "highlight" && "mt-2",
        iconColor,
        className,
      )}
      {...props}
    />
  );
}

type CardLabelProps = React.ComponentProps<"p"> & {
  layout?: CardLayout;
};

function CardLabel({ className, layout = "stats", ...props }: CardLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-wide text-gray-500",
        layout === "highlight" && "ml-8",
        className,
      )}
      {...props}
    />
  );
}

type CardValueProps = React.ComponentProps<"p">;

function CardValue({ className, ...props }: CardValueProps) {
  return (
    <p
      className={cn("text-3xl font-bold text-gray-800", className)}
      {...props}
    />
  );
}

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Icon: CardIcon,
  Label: CardLabel,
  Value: CardValue,
};
