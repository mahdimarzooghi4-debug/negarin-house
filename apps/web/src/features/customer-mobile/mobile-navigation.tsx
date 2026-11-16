"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";
import { usePreview } from "../artist/preview-state";

type NavigationTab = {
  label: string;
  icon: string;
  destination: string;
  screens: string[];
};

const navigationTabs: NavigationTab[] = [
  {
    label: "حساب",
    icon: "person",
    destination: "account",
    screens: [
      "account",
      "account-information",
      "edit-profile",
      "addresses",
      "address-form",
      "notifications",
      "help-and-support",
      "login-and-register",
      "otp-verification",
      "followed-artists",
      "corporate-buyer-access",
      "corporate-buyer-handoff"
    ]
  },
  {
    label: "سبد",
    icon: "shopping_cart",
    destination: "cart",
    screens: [
      "cart",
      "checkout-shipping-info",
      "checkout-review-and-payment",
      "order-confirmation",
      "my-orders",
      "order-detail"
    ]
  },
  {
    label: "روایت‌ها",
    icon: "dynamic_feed",
    destination: "stories",
    screens: ["stories", "story-detail"]
  },
  {
    label: "کشف",
    icon: "search",
    destination: "search-and-discover",
    screens: [
      "search-and-discover",
      "search-results",
      "all-categories",
      "category-minakari",
      "filters-and-sort",
      "filtered-results",
      "products",
      "product-detail",
      "artists",
      "artist-public-profile",
      "saved"
    ]
  },
  {
    label: "خانه",
    icon: "home",
    destination: "landing",
    screens: ["landing"]
  }
];

const SharedNavigationContext = createContext(false);

export function CustomerMobileScreenShell({ children, height }: { children: ReactNode; height: number }) {
  return (
    <SharedNavigationContext.Provider value>
      <div className="artist-design customer-mobile" dir="ltr" style={{ height, position: "relative" }}>
        {children}
        <CustomerMobileNavigationBar />
      </div>
    </SharedNavigationContext.Provider>
  );
}

function CustomerMobileNavigationBar(props: HTMLAttributes<HTMLElement> = {}) {
  const preview = usePreview();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const currentTab = navigationTabs.find(tab => tab.screens.includes(preview.screen));

  return (
    <nav {...props} className="customer-mobile-bottom-nav" aria-label="منوی مشتری">
      {navigationTabs.map(tab => {
        const active = currentTab?.destination === tab.destination;
        const href = preview.basePath + "/" + tab.destination + (query ? `?${query}` : "");

        return (
          <Link
            key={tab.destination}
            href={href}
            className={active ? "customer-mobile-nav-item is-active" : "customer-mobile-nav-item"}
            aria-current={active ? "page" : undefined}
            aria-label={tab.label}
            scroll={false}
          >
            {active && <span className="customer-mobile-nav-indicator" aria-hidden="true" />}
            <span className="customer-mobile-nav-icon" aria-hidden="true">{tab.icon}</span>
            <span className="customer-mobile-nav-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// Older Figma screen exports still include this placeholder. The shared shell
// renders one navigation bar for the whole screen, so nested copies disappear.
export function MobileNavigation(props: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  const isInsideSharedShell = useContext(SharedNavigationContext);
  return isInsideSharedShell ? null : <CustomerMobileNavigationBar {...props} />;
}
