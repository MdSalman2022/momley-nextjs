/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    VITE_SERVER_URL: process.env.VITE_SERVER_URL,
    VITE_IMGBB_KEY: process.env.VITE_IMGBB_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
      },
      //imgbb
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
