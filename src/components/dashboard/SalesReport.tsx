import ManagementPage from "./ManagementPage";
import { TrendingUp } from "lucide-react";

export default function SalesReport() {
  return <ManagementPage title='Sales Report' description='Analyze revenue, orders and sales trends.' backHref='/reports' addLabel='Add New' icon={<TrendingUp size={18} />} stats={[{label:"Revenue",value:'$24,680'},{label:"Orders",value:128},{label:"Average Order",value:'$193'},{label:"Growth",value:'+18.4%'}]} items={[{id:1,title:'September Sales',subtitle:'Current month performance',status:'',meta:'$12,420'},{id:2,title:'August Sales',subtitle:'Previous month performance',status:'',meta:'$10,480'}]} />;
}
