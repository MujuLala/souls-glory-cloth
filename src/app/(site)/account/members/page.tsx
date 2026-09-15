import MembersManager from "@/components/account/MembersManager";
import { getMembers } from "@/data/account";
import { getOrCreateCustomer, requireUser } from "@/lib/session";

export const metadata = { title: "People you order for" };

export default async function AccountMembersPage() {
  const user = await requireUser();
  const customerId = user.customerId ?? (await getOrCreateCustomer(user));

  const members = await getMembers(customerId);

  return <MembersManager members={members} />;
}
