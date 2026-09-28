import { useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type PropsWithChildren } from "react";

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

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
};

export function TextField({
  id,
  label,
  hint,
  error,
  dir = "auto",
  "aria-describedby": describedBy,
  style,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? `negarin-field-${generatedId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpIds = [describedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label htmlFor={inputId} style={{ color: tokens.text, font: "inherit", fontWeight: 600 }}>
        {label}
      </label>
      <input
        {...inputProps}
        id={inputId}
        dir={dir}
        aria-describedby={helpIds}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
        style={{
          boxSizing: "border-box",
          width: "100%",
          minHeight: 42,
          border: `1px solid ${error ? "#b42318" : tokens.border}`,
          borderRadius: 8,
          background: tokens.surface,
          color: tokens.text,
          padding: "9px 12px",
          font: "inherit",
          ...style
        }}
      />
      {hint && <div id={hintId} style={{ color: tokens.muted, fontSize: 14 }}>{hint}</div>}
      {error && <div id={errorId} style={{ color: "#b42318", fontSize: 14 }}>{error}</div>}
    </div>
  );
}
