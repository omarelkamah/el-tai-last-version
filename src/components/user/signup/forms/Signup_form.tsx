"use client";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useSignup } from "../hooks/useSignup";
import { useEffect } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import Link from "next/link";
import Image from "next/image";
import { z, ZodError } from "zod";

type FieldType = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const Signup_form = () => {
  const [form] = Form.useForm();

  const { signupMutation, loginLoading, error } = useSignup();

  const passwordSchema = z
    .string()
    .min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل");

  const zodPasswordValidator = async (_: any, value: string) => {
    try {
      passwordSchema.parse(value);
      return Promise.resolve();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return Promise.reject(new Error(error.issues[0]?.message));
      }

      return Promise.reject(new Error("كلمة السر غير صالحة"));
    }
  };

  const handleSignup = () => {
    form.validateFields().then((values) => {
      signupMutation({
        ...values,
        mobile: `966${values.mobile}`,
      })
        .then(() => {
          form.resetFields();
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  return (
    <Form
      name="signup_form"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleSignup}
      autoComplete="off"
    >
      <div className="formS1 sectionS1 max-w-[365px] !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "من فضلك ادخل الاسم الاول !",
                  },
                ]}
              >
                <Input placeholder="الاسم الاول " />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "من فضلك ادخل الاسم الاخير !",
                  },
                ]}
              >
                <Input placeholder="الاسم الاخير " />
              </Form.Item>
            </div>
          </Col>
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
                <Input placeholder="البريد الالكتروني " />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1 ">
              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: "ادخل رقم الجوال من فضلك" },
                  {
                    pattern: /^5\d{8}$/,
                    message:
                      "رقم الجوال السعودي يجب أن يبدأ بـ 5 ويتكون من 9 أرقام",
                  },
                ]}
              >
                <Input
                  placeholder="رقم الجوال"
                  dir="rtl"
                  type="number"
                  addonAfter={
                    <div className="flex items-center justify-center gap-1 px-2">
                      <span className="font-medium" dir="ltr">
                        +966
                      </span>

                      <Image
                        width={40}
                        height={30}
                        src="/flags/sa.svg"
                        alt="Saudi Arabia"
                        className="w-5 h-5"
                      />
                    </div>
                  }
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item<FieldType>
                label=""
                name="password"
                rules={[
                  {
                    required: true,
                    message: "ادخل كلمة السر من فضلك!",
                  },
                  { validator: zodPasswordValidator },
                ]}
              >
                <Input.Password placeholder="كلمة السر" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item<FieldType>
                label=""
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "ادخل كلمة السر من فضلك!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("كلمتا السر غير متطابقتين")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="تاكيد كلمة السر" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="acceptPolicy"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "يجب الموافقة على سياسة الخصوصية والشروط والأحكام"
                          )
                        ),
                },
              ]}
            >
              <Checkbox>
                <span className="text-sm">
                  أقر على{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:text-primary font-medium underline"
                  >
                    سياسة الخصوصية و
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="text-primary hover:text-primary font-medium underline"
                  >
                    الشروط والأحكام
                  </Link>
                </span>
              </Checkbox>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={loginLoading}
              loading={loginLoading}
              className={`w-full`}
            >
              تسجيل
            </Button>
          </Col>
        </Row>
        {/* <p className="text-primary mt-6 text-center">
          لديك حساب بالفعل؟{" "}
          <Link className="text-primary font-bold" href="/user/login">
            سجل دخول
          </Link>
          .
        </p> */}
      </div>
    </Form>
  );
};
