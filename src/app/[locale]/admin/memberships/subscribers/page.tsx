import { AdminMembershipSubscribersComponent } from "@/components/admin/memberships/subscribers/AdminMembershipSubscribersComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة المشتركين",
};

const AdminMembershipSubscribersPage = () => {
  return <AdminMembershipSubscribersComponent />;
};

export default AdminMembershipSubscribersPage;
