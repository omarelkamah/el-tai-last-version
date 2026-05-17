"use client";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { TbX } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";

type FeatureValue = boolean | string | number;

interface CompareFeatureRow {
  key: string;
  feature: string;
  [tierId: string]: FeatureValue;
}

const renderCell = (value: FeatureValue) => {
  if (value === true) {
    return (
      <span className="text-secondary flex items-start justify-center">
        <FaCheck />
      </span>
    );
  }

  if (value === false || value === undefined) {
    return (
      <span className="text-primary flex items-start justify-center">
        <TbX />
      </span>
    );
  }

  return <span className="text-primary font-medium">{String(value)}</span>;
};

export const CompareFeatures_section = ({
  membershipPlans = [],
  featureTranslations = {},
}: {
  membershipPlans?: unknown[];
  featureTranslations?: Record<string, string>;
}) => {
  void membershipPlans;
  void featureTranslations;

  const columns: ColumnsType<CompareFeatureRow> = [
    {
      title: "الميزة",
      dataIndex: "feature",
      key: "feature",
      align: "right",
      className: "font-semibold min-w-[280px]",
    },
    {
      title: "العضوية الاساسية",
      dataIndex: "basic",
      key: "basic",
      align: "center",
      render: (value: FeatureValue) => renderCell(value),
    },
    {
      title: "العضوية الرمادي",
      dataIndex: "gray",
      key: "gray",
      align: "center",
      render: (value: FeatureValue) => renderCell(value),
    },
    {
      title: "عضوية الطالي",
      dataIndex: "taly",
      key: "taly",
      align: "center",
      render: (value: FeatureValue) => renderCell(value),
    },
    {
      title: "عضوية الحاتمي",
      dataIndex: "khatami",
      key: "khatami",
      align: "center",
      render: (value: FeatureValue) => renderCell(value),
    },
  ];

  const dataSource: CompareFeatureRow[] = [
    {
      key: "free-signup",
      feature: "التسجيل مجاني",
      basic: true,
      gray: false,
      taly: false,
      khatami: false,
    },
    {
      key: "weekly-offers",
      feature: "معرفة العروض الاسبوعية والمنتجات المميزة",
      basic: true,
      gray: true,
      taly: true,
      khatami: true,
    },
    {
      key: "earn-points",
      feature: "كسب نقاط الولاء لكل عملية شراء",
      basic: true,
      gray: true,
      taly: true,
      khatami: true,
    },
    {
      key: "bigger-discounts",
      feature: "خصومات اكبر على المنتجات",
      basic: false,
      gray: true,
      taly: true,
      khatami: true,
    },
    {
      key: "member-offers",
      feature: "عروض حصرية للأعضاء",
      basic: false,
      gray: true,
      taly: true,
      khatami: true,
    },
    {
      key: "priority-orders",
      feature: "أولوية في الطلبات الجديدة",
      basic: false,
      gray: true,
      taly: true,
      khatami: true,
    },
    {
      key: "early-access",
      feature: "وصول مسبق للمنتجات الجديدة",
      basic: false,
      gray: false,
      taly: true,
      khatami: true,
    },
    {
      key: "club-invites",
      feature: "دعوات لفعاليات خاصة بالنادي",
      basic: false,
      gray: false,
      taly: true,
      khatami: true,
    },
    {
      key: "special-support",
      feature: "خدمة عملاء مخصصة",
      basic: false,
      gray: false,
      taly: false,
      khatami: true,
    },
    {
      key: "priority-shipping",
      feature: "أولوية قصوى في الشحن والتوصيل",
      basic: false,
      gray: false,
      taly: false,
      khatami: true,
    },
    {
      key: "khatami-exclusive",
      feature: "مزايا حصرية اضافية لاعضاء الحاتمي",
      basic: false,
      gray: false,
      taly: false,
      khatami: true,
    },
  ];

  return (
    <section className="compare-features mb-24 overflow-x-auto">
      <div className="container min-w-[600px]">
        <h3 className="text-center text-secondary text-2xl font-bold mb-8">
          مقارنة المزايا
        </h3>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered={false}
          className="points-table"
        />
      </div>
    </section>
  );
};
