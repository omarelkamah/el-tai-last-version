"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserProfile } from "./useGetProfile";
import { setIsLogged, setUserInfo } from "@/store/slices/auth/authSlice";

export const useBootstrapUser = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useGetUserProfile();

  useEffect(() => {
    if (isLoading) return;

    dispatch(setIsLogged(isAuthenticated));

    if (isAuthenticated && user) {
      dispatch(setUserInfo(user));
    } else {
      dispatch(setUserInfo(null));
    }
  }, [dispatch, isAuthenticated, isLoading, user]);
};

