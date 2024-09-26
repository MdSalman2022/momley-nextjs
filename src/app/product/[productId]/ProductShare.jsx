"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const ProductShare = () => {
  const handleShare = (url) => {
    window.open(url, "_blank");
  };
  const currentUrl = window.location.href;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    currentUrl
  )}`;
  const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div className="flex items-center gap-5">
      Share:
      <FaFacebookF
        className="bg-blue-500 p-1 text-3xl rounded-full text-white cursor-pointer"
        onClick={() => handleShare(facebookShareUrl)}
      />
      <FaTwitter
        className="bg-sky-500 p-1 text-3xl rounded-full text-white cursor-pointer"
        onClick={() => handleShare(twitterShareUrl)}
      />
      <FaInstagram
        className="bg-pink-500 p-1 text-3xl rounded-full text-white cursor-pointer"
        onClick={() => handleShare(instagramShareUrl)}
      />
    </div>
  );
};

export default ProductShare;
