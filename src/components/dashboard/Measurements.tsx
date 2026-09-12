import ManagementPage from "./ManagementPage";
import { Palette } from "lucide-react";

export default function Measurements() {
  return <ManagementPage title='Measurements' description='Manage measurement fields used for custom stitching.' backHref='/custom-studio' addLabel='Add Measurement' icon={<Palette size={18} />} stats={[{label:"Fields",value:24},{label:"Required",value:18},{label:"Optional",value:6}]} items={[{id:1,title:'Chest',subtitle:'Body measurement · inches',status:'',meta:'Required'},{id:2,title:'Waist',subtitle:'Body measurement · inches',status:'',meta:'Required'},{id:3,title:'Sleeve Length',subtitle:'Garment measurement · inches',status:'',meta:'Required'}]} />;
}
