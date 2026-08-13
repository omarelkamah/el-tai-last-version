import path from "path";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
//
const nextConfig: NextConfig = {
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "amzn-s3-ecommerce-app.s3.eu-north-1.amazonaws.com",
        pathname: "/**", // allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**", // allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/**", // allow all paths under this domain
      },
    ],
  },
};

export default withNextIntl(nextConfig);

//test-1
