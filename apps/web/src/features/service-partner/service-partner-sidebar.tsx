import type { HTMLAttributes, ReactNode } from "react";

export function ServicePartnerSidebar({children,...props}:HTMLAttributes<HTMLElement>&{children:ReactNode}){
 return <aside {...props} aria-label="منوی همکار خدمات">{children}</aside>;
}
