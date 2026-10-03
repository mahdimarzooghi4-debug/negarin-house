import "@fontsource-variable/vazirmatn";
import "../../../features/service-partner/service-partner.css";
import { PreviewState } from "../../../features/artist/preview-state";
import { notFound } from "next/navigation";

export const dynamic="force-dynamic";
export default function ServicePartnerPreviewLayout({children}:{children:React.ReactNode}){
 if(process.env.NODE_ENV==="production"&&process.env.NEGARIN_UI_PREVIEW!=="1")notFound();
 return <PreviewState basePath="/preview/service-partner">{children}</PreviewState>;
}
