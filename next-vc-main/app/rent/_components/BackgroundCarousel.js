import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

function BackgroundCarousel() {
  return (
    <div className="c-background">
      <Swiper
        slidesPerView={1} // 每次显示一个背景
        spaceBetween={0}
        navigation={true} // 启用左右箭头
        modules={[Navigation]} // 导航模块
        className="c-mySwiper"
      >
        {/* 每个 SwiperSlide 中设置不同的背景图片 */}
        <SwiperSlide style={{ backgroundImage: 'url(/images/Rent/background.png)' }} />
        <SwiperSlide style={{ backgroundImage: 'url(/images/Rent/background.png)' }} />
        <SwiperSlide style={{ backgroundImage: 'url(/images/Rent/background.png)' }} />
        {/* 可以继续添加更多的图片 */}
      </Swiper>
    </div>
  );
}

export default BackgroundCarousel;
