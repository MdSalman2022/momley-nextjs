"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ImageSection = ({ bookDetails, cloudFrontURL }) => {
  const [activeImage, setActiveImage] = useState(bookDetails?.images[0]);

  useEffect(() => {
    if (bookDetails?.images?.length > 0) {
      setActiveImage(bookDetails.images[0]);
    }
  }, [bookDetails]);

  const getImageSrc = (image) => {
    return cloudFrontURL.replace("*", `products/${image}`);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {activeImage && (
        <Image
          src={getImageSrc(activeImage)}
          alt="Active Product Image"
          className="object-contain"
          width={360}
          height={400}
        />
      )}

      <div className="flex items-center gap-1">
        {bookDetails?.images?.map((image, index) => (
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
