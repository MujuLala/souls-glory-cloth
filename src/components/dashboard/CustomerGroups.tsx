import ManagementPage from "./ManagementPage";
import { Users } from "lucide-react";

export default function CustomerGroups() {
  return <ManagementPage title='Customer Groups' description='Organize customers into useful groups.' backHref='/customers' addLabel='Add Group' icon={<Users size={18} />} stats={[{label:"Groups",value:6},{label:"VIP",value:24},{label:"Regular",value:284},{label:"Wholesale",value:34}]} items={[{id:1,title:'VIP Customers',subtitle:'High-value repeat customers',status:'',meta:'24 customers'},{id:2,title:'Regular Customers',subtitle:'Standard customer group',status:'',meta:'284 customers'},{id:3,title:'Wholesale',subtitle:'Bulk buyers',status:'',meta:'34 customers'}]} />;
}
