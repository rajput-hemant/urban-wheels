import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, readOnly, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "bg-input placeholder:text-muted-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          !readOnly &&
            "ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2",
          className
        )}
        readOnly={readOnly}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
