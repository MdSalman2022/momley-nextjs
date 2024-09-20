import "./globals.css";
import Providers from "./providers";
import { storeId } from "@/libs/utils/common";
import localFont from "next/font/local";

const myFont = localFont({ src: "../../public/fonts/momley2.ttf" });

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.VITE_SERVER_URL}/store/get-store?storeId=${storeId}`
  );
  const storeInfo = await res.json();

  const storeName = storeInfo.data?.storeName;
  const title = storeInfo.data?.seoSettings?.homepageTitle;
  const description = storeInfo.data?.seoSettings?.metaDescription;
  const logoUrl = `${process.env.VITE_SERVER_URL}/public/images/logo.png`; // Update this to your actual logo URL
  const keywords = storeInfo.data?.seoSettings?.metaKeywords;

  return {
    title: {
      absolute: title || "",
      default: "",
      template: `%s | ${storeName}`,
    },
    description: description || "",
    generator: storeName,
    applicationName: storeName,
    referrer: "origin-when-cross-origin",
    keywords: keywords,
    authors: [
      { name: storeName },
      { name: storeName, url: "https://nextjs.org" },
    ],
    creator: storeName,
    publisher: storeName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      url: process.env.VITE_SERVER_URL,
      title: title || storeName,
      description: description || "",
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: `${storeName} Logo`,
        },
      ],
    },
    /* twitter: {
      card: "summary_large_image",
      site: "@yoursite", // Update this to your Twitter handle
      title: title || storeName,
      description: description || "",
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: `${storeName} Logo`,
        },
      ],
    }, */
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${myFont.className} w-screen overflow-x-hidden`}>
        <div>
          {" "}
          <Providers>
            <div className="container mx-auto px-0">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
