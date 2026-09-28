import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const tokens = {
  accent: "#0c7570",
  sidebarBackground: "#eaf6f3",
  sidebarActive: "#d3ede8",
  sidebarText: "#405654",
  sidebarActiveContent: "#0b6963",
  canvas: "#f8fafc",
  surface: "#ffffff",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b"
} as const;

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", type = "button", style, children, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      style={{
        borderRadius: 8,
        border: variant === "secondary" ? "1px solid " + tokens.border : "none",
        background: variant === "primary" ? tokens.accent : tokens.surface,
        color: variant === "primary" ? tokens.surface : tokens.accent,
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
