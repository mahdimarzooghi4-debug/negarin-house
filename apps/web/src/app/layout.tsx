import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Negarin House",
  description: "Negarin House Phase 1"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
