import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export const useSignup = () => {
  const router = useRouter();

  const {
    mutateAsync: signupMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: (values) => axiosInstance.post("/auth/register", values),
    onSuccess: ({ data }) => {
      router.push("/user/login");

      toast.success(data?.data?.message);
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });

  return {
    signupMutation,
    loginLoading,
    error,
  };
};
