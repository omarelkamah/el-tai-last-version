"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { ChangePassword_form } from "./forms/ChangePassword_form";
import { AddNewPassword_form } from "./forms/AddNewPassword_form";

import style from "./styles/changePassword.module.scss";
import { Congratulations } from "./sections/Congratulations_section";

export const ChangePasswordComponent = () => {
  const searchParams = useSearchParams();

  const emailParam = searchParams.get("email");
  const confirmationCode = searchParams.get("confirmation_code");

  const [passwordChanged, setPasswordChanged] = useState(false);

  const shouldRenderNewPasswordForm =
    Boolean(emailParam?.trim()) && Boolean(confirmationCode?.trim());

  return (
    <main
      className={`${style.login} flex min-h-screen w-full items-center justify-center gap-20 px-10 py-3 md:flex-col`}
    >
      {passwordChanged ? (
        <Congratulations />
      ) : (
        <div className="login-card">
          <h1 className="text-secondary font-bold mb-6 text-xl text-center">
            اكمل بياناتك
          </h1>

          <p className="text-primary mb-10 text-center">
            {shouldRenderNewPasswordForm
              ? "أدخل كلمة المرور الجديدة"
              : "أدخل الايميل لاسترجاع كلمة السر"}
          </p>

          <Suspense>
            {shouldRenderNewPasswordForm ? (
              <AddNewPassword_form
                email={emailParam!.trim()}
                confirmationCode={confirmationCode!}
                onSuccess={() => setPasswordChanged(true)}
              />
            ) : (
              <ChangePassword_form />
            )}
          </Suspense>
        </div>
      )}
    </main>
  );
};
