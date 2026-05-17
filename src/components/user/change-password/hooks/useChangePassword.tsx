import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const useChangePassword = () => {
  // 1. Request Password Reset (Request OTP)
  const {
    mutateAsync: forgotPasswordMutation,
    isPending: forgotPasswordLoading,
  } = useMutation({
    mutationFn: (values: { email: string }) =>
      axiosInstance.post("/auth/forgot-password", values),
    onSuccess: () => {
      toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى"
      );
    },
  });

  // 2. Verify OTP
  const { mutateAsync: verifyOtpMutation, isPending: verifyOtpLoading } =
    useMutation({
      mutationFn: (values: { email: string; otp: string }) =>
        axiosInstance.post("/auth/verify-otp", values),
      onSuccess: () => {
        toast.success("تم التحقق من الرمز بنجاح");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "رمز التحقق غير صحيح");
      },
    });

  // 3. Reset Password
  const {
    mutateAsync: resetPasswordMutation,
    isPending: resetPasswordLoading,
  } = useMutation({
    mutationFn: (values: {
      email: string;
      otp: string;
      newPassword: string;
    }) => axiosInstance.post("/auth/reset-password", values),
    onSuccess: () => {
      toast.success("تم تغيير كلمة المرور بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "فشل تغيير كلمة المرور");
    },
  });

  return {
    forgotPasswordMutation,
    forgotPasswordLoading,
    verifyOtpMutation,
    verifyOtpLoading,
    resetPasswordMutation,
    resetPasswordLoading,
  };
};
