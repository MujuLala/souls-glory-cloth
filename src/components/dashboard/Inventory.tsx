import ManagementPage from "./ManagementPage";
import { Warehouse } from "lucide-react";

export default function Inventory() {
  return <ManagementPage title='Inventory' description='Monitor stock levels and inventory activity.' backHref='/dashboard' addLabel='Add Stock' icon={<Warehouse size={18} />} stats={[{label:"Total Items",value:156},{label:"In Stock",value:128},{label:"Low Stock",value:18},{label:"Out of Stock",value:10}]} items={[{id:1,title:"Classic Men's Suit",subtitle:'SUIT-001 · Men Collection',status:'Active',meta:'25 units'},{id:2,title:'Premium Kurta',subtitle:'KURTA-002 · Traditional Wear',status:'Low Stock',meta:'12 units'},{id:3,title:'Ladies Formal Dress',subtitle:'DRESS-003 · Women Collection',status:'Out of Stock',meta:'0 units'}]} />;
}
