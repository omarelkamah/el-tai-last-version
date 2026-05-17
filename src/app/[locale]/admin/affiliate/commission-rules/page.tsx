import { CommissionRulesComponent } from "@/components/admin/affiliate/commission-rules/CommissionRulesComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "قواعد العمولة",
};

const AdminAffiliateCommissionRulesPage = () => {
    return <CommissionRulesComponent />;
};

export default AdminAffiliateCommissionRulesPage;
