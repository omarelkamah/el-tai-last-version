import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface MyMembershipData {
  membership: {
    _id: string;
    membershipNumber: string;

    startDate: string;
    expireDate: string;
    endDate: string;
    status: string;
    totalSpend: number;
    daysRemaining: number;
    isExpired: boolean;
    tierId: {
      name: string;
      displayNameAr: string;
      benefits: Array<{
        key: string;
        code: string;
        name: string;
        description: string;
        type: string;
        value: number;
        isOneTime: boolean;
        isUsed: boolean;
        canUse: boolean;
        sortOrder: number;
        icon: string | null;
      }>;
    };
  };
}

export const useGetMyMembership = () => {
  return useQuery({
    queryKey: ["memberships", "my"],
    queryFn: async () => {
      const response = await axiosInstance.get("/memberships/my");
      return response.data?.data as MyMembershipData;
    },
  });
};
