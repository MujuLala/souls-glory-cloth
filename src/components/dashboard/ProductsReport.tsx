import ManagementPage from "./ManagementPage";
import { BarChart3 } from "lucide-react";

export default function ProductsReport() {
  return <ManagementPage title='Product Report' description='Analyze product performance and popularity.' backHref='/reports' addLabel='Add New' icon={<BarChart3 size={18} />} stats={[{label:"Products",value:156},{label:"Best Seller",value:'Classic Suit'},{label:"Views",value:'18.2K'},{label:"Conversion",value:'4.8%'}]} items={[{id:1,title:"Classic Men's Suit",subtitle:'25 sold · 4.9 rating',status:'',meta:'$3,000 revenue'},{id:2,title:'Premium Kurta',subtitle:'18 sold · 4.8 rating',status:'',meta:'$1,170 revenue'}]} />;
}
