"use client";
import React, { useContext } from "react";
import FooterSocialLinks from "../FooterSocialLinks";
import Image from "next/image";
import FooterLinks from "./FooterLinks";
import { StateContext } from "@/contexts/StateProvider/StateProvider";

const Footer = () => {
  const { storeInfo, isStoreInfoLoading } = useContext(StateContext);

  console.log("storeInfo", storeInfo);

  const usefulLinks = [
    { name: "Sign In", slug: "signin", link: "/signin" },
    { name: "Create Account", slug: "create-account", link: "/create-account" },
    { name: "My Orders", link: "/profile/orders" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Refund Policy", link: "/refund-policy" },
    { name: "Terms & conditions", link: "/terms-conditions" },
  ];

  const popularLinks = [
    { name: "Favorites", link: "/favorites" },
    { name: "General & Academy", link: "/general-academy" },
    { name: "Pre-Order", link: "/pre-order" },
    { name: "Package", link: "/package" },
  ];

  if (isStoreInfoLoading) {
    return <div>Loading...</div>;
  }

  console.log("store info", storeInfo);
  return (
    <div className="py-20 border-t hidden md:flex flex-col items-center w-full bg-[#111111] text-white">
      <div className="flex items-start justify-between w-full container mx-auto">
        <Image
          src={storeInfo?.cloudFrontURL?.replace(
            "*",
            `${storeInfo?.preferences?.logoOptions?.footerLogo}`
          )}
          className="object-contain w-[234px] h-[51px] cursor-pointer"
          alt={storeInfo?.storeName || "store"}
          width={234}
          height={51}
        />
        <div>
          <p className="font-semibold">Useful Links</p>
          <FooterLinks items={usefulLinks} />
        </div>
        <div>
          <p className="font-semibold">Popular</p>
          <FooterLinks items={popularLinks} />
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <p>Head Office</p>
          <p>{storeInfo?.supportInfo?.officeAddress}</p>
          <p>Phone:</p>
          <p>{storeInfo?.supportInfo?.phone}</p>
          <p>{storeInfo?.supportInfo?.email}</p>
          <FooterSocialLinks
            socialLinks={storeInfo?.supportInfo?.socialMediaLinks}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
