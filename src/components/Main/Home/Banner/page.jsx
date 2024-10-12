"use client";
import Image from "next/image";
import bannerImg from "../../../../../public/images/ads/banner.webp";
import { useContext } from "react";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const { isMobile } = useContext(StateContext);
  return (
    <div className="">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper px-4 md:px-0"
      >
        <SwiperSlide>
          <Image className="h-full rounded-xl" src={bannerImg} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <Image className="h-full rounded-xl" src={bannerImg} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <Image className="h-full rounded-xl" src={bannerImg} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <Image className="h-full rounded-xl" src={bannerImg} alt="banner" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
