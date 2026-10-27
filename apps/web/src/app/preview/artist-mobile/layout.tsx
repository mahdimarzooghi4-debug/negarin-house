import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons";
import "@fontsource/material-icons-round";
import "../../../features/artist/artist.css";
import "../../../features/artist-mobile/mobile.css";
import { PreviewState } from "../../../features/artist/preview-state";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export default function MobilePreviewLayout({children}:{children:React.ReactNode}){
  if(process.env.NODE_ENV==="production"&&process.env.NEGARIN_UI_PREVIEW!=="1")notFound();
  return <PreviewState basePath="/preview/artist-mobile">{children}</PreviewState>;
}
