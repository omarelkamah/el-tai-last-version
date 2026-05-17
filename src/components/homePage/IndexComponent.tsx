// components/home/IndexComponent.tsx
import { HeroSection } from "./sections/HeroSection";
import style from "./styles/homePage.module.scss";
import TestimonialSlider from "./sections/testimonialSliderSection";
import AllMainProducts from "./sections/AllMainProducts";
import { Suspense } from "react";
import Loader from "@/app/[locale]/admin/loader";
import { getLimitedProductsData } from "@/apiCalls/products/getAllProductsData";
import { getAllCategoriesData } from "@/apiCalls/categories/getAllCategoriesData";
import { getBannerOffersData } from "@/apiCalls/home/getBannerOffersData";

export const IndexComponent: React.FC = async () => {
  try {
    const [bannerRes, productsRes, categoriesRes] = await Promise.all([
      getBannerOffersData(),
      getLimitedProductsData({
        limit: 6,
      }),
      getAllCategoriesData(),
    ]);

    const banners = bannerRes?.data || [];

    console.log(banners);

    return (
      <main className={style.homePage}>
        {banners.length > 0 && <HeroSection banners={banners} />}

        <Suspense fallback={<Loader />}>
          <AllMainProducts
            products={productsRes?.data?.data?.items || []}
            categories={categoriesRes?.data || []}
          />
        </Suspense>

        {/* <TestimonialSlider /> */}
      </main>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return (
      <main className={style.homePage}>
        <div className="container py-20 text-center">
          <p className="text-primary">حدث خطأ في تحميل الصفحة</p>
        </div>
      </main>
    );
  }
};
