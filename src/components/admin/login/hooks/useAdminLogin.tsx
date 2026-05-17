// hooks/auth/useUserLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { AUTH_LOGIN_SUCCESS_EVENT } from "@/hooks/auth/useAuth";

export const useAdminLogin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const locale = pathname.split("/")[1] || "ar";

  const {
    mutateAsync: loginMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      axiosInstance.post("/auth/login", values),
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data?.data || {};

      if (!accessToken) {
        toast.error("لم يتم استلام رمز الوصول");
        return;
      }

      // Store access token (15 minutes)
      setCookie("AdminToken", accessToken, {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60,
      });

      // Store refresh token (30 days)
      if (refreshToken) {
        setCookie("AdminRefreshToken", refreshToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60,
        });
      }

      // IMPORTANT: Update axios default headers immediately
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // Invalidate cart queries to fetch fresh data
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Notify useAuth to re-check so layout shows logged-in state immediately
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(AUTH_LOGIN_SUCCESS_EVENT));
      }

      toast.success("تم تسجيل الدخول بنجاح");

      // Get redirect URL from query params or default to home
      const redirectUrl =
        searchParams.get("redirect") || `/${locale}/admin/dashboard`;
      router.push(redirectUrl);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ. حاول مرة أخرى.");
    },
  });

  return {
    loginMutation,
    loginLoading,
    error,
  };
};
