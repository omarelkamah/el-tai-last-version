"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useChangePassword } from "../hooks/useChangePassword";
import { useState } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import { ConfirmationCodeModal } from "../../../tools/modal/confirmation-code-modal/ConfirmationCode_modal";

export const ChangePassword_form = () => {
  const [form] = Form.useForm();
  const { forgotPasswordMutation, forgotPasswordLoading } = useChangePassword();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    form.validateFields().then((values) => {
      const trimmedEmail =
        typeof values.email === "string" ? values.email.trim() : values.email;
      forgotPasswordMutation({
        email: trimmedEmail,
      })
        .then(() => {
          setEmail(trimmedEmail);
          setIsModalOpen(true);
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  return (
    <Form
      name="changePasswordFrom"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleForgotPassword}
      autoComplete="off"
    >
      <div className="formS1 sectionS1 max-w-[365px] !border-none !p-0">
        <ConfirmationCodeModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={email}
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="email"
                rules={[
                  {
                    required: true,
                    message: "ادخل البريد الالكتروني  من فضلك!",
                  },
                  {
                    type: "email",
                    message: "من فضلك أدخل بريد إلكتروني صحيح",
                  },
                ]}
              >
                <Input
                  placeholder="البريد الالكتروني "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={forgotPasswordLoading}
              loading={forgotPasswordLoading}
              className={`w-full`}
            >
              استمرار
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
