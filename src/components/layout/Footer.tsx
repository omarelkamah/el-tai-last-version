"use client";

import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { BiLogoLinkedin } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { FiPhone, FiMapPin, FiMail, FiFacebook } from "react-icons/fi";
import { PiYoutubeLogo } from "react-icons/pi";

export const Footer = () => {
  const t = useTranslations("footer");
  const getLink = useLocalizedLink();

  const socialLinks = [
    // {
    //   href: "",
    //   icon: <FiFacebook />,
    // },
    {
      href: "https://x.com/tai1381ES ",
      icon: <FaXTwitter />,
    },
    // {
    //   href: "",
    //   icon: <FaInstagram />,
    // },
    // {
    //   href: "",
    //   icon: <PiYoutubeLogo />,
    // },
  ];

  return (
    <footer className="footer relative flex overflow-hidden" id="contactus">
      <div className="container">
        <Row gutter={[70, 40]} className="">
          <Col xs={24} md={12} lg={7}>
            <div className="flex flex-col gap-4 sm:justify-between">
              <Link href={getLink("/")}>
                <Image
                  src={"/images/logo.png"}
                  width={187}
                  height={179}
                  alt="logo"
                />
              </Link>
              <p className="!text-start !text-[#F1F1F1]">
                المتجر الرسمي لنادي الطائي، نوفر منتجات أصلية بجودة عالية لجميع
                مشجعي النادي حول المملكة.
              </p>
            </div>
          </Col>

          <Col sm={24} md={12} lg={4}>
            <h5 className="mb-8 text-primary">الأقسام</h5>
            <div className="links flex flex-col  gap-3 text-primary">
              <Link href={"/"}>الرئيسية</Link>
              <Link href={"/membership"}>بطاقات العضوية</Link>
              <Link href={"/products"}>التسوق</Link>
              <Link href={"/loyality-program"}>برنامج الولاء</Link>
              <Link href={"/affiliate-program"}>برنامج الافلييت</Link>
              <Link href={"/about-us"}>عن النادي</Link>

              {/* <Link href={"/products"}>المتجر</Link>
              <Link href={"/about-us"}>عن النادي</Link> */}
            </div>
          </Col>

          <Col sm={24} md={12} lg={4}>
            <h5 className="mb-8 text-primary">سياسة الخصوصية</h5>
            <div className="links flex flex-col  gap-3 text-primary">
              <Link href={"/terms-and-conditions"}>{t("terms")}</Link>
              <Link href={"/privacy-policy"}>{t("privacy")}</Link>
              <Link href={"/return-policy"}>سياسة الاستبدال والاسترجاع</Link>

              {/* <Link href={"/products"}>المتجر</Link>
              <Link href={"/about-us"}>عن النادي</Link> */}
            </div>
          </Col>
          <Col sm={24} md={12} lg={4}>
            <h5 className="mb-8 text-primary ">خدمة العملاء</h5>
            <div className="links flex flex-col  gap-3 text-primary">
              <Link href={"/faq"}>الاسئلة الشائعة</Link>
              <Link href={"/faq"}>الشحن والتوصيل </Link>
              <Link href={"/contact-us"}>تواصل معنا</Link>

              {/* <Link href={getLink("/terms-and-conditions")}>تتبع الطلب </Link> */}
              {/* <Link href={"/loyality-program"}>برنامج الولاء</Link>
              <Link href={"/affiliate-program"}>برنامج الافيلييت </Link>

              <Link href={"/membership"}>العضويات</Link> */}
            </div>
          </Col>
          <Col sm={24} md={12} lg={5}>
            <h5 className="mb-8 text-primary "> تواصل معنا</h5>

            <div className="flex flex-col  gap-6 sm:items-start">
              {/* <div className="flex gap-3 ">
                <FiPhone className="text-primary text-lg mt-2" />

                <div className="flex flex-col gap-[2px]">
                  <span className="text-white/70 text-lg"> خدمة العملاء </span>
                  <a className="text-white text-md">920001234</a>
                </div>
              </div> */}
              <div className="flex gap-3 ">
                <FiMail className="text-primary text-lg mt-2" />

                <div className="flex flex-col gap-[2px]">
                  <span className="text-white/70 text-lg">
                    {" "}
                    البريد الإلكتروني{" "}
                  </span>
                  <a
                    href="mailto:support@altaistore.sa"
                    className="text-white text-md"
                  >
                    support@altaistore.sa
                  </a>
                </div>
              </div>
              <div className="flex gap-3 ">
                <FiMapPin className="text-primary text-lg mt-2" />

                <div className="flex flex-col gap-[2px]">
                  <span className="text-white/70 text-lg"> العنوان </span>
                  <a className="text-white text-md">
                    حائل، المملكة العربية السعودية
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="flex items-center justify-between gap-6 mt-4 flex-col md:flex-row">
          {/* <p>© Sanad Studio {new Date().getFullYear()} </p> */}
          <ul className="social">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
