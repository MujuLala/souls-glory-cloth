import ManagementPage from "./ManagementPage";
import { Clock3 } from "lucide-react";

export default function PendingOrders() {
  return <ManagementPage title='Pending Orders' description='Orders waiting for confirmation or action.' backHref='/orders' addLabel='Add New' icon={<Clock3 size={18} />} stats={[{label:"Pending Orders",value:14},{label:"Awaiting Payment",value:5},{label:"Awaiting Confirmation",value:9}]} items={[{id:1,title:'#SGC-1027',subtitle:'Sara Ali · 2 items',status:'Pending',meta:'$180'},{id:2,title:'#SGC-1024',subtitle:'Bilal Ahmed · 3 items',status:'Pending',meta:'$215'}]} />;
}
