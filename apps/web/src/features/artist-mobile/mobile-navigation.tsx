import type { HTMLAttributes, ReactNode } from "react";

export function MobileNavigation({children,...props}:HTMLAttributes<HTMLElement>&{children:ReactNode}){
  return <nav {...props} aria-label="منوی هنرمند">{children}</nav>;
}
