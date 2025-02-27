'use client'

import React from 'react'
// npm i swiper
import { Swiper, SwiperSlide } from 'swiper/react'
// 可以在這找想加上想要的效果 https://swiperjs.com/demos
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

// import swiper css
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'

export default function HeroSection({
  title = '',
  subTitle = '',
  images,
  ids = [],
}) {
  const src = '/images/activity/'
  // 如果是字串，則分割為陣列 (*輸入也有丟陣列的)
  const imageArr = typeof images == 'string' ? images.split(',') : images

  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Pagination, EffectFade, Autoplay]}
      effect="fade" // fade effect
      loop={imageArr?.length > 1 ? true : false} // 巡迴播放
      autoplay={{
        delay: 5000, // 每 3 秒自動播放一次
        disableOnInteraction: false, // 用戶交互後保持自動播放
      }}
      pagination={{
        clickable: true, // 分頁可點擊
      }}
      className="b-swiper"
    >
      {imageArr?.map((img, i) => (
        <SwiperSlide key={i}>
          <Link
            href={ids.length ? `/activity/${ids[i] + 1}` : '#'}
            style={{ cursor: ids.length ? 'pointer' : 'default' }}
          >
            <div className="position-relative w-100 h-100">
              <div className="b-swiper-text position-relative b-sm-none">
                <div className="b-swiper-title">{title}</div>
                <div className="b-swiper-subtitle">{subTitle}</div>
              </div>

              <Image
                src={`${src}${img}`}
                alt={img || '輪播圖片'}
                fill
                className="object-fit-cover"
                priority
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
