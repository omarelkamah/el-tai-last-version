import { FAQComponent } from "@/components/faq/FAQComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "الأسئلة الشائعة | متجر نادي الطائي",
};

const FAQPage = () => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <FAQComponent />
        </Suspense>
    );
};

export default FAQPage;
