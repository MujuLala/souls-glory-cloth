import ManagementPage from "./ManagementPage";
import { Palette } from "lucide-react";

export default function SavedDesigns() {
  return <ManagementPage title='Saved Designs' description='View customer designs created through Custom Studio.' backHref='/custom-studio' addLabel='Add New' icon={<Palette size={18} />} stats={[{label:"Saved Designs",value:286},{label:"This Month",value:48},{label:"Customers",value:192}]} items={[{id:1,title:"Ahmed's Classic Suit",subtitle:'Created by Ahmed Khan · Navy',status:'',meta:'Sep 12, 2026'},{id:2,title:"Sara's Formal Dress",subtitle:'Created by Sara Ali · Maroon',status:'',meta:'Sep 11, 2026'}]} />;
}
