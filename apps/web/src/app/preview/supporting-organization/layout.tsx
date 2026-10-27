import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/inter";
import "../../../features/supporting-organization/supporting-organization.css";
import { PreviewState } from "../../../features/artist/preview-state";
import { notFound } from "next/navigation";

export const dynamic="force-dynamic";
export default function SupportingOrganizationPreviewLayout({children}:{children:React.ReactNode}){
 if(process.env.NODE_ENV==="production"&&process.env.NEGARIN_UI_PREVIEW!=="1")notFound();
 return <PreviewState basePath="/preview/supporting-organization">{children}</PreviewState>;
}
