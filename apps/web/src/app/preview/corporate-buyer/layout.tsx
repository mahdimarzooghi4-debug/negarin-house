import "@fontsource-variable/vazirmatn";
import "../../../features/corporate-buyer/corporate-buyer.css";
import {PreviewState} from "../../../features/artist/preview-state";
import {notFound} from "next/navigation";

export const dynamic="force-dynamic";
export default function CorporateBuyerPreviewLayout({children}:{children:React.ReactNode}){
 if(process.env.NODE_ENV==="production"&&process.env.NEGARIN_UI_PREVIEW!=="1")notFound();
 return <PreviewState basePath="/preview/corporate-buyer">{children}</PreviewState>;
}
