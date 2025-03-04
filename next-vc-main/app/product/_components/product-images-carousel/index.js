'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import './product-images-carousel.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import { useState, useEffect, useRef } from 'react'

export default function ProductImagesCarousel({ detailData, selectedSku }) {
  const [selectedImage, setSelectedImage] = useState(0)

  const images = selectedSku
    ? detailData[0]?.images[selectedSku]
    : detailData[0]?.images[detailData[0]?.defaultSelectedSku]

  return (
    <>
      <div className="row h-100">
        <div className="g-side-scroll col-lg-3 d-lg-block d-none h-100">
          {/* swiper */}
          <div className="g-swiper-sec">
            {/* 自定義左右箭頭按鈕 */}
            <div className="custom-swiper-button-prev">
              <img
                className=""
                src="/images/product/detail/arrow_up.svg"
                alt=""
              />
            </div>
            <div className="custom-swiper-button-next">
              <img
                className=""
                src="/images/product/detail/arrow_down.svg"
                alt=""
              />
            </div>
            <Swiper
              direction="vertical"
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={3}
              navigation={{
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
              }}
              className="mySwiper g-my-swiper"
            >
              {images.map((img, index) => (
                <SwiperSlide
                  key={index}
                  className="g-swiper-slide"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    className="h-100 object-fit-cover"
                    src={`/images/product/pd-images/${img}`}
                    alt={detailData[0].name}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="g-main-img col-lg-9 text-center">
          <img
            className="h-100 object-fit-contain"
            src={`/images/product/pd-images/${
              selectedSku
                ? detailData[0]?.images[selectedSku][selectedImage]
                : detailData[0]?.defaultImage
            }`}
            alt={detailData[0].name}
          />
        </div>
        <div className="g-main-img2 col-12 text-center">
          <div className="custom-swiper-button-prev2">
            <img
              className=""
              src="/images/product/detail/arrow_up.svg"
              alt=""
            />
          </div>
          <div className="custom-swiper-button-next2">
            <img
              className=""
              src="/images/product/detail/arrow_down.svg"
              alt=""
            />
          </div>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.custom-swiper-button-next2',
              prevEl: '.custom-swiper-button-prev2',
            }}
            className="mySwiper g-my-swiper"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="g-swiper-slide2">
                <img
                  className="h-100 object-fit-cover"
                  src={`/images/product/pd-images/${img}`}
                  alt={detailData[0].name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

// {
//   images.map((img, index) => (
//     <SwiperSlide className={styles['g-swiper-slide']}>
//       <div key={index} className={`g-img-box w-100 h-100 `} onClick={() => {}}>
//         <img
//           className="h-100 w-100 object-fit-cover"
//           src={`/images/product/pd-images/${img}`}
//           alt={detailData[0].name}
//         />
//       </div>
//     </SwiperSlide>
//   ))
// }
