import ManagementPage from "./ManagementPage";
import { Megaphone } from "lucide-react";

export default function Coupons() {
  return <ManagementPage title='Coupons' description='Create and manage discount coupon codes.' backHref='/marketing' addLabel='Create Coupon' icon={<Megaphone size={18} />} stats={[{label:"Coupons",value:18},{label:"Active",value:8},{label:"Used",value:142},{label:"Savings",value:'$2,840'}]} items={[{id:1,title:'WELCOME10',subtitle:'10% off first order',status:'Active',meta:'64 uses'},{id:2,title:'EID20',subtitle:'20% off selected products',status:'Active',meta:'48 uses'},{id:3,title:'VIP25',subtitle:'25% off VIP customers',status:'Draft',meta:'0 uses'}]} />;
}
