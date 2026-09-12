import ManagementPage from "./ManagementPage";
import { XCircle } from "lucide-react";

export default function OutOfStock() {
  return <ManagementPage title='Out of Stock' description='Products currently unavailable due to zero stock.' backHref='/inventory' addLabel='Add New' icon={<XCircle size={18} />} stats={[{label:"Out of Stock",value:10},{label:"Urgent",value:4},{label:"Restock Requests",value:7}]} items={[{id:1,title:'Ladies Formal Dress',subtitle:'DRESS-003',status:'Out of Stock',meta:'0 units'},{id:2,title:'Premium Waistcoat',subtitle:'WAIST-014',status:'Out of Stock',meta:'0 units'}]} />;
}
