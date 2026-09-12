import ManagementPage from "./ManagementPage";
import { ShoppingBag } from "lucide-react";

export default function Orders() {
  return <ManagementPage title='Orders' description='View and manage all customer orders.' backHref='/dashboard' addLabel='Create Order' icon={<ShoppingBag size={18} />} stats={[{label:"Total Orders",value:128},{label:"Pending",value:14},{label:"Processing",value:22},{label:"Completed",value:86}]} items={[{id:1,title:'#SGC-1028',subtitle:'Ahmed Khan · 3 items',status:'Processing',meta:'$245'},{id:2,title:'#SGC-1027',subtitle:'Sara Ali · 2 items',status:'Pending',meta:'$180'},{id:3,title:'#SGC-1026',subtitle:'Usman Raza · 1 item',status:'Completed',meta:'$120'}]} />;
}
