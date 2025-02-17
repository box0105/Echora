'use client';

import React from "react";
// npm i swiper
import { Swiper, SwiperSlide } from "swiper/react";
// 可以在這找想要的效果 https://swiperjs.com/demos 
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import Image from "next/image";

// import swiper css
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

export default function HeroSection({ title = "封面標題", subTitle = "封面副標題", images }) {
  const src = '/images/activity/';

  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Pagination, EffectFade, Autoplay]}
      effect="fade"  // fade effect
      loop={true}
      autoplay={{
        delay: 3000,  // 每 3 秒自動播放一次
        disableOnInteraction: false,  // 用戶交互後保持自動播放
      }}
      pagination={{
        clickable: true,  // 分頁可點擊
      }}
      className="b-swipper">
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="b-swipper-text position-relative b-sm-none">
            <div className="b-swipper-title">{title}</div>
            <div className="b-swipper-subtitle">{subTitle}</div>
          </div>
          <Image src={`${src}${img}`} alt={`Image ${i}`} fill className="object-fit-cover" priority />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
