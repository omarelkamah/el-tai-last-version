import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * Hook to apply loyalty points to the cart.
 */
export const useApplyLoyaltyPoints = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: applyPointsMutation,
        isPending: applyPointsLoading,
    } = useMutation({
        mutationFn: (values: { points: number }) =>
            axiosInstance.post(`/loyalty/points/apply`, values),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["checkoutDetails"],
            });
            toast.success("تم تطبيق النقاط بنجاح");
        },
        onError: (err: any) => {
            toast.error(
                err.response?.data?.message || "حدث خطأ أثناء تطبيق النقاط"
            );
        },
    });

    return {
        applyPointsMutation,
        applyPointsLoading,
    };
};

/**
 * Hook to remove loyalty points from the cart.
 */
export const useRemoveLoyaltyPoints = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: removePointsMutation,
        isPending: removePointsLoading,
    } = useMutation({
        mutationFn: () => axiosInstance.delete(`/loyalty/points/applied`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["checkoutDetails"],
            });
            toast.success("تم إزالة النقاط بنجاح");
        },
        onError: (err: any) => {
            toast.error(
                err.response?.data?.message || "حدث خطأ أثناء إزالة النقاط"
            );
        },
    });

    return {
        removePointsMutation,
        removePointsLoading,
    };
};
