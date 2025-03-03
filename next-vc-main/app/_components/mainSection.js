import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import styles from '../_styles/carousel.module.scss' // 若使用 CSS modules

export default function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      effect="fade"
      speed={1700}
      fadeEffect={{
        crossFade: true, // 淡入淡出時是否交叉顯示
      }}
      pagination={{
        clickable: true,
      }}
      className={styles.swiperContainer}
    >
      <SwiperSlide>
        <img
          src="/images/index/slide1.png"
          alt="Slide 1"
          className={styles.slideImage}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/index/slide2.webp"
          alt="Slide 2"
          className={styles.slideImage}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/index/slide5.jpg"
          alt="Slide 3"
          className={styles.slideImage}
        />
      </SwiperSlide>
    </Swiper>
  )
}
