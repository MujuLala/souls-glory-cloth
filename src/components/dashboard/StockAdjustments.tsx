import ManagementPage from "./ManagementPage";
import { Warehouse } from "lucide-react";

export default function StockAdjustments() {
  return <ManagementPage title='Stock Adjustments' description='Review manual inventory changes and corrections.' backHref='/inventory' addLabel='New Adjustment' icon={<Warehouse size={18} />} stats={[{label:"Adjustments",value:48},{label:"This Month",value:17},{label:"Added",value:62},{label:"Removed",value:34}]} items={[{id:1,title:'Adjustment #ADJ-048',subtitle:"Classic Men's Suit · Manual correction",status:'',meta:'+5 units'},{id:2,title:'Adjustment #ADJ-047',subtitle:'Premium Kurta · Damaged stock',status:'',meta:'-2 units'}]} />;
}
