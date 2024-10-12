"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Autoplay } from "swiper/modules";

import Image from "next/image";
const AdsSlider = ({ ads }) => {
  const { isMobile } = useContext(StateContext);

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper overflow-hidden"
    >
      {ads?.map((ad, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[116px]">
            <Image src={ad?.image} alt="" className="h-full object-cover" />
            <div className="absolute top-0 left-0 p-4">
              <p className={`text-[15px]`} style={{ color: ad.TextColor }}>
                {ad.firstLine}
              </p>
              <p
                className={`font-bold text-2xl`}
                style={{ color: ad.TextColor }}
              >
                {ad.secondLine}
              </p>
              <p className={`text-xs`} style={{ color: ad.TextColor }}>
                {ad.thirdLine}
              </p>
              <span
                className={`text-sm font-semibold flex items-center gap-2`}
                style={{ color: ad.TextColor }}
              >
                <p>Shop Now</p>
                <FaArrowRightLong />
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AdsSlider;
