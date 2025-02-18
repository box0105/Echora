'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export default function ArticleCard({ images }) {
  const src = '../images/activity/'

  return (
    <div className="col-12">
      <div className="card">
        <div className="row g-0">
          <div className="col-12 col-xl-6">
            <Swiper
              navigation={true}
              modules={[Navigation, Pagination, Autoplay]}
              loop={true}
              effect="fade" // fade effect
              autoplay={{
                delay: 10000, // 每 10 秒自動播放一次
                disableOnInteraction: false, // 用戶交互後保持自動播放
              }}
              pagination={{
                dynamicBullets: true,
                clickable: true,  // 分頁可點擊
              }}
              className="b-swiper"
            >
              {images?.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={`${src}${img}`}
                    alt={img}
                    fill
                    className="object-fit-cover"
                    priority
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* card-body */}
          <div className="col-12 col-xl-6">
            <div className="card-body d-flex flex-column p-4">
              <div className="b-text d-flex flex-column pt-2">
                <h2 className="card-title mb-4 text-center">
                  ✫ 浮現祭 EMERGE FEST 2025 ✫
                  <br />
                  藝人食堂介紹
                </h2>
                <h5 className="card-text">
                  暖心先暖胃！浮現祭藝人食堂店家大公開(っ˘ڡ˘ς)
                  特搜台中、清水超強美食，網羅在地限定美味🥢
                  <br />
                  <br />
                  每次演出都是一場盛宴，音樂人們需要滿足的胃才能全力發揮！今年我們特別邀請了來自台中、清水的超強在地美食進駐浮現祭藝人食堂，希望能讓從全台、甚至亞洲各地遠道而來的音樂人們，在味蕾留下屬於清水的記憶，用舌尖感受來自清水的美味溫暖與飽足能量。
                  <br />
                  <br />
                  難得來一趟清水，除了享受音樂，也不能放過任何美味😋
                  快到這些店家一探究竟，跟你偶像品嘗同款餐點吧！
                  一起解鎖屬於清水的味蕾驚喜 (๑ᵔ⤙ᵔ๑)👍
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
