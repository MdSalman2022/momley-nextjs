"use client";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ProductShare = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = (url) => {
    window.open(url, "_blank");
  };

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
      <FaXTwitter
        className="bg-black p-1 text-3xl rounded-full text-white cursor-pointer"
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
