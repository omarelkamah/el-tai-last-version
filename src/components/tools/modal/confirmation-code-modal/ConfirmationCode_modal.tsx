"use client";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import ReactCodeInput from "react-code-input";
import { useRouter } from "next/navigation";
import { useChangePassword } from "@/components/user/change-password/hooks/useChangePassword";

interface ConfirmationCodeModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

export const ConfirmationCodeModal = ({
  open,
  onClose,
  email,
}: ConfirmationCodeModalProps) => {
  const [code, setCode] = useState("");
  const { verifyOtpMutation, verifyOtpLoading } = useChangePassword();
  const router = useRouter();

  const handleChange = (value: string) => {
    setCode(value);
  };

  const handleSubmit = () => {
    if (code.length === 6) {
      verifyOtpMutation({ email, otp: code })
        .then(() => {
          onClose();
          router.push(
            `/user/change-password?email=${encodeURIComponent(
              email
            )}&confirmation_code=${encodeURIComponent(code)}`
          );
        })
        .catch(() => {
          // Error is handled in the hook toast
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        title=""
        open={open}
        onCancel={handleCancel}
        width="620px"
        wrapClassName="confirmation-code-modal"
        centered
        footer={null}
      >
        <div className="flex flex-col items-center justify-center">
          <h4 className="mt-10 mb-4 font-bold text-primary text-2xl">
            رمز التحقق
          </h4>
          <p className="mb-8 text-primary">
            أدخل رمز التحقق المكوّن من 6 أرقام المرسل إلى بريدك الإلكتروني.
          </p>

          <div className="" dir="ltr">
            <ReactCodeInput
              type="text"
              fields={6}
              onChange={handleChange}
              name={"otp"}
              inputMode={"tel"}
            />
          </div>
          <Button
            onClick={handleSubmit}
            type="primary"
            disabled={verifyOtpLoading || code.length < 6}
            loading={verifyOtpLoading}
            className={`w-full mt-8 !text-xl`}
            htmlType="submit"
          >
            التالي
          </Button>
        </div>
      </Modal>
    </>
  );
};
