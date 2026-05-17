"use client";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Users_table } from "./tables/Users_table";
import { useLocale } from "next-intl";

export const AdminUsersComponent = () => {
  const router = useRouter();
  const locale = useLocale();

  return (
    <main>
      <div className="flex items-center justify-between flex-col md:flex-row mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-secondary">
            إدارة المستخدمين{" "}
          </h1>
          <p className="text-lg text-primary">
            إدارة وتتبع جميع المستخدمين في النظام{" "}
          </p>
        </div>
        <Button
          type="primary"
          onClick={() => router.push(`/${locale}/admin/users/add`)}
        >
          <FiPlus />
          إضافة مستخدم{" "}
        </Button>
      </div>

      <Users_table />
    </main>
  );
};
