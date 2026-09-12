import ManagementPage from "./ManagementPage";
import { Palette } from "lucide-react";

export default function StudioTemplates() {
  return <ManagementPage title='Studio Templates' description='Create and manage product customization templates.' backHref='/custom-studio' addLabel='Add Template' icon={<Palette size={18} />} stats={[{label:"Templates",value:18},{label:"Active",value:16},{label:"Draft",value:2}]} items={[{id:1,title:'Classic Suit Template',subtitle:"Men's suit configuration",status:'Active',meta:'128 uses'},{id:2,title:'Premium Kurta Template',subtitle:'Traditional kurta configuration',status:'Active',meta:'94 uses'}]} />;
}
