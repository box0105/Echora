'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function ListMain(props) {
  const images = [
    '/images/Rent/main-img.png',
    '/images/Rent/small-img.png',
    '/images/Rent/small-img-2.png',
    '/images/Rent/small-img-3.png',
    '/images/Rent/small-img4.png',
  ]

  const [mainImage, setMainImage] = useState(images[0])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleImageClick = (img, index) => {
    setMainImage(img)
    setActiveIndex(index)
  }

  const handleKeyDown = (e, img, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleImageClick(img, index)
    }
  }

  return (
    <>
      <div className="c-pict d-flex justify-content-center c-card">
        {/* 桌機版小圖列表，保持不變 */}
        <div
          className="c-pic d-flex flex-column align-items-center d-none d-lg-flex"
          style={{ paddingTop: '4.5rem' }}
        >
          <i className="fa-solid fa-angle-up" />
          {images.slice(1).map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="小圖"
              width={80}
              height={80}
              onClick={() => handleImageClick(img, index + 1)}
              onKeyDown={(e) => handleKeyDown(e, img, index + 1)}
              role="button"
              tabIndex="0"
              style={{
                border:
                  activeIndex === index + 1 ? '2px solid #007aff' : 'none',
                cursor: 'pointer',
                marginBottom: '0.5rem',
              }}
            />
          ))}
          <i className="fa-solid fa-angle-down" />
        </div>

        {/* 行動裝置版：使用全圖輪播，自動播放且無按鈕、無小圖 */}
        <div className="d-lg-none" style={{ width: '80%' }}>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={`圖片 ${index}`}
                  width={600}
                  height={600}
                  unoptimized
                  style={{ width: '100%', height: 'auto' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 主圖部分，保持不動 */}
        <div className="c-bpiv d-none d-lg-block">
          <Image
            key={mainImage}
            className="main-pic img-fluid"
            src={mainImage}
            alt="主圖"
            width={600}
            height={600}
            unoptimized
          />
        </div>
      </div>
    </>
  )
}
