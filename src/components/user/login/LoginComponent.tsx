"use client";
import { Login_form } from "./forms/Login_form";
import { Suspense } from "react";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import style from "./styles/login.module.scss";
import { useAuthContext } from "@/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";

export const LoginComponent = () => {
  const getLink = useLocalizedLink();
  const { signInWithGoogle } = useAuthContext();

  return (
    <main
      className={`${style.login} flex min-h-screen w-full items-center justify-center gap-20 px-10 py-3 md:flex-col`}
    >
      <div className="login-card relative z-20">
        <h1 className="text-secondary font-bold mb-6 text-xl text-center">
          الدخول إلى حسابك
        </h1>
        <p className="text-primary mb-10 text-center">
          سجّل الدخول أو{" "}
          <Link
            href={"/user/register"}
            className="text-secondary text-lg hover:text-black font-bold"
          >
            أنشئ حسابك
          </Link>
        </p>
        {/* <div className="mb-6 flex justify-center w-full">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                signInWithGoogle(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
            theme="outline"
            size="large"
            shape="rectangular"
            width="365"
          />
        </div> */}
        <Link
          href="/"
          className="relative z-[999] mb-6 w-full rounded-lg border-[1px] border-primary hover:text-secondary text-primary py-4 flex items-center gap-3 justify-center font-bold"
        >
          الاستمرار ك زائر{" "}
        </Link>
        <Suspense>
          <Login_form />
        </Suspense>
      </div>
    </main>
  );
};
