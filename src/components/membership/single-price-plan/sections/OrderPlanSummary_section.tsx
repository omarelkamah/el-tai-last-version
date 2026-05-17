"use client";

import { MembershipPlan } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FiGift, FiShield } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { LuBadgeCheck } from "react-icons/lu";
import { Button, Modal } from "antd";
import toast from "react-hot-toast";
import { usePurchaseMembership } from "../hooks/usePurchaseMembership";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";

interface OrderPlanSummaryProps {
  details: MembershipPlan & { _id?: string | number };
}

export const OrderPlanSummary_section = ({
  details,
}: OrderPlanSummaryProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "ar";
  const { isAuthenticated } = useAuth();
  const getLink = useLocalizedLink();

  const { mutate: purchaseMembership, isPending: isPurchasing } =
    usePurchaseMembership();

  const handlePurchase = () => {
    // if (!details?._id) {
    //   toast.error("حدث خطأ، لا يمكن التعرف على خطة العضوية");
    //   return;
    // }

    const payload: any = { tierId: String(details._id) };

    purchaseMembership(payload, {
      onSuccess: (response: any) => {
        setIsModalVisible(false);

        const checkoutUrl = response?.data?.payment?.checkoutUrl;

        if (checkoutUrl) {
          toast.success("تم إنشاء طلب الاشتراك بنجاح ...");
          router.push(checkoutUrl);
        } else {
          toast.success("تم الاشتراك في العضوية بنجاح 🎉");
          router.push(`/${locale}/user/my-membership`);
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
        setIsModalVisible(false);
      },
    });
  };

  const computedFinalPrice =
    typeof details.finalPrice === "number"
      ? details.finalPrice
      : typeof details.salePrice === "number"
        ? details.salePrice
        : typeof details.discountRate === "number"
          ? Math.max(0, details.price - details.price * (details.discountRate / 100))
          : details.price;

  const finalPrice =
    Number.isFinite(computedFinalPrice) && computedFinalPrice % 1 !== 0
      ? Number(computedFinalPrice.toFixed(2))
      : computedFinalPrice;

  const showOriginalPrice = finalPrice < details.price;

  return (
    <section className="order-plan-summary">
      <div className="summary-card">
        <h3 className="bg-primary text-xl font-bold p-6 text-white">
          ملخص الطلب
        </h3>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary">العضوية</span>
            <span className="text-primary font-bold">
              {details?.displayNameAr}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary">المدة</span>
            <span className="text-primary font-bold">{details?.duration}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary">يبدأ من</span>
            <span className="text-primary font-bold">اليوم</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary">ينتهي بعد</span>
            <span className="text-primary font-bold">
              {details?.periodType === "year"
                ? "سنة"
                : details?.periodType === "month"
                  ? "شهر"
                  : details?.periodType === "week"
                    ? "أسبوع"
                    : details?.periodType === "day"
                      ? "يوم"
                      : ""}{" "}
              {details?.duration}
            </span>
          </div>
          <hr className="my-6 border-[#F3F4F6]" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-primary">السعر قبل الخصم</span>
            <span className={showOriginalPrice ? "text-gray-400 line-through" : "text-primary font-bold"}>
              <CurrencyFormatter
                amount={details?.price}
                currency={details?.currency}
                amountClassName={`text-sm font-bold ${showOriginalPrice ? "text-gray-400" : "text-gray-700"}`}
                iconSize={16}
              />
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-primary">السعر بعد الخصم</span>
            <span className="text-primary font-bold">
              <CurrencyFormatter
                amount={finalPrice}
                currency={details?.currency}
                amountClassName="text-sm font-bold text-gray-700"
                iconSize={16}
              />
            </span>
          </div>

          <hr className="my-4 border-[#F3F4F6]" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary font-bold text-xl">الإجمالي</span>
            <span className="text-primary font-bold text-lg">
              <CurrencyFormatter
                amount={finalPrice}
                currency={details?.currency}
                amountClassName="text-sm font-bold text-gray-700"
                iconSize={18}
              />
            </span>
          </div>

          <div className="reward my-4">
            <h5 className="flex items-center gap-2 mb-3 font-bold">
              <FiGift />
              مكافأة الاشتراك
            </h5>
            <ul className="flex gap-2 flex-col">
              <li className="flex items-center gap-2 text-primary">
                <FaCheck />
                <span className="text-primary">دفع آمن ومشفر</span>
              </li>
              <li className="flex items-center gap-2 text-primary">
                <FaCheck />
                <span>شحن سريع خلال 2-3 أيام</span>
              </li>
              <li className="flex items-center gap-2 text-primary">
                <FaCheck />
                <span>إرجاع مجاني خلال 14 يوم</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={() => {
              if (!isAuthenticated) {
                toast.error(
                  "يرجى تسجيل الدخول أولاً لإتمام عملية شراء العضوية"
                );
                router.push(getLink("/user/login"));
                return;
              }
              setIsModalVisible(true);
            }}
            className="flex items-center justify-center w-full bg-primary hover:!bg-transparent border-primary border-2 hover:!text-primary text-white px-12 py-5 rounded-lg text-lg font-medium transition-colors text-center"
          >
            متابعة الدفع
          </Button>

          <Modal
            title="تأكيد شراء العضوية"
            open={isModalVisible}
            onOk={handlePurchase}
            onCancel={() => setIsModalVisible(false)}
            confirmLoading={isPurchasing}
            okText="تأكيد الشراء"
            cancelText="إلغاء"
            centered
          >
            <p className="text-lg py-4">
              هل أنت متأكد من رغبتك في شراء عضوية{" "}
              <span className="font-bold text-primary">
                {details?.displayNameAr}
              </span>
              ؟
            </p>
          </Modal>

          <Link
            href={"/membership/price-plans"}
            className="font-bold text-primary block text-center mt-4 transition-colors hover:text-primary"
          >
            اختيار عضوية أخرى
          </Link>
        </div>
      </div>
      <ul className="features">
        <li>
          <span>
            <FiShield className=" text-xl" />
          </span>
          <span className="text-primary">دفع آمن</span>
        </li>
        <li>
          <span>
            <IoMdTime className=" text-xl" />
          </span>
          <span className="text-primary">تفعيل فوري</span>
        </li>
        <li>
          <span>
            <LuBadgeCheck className=" text-xl" />
          </span>
          <span className="text-primary">ضمان الجودة</span>
        </li>
      </ul>
    </section>
  );
};
