import { MembershipPlan } from "@/types/types";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaCheck } from "react-icons/fa6";
import { FiPercent } from "react-icons/fi";

interface PricePlansSectionProps {
  membershipPlans: MembershipPlan[];
}

export const PricePlans_section = ({
  membershipPlans,
}: PricePlansSectionProps) => {
  const orderedPlans = useMemo(() => {
    return membershipPlans.sort((a, b) => a.price - b.price);
  }, [membershipPlans]);

  return (
    <section className="price-plans my-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-4">
          {orderedPlans?.map((plan) => {
            const computedFinalPrice =
              typeof plan.finalPrice === "number"
                ? plan.finalPrice
                : typeof plan.salePrice === "number"
                  ? plan.salePrice
                  : typeof plan.discountRate === "number"
                    ? Math.max(0, plan.price - plan.price * (plan.discountRate / 100))
                    : plan.price;

            const finalPriceRounded =
              Number.isFinite(computedFinalPrice) && computedFinalPrice % 1 !== 0
                ? Number(computedFinalPrice.toFixed(2))
                : computedFinalPrice;

            const showOriginalPrice = finalPriceRounded < plan.price;

            return (
            <div key={plan._id}>
              <div className={`plan`}>
                {/* {plan.isPopular && (
                  <div className="most-popular"> الأكثر شعبية</div>
                )} */}
                {/* TOP */}
                <div
                  className={`top relative`}
                  // style={{ background: plan.color }}
                >
                  <Image
                    src={
                      plan.name === "basic_membership"
                        ? "/images/memberships/basic-membership.webp"
                        : plan.name === "al_tai_membership"
                          ? "/images/memberships/al-tai-membership.webp"
                          : plan.name === "al_hatimi_membership"
                            ? "/images/memberships/al-hatmi-membership.webp"
                            : plan.name === "grey_membership"
                              ? "/images/memberships/gray-membership.webp"
                              : ""
                    }
                    alt={`${plan.name} plan`}
                    fill
                    className="object-cover"
                  />
                  {/* <div className="icon">
                    {plan.name === "golden" ? (
                      <LuCrown />
                    ) : plan.name === "silver" ? (
                      <FaRegStar />
                    ) : (
                      <IoDiamondOutline />
                    )}
                  </div> */}

                  {/* <h3 className="font-bold text-2xl text-white mt-4 mb-2">
                    {plan.displayNameAr}
                  </h3>

                  <p className="text-white text-md mb-4">{plan.displayName}</p> */}

                  {/* <div className="flex items-center gap-2 text-white">
                    <span className="font-bold text-6xl">{plan.price}</span>
                    <span>
                      {plan.currency} <br />
                      {plan.period}
                    </span>
                  </div> */}
                </div>

                {/* BODY */}
                <div className="body">
                  <div className="flex items-center flex-row gap-3 border-b border-[#F3F4F6] pb-6 mb-6">
                    {/* خصم دائم على الطلبات */}
                    <div className="flex flex-col flex-1 items-center">
                      <span className="text-primary font-bold text-2xl flex items-center">
                        <FiPercent className="text-xl" />
                        {plan.discountRate}
                      </span>
                      <span className="text-primary text-xs text-center">خصم دائم على الطلبات</span>
                    </div>

                    {/* فاصل */}
                    <div className="w-px self-stretch bg-[#F3F4F6]" />

                    {/* السعر قبل الخصم */}
                    {showOriginalPrice && (
                      <>
                        <div className="flex flex-col flex-1 items-center">
                          <span className="text-primary font-bold text-2xl flex items-center gap-1 line-through">
                            <CurrencyFormatter
                              amount={plan.price}
                              currency={plan.currency}
                              amountClassName="text-2xl font-bold"
                              iconSize={22}
                            />
                          </span>
                          <span className="text-primary text-xs text-center">السعر قبل الخصم</span>
                        </div>

                        {/* فاصل */}
                        <div className="w-px self-stretch bg-[#F3F4F6]" />
                      </>
                    )}

                    {/* السعر بعد الخصم */}
                    <div className="flex flex-col flex-1 items-center">
                      <span className="text-primary font-bold text-2xl flex items-center gap-1">
                        <CurrencyFormatter
                          amount={finalPriceRounded}
                          currency={plan.currency}
                          amountClassName="text-2xl font-bold"
                          iconSize={22}
                        />
                      </span>
                      <span className="text-primary text-xs text-center">السعر بعد الخصم</span>
                    </div>
                  </div>

                  {/* FEATURES */}
                  <ul className="flex flex-col gap-3 mb-6">
                    {plan.benefits.map((feature, index) => (
                      <li
                        key={index}
                        className="text-primary text-lg flex items-center gap-3"
                      >
                        <FaCheck className="text-primary" />
                        {feature?.key} {feature?.value}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/membership/price-plans/${plan._id}`}
                    className={`block text-center mt-auto w-full bg-primary  text-white py-4 rounded-xl text-lg font-semibold border border-primary hover:!bg-white hover:text-primary transition `}
                  >
                    اختيار العضوية{" "}
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
