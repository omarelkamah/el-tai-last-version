// components/header/UserAuthButton.tsx
"use client";

import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useLogout } from "@/hooks/auth/useLogout";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useAuth } from "@/hooks/auth/useAuth";

import { Dropdown, MenuProps } from "antd";

export default function UserAuthButton() {
  const { logout, isLoggingOut } = useLogout();
  const getLink = useLocalizedLink();
  const { isAuthenticated, isLoading } = useAuth();

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Link href={getLink("/user/profile")} className="text-secondary">
          الملف الشخصي
        </Link>
      ),
      icon: <FiUser size={16} />,
    },
    {
      key: "logout",
      label: "تسجيل الخروج",
      icon: isLoggingOut ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : (
        <BiLogOut size={16} />
      ),
      onClick: () => logout(),
      className:
        "logout-menu-item !bg-secondary !text-white hover:!bg-secondary hover:!text-white transition-all duration-300 rounded-md mt-2",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-10 h-10">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Dropdown menu={{ items: menuItems }} placement="bottomLeft" arrow>
        <button className="flex items-center justify-center w-10 h-10 sm:w-5 sm:h-6 text-white bg-transparent border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10 active:scale-95">
          <FiUser size={20} />
        </button>
      </Dropdown>
    );
  }

  return (
    <Link
      href={getLink("/user/login")}
      // ...
      className="flex items-center justify-center w-10 h-10 sm:w-5 sm:h-6 text-white bg-transparent border-none rounded-lg cursor-pointer transition-all duration-300  active:scale-95"
      title="تسجيل الدخول"
    >
      <FiUser size={20} />
    </Link>
  );
}
