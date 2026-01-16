import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, helperText, startAdornment, endAdornment, ...props }, ref) => {
  return (
    <div className="flex flex-col flex-1">
      {label && <label className="mb-1 text-sm  text-gray-700">{label}</label>}
      <div
        className={cn(
          "flex items-center h-10 w-full rounded-md border  bg-background text-sm  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}>
        {startAdornment && <span className="pl-3.25 pr-2.5 text-sm text-muted-foreground">{startAdornment}</span>}
        <input
          type={type}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-11 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && <span className="px-3 text-sm text-muted-foreground">{endAdornment}</span>}
      </div>
      {helperText && <span className="mt-1 text-xs text-muted-foreground">{helperText}</span>}
    </div>
  );
});

Input.displayName = "Input";


    // <input
    //   type={type}
    //   data-slot="input"
    //   className={cn(
    //     "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    //     "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    //     className
    //   )}
    //   {...props}
    // />

export { Input }
