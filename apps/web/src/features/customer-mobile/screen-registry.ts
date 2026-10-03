export const mobileScreens = [
  {
    "id": "401:3",
    "name": "Customer / Landing - Mobile",
    "w": 390,
    "h": 1850,
    "slug": "landing",
    "implemented": true
  },
  {
    "id": "560:5",
    "name": "Customer / Stories - Mobile",
    "w": 390,
    "h": 844,
    "slug": "stories",
    "implemented": true
  },
  {
    "id": "566:5",
    "name": "Customer / Product Detail - Mobile",
    "w": 390,
    "h": 844,
    "slug": "product-detail",
    "implemented": true
  },
  {
    "id": "567:5",
    "name": "Customer / Artist Public Profile - Mobile",
    "w": 390,
    "h": 844,
    "slug": "artist-public-profile",
    "implemented": true
  },
  {
    "id": "572:5",
    "name": "Customer / Cart - Mobile",
    "w": 390,
    "h": 844,
    "slug": "cart",
    "implemented": true
  },
  {
    "id": "573:5",
    "name": "Customer / Checkout — Shipping Info - Mobile",
    "w": 390,
    "h": 844,
    "slug": "checkout-shipping-info",
    "implemented": true
  },
  {
    "id": "574:5",
    "name": "Customer / Checkout — Review & Payment - Mobile",
    "w": 390,
    "h": 844,
    "slug": "checkout-review-and-payment",
    "implemented": true
  },
  {
    "id": "591:2",
    "name": "Customer / Order Confirmation - Mobile",
    "w": 390,
    "h": 844,
    "slug": "order-confirmation",
    "implemented": true
  },
  {
    "id": "596:5",
    "name": "Customer / My Orders - Mobile",
    "w": 390,
    "h": 844,
    "slug": "my-orders",
    "implemented": true
  },
  {
    "id": "600:5",
    "name": "Customer / Order Detail - Mobile",
    "w": 390,
    "h": 844,
    "slug": "order-detail",
    "implemented": true
  },
  {
    "id": "603:5",
    "name": "Customer / Account - Mobile",
    "w": 390,
    "h": 844,
    "slug": "account",
    "implemented": true
  },
  {
    "id": "613:5",
    "name": "Customer / Saved - Mobile",
    "w": 390,
    "h": 844,
    "slug": "saved",
    "implemented": true
  },
  {
    "id": "617:5",
    "name": "Customer / Followed Artists - Mobile",
    "w": 390,
    "h": 844,
    "slug": "followed-artists",
    "implemented": true
  },
  {
    "id": "620:5",
    "name": "Customer / Addresses - Mobile",
    "w": 390,
    "h": 844,
    "slug": "addresses",
    "implemented": true
  },
  {
    "id": "624:5",
    "name": "Customer / Account Information - Mobile",
    "w": 390,
    "h": 844,
    "slug": "account-information",
    "implemented": true
  },
  {
    "id": "631:5",
    "name": "Customer / Notifications - Mobile",
    "w": 390,
    "h": 844,
    "slug": "notifications",
    "implemented": true
  },
  {
    "id": "632:5",
    "name": "Customer / Help & Support - Mobile",
    "w": 390,
    "h": 844,
    "slug": "help-and-support",
    "implemented": true
  },
  {
    "id": "634:5",
    "name": "Customer / Edit Profile - Mobile",
    "w": 390,
    "h": 844,
    "slug": "edit-profile",
    "implemented": true
  },
  {
    "id": "638:5",
    "name": "Customer / Address Form - Mobile",
    "w": 390,
    "h": 844,
    "slug": "address-form",
    "implemented": true
  },
  {
    "id": "642:5",
    "name": "Customer / Search & Discover - Mobile",
    "w": 390,
    "h": 844,
    "slug": "search-and-discover",
    "implemented": true
  },
  {
    "id": "645:5",
    "name": "Customer / Search Results - Mobile",
    "w": 390,
    "h": 844,
    "slug": "search-results",
    "implemented": true
  },
  {
    "id": "647:5",
    "name": "Customer / Category — Minakari - Mobile",
    "w": 390,
    "h": 844,
    "slug": "category-minakari",
    "implemented": true
  },
  {
    "id": "657:5",
    "name": "Customer / Filters & Sort - Mobile",
    "w": 390,
    "h": 844,
    "slug": "filters-and-sort",
    "implemented": true
  },
  {
    "id": "660:5",
    "name": "Customer / Filtered Results - Mobile",
    "w": 390,
    "h": 844,
    "slug": "filtered-results",
    "implemented": true
  },
  {
    "id": "678:8",
    "name": "Customer / All Categories - Mobile",
    "w": 390,
    "h": 844,
    "slug": "all-categories",
    "implemented": true
  },
  {
    "id": "682:68",
    "name": "Customer / Artists - Mobile",
    "w": 390,
    "h": 844,
    "slug": "artists",
    "implemented": true
  },
  {
    "id": "703:5",
    "name": "Customer / Products - Mobile",
    "w": 390,
    "h": 844,
    "slug": "products",
    "implemented": true
  },
  {
    "id": "715:5",
    "name": "Customer / Story Detail - Mobile",
    "w": 390,
    "h": 844,
    "slug": "story-detail",
    "implemented": true
  },
  {
    "id": "722:5",
    "name": "Customer / Login & Register - Mobile",
    "w": 390,
    "h": 844,
    "slug": "login-and-register",
    "implemented": true
  },
  {
    "id": "723:6",
    "name": "Customer / OTP Verification - Mobile",
    "w": 390,
    "h": 844,
    "slug": "otp-verification",
    "implemented": true
  },
  {
    "id": "771:7",
    "name": "Customer / Corporate Buyer Access - Mobile",
    "w": 390,
    "h": 844,
    "slug": "corporate-buyer-access",
    "implemented": true
  },
  {
    "id": "771:62",
    "name": "Customer / Corporate Buyer Handoff - Mobile",
    "w": 390,
    "h": 844,
    "slug": "corporate-buyer-handoff",
    "implemented": true
  }
] as const;
export const mobileLoaders = {
  "landing": () => import("./screens/landing"),
  "stories": () => import("./screens/stories"),
  "product-detail": () => import("./screens/product-detail"),
  "artist-public-profile": () => import("./screens/artist-public-profile"),
  "cart": () => import("./screens/cart"),
  "checkout-shipping-info": () => import("./screens/checkout-shipping-info"),
  "checkout-review-and-payment": () => import("./screens/checkout-review-and-payment"),
  "order-confirmation": () => import("./screens/order-confirmation"),
  "my-orders": () => import("./screens/my-orders"),
  "order-detail": () => import("./screens/order-detail"),
  "account": () => import("./screens/account"),
  "saved": () => import("./screens/saved"),
  "followed-artists": () => import("./screens/followed-artists"),
  "addresses": () => import("./screens/addresses"),
  "account-information": () => import("./screens/account-information"),
  "notifications": () => import("./screens/notifications"),
  "help-and-support": () => import("./screens/help-and-support"),
  "edit-profile": () => import("./screens/edit-profile"),
  "address-form": () => import("./screens/address-form"),
  "search-and-discover": () => import("./screens/search-and-discover"),
  "search-results": () => import("./screens/search-results"),
  "category-minakari": () => import("./screens/category-minakari"),
  "filters-and-sort": () => import("./screens/filters-and-sort"),
  "filtered-results": () => import("./screens/filtered-results"),
  "all-categories": () => import("./screens/all-categories"),
  "artists": () => import("./screens/artists"),
  "products": () => import("./screens/products"),
  "story-detail": () => import("./screens/story-detail"),
  "login-and-register": () => import("./screens/login-and-register"),
  "otp-verification": () => import("./screens/otp-verification"),
  "corporate-buyer-access": () => import("./screens/corporate-buyer-access"),
  "corporate-buyer-handoff": () => import("./screens/corporate-buyer-handoff")
};
export type MobileScreenSlug = keyof typeof mobileLoaders;
