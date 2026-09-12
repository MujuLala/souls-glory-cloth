import ManagementPage from "./ManagementPage";
import { Warehouse } from "lucide-react";

export default function InventoryReport() {
  return <ManagementPage title='Inventory Report' description='Analyze stock levels, movement and inventory value.' backHref='/reports' addLabel='Add New' icon={<Warehouse size={18} />} stats={[{label:"Stock Value",value:'$42,680'},{label:"Items",value:156},{label:"Low Stock",value:18},{label:"Turnover",value:'4.2x'}]} items={[{id:1,title:'Fast Moving Products',subtitle:'Highest stock movement',status:'',meta:'42 products'},{id:2,title:'Low Stock Products',subtitle:'Products needing restock',status:'',meta:'18 products'}]} />;
}
