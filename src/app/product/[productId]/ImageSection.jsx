"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

const ImageSection = ({ bookDetails }) => {
  const { setIsPrimaryMobileFooterVisible, storeInfo } =
    useContext(StateContext);

  useEffect(() => {
    setIsPrimaryMobileFooterVisible(false);
    return () => {
      setIsPrimaryMobileFooterVisible(true);
    };
  }, [setIsPrimaryMobileFooterVisible]);

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (bookDetails?.images?.length > 0) {
      setActiveImage(bookDetails.images[0]);
    }
  }, [bookDetails]);

  const getImageSrc = (image) => {
    if (storeInfo?.cloudFrontURL) {
      return storeInfo.cloudFrontURL.replace("*", `products/${image}`);
    } else {
      // Handle the case where cloudFrontURL is undefined
      return "/placeholder-image.png"; // Use a placeholder image or handle appropriately
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {activeImage && storeInfo?.cloudFrontURL ? (
        <Image
          src={getImageSrc(activeImage)}
          alt="Active Product Image"
          className="object-contain md:w-[360px]"
          width={360}
          height={400}
        />
      ) : (
        // Optionally render a placeholder or loading state
        <div>Loading image...</div>
      )}

      <div className="hidden md:flex items-center gap-1">
        {bookDetails?.images?.length > 0 && storeInfo?.cloudFrontURL ? (
          bookDetails.images.map((image, index) => (
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
          ))
        ) : (
          // Optionally render a placeholder or loading state
          <div>Loading thumbnails...</div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
