import ManagementPage from "./ManagementPage";
import { CheckCircle2 } from "lucide-react";

export default function CompletedOrders() {
  return <ManagementPage title='Completed Orders' description='Successfully completed and delivered orders.' backHref='/orders' addLabel='Add New' icon={<CheckCircle2 size={18} />} stats={[{label:"Completed",value:86},{label:"This Month",value:32},{label:"Revenue",value:'$8,420'}]} items={[{id:1,title:'#SGC-1026',subtitle:'Usman Raza · 1 item',status:'Completed',meta:'$120'},{id:2,title:'#SGC-1025',subtitle:'Hina Malik · 4 items',status:'Completed',meta:'$310'}]} />;
}
