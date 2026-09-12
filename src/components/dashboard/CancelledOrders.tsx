import ManagementPage from "./ManagementPage";
import { XCircle } from "lucide-react";

export default function CancelledOrders() {
  return <ManagementPage title='Cancelled Orders' description='Review orders that were cancelled.' backHref='/orders' addLabel='Add New' icon={<XCircle size={18} />} stats={[{label:"Cancelled",value:6},{label:"This Month",value:2},{label:"Refunds",value:'$540'}]} items={[{id:1,title:'#SGC-1017',subtitle:'Zainab Khan · Customer request',status:'Cancelled',meta:'$180'},{id:2,title:'#SGC-1009',subtitle:'Hamza Ali · Payment issue',status:'Cancelled',meta:'$240'}]} />;
}
