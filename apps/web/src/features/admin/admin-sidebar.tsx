import type { HTMLAttributes, ReactNode } from "react";

// Keep each native source variant's geometry while sharing the semantic sidebar.
export function AdminSidebar({children,...props}:HTMLAttributes<HTMLElement>&{children:ReactNode}){
 return <aside {...props} aria-label="منوی مدیریت">{children}</aside>;
}
