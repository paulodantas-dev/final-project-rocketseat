import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputLabelRootProps = React.ComponentProps<"div">;

function InputLabelRoot({ className, ...props }: InputLabelRootProps) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

type InputLabelTextProps = React.ComponentProps<typeof Label>;

function InputLabelText({ className, ...props }: InputLabelTextProps) {
  return <Label className={cn(className)} {...props} />;
}

type InputLabelFieldProps = React.ComponentProps<typeof Input> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconClick?: () => void;
  endIconAriaLabel?: string;
  endIconClassName?: string;
  containerClassName?: string;
};

const InputLabelField = React.forwardRef<
  HTMLInputElement,
  InputLabelFieldProps
>(
  (
    {
      className,
      containerClassName,
      startIcon,
      endIcon,
      onEndIconClick,
      endIconAriaLabel,
      endIconClassName,
      ...props
    },
    ref,
  ) => {
    const hasStartIcon = Boolean(startIcon);
    const hasEndIcon = Boolean(endIcon);
    const isEndIconButton = Boolean(onEndIconClick);

    return (
      <div className={cn("relative", containerClassName)}>
        {hasStartIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            {startIcon}
          </span>
        ) : null}
        <Input
          ref={ref}
          className={cn(
            hasStartIcon && "pl-9",
            hasEndIcon && "pr-9",
            className,
          )}
          {...props}
        />
        {hasEndIcon ? (
          isEndIconButton ? (
            <button
              type="button"
              aria-label={endIconAriaLabel}
              className={cn(
                "absolute inset-y-0 right-2 inline-flex items-center justify-center rounded-md px-1 text-muted-foreground transition-colors hover:text-foreground",
                endIconClassName,
              )}
              onClick={onEndIconClick}
            >
              {endIcon}
            </button>
          ) : (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
              {endIcon}
            </span>
          )
        ) : null}
      </div>
    );
  },
);

InputLabelField.displayName = "InputLabelField";

export const InputLabel = {
  Root: InputLabelRoot,
  Label: InputLabelText,
  Field: InputLabelField,
};
