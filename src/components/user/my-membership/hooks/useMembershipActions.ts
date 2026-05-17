import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useMembershipActions = () => {
    const queryClient = useQueryClient();

    const upgradeMembership = useMutation({
        mutationFn: async (payload: { tierId: string }) => {
            const response = await axiosInstance.post("/memberships/upgrade", payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memberships", "my"] });
        },
    });

    const renewMembership = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post("/memberships/renew");
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memberships", "my"] });
        },
    });

    const cancelMembership = useMutation({
        mutationFn: async (payload: { reason?: string }) => {
            const response = await axiosInstance.post("/memberships/cancel", payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memberships", "my"] });
        },
    });

    const refundMembership = useMutation({
        mutationFn: async (payload: { reason?: string }) => {
            const response = await axiosInstance.post("/memberships/refund", payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memberships", "my"] });
        },
    });

    return {
        upgradeMembership,
        renewMembership,
        cancelMembership,
        refundMembership,
    };
};
