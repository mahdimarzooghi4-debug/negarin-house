import { notFound } from "next/navigation";
import { servicePartnerScreens,servicePartnerLoaders,type ServicePartnerScreenSlug } from "../../../../features/service-partner/screen-registry";
import { ResponsivePartnerPreview } from "../../../../features/export-partner/responsive-partner-preview";

export default async function ServicePartnerScreenPage({params}:{params:Promise<{screen:string}>}){
 const {screen}=await params;
 const entry=servicePartnerScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const {default:Screen}=await servicePartnerLoaders[screen as ServicePartnerScreenSlug]();
 return <ResponsivePartnerPreview className="partner-preview-frame" dir="ltr">
  <div className="service-partner-design" dir="ltr"><Screen/></div>
 </ResponsivePartnerPreview>;
}
