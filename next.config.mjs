/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    VITE_SERVER_URL: "http://localhost:5000",
    VITE_IMGBB_KEY: "e9ee41ec2bd1b26ca469c791ef1a12c2",
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
