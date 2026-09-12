import ManagementPage from "./ManagementPage";
import { Users } from "lucide-react";

export default function NewCustomers() {
  return <ManagementPage title='New Customers' description='Recently registered customers.' backHref='/customers' addLabel='Add New' icon={<Users size={18} />} stats={[{label:"New Customers",value:28},{label:"This Week",value:9},{label:"This Month",value:28}]} items={[{id:1,title:'Areeba Khan',subtitle:'areeba@example.com',status:'',meta:'Joined today'},{id:2,title:'Hamza Raza',subtitle:'hamza@example.com',status:'',meta:'Joined yesterday'}]} />;
}
