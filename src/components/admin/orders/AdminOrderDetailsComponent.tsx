"use client";

import { useGetAdminOrderDetails } from "./hooks/useGetAdminOrderDetails";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  Descriptions,
  Table,
  Tag,
  Typography,
  Button,
  Spin,
  Row,
  Col,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";

const { Title, Text } = Typography;

type ShippingAddress = {
  shortAddress?: string;
  buildingNo?: string;
  street?: string;
  secondaryNo?: string;
  district?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  lat?: number | null;
  lng?: number | null;
  accurateZoneId?: number | null;
  accurateSubzoneId?: number | null;
};

const ADDRESS_FIELD_LABELS: { key: keyof ShippingAddress; label: string }[] = [
  { key: "shortAddress", label: "العنوان المختصر" },
  { key: "buildingNo", label: "رقم المبنى" },
  { key: "street", label: "الشارع" },
  { key: "secondaryNo", label: "الرقم الفرعي" },
  { key: "district", label: "الحي" },
  { key: "postalCode", label: "الرمز البريدي" },
  { key: "city", label: "المدينة" },
  { key: "country", label: "الدولة" },
  { key: "lat", label: "خط العرض" },
  { key: "lng", label: "خط الطول" },
  { key: "accurateZoneId", label: "معرّف المنطقة" },
  { key: "accurateSubzoneId", label: "معرّف المنطقة الفرعية" },
];

function formatAddressValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

const STATUS_MAP: Record<string, { color: string; label: string }> = {
  pending: { color: "gold", label: "قيد المراجعة" },
  paid: { color: "blue", label: "مدفوع" },
  shipped: { color: "geekblue", label: "تم الشحن" },
  delivered: { color: "green", label: "تم التوصيل" },
  cancelled: { color: "default", label: "ملغي" },
  refunded: { color: "purple", label: "تم الاسترجاع" },
  failed: { color: "red", label: "فشل الدفع" },
};

