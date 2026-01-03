"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";

interface FormInputProps extends React.ComponentProps<"input"> {
  startIcon?: ComponentProps<typeof HugeiconsIcon>["icon"];
  endIcon?: ComponentProps<typeof HugeiconsIcon>["icon"];
  onEndIconClick?: () => void;
  endIconAriaLabel?: string;
  minHeight?: string;
  groupClassName?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      startIcon,
      endIcon,
      onEndIconClick,
      endIconAriaLabel,
      minHeight = "48px",
      groupClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <InputGroup
        className={cn("px-3", groupClassName)}
        style={{ minHeight, overflowY: "hidden" }}
      >
        {startIcon && (
          <InputGroupAddon>
            <HugeiconsIcon icon={startIcon} strokeWidth={2} />
          </InputGroupAddon>
        )}
        <InputGroupInput
          ref={ref}
          className={cn(
            "text-base md:text-sm touch-manipulation ml-2", 
            className
          )}
          style={{ minHeight }}  
          autoComplete={
            props.type === "password"
              ? props.autoComplete || "current-password"
              : props.inputMode === "numeric" ||
                props.name?.toLowerCase().includes("otp") ||
                props.name?.toLowerCase().includes("code")
              ? "one-time-code"
              : "off"
          }
          {...props}
        />
        {endIcon && (
          <InputGroupAddon align="inline-end">
            {onEndIconClick ? (
              <InputGroupButton
                type="button"
                variant="ghost"
                onClick={onEndIconClick}
                aria-label={endIconAriaLabel}
              >
                <HugeiconsIcon icon={endIcon} strokeWidth={2} />
              </InputGroupButton>
            ) : (
              <HugeiconsIcon icon={endIcon} strokeWidth={2} />
            )}
          </InputGroupAddon>
        )}
      </InputGroup>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
