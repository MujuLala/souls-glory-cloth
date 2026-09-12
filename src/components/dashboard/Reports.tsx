import ManagementPage from "./ManagementPage";
import { BarChart3 } from "lucide-react";

export default function Reports() {
  return <ManagementPage title='Reports' description='Review store performance and business insights.' backHref='/dashboard' addLabel='Add New' icon={<BarChart3 size={18} />} stats={[{label:"Revenue",value:'$24,680'},{label:"Orders",value:128},{label:"Customers",value:342},{label:"Growth",value:'+18.4%'}]} items={[{id:1,title:'Sales Overview',subtitle:'Revenue and order performance',status:'',meta:'Updated today'},{id:2,title:'Product Performance',subtitle:'Top products and categories',status:'',meta:'Updated today'}]} />;
}
