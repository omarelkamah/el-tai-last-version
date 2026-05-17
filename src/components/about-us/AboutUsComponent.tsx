import style from "./styles/aboutUs.module.scss";
import { AboutStarterSection } from "./sections/AboutStarterSection";
import Image from "next/image";
import { OurMissionSection } from "./sections/OurMissionSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection";
import { AboutRestlessInnovatorsSection } from "./sections/AboutRestlessInnovatorsSection";
import { getPageData } from "@/apiCalls/getPageData";
import { BecomePartnerSection } from "./sections/BecomePartnerSection";
import AboutUsSection from "./sections/AboutUsSection";

export const AboutUsComponent: React.FC = async () => {
  // const pageData = await getPageData("about");
  // const JSONData = JSON.parse(pageData?.page?.data || "{}");
  // const imageUrls = pageData?.page?.image_urls || {};

  return (
    <main className={style.aboutUs}>
      <AboutStarterSection />
      {/* <div className="relative h-[400px] w-full">
        <Image
          src={`${imageUrls?.about_banner_image}?v=${Date.now()}`}
          alt="About Us Image"
          fill
          objectFit="cover"
        />
      </div> */}
      <AboutUsSection />
      <OurMissionSection />
      <AboutRestlessInnovatorsSection />
      <WhyChooseUsSection />
    </main>
  );
};
