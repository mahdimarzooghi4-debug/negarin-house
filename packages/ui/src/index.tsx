import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const tokens = {
  navy: "#0f172a",
  turquoise: "#0ea5e9",
  canvas: "#f8fafc",
  surface: "#ffffff",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b"
} as const;

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", style, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        borderRadius: 8,
        border: variant === "secondary" ? "1px solid " + tokens.border : "none",
        background: variant === "primary" ? tokens.navy : tokens.surface,
        color: variant === "primary" ? tokens.surface : tokens.text,
        padding: "10px 16px",
        font: "inherit",
        cursor: props.disabled ? "not-allowed" : "pointer",
        ...style
      }}
    >
      {children}
    </button>
  );
}
