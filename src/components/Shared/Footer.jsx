import useStore from "@/hooks/useStore";
import { storeId } from "@/libs/utils/common";
import React from "react";
import FooterSocialLinks from "./FooterSocialLinks";
import Image from "next/image";

// Simple in-memory cache
let storeCache = null;

const Footer = async () => {
  const { getStore } = useStore();

  // Check if the store information is already cached
  if (!storeCache) {
    storeCache = await getStore(storeId);
  }

  const storeInfo = storeCache;

  console.log("store info", storeInfo);
  return (
    <div className="py-20 border-t flex flex-col items-center w-full bg-[#111111] text-white">
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
          <p>Sign In</p>
          <p>Create Account</p>
          <p>My Orders</p>
          <p>Privacy Policy</p>
          <p>Refund Policy</p>
          <p>Terms & conditions</p>
        </div>
        <div>
          <p className="font-semibold">Popular</p>
          <p>Favorites</p>
          <p>General & Academy</p>
          <p>Pre-Order</p>
          <p>Package</p>
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
      <hr />
      {/* <div className="flex flex-col items-start container mx-auto">
        <div className="grid grid-cols-4">
          <p>Mom & Baby: </p>
          <span className="col-span-3 text-gray-400">
            Lorem | ipsum | dolor | sit | amet | consectetur | adipisicing |
            elit | Molestias | quidem
          </span>
        </div>
        <div className="grid grid-cols-4">
          <p>Bath & Shower: </p>
          <span className="col-span-3 text-gray-400">
            Lorem | ipsum | dolor | sit | amet | consectetur | adipisicing |
            elit | Molestias | quidem
          </span>
        </div>
        <div className="grid grid-cols-4">
          <p>Fragrance: </p>
          <span className="col-span-3 text-gray-400">
            Lorem | ipsum | dolor | sit | amet | consectetur | adipisicing |
            elit | Molestias | quidem
          </span>
        </div>
        <div className="grid grid-cols-4">
          <p>Healthy: </p>
          <span className="col-span-3 text-gray-400">
            Lorem | ipsum | dolor | sit | amet | consectetur | adipisicing |
            elit | Molestias | quidem
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
