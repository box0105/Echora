'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { useActivity } from '@/hooks/use-activity'
import './../activity/_styles/act.scss'
import './_styles/home-swiper.scss'

export default function ActivitySwiper() {
  // 取出隨機照片與其對應的活動ID
  const { acts, randomImages: imageArr, randomIds: ids } = useActivity()
  const src = '/images/activity/'

  return (
    <>
      <Swiper
        className="b-swiper b-home-page"
        modules={[Navigation, Autoplay]}
        navigation={true} // 左右分頁
        loop={true} // 巡迴播放
        autoplay={{
          delay: 5000, // 隔幾秒自動播放一次
          disableOnInteraction: false, // 用戶交互後保持自動播放
        }}
        // 照片置中 (偶數張圖片再加上這行)
        // centeredSlides={true}

        // RWD
        breakpoints={{
          576: {
            // 顯示數量
            slidesPerView: 3,
            // 間隔 px
            spaceBetween: 24,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        {imageArr?.map((img, i) => {
          const activity = acts?.[ids[i]]
          const price = activity?.type?.[0]?.price?.toLocaleString()
          return (
            <SwiperSlide key={i}>
              <Link
                href={`/activity/${Number(ids[i]) + 1}`}
                style={{ cursor: ids.length ? 'pointer' : 'default' }}
              >
                <div className="position-relative w-100 h-75">
                  <Image
                    src={`${src}${img}`}
                    alt={img || '輪播圖片'}
                    fill
                    className="object-fit-cover"
                  />
                </div>
              </Link>
              <div className="p-3">
                <div className="h5">{activity?.name}</div>
                <h5>{price > 0 ? `Tickets: $${price}` : 'Free Admission'}</h5>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {/* <pre>{acts && JSON.stringify(acts[0], null, 2)}</pre> */}

      {/* 原本版本 */}
      {/* <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card">
            <img src="/images/cart/card3.png" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title h5">
                Weiwuying International Music Festival
              </h5>
              <p className="card-text h6">衛武營國際音樂節</p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
