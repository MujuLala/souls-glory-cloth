import ManagementPage from "./ManagementPage";
import { Megaphone } from "lucide-react";

export default function Discounts() {
  return <ManagementPage title='Discounts' description='Manage automatic and product discounts.' backHref='/marketing' addLabel='Add Discount' icon={<Megaphone size={18} />} stats={[{label:"Discounts",value:9},{label:"Active",value:4},{label:"Products",value:38}]} items={[{id:1,title:'Formal Wear -15%',subtitle:'Automatic product discount',status:'Active',meta:'12 products'},{id:2,title:'Premium Collection -20%',subtitle:'Collection discount',status:'Active',meta:'8 products'}]} />;
}
