/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    VITE_SERVER_URL: process.env.VITE_SERVER_URL,
    VITE_X_API_KEY: process.env.VITE_X_API_KEY,
    VITE_STORE_ID: process.env.VITE_STORE_ID,
    VITE_IMGBB_KEY: process.env.VITE_IMGBB_KEY,
    VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID:
      process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
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
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      // cloudfront
      {
        protocol: "https",
        hostname: "d2cl8yay0cpblh.cloudfront.net",
        port: "",
        pathname: "/users/**",
      },
      {
        protocol: "https",
        hostname: "d2cl8yay0cpblh.cloudfront.net",
        port: "",
        pathname: "/sellers/**",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
