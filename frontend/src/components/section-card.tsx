import * as React from "react";

import { cn } from "@/lib/utils";

type SectionCardRootProps = React.ComponentProps<"section">;

function SectionCardRoot({ className, ...props }: SectionCardRootProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-3xl border border-gray-200 bg-neutral-white p-6",
        className,
      )}
      {...props}
    />
  );
}

type SectionCardHeaderProps = React.ComponentProps<"div"> & {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

function SectionCardHeader({
  className,
  title,
  actionLabel,
  onActionClick,
  ...props
}: SectionCardHeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      {actionLabel && (
        <button
          onClick={onActionClick}
          className="flex items-center gap-2 text-sm font-medium text-brand-base hover:opacity-80 transition-opacity"
          type="button"
        >
          {actionLabel}
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

type SectionCardBodyProps = React.ComponentProps<"div">;

function SectionCardBody({ className, ...props }: SectionCardBodyProps) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

type SectionCardItemProps = React.ComponentProps<"div">;

function SectionCardItem({ className, ...props }: SectionCardItemProps) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    />
  );
}

type SectionCardItemIconProps = React.ComponentProps<"span">;

function SectionCardItemIcon({
  className,
  ...props
}: SectionCardItemIconProps) {
  return <span className={cn("shrink-0", className)} {...props} />;
}

type SectionCardItemContentProps = React.ComponentProps<"div">;

function SectionCardItemContent({
  className,
  ...props
}: SectionCardItemContentProps) {
  return (
    <div
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    />
  );
}

type SectionCardItemTitleProps = React.ComponentProps<"p">;

function SectionCardItemTitle({
  className,
  ...props
}: SectionCardItemTitleProps) {
  return (
    <p
      className={cn("text-sm font-medium text-gray-800", className)}
      {...props}
    />
  );
}

type SectionCardItemSubtitleProps = React.ComponentProps<"p">;

function SectionCardItemSubtitle({
  className,
  ...props
}: SectionCardItemSubtitleProps) {
  return <p className={cn("text-xs text-gray-500", className)} {...props} />;
}

type SectionCardBadgeProps = React.ComponentProps<"span"> & {
  variant?: "default" | "success" | "danger" | "warning" | "info";
  icon?: React.ReactNode;
};

function SectionCardBadge({
  className,
  variant = "default",
  icon,
  ...props
}: SectionCardBadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-light text-green-base",
    danger: "bg-red-light text-red-base",
    warning: "bg-yellow-light text-yellow-base",
    info: "bg-blue-light text-blue-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
    </span>
  );
}

type SectionCardItemValueProps = React.ComponentProps<"div">;

function SectionCardItemValue({
  className,
  ...props
}: SectionCardItemValueProps) {
  return (
    <div
      className={cn("flex items-center gap-2 shrink-0", className)}
      {...props}
    />
  );
}

type SectionCardItemButtonProps = React.ComponentProps<"button">;

function SectionCardItemButton({
  className,
  ...props
}: SectionCardItemButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-md p-1 text-gray-400 hover:text-gray-600 transition-colors",
        className,
      )}
      type="button"
      {...props}
    />
  );
}

type SectionCardFooterProps = React.ComponentProps<"div">;

function SectionCardFooter({ className, ...props }: SectionCardFooterProps) {
  return (
    <div
      className={cn("flex items-center justify-center pt-3", className)}
      {...props}
    />
  );
}

export const SectionCard = {
  Root: SectionCardRoot,
  Header: SectionCardHeader,
  Body: SectionCardBody,
  Item: SectionCardItem,
  ItemIcon: SectionCardItemIcon,
  ItemContent: SectionCardItemContent,
  ItemTitle: SectionCardItemTitle,
  ItemSubtitle: SectionCardItemSubtitle,
  Badge: SectionCardBadge,
  ItemValue: SectionCardItemValue,
  ItemButton: SectionCardItemButton,
  Footer: SectionCardFooter,
};
