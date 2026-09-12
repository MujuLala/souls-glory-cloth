import ManagementPage from "./ManagementPage";
import { AlertTriangle } from "lucide-react";

export default function LowStock() {
  return <ManagementPage title='Low Stock' description='Products that need restocking soon.' backHref='/inventory' addLabel='Add New' icon={<AlertTriangle size={18} />} stats={[{label:"Low Stock Items",value:18},{label:"Critical",value:6},{label:"Needs Restock",value:18}]} items={[{id:1,title:'Premium Kurta',subtitle:'KURTA-002',status:'Low Stock',meta:'12 units'},{id:2,title:'Kids Shalwar Kameez',subtitle:'KID-005',status:'Low Stock',meta:'8 units'}]} />;
}
