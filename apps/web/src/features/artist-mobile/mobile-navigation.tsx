"use client";

import type { HTMLAttributes } from "react";
import { DesignAction } from "../artist/design-controls";

const items = [
  {destination:"account", label:"حساب", icon:<><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-3.5 3.2-5.5 7-5.5s6.4 2 7 5.5"/></>},
  {destination:"opportunities", label:"فرصت‌ها", icon:<><path d="M4 18 9 13l3 2 7-8"/><path d="M14 7h5v5"/><path d="M4 21h16"/></>},
  {destination:"products", label:"محصولات", icon:<><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v9"/></>},
  {destination:"orders", label:"سفارش‌ها", icon:<><path d="M6 4h12a2 2 0 0 1 2 2v14H4V6a2 2 0 0 1 2-2Z"/><path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5"/></>},
  {destination:"dashboard", label:"خانه", icon:<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10Z"/>},
];

export function MobileNavigation({className: _className, children: _children, ...props}:HTMLAttributes<HTMLElement>){
  return (
    <nav {...props} className="artist-mobile-nav" aria-label="منوی هنرمند">
      <div className="artist-mobile-nav-items">
        {items.map(item=>(
          <DesignAction key={item.destination} className="artist-mobile-nav-item" destination={item.destination} label={item.label} data-name={`artist-mobile-nav-${item.destination}`}>
            <svg className="artist-mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{item.icon}</svg>
            <span className="artist-mobile-nav-label">{item.label}</span>
          </DesignAction>
        ))}
      </div>
    </nav>
  );
}
