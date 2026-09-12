import ManagementPage from "./ManagementPage";
import { Users } from "lucide-react";

export default function Customers() {
  return <ManagementPage title='Customers' description='Manage customer profiles, accounts and activity.' backHref='/dashboard' addLabel='Add Customer' icon={<Users size={18} />} stats={[{label:"Total Customers",value:342},{label:"New This Month",value:28},{label:"Active",value:296},{label:"VIP",value:24}]} items={[{id:1,title:'Ahmed Khan',subtitle:'ahmed@example.com',status:'',meta:'18 orders'},{id:2,title:'Sara Ali',subtitle:'sara@example.com',status:'',meta:'12 orders'},{id:3,title:'Usman Raza',subtitle:'usman@example.com',status:'',meta:'9 orders'}]} />;
}
