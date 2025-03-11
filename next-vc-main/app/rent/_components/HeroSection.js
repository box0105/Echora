'use client'
import React from 'react';
import BackgroundCarousel from "./BackgroundCarousel"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

export default function HeroSection() {
  return (
    <div className="c-backgrund">
      <div className="c-section1">
        <div className="card text-bg-dark c-section1">
          <MainImage />
          <HeroText />
        </div>
      </div>
    </div>
  );
}



const MainImage = () => (
  <>
    {/* 桌面版轮播图 */}
    <div className="d-none d-md-block">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="/images/Rent/C-main.jpg"
            className="card-img border-radius-0"
            alt="..."
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/Rent/C-main3.jpg"
            className="card-img border-radius-0"
            alt="..."
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/Rent/C-main1.jpg"
            className="card-img border-radius-0"
            alt="..."
          />
        </SwiperSlide>
      </Swiper>
    </div>

    {/* 移动版静态图片 */}
    <img
      src="/images/Rent/C-main.jpg"
      className="card-img d-block d-md-none border-radius-0"
      style={{ height: 400 }}
      alt="..."
    />
  </>
);

const HeroText = () => (
  <div className="card-img-overlay no-rounded-corners d-flex justify-content-satrt align-items-center title-z">
    <div className="col-6 c-section1-text ">
      <Title />
      <Description />
    </div>
  </div>
);

const Title = () => (
  <>
    <h1 className="home-title d-none d-md-block pb-2">
      ELECTRIC GUITAR RENTAL SERVICES
    </h1>
    <h1 className="home-title d-block d-md-none">
      <div className="c-mod-text">
        ELECTRIC <br />
        GUITAR RENTAL <br />
        SERVICES
      </div>
    </h1>
    <div className=" h4 home-2-title d-none d-md-block">
      電吉他租借服務
    </div>
    <h4 className="home-2-title d-block d-md-none">
      <div className="mod-text-1">電吉他租借服務</div>
    </h4>
  </>
);

const Description = () => (
  <div className="c-ptext d-none d-md-block">
    <div className=" h4 home-text">
      電吉他租借服務說明電吉他租借服務電吉他租借服務
      <br />
      電吉他租借服務電吉他租借服務
      <br />
      全台共三間台北、台中、高雄三間門市可取貨
    </div>
    <div className="h4 c-bottom-text">
    <br />
    歡迎來電洽詢</div>
  </div>
);
