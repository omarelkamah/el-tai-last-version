import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

/** Supports { data: order }, { data: { order } }, or a flat order document. */
export function normalizeAdminOrderDetailsPayload(
  body: unknown
): Record<string, unknown> | null {
  if (body == null || typeof body !== "object") return null;
  const root = body as Record<string, unknown>;
  const data = root.data;

  if (data !== undefined && data !== null && typeof data === "object") {
    const layer = data as Record<string, unknown>;
    const order = layer.order;
    if (order !== undefined && order !== null && typeof order === "object") {
      return order as Record<string, unknown>;
    }
    return layer;
  }

  return root;
}

export const useGetAdminOrderDetails = (orderId: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin", "orders", orderId],
        queryFn: async () => {
            if (!orderId) return null;
            const response = await axiosInstance.get(`/admin/orders/${orderId}`);
            return normalizeAdminOrderDetailsPayload(response.data);
        },
        enabled: !!orderId,
    });

    return { data, isLoading, error };
};
