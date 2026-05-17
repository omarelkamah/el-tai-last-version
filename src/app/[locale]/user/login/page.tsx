import { LoginComponent } from "@/components/user/login/LoginComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدخول إلى حسابك",
};

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <main>
      <LoginComponent />
    </main>
  );
};

export default LoginPage;
