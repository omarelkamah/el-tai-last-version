"use client";
import { Signup_form } from "./forms/Signup_form";
import { Suspense } from "react";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import style from "./styles/login.module.scss";
import Link from "next/link";

export const RegisterComponent = () => {
  const getLink = useLocalizedLink();

  return (
    <main
      className={`${style.login} flex min-h-screen w-full items-center justify-center gap-20 px-10 py-3 md:flex-col`}
    >
      <div className="login-card">
        <h1 className="text-secondary font-bold mb-6 text-xl text-center">
          اكمل بياناتك{" "}
        </h1>
        <p className="text-primary mb-10 text-center">
          لإتمام إنشاء حسابك والاستفادة من جميع المزايا{" "}
        </p>

        <Suspense>
          <Signup_form />
        </Suspense>
      </div>
    </main>
  );
};
