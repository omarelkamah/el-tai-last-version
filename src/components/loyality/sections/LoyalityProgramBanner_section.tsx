"use client";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import { RootState } from "@/store/appStore";
import Link from "next/link";
import React from "react";
import { MdOutlineLoyalty } from "react-icons/md";
import { useSelector } from "react-redux";

export const LoyalityProgramBanner_section = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <section className="loyality-program-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-[9999px]">
            <MdOutlineLoyalty className="text-lg" /> برنامج المكافآت
          </div>
          <h1 className="text-secondary text-6xl font-bold">
            برنامج ولاء الطائي
          </h1>
          <p className="text-primary text-xl">
            اكسب نقاط مع كل عملية شراء واستبدلها بمكافآت حصرية ومميزات لا تُنسى
            <br />
            <span className="text-secondary font-bold flex items-center justify-center gap-2">
              واكسب نقطة على كل
              <CurrencyFormatter
                amount={`10`}
                currency={"SAR"}
                amountClassName="text-lg font-bold text-gray-700 "
                iconSize={18}
              />
            </span>
          </p>
          <div className="flex gap-4 flex-col lg:flex-row mb-6 max-w-[800px] md:min-w-[500px]">
            {/* <Link
              href="/how-to-earn-points"
              className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-4 py-2 rounded-lg text-md font-medium transition-colors"
            >
              كيف اكسب المزيد{" "}
            </Link> */}
            {user && (
              <>
                <Link
                  href="/user/loyalty-program/available-rewards"
                  className="flex flex-1 items-center gap-4 justify-center bg-transparent hover:bg-transparent border-primary border-2 hover:text-primary text-primary px-4 py-2 rounded-lg text-md font-medium transition-colors"
                >
                  النقاط المتاحة
                </Link>
                <Link
                  href="/user/loyalty-program/points-history"
                  className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-4 py-2 rounded-lg text-md font-medium transition-colors"
                >
                  سجل النقاط
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
