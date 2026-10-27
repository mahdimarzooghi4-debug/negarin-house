import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-arabic";
import "@fontsource-variable/noto-sans-sc";
import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/outfit";
import "@fontsource-variable/jetbrains-mono";
import "../../../features/export-partner/export-partner.css";
import { ExportPreviewState } from "../../../features/export-partner/export-controls";
import { notFound } from "next/navigation";

export const dynamic="force-dynamic";
export default function ExportPartnerPreviewLayout({children}:{children:React.ReactNode}){
 if(process.env.NODE_ENV==="production"&&process.env.NEGARIN_UI_PREVIEW!=="1")notFound();
 return <ExportPreviewState>{children}</ExportPreviewState>;
}
