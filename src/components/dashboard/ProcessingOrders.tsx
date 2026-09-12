import ManagementPage from "./ManagementPage";
import { Package } from "lucide-react";

export default function ProcessingOrders() {
  return <ManagementPage title='Processing Orders' description='Orders currently being prepared and stitched.' backHref='/orders' addLabel='Add New' icon={<Package size={18} />} stats={[{label:"Processing",value:22},{label:"In Stitching",value:15},{label:"Ready Soon",value:7}]} items={[{id:1,title:'#SGC-1028',subtitle:'Ahmed Khan · 3 items',status:'Processing',meta:'$245'},{id:2,title:'#SGC-1019',subtitle:'Omar Shah · 2 items',status:'Processing',meta:'$165'}]} />;
}
