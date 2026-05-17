"use client";
import { Col, Row } from "antd";
import style from "./styles/myMemberShip.module.scss";
import { MembershipType_section } from "./sections/MembershipType_section";
import { AllMembershipDetails_section } from "./sections/AllMembershipDetails_section";
import { FastActions_section } from "./sections/FastActions_section";
import { useGetMyMembership } from "./hooks/useGetMyMembership";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import Image from "next/image";

export const MyMembershipComponent = () => {
  const { data, isLoading } = useGetMyMembership();

  const membershipName = data?.membership?.tierId?.name;

  if (isLoading) {
    return <LoaderS1 />;
  }

  return (
    <main className={style.myMemberShip}>
      <div className="container mb-24">
        <h1 className="font-bold text-3xl text-secondary mb-4">عضويتي</h1>
        <p className="text-primary mb-8">إدارة عضويتك ومتابعة مزاياك</p>

        <div className="relative h-[200px] md:h-[350px] mb-20">
          <Image
            src={
              membershipName === "basic_membership"
                ? "/membership/basic_membership_bg.png"
                : membershipName === "al_tai_membership"
                  ? "/membership/al_tai_membership_bg.png"
                  : membershipName === "al_hatimi_membership"
                    ? "/membership/al_hatimi_membership_bg.png"
                    : membershipName === "grey_membership"
                      ? "/membership/grey_membership_bg.png"
                      : ""
            }
            alt={`${membershipName} plan`}
            fill
            objectFit="cover"
          />
        </div>

        {data?.membership && (
          <div className="mb-8">
            <MembershipType_section membership={data.membership} />
          </div>
        )}
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={16}>
            <AllMembershipDetails_section
              benefits={data?.membership?.tierId?.benefits}
              membership={data?.membership}
            />
          </Col>
          <Col xs={24} lg={8}>
            <FastActions_section />
          </Col>
        </Row>
      </div>
    </main>
  );
};
