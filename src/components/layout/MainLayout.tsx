"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePathname, useSearchParams } from "next/navigation";
import { AllRightRecieved } from "./AllRightRecieved";
import { NewsLetter } from "./newsLetter/NewsLetter";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { useEffect } from "react";
import { captureAffiliateRefFromUrlParam } from "@/lib/affiliateRef";
import { useBootstrapUser } from "@/hooks/auth/useBootstrapUser";
// import { useGetUserData } from "@/hooks/useGetUserData";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref");
  // useGetUserData();
  const locales = ["en", "ar"];
  const pathnameWithoutLocale = pathname.replace(
    new RegExp(`^/(${locales.join("|")})`),
    ""
  );
  const loginPaths = [
    "/admin",
    "/user/login",
    "/user/register",
    "/user/change-password",
  ];

  const { isAuthenticated } = useAuth();

  useTokenRefresh(isAuthenticated);
  useBootstrapUser();

  useEffect(() => {
    captureAffiliateRefFromUrlParam(refParam);
  }, [refParam]);

  const isAuthLayout = loginPaths.some((path) =>
    pathnameWithoutLocale.startsWith(path)
  );

  return (
    <>
      {isAuthLayout ? (
        children
      ) : (
        <>
          <Header />
          <div className={`${pathname.includes(`/admin`) ? "" : "pt-[82px]"}`}>
            {children}
          </div>

          <NewsLetter />
          <Footer />
          <AllRightRecieved />
        </>
      )}
    </>
  );
}
