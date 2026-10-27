import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "../../../features/customer-web/customer-web.css";
import {PreviewState} from "../../../features/artist/preview-state";
import {notFound} from "next/navigation";

export const dynamic="force-dynamic";
export default function CustomerWebPreviewLayout({children}:{children:React.ReactNode}){
 if(process.env.NODE_ENV==="production"&&process.env.NEGARIN_UI_PREVIEW!=="1")notFound();
 return <PreviewState basePath="/preview/customer-web">{children}</PreviewState>;
}
