import { Col, Row } from "antd";
import React from "react";
import { FaRegStar } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import { MyMembershipData } from "../hooks/useGetMyMembership";
import dayjs from "dayjs";

export const MembershipType_section = ({
  membership,
}: {
  membership: MyMembershipData["membership"];
}) => {
  const tierName = membership?.tierId?.name?.toLowerCase();

  return (
    <section className={`single-plan single-plan-${tierName}`}>
      <div className={`top rounded-2xl p-8 text-white`}>
        <div className=" flex justify-between items-start gap-4 mb-8">
          <div className="flex-1">
            <h4 className="text-primary">نادي الطائي</h4>
            <h2 className="text-3xl font-bold my-2 text-secondary">
              {membership?.tierId?.displayNameAr || membership?.tierId?.name}
            </h2>
          </div>
        </div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-primary mb-2">رقم العضوية</div>
              <div className="text-xl font-bold text-secondary">
                {membership?.membershipNumber}
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-primary mb-2">تاريخ البدء</div>
              <div className="text-xl font-bold text-secondary">
                {dayjs(membership?.startDate).format("D-MM-YYYY")}
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-primary mb-2">تاريخ الانتهاء</div>
              <div className="text-xl font-bold text-secondary">
                {dayjs(membership?.expireDate).format("D-MM-YYYY")}
              </div>
            </div>
          </Col>
          {/* <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-primary mb-2">الحالة</div>
              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <span className={`w-2 h-2 block rounded-full ${membership?.status === 'active' && !membership?.isExpired ? 'bg-[#22C55E]' : 'bg-red-500'}`} />
                {membership?.status === 'active' && !membership?.isExpired ? 'نشطة' : 'منتهية'}
              </div>
            </div>
          </Col> */}
        </Row>
      </div>
    </section>
  );
};
