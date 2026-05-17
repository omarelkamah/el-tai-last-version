// components/home/sections/HeroSection.tsx
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

import "swiper/css";
import "swiper/css/pagination";

interface BannerImage {
  mobile: {
    en: string;
    ar: string;
  };
  desktop: {
    en: string;
    ar: string;
  };
}

interface BannerAction {
  type: string;
  referenceId: string;
  meta: any;
}

interface Banner {
  id: string;
  images: BannerImage;
  ctaText: string;
  ctaTextAr: string;
  action: BannerAction;
}

interface HeroSectionProps {
  banners: Banner[];
}

export function HeroSection({ banners }: HeroSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Function to get the appropriate image based on locale and device
  const getImageUrl = (banner: Banner, isMobile: boolean = false) => {
    const deviceType = isMobile ? "mobile" : "desktop";
    return banner.images[deviceType][isArabic ? "ar" : "en"];
  };

  // Function to get CTA link based on action type
  const getCtaLink = (action: BannerAction) => {
    switch (action.type) {
      // case "OFFER":
      //   return `/${locale}/offers/${action.referenceId}`;
      case "PRODUCT":
        return `/${locale}/products/${action.referenceId}`;
      case "CATEGORY":
        return `/${locale}/products?category=${action.referenceId}`;
      case "MEMBERSHIP":
        return `/${locale}/membership/price-plans/${action.referenceId}`;
      default:
        return `/${locale}/products`;
    }
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section
      className="hero-section relative bg-[#edf2ee] w-full"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
            bulletClass: "hero-bullet",
            bulletActiveClass: "hero-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={banners.length > 1}
          className="w-full"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link href={getCtaLink(banner.action)}>
                <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                  {/* Desktop Image */}
                  <div className="hidden md:block relative w-full h-[500px] lg:h-[600px]">
                    <Image
                      src={getImageUrl(banner, false)}
                      alt="Banner"
                      fill
                      className="object-cover rounded-lg"
                      priority
                      sizes="100vw"
                    />
                  </div>

                  {/* Mobile Image */}
                  <div className="block md:hidden relative w-full h-[600px]">
                    <Image
                      src={getImageUrl(banner, true)}
                      alt="Banner"
                      fill
                      className="object-cover rounded-lg"
                      priority
                      sizes="100vw"
                    />
                  </div>

                  {/* CTA Button Overlay */}
                  {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                  <Link
                    href={getCtaLink(banner.action)}
                    className="inline-flex items-center justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-8 md:px-12 py-3 rounded-lg text-base md:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isArabic ? banner.ctaTextAr : banner.ctaText}
                  </Link>
                </div> */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        {banners.length > 1 && (
          <div className="hero-pagination flex items-center justify-center gap-2 pb-8 pt-4" />
        )}
      </div>

      {/* Navigation Arrows - Only show if multiple banners */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#d1d5db] bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <FaArrowLeft className="w-5 h-5 text-[#6b7280]" />
          </button>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#d1d5db] bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <FaArrowRight className="w-5 h-5 text-[#6b7280]" />
          </button>
        </>
      )}
    </section>
  );
}
