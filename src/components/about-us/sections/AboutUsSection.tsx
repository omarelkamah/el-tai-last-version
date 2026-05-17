"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Col, Row } from "antd";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useLocale();
  const t = useTranslations();
  const isEnglish = locale === "en";
  
  return (
    <section
      ref={sectionRef}
      className="container">
      <Row gutter={[70, 70]}>
        <Col
          span={24}
          lg={6}>
          <h5 className="text-[20px] font-bold our-mission-title !text-black">
            {isEnglish ? "Who Are we" : "من نحن"}
          </h5>
        </Col>
        <Col
          span={24}
          lg={18}>
          <div className="content our-mission-content flex">
            <div className="flex-1">
              <p className="text-[#9d9da1] text-lg">
                {t("about-us.description")}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default AboutUsSection;
