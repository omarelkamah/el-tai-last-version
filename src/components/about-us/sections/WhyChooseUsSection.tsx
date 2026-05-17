"use client";
import { useEffect, useRef } from "react";
import { Col, Row } from "antd";
import { useLocale } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiCompass, FiUsers, FiAward } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface WhyChooseUsSectionProps {
  data: {
    about_why_choose_title_desc_en: string;
    about_why_choose_title_desc_ar: string;
    about_why_choose_description_desc_en: string;
    about_why_choose_description_desc_ar: string;
    about_why_choose_comprehensive_support_desc_en: string;
    about_why_choose_comprehensive_support_desc_ar: string;
    about_why_choose_robust_network_desc_en: string;
    about_why_choose_robust_network_desc_ar: string;
    about_why_choose_in_house_expertise_desc_en: string;
    about_why_choose_in_house_expertise_desc_ar: string;
  };
}

export const WhyChooseUsSection = () => {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const sectionRef = useRef<HTMLElement>(null);

  const whyChooseUsData = [
    {
      Icon: FiCompass,
      title: isEnglish ? "Guided Independence" : "الاستقلالية الموجهة",
      desc: isEnglish
        ? "At Al-Tai Club Store, we provide you with the freedom to choose products and customize your purchases, with clear guidance and information to ensure the best buying experience. We believe that correct guidance makes every purchase an enjoyable and reliable experience."
        : "في متجر نادي الطائي، نوفر لك حرية اختيار المنتجات وتخصيص مشترياتك، مع إرشادات ومعلومات واضحة لضمان أفضل تجربة شراء. نؤمن بأن التوجيه الصحيح يجعل كل عملية شراء تجربة ممتعة وموثوقة.",
    },
    {
      Icon: FiUsers,
      title: isEnglish ? "Strong Network" : "شبكة قوية",
      desc: isEnglish
        ? "Our store gives you access to the club's fan community through interactive programs, special offers, and exclusive memberships. Enjoy joining a network of fans and buyers, and share your passion for the team with those who appreciate the same interest."
        : "متجرنا يتيح لك الوصول إلى مجتمع جماهير النادي عبر البرامج التفاعلية، العروض الخاصة، والعضويات الحصرية. استمتع بالانضمام إلى شبكة من المشجعين والمشترين، وشارك شغفك بالفريق مع من يقدرون نفس الاهتمام.",
    },
    {
      Icon: FiAward,
      title: isEnglish ? "In-house Expertise" : "خبرة داخلية",
      desc: isEnglish
        ? "Our experience in managing Al-Tai Club Store ensures providing original products, high quality, and fast and effective customer support. We take care of every detail from selecting products until they reach you safely and quickly, to give you a distinguished and comfortable shopping experience."
        : "خبرتنا في إدارة متجر نادي الطائي تضمن توفير منتجات أصلية، جودة عالية، ودعم سريع وفعال للعملاء. نحن نعتني بكل التفاصيل بدءًا من اختيار المنتجات وحتى وصولها إليك بأمان وسرعة، لنمنحك تجربة تسوق متميزة ومريحة.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-choose-heading", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".why-choose-card", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        clearProps: "all", // reset after animation
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="why-choose-us-section">
      <div className="container">
        <div className="content why-choose-heading">
          <h4 className="title">
            {isEnglish
              ? "Why Choose Al-Tai Club Store?"
              : "لماذا تختار متجر نادي الطائي؟"}
          </h4>
          <p>
            {isEnglish
              ? "Al-Tai Club Store is not just an ordinary store, it is your official destination for all original club products. Here you find quality, authenticity, and variety, with a seamless and secure shopping experience. Your choice of the store means joining an ambitious fan community who are keen to acquire their favorite products with trust and ease."
              : "متجر نادي الطائي ليس مجرد متجر عادي، بل هو وجهتك الرسمية لكل منتجات النادي الأصلية. هنا تجد الجودة، الأصالة، والتنوع، مع تجربة تسوق سلسة وآمنة. اختيارك للمتجر يعني الانضمام إلى مجتمع المشجعين الطموحين الذين يحرصون على اقتناء منتجاتهم المفضلة بكل ثقة وسهولة."}
          </p>
        </div>
        <div className="cards">
          <Row gutter={[24, 24]}>
            {whyChooseUsData.map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <div className="card why-choose-card">
                  <item.Icon className="text-black mb-6" size={64} />
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};
