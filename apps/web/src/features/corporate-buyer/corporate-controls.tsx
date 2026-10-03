"use client";
import {type HTMLAttributes} from "react";
import {DesignAction} from "../artist/design-controls";

export function CorporateSidebar({children,...props}:HTMLAttributes<HTMLElement>){return <aside {...props} aria-label="منوی خریدار سازمانی">{children}</aside>;}
export const CorporateAction=DesignAction;
