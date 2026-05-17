import { useTranslations } from "next-intl";

export const MembershipConditionsSection = () => {
  const t = useTranslations("memberships.conditions");

  const items = [t("item1"), t("item2"), t("item3")];

  return (
    <section className="container py-10 mb-10">
      <h2 className="text-center mb-10 text-secondary font-bold text-3xl">
        {t("title")}
      </h2>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-1 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs font-semibold">
              {index + 1}
            </span>
            <p className="text-gray-600 leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
