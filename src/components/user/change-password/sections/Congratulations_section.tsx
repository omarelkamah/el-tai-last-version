import Image from "next/image";
import Link from "next/link";

export const Congratulations = () => {
  return (
    <div className="text-center py-10">
      <Image
        src={"/icons/switch.svg"}
        width={456}
        height={456}
        alt="congratulations"
      />
      <h2 className="text-2xl font-bold mb-6"> تهانينا!</h2>
      <p className="text-primary text-xl">تم تغيير كلمة المرور بنجاح</p>
      <Link
        href="/user/login"
        className="text-primary font-bold mt-8 inline-block text-lg"
      >
        {" "}
        تسجيل الدخول{" "}
      </Link>
    </div>
  );
};
