import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons";
import "@fontsource/material-icons-round";
import "../../../features/artist/artist.css";
import "../../../features/customer-mobile/mobile.css";
import "../../../features/customer-mobile/pwa-install.css";
import { PreviewState } from "../../../features/artist/preview-state";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CustomerPwaRegistration } from "../../../features/customer-mobile/pwa-registration";

export const metadata: Metadata = {
  title: "خانه نگارین",
  applicationName: "خانه نگارین",
  manifest: "/preview/customer-mobile/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "خانه نگارین",
    statusBarStyle: "default"
  },
  icons: {
    apple: "/brand/customer-pwa-icon-192.png"
  },
  themeColor: "#FFFFFF"
};

export const dynamic = "force-dynamic";
export default function MobilePreviewLayout({children}:{children:React.ReactNode}){
  if(process.env.NODE_ENV==="production"&&process.env.NEGARIN_UI_PREVIEW!=="1")notFound();
  return <PreviewState basePath="/preview/customer-mobile"><CustomerPwaRegistration />{children}</PreviewState>;
}
