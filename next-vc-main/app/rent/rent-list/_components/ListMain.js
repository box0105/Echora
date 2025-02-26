'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function ListMain({ images }) {
  const [mainImage, setMainImage] = useState(images[0] || 'default-image.jpg')
  useEffect(() => {
    if (images[0]) {
      setMainImage(images[0])
    }
  }, [images])

  const [activeIndex, setActiveIndex] = useState(0)
  console.log(images)

  const handleImageClick = (img, index) => {
    setMainImage(img || 'default-image.jpg')
    setActiveIndex(index)
  }

  const handleKeyDown = (e, img, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleImageClick(img, index)
    }
  }

  const imageBasePath = '/images/Rent/pd-images/'

  return (
    <div className="c-pict d-flex justify-content-center c-card">
      {images && images.length > 0 ? (
        <>
          <div
            className="c-pic d-flex flex-column align-items-center d-none d-lg-flex ps-2"
            style={{ paddingTop: '4.5rem' }}
          >
            <pre>{JSON.stringify(images, null, 2)}</pre>
            {images.map((img, index) => (
              <div
                key={index}
                tabIndex="0"
                onClick={() => handleImageClick(img, index)}
                onKeyDown={(e) => handleKeyDown(e, img, index)}
                role="button"
              >
                <Image
                  src={imageBasePath + (img || 'default-image.jpg')}
                  alt={`小图 ${index}`}
                  width={80}
                  height={80}
                  className={`h-40 w-100 object-fit-cover gap-2 ${
                    index === activeIndex ? 'active' : ''
                  }`}
                />
              </div>
            ))}
          </div>

          {/* 这里是移动端的轮播图 */}
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
                    src={imageBasePath + (img || 'default-image.jpg')}
                    width={200}
                    height={600}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 主圖部分 */}
          <div
            className="c-bpiv d-none d-lg-block"
            style={{ width: '100%', height: '300px' }}
          >
            <Image
              key={mainImage}
              className="main-pic  object-fit-contain gap-2"
              src={imageBasePath + mainImage}
              alt="主圖"
              width={100}
              height={300}
              unoptimized
            />
          </div>
        </>
      ) : (
        <div>有問題</div> // 如果没有图片数据，显示错误提示
      )}
    </div>
  )
}
