"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useUserLogin } from "../hooks/useLogin";
import { useEffect } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import Link from "next/link";

type FieldType = {
  username: string;
  password: string;
};

export const Login_form = () => {
  const [form] = Form.useForm();

  const { loginMutation, loginLoading, error } = useUserLogin();

  const handleLogin = () => {
    form.validateFields().then((values) => {
      loginMutation(values)
        .then(() => {
          form.resetFields();
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  useEffect(() => {
    if (error) {
      form.setFields([
        {
          name: "email",
          errors: error?.response?.data?.message
            ? [error?.response?.data?.message]
            : [],
        },
      ]);
    }
  }, [error, form]);

  return (
    <Form
      name="login_form"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleLogin}
      autoComplete="off"
      className="relative z-[999]"
    >
      <div className="formS1 sectionS1 max-w-[365px] !border-none !p-0">
        {/* <div className="flex items-center gap-4 my-8 w-full">
          <div className="flex-1 h-px bg-[#9D9DA1]"></div>

          <span className="text-[#9D9DA1] text-lg font-medium whitespace-nowrap">
            او استمر عن طريق الايميل
          </span>

          <div className="flex-1 h-px bg-[#9D9DA1]"></div>
        </div> */}

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
            <Form.Item<FieldType>
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: "ادخل كلمة السر من فضلك!",
                },
              ]}
            >
              <div className="inputS1">
                <Input.Password
                  placeholder="كلمة السر"
                  // prefix={<LockOutlined className="text-primary" />} // Add icon
                />
              </div>
            </Form.Item>
          </Col>

          <Link
            className="text-primary hover:text-secondary text-end font-bold block w-full"
            href="/user/change-password"
          >
            نسيت كلمة السر!{" "}
          </Link>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={loginLoading}
              loading={loginLoading}
              className={`w-full`}
            >
              تسجيل الدخول
            </Button>
          </Col>
        </Row>
        <p className="text-secondary mt-6 text-center">
          اذا وافقت تكمل معناها موافق علي{" "}
          <Link
            className="text-primary hover:text-secondary font-bold"
            href="/terms-and-conditions"
          >
            الشروط والاحكام
          </Link>
          .
        </p>
      </div>
    </Form>
  );
};
