'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import ReactHtmlParser from 'html-react-parser'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export default function ArticleCard({ isLeft = true, article }) {
  const src = '../images/activity/'
  const imageArr = article.images?.split(',')

  return (
    <div className="b-act-card col-12">
      <div className="card">
        <div className="row g-0">
          {/* card-image */}
          <div
            className={`col-12 col-xl-5 ${
              isLeft ? 'order-first' : 'order-xl-last'
            }`}
          >
            <Swiper
              navigation={true}
              modules={[Navigation, Pagination, Autoplay]}
              loop={imageArr?.length > 1 ? true : false}
              autoplay={{
                delay: 5000, // 每幾秒自動播放一次
                disableOnInteraction: false, // 用戶交互後保持自動播放
              }}
              pagination={{
                dynamicBullets: true,
                clickable: true, // 分頁可點擊
              }}
              className="b-swiper"
            >
              {imageArr?.map((img, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Image
                      src={`${src}${img}`}
                      alt={img}
                      fill
                      className="b-swiper-image object-fit-cover"
                      priority
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

          {/* card-body */}
          <div className="col-12 col-xl-7">
            <div className="card-body d-flex flex-column px-4 py-3">
              <div className="b-text d-flex flex-column pt-2">
                <h2 className="card-title mb-4 text-center">
                  {ReactHtmlParser(article.title || '')}
                </h2>
                <h5 className="card-text">
                  {ReactHtmlParser(article?.content || '')}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
