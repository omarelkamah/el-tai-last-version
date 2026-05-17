"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { appStore } from "@/store/appStore";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useLocale } from "next-intl";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const locale = useLocale();

  const theme = {
    token: {
      fontFamily:
        locale === "ar"
          ? "'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          : "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
  };

  return (
    <Provider store={appStore}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider
            theme={theme}
            direction={locale === "ar" ? "rtl" : "ltr"}
          >
            <GoogleOAuthProvider
              clientId={
                "445379797270-45cio1clbrfng6ca88npqac33c9bd0eo.apps.googleusercontent.com"
              }
            >
              <AuthProvider>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster />
              </AuthProvider>
            </GoogleOAuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </Provider>
  );
}
