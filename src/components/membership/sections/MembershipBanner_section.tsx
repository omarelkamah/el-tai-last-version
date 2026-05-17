"use client";

import { RootState } from "@/store/appStore";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MdAddTask } from "react-icons/md";

export const MembershipBanner_section = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <section className="membership-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center">
          <div className="flex items-center justify-center gap-2 bg-white/40 text-primary px-4 py-2 rounded-[9999px]">
            <MdAddTask /> انضم لعائلة نادي الطائي
          </div>
          <h1 className="text-[#2D2D31] text-5xl font-bold">
            عضوية نادي <span className="text-primary">الطائي</span>{" "}
          </h1>
          <p className="text-[#2D2D31] text-xl">
            كن جزءاً من عائلة الطائي واستمتع بمزايا حصرية وخصومات مميزة{" "}
          </p>
          {user?.membership ? (
            <div className="flex gap-4 sm:flex-col mb-6 max-w-[500px]">
              <Link
                href="/user/my-membership"
                className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
              >
                عضويتي
              </Link>
              <Link
                href="/membership/price-plans"
                className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
              >
                مشاهده العضويات
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 sm:flex-col mb-6 max-w-[500px]">
              <Link
                href="/membership/price-plans"
                className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
              >
                اشترك الآن{" "}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
