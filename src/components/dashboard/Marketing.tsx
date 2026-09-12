import ManagementPage from "./ManagementPage";
import { Megaphone } from "lucide-react";

export default function Marketing() {
  return <ManagementPage title='Marketing' description='Manage campaigns and promotional activities.' backHref='/dashboard' addLabel='Create Campaign' icon={<Megaphone size={18} />} stats={[{label:"Campaigns",value:12},{label:"Active",value:5},{label:"Reach",value:'24.8K'},{label:"Conversions",value:386}]} items={[{id:1,title:'Eid Collection Launch',subtitle:'Social + Email campaign',status:'Active',meta:'8.4K reach'},{id:2,title:'Premium Suit Promotion',subtitle:'Product promotion',status:'Active',meta:'5.2K reach'},{id:3,title:'Winter Sale',subtitle:'Seasonal campaign',status:'Draft',meta:'Not started'}]} />;
}
