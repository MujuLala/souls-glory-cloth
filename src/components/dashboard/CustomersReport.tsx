import ManagementPage from "./ManagementPage";
import { Users } from "lucide-react";

export default function CustomersReport() {
  return <ManagementPage title='Customer Report' description='Analyze customer growth, retention and value.' backHref='/reports' addLabel='Add New' icon={<Users size={18} />} stats={[{label:"Customers",value:342},{label:"New",value:28},{label:"Returning",value:196},{label:"Retention",value:'72%'}]} items={[{id:1,title:'Customer Growth',subtitle:'Monthly customer acquisition',status:'',meta:'+28 this month'},{id:2,title:'Repeat Customers',subtitle:'Customers with multiple orders',status:'',meta:'196 customers'}]} />;
}
