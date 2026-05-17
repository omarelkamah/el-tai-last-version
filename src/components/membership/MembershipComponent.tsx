import { MembershipBanner_section } from "./sections/MembershipBanner_section";
import { MembershipConditionsSection } from "./sections/MembershipConditionsSection";
import { MembershipFeatures_section } from "./sections/MembershipFeatures_section";
import MembershipHowSection from "./sections/MembershipHowSection";
import { MembershipReadytoJoin_section } from "./sections/MembershipReadytoJoin_section";
import style from "./styles/membership.module.scss";

export const MembershipComponent = () => {
  return (
    <main className={style.membership}>
      <MembershipBanner_section />
      <MembershipHowSection />
      <MembershipFeatures_section />
      <MembershipConditionsSection />
      <MembershipReadytoJoin_section />
    </main>
  );
};
