import ManagementPage from "./ManagementPage";
import { Palette } from "lucide-react";

export default function CustomizationOptions() {
  return <ManagementPage title='Customization Options' description='Manage the choices customers can select in Custom Studio.' backHref='/custom-studio' addLabel='Add Option' icon={<Palette size={18} />} stats={[{label:"Options",value:42},{label:"Active",value:38},{label:"Categories",value:8}]} items={[{id:1,title:'Collar Style',subtitle:'Product option · 8 values',status:'',meta:'8 values'},{id:2,title:'Sleeve Style',subtitle:'Product option · 6 values',status:'',meta:'6 values'},{id:3,title:'Fabric Color',subtitle:'Color option · 12 values',status:'',meta:'12 values'}]} />;
}
