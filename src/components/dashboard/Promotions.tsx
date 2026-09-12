import ManagementPage from "./ManagementPage";
import { Megaphone } from "lucide-react";

export default function Promotions() {
  return <ManagementPage title='Promotions' description='Plan and manage store promotions.' backHref='/marketing' addLabel='Create Promotion' icon={<Megaphone size={18} />} stats={[{label:"Promotions",value:7},{label:"Active",value:3},{label:"Scheduled",value:2}]} items={[{id:1,title:'Buy 2 Get 1 Free',subtitle:'Selected traditional wear',status:'Active',meta:'Ends Sep 30'},{id:2,title:'Free Shipping Weekend',subtitle:'Orders above $100',status:'Active',meta:'Ends Sep 15'}]} />;
}
