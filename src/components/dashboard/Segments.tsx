import ManagementPage from "./ManagementPage";
import { Users } from "lucide-react";

export default function Segments() {
  return <ManagementPage title='Customer Segments' description='Create and manage customer segments.' backHref='/customers' addLabel='Create Segment' icon={<Users size={18} />} stats={[{label:"Segments",value:8},{label:"Active",value:6},{label:"Automated",value:4}]} items={[{id:1,title:'High Value',subtitle:'Customers spending over $500',status:'',meta:'42 customers'},{id:2,title:'Repeat Buyers',subtitle:'Customers with 3+ orders',status:'',meta:'96 customers'}]} />;
}
