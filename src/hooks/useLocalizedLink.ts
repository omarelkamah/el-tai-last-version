"use client";

import { usePathname } from "next/navigation";

export const useLocalizedLink = () => {
  const pathname = usePathname();

  const getLink = (path: string) => {
    const segments = pathname.split("/");
    const currentLocale =
      segments[1] === "en" || segments[1] === "ar" ? segments[1] : "en";
    return `/${currentLocale}${path.startsWith("/") ? path : "/" + path}`;
  };

  return getLink;
};
