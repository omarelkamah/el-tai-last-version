import { AboutUsComponent } from "@/components/about-us/AboutUsComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutUsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AboutUsComponent />
    </Suspense>
  );
};

export default AboutUsPage;
