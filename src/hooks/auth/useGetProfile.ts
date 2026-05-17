import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "../useQueryWithRefresh";
import { getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const getUserProfileAPI = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const updateUserProfileAPI = async (data: any) => {
  const response = await axiosInstance.patch("/users/me", data);
  return response.data;
};

export const useGetUserProfile = () => {
  const userToken = getCookie("UserToken");
  const refreshToken = getCookie("UserRefreshToken");

  // For HttpOnly cookies, we must attempt a fetch to see if the browser has the session.
  const isPossiblyAuthenticated = true;

  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQueryWithRefresh({
    queryKey: ["userProfile"],
    queryFn: getUserProfileAPI,
    enabled: isPossiblyAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
    tokenType: "user",
  });

  return {
    user: userData?.data,
    isLoading,
    error,
    refetch,
    // Success means we ARE authenticated, even if JS can't see the cookie.
    isAuthenticated: !!userData?.data,
  };
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateUserProfileAPI(data),
    onSuccess: () => {
      toast.success("تم حفظ التغييرات بنجاح");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        "حدث خطأ أثناء حفظ التغييرات، حاول مرة أخرى"
      );
    },
  });
};

export const getAdminProfileAPI = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const useGetAdminProfile = () => {
  const adminToken = getCookie("AdminToken");
  const adminRefreshToken = getCookie("AdminRefreshToken");
  const isPossiblyAuthenticated = true;

  const {
    data: adminData,
    isLoading,
    error,
    refetch,
  } = useQueryWithRefresh({
    queryKey: ["adminProfile"],
    queryFn: getAdminProfileAPI,
    enabled: isPossiblyAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
    tokenType: "admin",
  });

  return {
    admin: adminData?.data,
    isLoading,
    error,
    refetch,
    isAuthenticated: !!adminData?.data,
  };
};
