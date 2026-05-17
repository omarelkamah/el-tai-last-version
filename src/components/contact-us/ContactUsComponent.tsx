"use client";

import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Card, Checkbox } from "antd";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

import { useContactUs } from "@/hooks/contact/useContactUs";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export function ContactUsComponent() {
  const [form] = Form.useForm();
  const { contactUsMutation, contactUsLoading } = useContactUs();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        phone: `966${values.phone}`,
      };
      await contactUsMutation(payload);
      form.resetFields();
    } catch (error) {
      // Error handled in hook
    }
  };

  const contactInfo = [
    // {
    //   icon: FiPhone,
    //   title: "اتصل بنا",
    //   subtitle: "نحن متاحون من السبت إلى الخميس",
    //   contact: "920000000",
    // },
    {
      icon: FiMail,
      title: "راسلنا عبر البريد",
      subtitle: "سنرد عليك خلال 24 ساعة",
      contact: "support@altaistore.sa",
    },
    {
      icon: FiMapPin,
      title: "عنواننا",
      subtitle: "نادي الطائي الرياضي - حائل - المملكة العربية السعودية",
      contact: "",
    },
    {
      icon: FiClock,
      title: "أوقات العمل",
      subtitle: "السبت - الخميس",
      contact: "9:00 - 10:00 م",
    },
  ];

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: `${user.firstName} ${user.lastName}` || "",
        email: user.email || "",
        phone: user.mobile ? user.mobile.replace("+966", "") : "",
      });
    }
  }, [user, form]);

  return (
    <main className="py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-4xl font-bold mb-3">تواصل معنا</h1>
          <p className="text-gray-500 text-lg">
            نرحب بأي استفسارات أو اقتراحات منك. تواصل معنا عبر النموذج أو
            معلومات الاتصال أدناه
          </p>
        </div>

        <Row gutter={[32, 32]}>
          {/* Contact Information Cards */}
          <Col xs={24} md={8}>
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="cardS1">
                    <div className="flex flex-col gap-4 items-start">
                      <div
                        className={`w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent size={28} />
                      </div>
                      <div className="flex-1 text-right">
                        <h3 className="font-bold text-primary text-lg mb-1">
                          {info.title}
                        </h3>
                        <p className="text-primary mb-1">{info.subtitle}</p>
                        {info.contact && (
                          <p className="text-secondary">{info.contact}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>

          {/* Contact Form */}
          <Col xs={24} md={16}>
            <div className="cardS1 !h-fit">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="formS1 !border-none"
              >
                {/* Name and Email */}
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={12}>
                    <div className="inputS1">
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء إدخال الاسم",
                          },
                        ]}
                      >
                        <Input placeholder="الاسم بالكامل" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="inputS1">
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "الرجاء إدخال بريد صحيح",
                          },
                        ]}
                      >
                        <Input placeholder="البريد الالكتروني" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24}>
                    <div className="inputS1 ">
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "ادخل رقم الجوال من فضلك",
                          },
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
                  {/* <Col xs={24} sm={12}>
                    <div className="inputS1">
                      <Form.Item
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: "الرجاء إدخال العنوان",
                          },
                        ]}
                      >
                        <Input placeholder="العنوان" className="!rounded-lg" />
                      </Form.Item>
                    </div>
                  </Col> */}
                  <Col xs={24}>
                    <Form.Item
                      name="message"
                      rules={[
                        {
                          required: true,
                          message: "الرجاء إدخال الرسالة",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="اكتب رسالتك هنا"
                        rows={5}
                        className="!rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <div className="bg-white border border-primary rounded-lg p-4">
                      <p className="text-gray-700 text-sm">
                        بإرسال هذا النموذج، أنت توافق على{" "}
                        <Link
                          href={"/privacy-policy"}
                          className="text-primary hover:text-secondary"
                        >
                          {" "}
                          سياسة الخصوصية{" "}
                        </Link>
                        الخاصة بنا
                      </p>
                    </div>
                  </Col>

                  <Col xs={24}>
                    <Button type="primary" htmlType="submit" block size="large">
                      إرسال الرسالة
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>

        {/* Map Section */}
        <div className="mt-12 !rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.681267411564!2d41.66680780000001!3d27.5739485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15764100174ecea9%3A0x61cd61b269bcb5f6!2z2YbYp9iv2Yog2KfZhNi32KfYptmK!5e1!3m2!1sen!2seg!4v1773413167880!5m2!1sen!2seg"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
