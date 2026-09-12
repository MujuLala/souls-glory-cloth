import ManagementPage from "./ManagementPage";
import { Palette } from "lucide-react";

export default function CustomStudioDashboard() {
  return <ManagementPage title='Custom Studio' description='Manage customization tools, templates and saved designs.' backHref='/dashboard' addLabel='Create Template' icon={<Palette size={18} />} stats={[{label:"Templates",value:18},{label:"Options",value:42},{label:"Saved Designs",value:286},{label:"Active",value:16}]} items={[{id:1,title:'Classic Suit Template',subtitle:'Suit customization template',status:'Active',meta:'128 uses'},{id:2,title:'Premium Kurta Template',subtitle:'Kurta customization template',status:'Active',meta:'94 uses'}]} />;
}
