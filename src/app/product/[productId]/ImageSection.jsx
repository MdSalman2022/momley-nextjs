"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useMobileHeader from "@/hooks/reusable/useMobileHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";

const ImageSection = ({ bookDetails, cloudFrontURL }) => {
  const { setIsPrimaryMobileFooterVisible, storeInfo } =
    useContext(StateContext);

  useEffect(() => {
    setIsPrimaryMobileFooterVisible(false);

    return () => {
      setIsPrimaryMobileFooterVisible(true);
    };
  }, []);

  const [activeImage, setActiveImage] = useState(bookDetails?.images[0]);

  useEffect(() => {
    if (bookDetails?.images?.length > 0) {
      setActiveImage(bookDetails.images[0]);
    }
  }, [bookDetails]);

  const getImageSrc = (image) => {
    console.log("image url", image);
    console.log("image cloudFrontURL", cloudFrontURL);
    return storeInfo?.cloudFrontURL.replace("*", `products/${image}`);
  };

  console.log("bookDetails?.images", bookDetails?.images);

  return (
    <div className="flex flex-col gap-5 w-full">
      {bookDetails?.images?.length > 0 && bookDetails?.images[0] && (
        <Image
          src={storeInfo?.cloudFrontURL.replace(
            "*",
            `products/${bookDetails?.images[0]}`
          )}
          alt="Active Product Image"
          className="object-contain  md:w-[360px]"
          width={360}
          height={400}
        />
      )}

      <div className="hidden md:flex items-center gap-1">
        {bookDetails?.images?.length > 0 &&
          bookDetails?.images?.map((image, index) => (
            <Image
              key={index}
              src={getImageSrc(image)}
              alt={`Product Thumbnail ${index + 1}`}
              className={`object-contain cursor-pointer ${
                activeImage === image ? "border-2 border-blue-500" : ""
              }`}
              width={100}
              height={100}
              onClick={() => setActiveImage(image)}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageSection;
