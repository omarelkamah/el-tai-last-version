"use client";

import { Button, Skeleton, Input, Tag, message } from "antd";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useGetCheckoutDetails } from "../hooks/useGetCheckoutDetails";
import { useApplyCoupon, useRemoveCoupon } from "../hooks/useApplyCoupon";
import { FiTrash2 } from "react-icons/fi";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import {
  useApplyLoyaltyPoints,
  useRemoveLoyaltyPoints,
} from "../hooks/useApplyLoyaltyPoints";
import { PiCoinsFill } from "react-icons/pi";

interface OrderSummaryProps {
  checkoutLoading: boolean;
}

export const OrderSummary_section = ({
  checkoutLoading,
}: OrderSummaryProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const loyaltyPoints = user?.loyaltyPoints || 0;

  const { data, isLoading } = useGetCheckoutDetails();
  const { applyCouponMutation, applyCouponLoading } = useApplyCoupon();
  const { removeCouponMutation, removeCouponLoading } = useRemoveCoupon();
  const { applyPointsMutation, applyPointsLoading } = useApplyLoyaltyPoints();
  const { removePointsMutation, removePointsLoading } =
    useRemoveLoyaltyPoints();

  const [couponCode, setCouponCode] = useState("");
  const [pointsToUse, setPointsToUse] = useState<number | "" | string>("");

  const subtotal = data?.subtotal || 0;
  const membershipDiscount = data?.membershipDiscount || 0;
  const couponDiscount = data?.couponDiscount || 0;
  const loyaltyPointsDiscount = data?.loyaltyPointsDiscount || 0;
  const loyaltyDiscount = data?.loyaltyDiscount || 0;
  const discountTotal = data?.discountTotal || 0;
  const loyaltyPointsUsed = data?.loyaltyPointsUsed || 0;

  const isCouponApplied = couponDiscount > 0;
  const appliedCouponCode = data?.couponCode || "القسيمة المطبقة";

  const isPointsApplied = loyaltyPointsUsed > 0;

  const total = data?.total || 0;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    await applyCouponMutation({ code: couponCode });
    setCouponCode("");
  };

  const handleRemoveCoupon = async () => {
    await removeCouponMutation();
  };

  const handleApplyPoints = async () => {
    const points = Number(pointsToUse);
    if (!points || points <= 0) {
      message.error("الرجاء إدخال عدد نقاط صحيح");
      return;
    }
    if (points > loyaltyPoints) {
      message.error("رصيد نقاطك غير كافٍ");
      return;
    }
    if (points % 10 !== 0) {
      message.error("يجب استخدام النقاط بمضاعفات الـ 10");
      return;
    }

    await applyPointsMutation({ points });
    setPointsToUse("");
  };

  const handleRemovePoints = async () => {
    await removePointsMutation();
  };

  if (isLoading) {
    return (
      <div className="card">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  return (
    <div className="card">
      <h5 className="text-primary text-2xl font-bold mb-6">ملخص الطلب</h5>

      {/* Coupon Application / Active Coupon */}
      {/* <div className="mb-4">
        {!isCouponApplied ? (
          <div className="flex items-center gap-2">
            <Input
              placeholder="أدخل كود الخصم"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onPressEnter={handleApplyCoupon}
              disabled={applyCouponLoading || checkoutLoading}
              className="flex-1 rounded-md"
              size="large"
            />
            <Button
              type="primary"
              onClick={handleApplyCoupon}
              loading={applyCouponLoading}
              disabled={!couponCode.trim() || checkoutLoading}
              className="bg-primary text-white rounded-md"
              size="large"
            >
              تطبيق
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-md">
            <div>
              <p className="text-green-700 font-bold mb-1">كود الخصم مفعل</p>
              <p className="text-sm text-secondary">{appliedCouponCode}</p>
            </div>
            <Button
              type="primary"
              danger
              icon={<FiTrash2 />}
              onClick={handleRemoveCoupon}
              loading={removeCouponLoading}
              disabled={checkoutLoading}
            >
              إزالة
            </Button>
          </div>
        )}
      </div> */}

      {/* Loyalty Points Section */}
      <div className="mb-6 p-4 border border-secondary  rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-700 font-medium">نقاط الولاء</span>
          <Tag className="text-primary mr-auto ml-0 border border-primary bg-secondary text-white font-bold">
            {loyaltyPoints} نقطة
          </Tag>
        </div>

        {!isPointsApplied ? (
          <div className="inputS1 flex items-center gap-2">
            <Input
              type="number"
              placeholder="استخدم نقاطك (مضاعفات 10)"
              value={pointsToUse}
              onChange={(e) => setPointsToUse(e.target.value)}
              onPressEnter={handleApplyPoints}
              disabled={applyPointsLoading || checkoutLoading}
              className="flex-1 rounded-md"
              size="large"
              min={10}
              step={10}
            />
            <Button
              type="primary"
              onClick={handleApplyPoints}
              loading={applyPointsLoading}
              disabled={!pointsToUse || checkoutLoading}
              className="bg-primary text-white rounded-md"
              size="large"
            >
              استخدام
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between border border-secondary p-3 rounded-md">
            <div>
              <p className=" font-bold mb-1">تم استخدام النقاط</p>
              <p className="text-sm">{loyaltyPointsUsed} نقطة</p>
            </div>
            <Button
              type="primary"
              ghost
              icon={<FiTrash2 />}
              onClick={handleRemovePoints}
              loading={removePointsLoading}
              disabled={checkoutLoading}
              className="border-blue-400 text-blue-600 hover:text-blue-700"
            >
              إزالة
            </Button>
          </div>
        )}
      </div>

      {/* Subtotal */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-primary text-lg">المجموع الفرعي</span>
        <span className="text-secondary text-lg">
          <CurrencyFormatter
            amount={subtotal}
            currency={data?.currency}
            amountClassName="text-lg"
          />
        </span>
      </div>

      {/* Membership Discount */}
      {membershipDiscount > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary text-lg">خصم العضوية</span>
          <span className="text-secondary text-lg flex items-center gap-1">
            -{" "}
            <CurrencyFormatter
              amount={membershipDiscount}
              currency={data?.currency}
              amountClassName="text-lg"
            />
          </span>
        </div>
      )}

      {/* Coupon Discount */}
      {isCouponApplied && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary text-lg">قسيمة الخصم</span>
          <span className="text-secondary text-lg flex items-center gap-1">
            -{" "}
            <CurrencyFormatter
              amount={couponDiscount}
              currency={data?.currency}
              amountClassName="text-lg"
            />
          </span>
        </div>
      )}

      {/* Loyalty Points Discount */}
      {loyaltyPointsDiscount > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary text-lg">خصم نقاط الولاء</span>
          <span className="text-secondary text-lg flex items-center gap-1">
            -{" "}
            <CurrencyFormatter
              amount={loyaltyPointsDiscount}
              currency={data?.currency}
              amountClassName="text-lg"
            />
          </span>
        </div>
      )}

      {/* Loyalty (Tier/Membership) Discount */}
      {loyaltyDiscount > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary text-lg">خصم الولاء</span>
          <span className="text-secondary text-lg flex items-center gap-1">
            -{" "}
            <CurrencyFormatter
              amount={loyaltyDiscount}
              currency={data?.currency}
              amountClassName="text-lg"
            />
          </span>
        </div>
      )}

      {/* General Discount */}
      {discountTotal > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary text-lg">إجمالي الخصم</span>
          <span className="text-secondary text-lg flex items-center gap-1">
            -{" "}
            <CurrencyFormatter
              amount={discountTotal}
              currency={data?.currency}
              amountClassName="text-lg"
            />
          </span>
        </div>
      )}

      {/* Shipping */}
      {/* <div className="flex items-center justify-between mb-4">
        <span className="text-primary text-lg">الشحن</span>
        <span className="text-secondary text-lg">مجاني</span>
      </div> */}

      <hr className="border-[1px] border-[#E0E0E1] my-4" />

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-secondary text-xl font-bold">الإجمالي</span>
        <span className="text-secondary text-xl font-bold">
          <CurrencyFormatter
            amount={total}
            currency={data?.currency}
            amountClassName="text-xl font-bold"
            iconSize={24}
          />
        </span>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="w-full"
        loading={checkoutLoading}
        disabled={
          checkoutLoading ||
          applyCouponLoading ||
          removeCouponLoading ||
          applyPointsLoading ||
          removePointsLoading
        }
      >
        إتمام الشراء
      </Button>

      <hr className="border-[1px] border-[#E0E0E1] my-6" />

      {/* Static Info */}
      <ul className="flex gap-2 flex-col">
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>دفع آمن ومشفر</span>
        </li>
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>شحن سريع خلال 2-3 أيام</span>
        </li>
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>إرجاع مجاني خلال 14 يوم</span>
        </li>
      </ul>
    </div>
  );
};