export const AdminOrderDetailsComponent = () => {
  const { orderId } = useParams();
  const router = useRouter();

  const { data: orderResponse, isLoading } = useGetAdminOrderDetails(
    orderId as string
  );
  const order = orderResponse as any;
  const shippingAddress = order?.shipping?.address as ShippingAddress | undefined;

  const addressDescriptionItems =
    shippingAddress &&
    ADDRESS_FIELD_LABELS.filter(({ key }) =>
      formatAddressValue(shippingAddress[key] as string | number | null | undefined)
    ).map(({ key, label }) => ({
      key,
      label,
      value: formatAddressValue(
        shippingAddress[key] as string | number | null | undefined
      ),
    }));

  const hasShipmentTracking =
    order &&
    (order.accurateShipmentId != null ||
      !!order.accurateShipmentCode ||
      !!order.accurateTrackingUrl);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center p-8">
        <Title level={4}>لم يتم العثور على الطلب</Title>
        <Button onClick={() => router.back()}>العودة للطلبات</Button>
      </div>
    );
  }

  const columns = [
    {
      title: "المنتج",
      dataIndex: "productName",
      key: "productName",
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <div className="text-sm text-gray-500">
            {record.size && <span>المقاس: {record.size}</span>}
            {record.size && record.color && <span className="mx-1">|</span>}
            {record.color && <span>اللون: {record.color}</span>}
          </div>
          {record.itemSku && (
            <div className="text-xs text-gray-400">SKU: {record.itemSku}</div>
          )}
        </div>
      ),
    },
    {
      title: "السعر",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (price: number) => (
        <CurrencyFormatter
          amount={price}
          currency={order?.currency}
          iconSize={16}
        />
      ),
    },
    {
      title: "الكمية",
      dataIndex: "quantity",
      key: "quantity",
      align: "center" as const,
    },
    {
      title: "الإجمالي",
      dataIndex: "lineTotal",
      key: "lineTotal",
      render: (total: number) => (
        <CurrencyFormatter
          amount={total}
          currency={order?.currency}
          amountClassName="font-bold"
          iconSize={16}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            icon={<ArrowRightOutlined />}
            onClick={() => router.push("/admin/orders")}
            type="text"
          />
          <Title level={3} style={{ margin: 0 }}>
            تفاصيل الطلب: {order.orderNumber}
          </Title>
        </div>
        <Tag
          color={STATUS_MAP[order.status]?.color || "default"}
          className="text-sm px-3 py-1"
        >
          {STATUS_MAP[order.status]?.label || order.status}
        </Tag>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card
            title="المنتجات"
            className="mb-6 shadow-sm border border-gray-100"
          >
            <Table
              dataSource={order.items || []}
              columns={columns}
              rowKey="productId"
              pagination={false}
              bordered
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="تتبع المبالغ والمحصلة"
            className="!mb-6 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-gray-600">
                <span>المجموع الفرعي</span>
                <CurrencyFormatter
                  amount={order.subtotal}
                  currency={order.currency}
                  iconSize={16}
                />
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>الخصم</span>
                <span className="text-primary flex items-center gap-1">
                  -{" "}
                  <CurrencyFormatter
                    amount={order.discountTotal + order.couponDiscount}
                    currency={order.currency}
                    iconSize={16}
                    amountClassName="text-primary"
                  />
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>رسوم الشحن</span>
                <CurrencyFormatter
                  amount={order.shippingFee}
                  currency={order.currency}
                  iconSize={16}
                />
              </div>
              {order.loyaltyPointsUsed > 0 && (
                <div className="flex justify-between items-center text-gray-600">
                  <span>نقاط الولاء المستخدمة</span>
                  <span className="text-primary">
                    - {order.loyaltyPointsUsed}
                  </span>
                </div>
              )}
              <div className="border-t pt-3 mt-2 flex justify-between items-center">
                <Text strong className="text-lg">
                  الإجمالي
                </Text>
                <CurrencyFormatter
                  amount={order.total}
                  currency={order.currency}
                  amountClassName="text-lg font-bold text-primary"
                  iconSize={20}
                />
              </div>
            </div>
          </Card>

          <Card
            title="بيانات العميل"
            className="!mb-6 shadow-sm border border-gray-100"
          >
            <Descriptions
              column={1}
              size="small"
              labelStyle={{ color: "#6b7280" }}
            >
              <Descriptions.Item label="الاسم">
                {order.customerInfo?.firstName} {order.customerInfo?.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الجوال">
                <span dir="ltr">{order.customerInfo?.phone}</span>
              </Descriptions.Item>
              <Descriptions.Item label="البريد الإلكتروني">
                {order.customerInfo?.email}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title="بيانات الشحن والدفع"
            className="shadow-sm border border-gray-100"
          >
            <Descriptions
              column={1}
              size="small"
              labelStyle={{ color: "#6b7280" }}
            >
              <Descriptions.Item label="طريقة الشحن">
                {order.shipping?.type === "pickup"
                  ? "استلام من الفرع"
                  : order.shipping?.type === "delivery"
                    ? "توصيل للعنوان"
                    : order.shipping?.type ?? "—"}
              </Descriptions.Item>
              {order.shipping && order.shipping.type === "delivery" && (
                <>
                  {addressDescriptionItems?.map(({ key, label, value }) => (
                    <Descriptions.Item key={key} label={label}>
                      <span>{value}</span>
                    </Descriptions.Item>
                  ))}
                </>
              )}
              <Descriptions.Item label="طريقة الدفع">
                {order.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="تاريخ الطلب">
                {dayjs(order.createdAt)
                  .locale("ar")
                  .format("DD-MM-YYYY | hh:mm A")}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {hasShipmentTracking && (
            <Card
              title="تتبع الشحنة"
              className="shadow-sm border border-gray-100 !mt-6"
            >
              <Descriptions
                column={1}
                size="small"
                labelStyle={{ color: "#6b7280" }}
              >
                <Descriptions.Item label="معرّف الشحنة">
                  <span dir="ltr">
                    {order.accurateShipmentId != null
                      ? String(order.accurateShipmentId)
                      : "—"}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="رمز الشحنة">
                  <span dir="ltr">{order.accurateShipmentCode || "—"}</span>
                </Descriptions.Item>
                <Descriptions.Item label="رابط التتبع">
                  {typeof order.accurateTrackingUrl === "string" &&
                  order.accurateTrackingUrl.trim() !== "" ? (
                    <a
                      href={order.accurateTrackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline break-all"
                      dir="ltr"
                    >
                      {order.accurateTrackingUrl}
                    </a>
                  ) : (
                    "—"
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};
