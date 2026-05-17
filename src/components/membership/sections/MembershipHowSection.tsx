import { useTranslations } from "next-intl";
import { IconType } from "react-icons/lib";
import {
  PiUserPlusBold,
  PiCreditCardBold,
  PiRocketLaunchBold,
} from "react-icons/pi";

type InfoCardProps = {
  Icon: IconType;
  title: string;
  description: string;
  step?: number;
};

const InfoCard: React.FC<InfoCardProps> = ({
  Icon,
  title,
  description,
  step,
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-md p-6 text-center">
      {/* Step badge */}
      {step && (
        <div className="absolute -top-4 right-4 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold">
          {step}
        </div>
      )}

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-black text-white p-4 rounded-2xl">
          <Icon size={40} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
};

const MembershipHowSection = () => {
  const t = useTranslations("memberships.how");

  const howToSteps: {
    Icon: IconType;
    titleKey: string;
    descriptionKey: string;
  }[] = [
    {
      Icon: PiUserPlusBold,
      titleKey: "steps.step1.title",
      descriptionKey: "steps.step1.description",
    },
    {
      Icon: PiCreditCardBold,
      titleKey: "steps.step2.title",
      descriptionKey: "steps.step2.description",
    },
    {
      Icon: PiRocketLaunchBold,
      titleKey: "steps.step3.title",
      descriptionKey: "steps.step3.description",
    },
  ];

  return (
    <div className="container pt-10">
      <h2 className=" text-center mb-3 text-secondary font-bold text-3xl">
        {t("title")}
      </h2>
      <p className="text-black mb-10 text-center">
        <span> - </span>
        {t("description")}
      </p>
      <div className="mb-3 grid lg:grid-cols-3 lg:min-h-52 gap-4">
        {howToSteps.map((step, index) => (
          <InfoCard
            key={index}
            Icon={step.Icon}
            title={t(step.titleKey)}
            description={t(step.descriptionKey)}
            step={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default MembershipHowSection;
