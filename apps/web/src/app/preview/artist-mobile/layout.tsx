import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons";
import "@fontsource/material-icons-round";
import "../../../features/artist/artist.css";
import "../../../features/artist-mobile/mobile.css";
import "../../../features/artist-mobile/mobile-navigation.css";
import "../../../features/artist-mobile/pwa-install.css";
import { PreviewState } from "../../../features/artist/preview-state";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArtistPwaRegistration } from "../../../features/artist-mobile/pwa-registration";

export const metadata: Metadata = {
  title: "نگارین هنرمند",
  applicationName: "نگارین هنرمند",
  manifest: "/preview/artist-mobile/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "نگارین هنرمند",
    statusBarStyle: "default"
  },
  icons: {
    apple: "/brand/artist-pwa-icon-192.png"
  },
  themeColor: "#F8F2E8"
};

export const dynamic = "force-dynamic";
export default function MobilePreviewLayout({children}:{children:React.ReactNode}){
  if(process.env.NODE_ENV==="production"&&process.env.NEGARIN_UI_PREVIEW!=="1")notFound();
  return <PreviewState basePath="/preview/artist-mobile"><ArtistPwaRegistration />{children}</PreviewState>;
}
