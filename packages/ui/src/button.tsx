import type { ButtonHTMLAttributes } from "react";
import { cn } from "./cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium transition-colors",
        variant === "primary" && "bg-zinc-900 text-white hover:bg-zinc-700",
        variant === "secondary" &&
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
        className,
      )}
      {...props}
    />
  );
}
