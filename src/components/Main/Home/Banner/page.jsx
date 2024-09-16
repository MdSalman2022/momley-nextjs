"use client";
import Image from "next/image";
import bannerImg from "../../../../../public/images/ads/banner.webp";

const Banner = () => {
  return (
    <div className="">
      <Image
        className="rounded-lg w-full "
        src={bannerImg}
        alt="banner"
        width={1200}
        height={600}
      />
    </div>
  );
};

export default Banner;
