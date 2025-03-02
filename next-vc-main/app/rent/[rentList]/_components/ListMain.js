import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function ListMain({ images }) {
  const [mainImage, setMainImage] = useState(images[0] || 'default-image.jpg');

  useEffect(() => {
    if (images[0]) {
      setMainImage(images[0]);
    }
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (img, index) => {
    setMainImage(img || 'default-image.jpg');
    setActiveIndex(index);
  };

  const handleKeyDown = (e, img, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleImageClick(img, index);
    }
  };

  const imageBasePath = '/images/Rent/pd-images/';

  return (
    <div className="c-pict d-flex justify-content-center c-card">
      {images && images.length > 0 ? (
        <>
          {/* 桌面端側邊縮略圖 */}
          <div
            className="c-pic d-flex flex-column align-items-center d-none d-lg-flex ps-2"
            style={{ paddingTop: '4.5rem' }}
          >
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
                  alt={`縮略圖 ${index}`}
                  width={80}
                  height={80}
                  className={`h-40 w-100 object-fit-cover gap-2 ${
                    index === activeIndex ? 'active' : ''
                  }`}
                />
              </div>
            ))}
          </div>

          {/* 🔴 停用 Autoplay，讓用戶手動切換 */}
          <div className="d-lg-none w-100" style={{ height: '600px' }}> 
            <Swiper
              loop={true}
              slidesPerView={1}
              style={{ height: '100%' }} 
            >
              {images.map((img, index) => (
                <SwiperSlide 
                  key={index} 
                  style={{ 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }} // 🔴 確保 SwiperSlide 內的圖片不變形
                >
                  <Image
                    src={imageBasePath + (img || 'default-image.jpg')}
                    width={300}
                    height={600}
                    alt={`輪播圖 ${index}`}
                    objectFit="contain" // 🔴 確保圖片不變形
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 桌面版主圖 */}
          <div className="c-bpiv d-none d-lg-block w-100" style={{ height: '300px' }}>
            <Image
              key={mainImage}
              className="main-pic object-fit-contain"
              src={imageBasePath + mainImage}
              alt="主圖"
              width={300}
              height={300}
              unoptimized
              objectFit="contain" // 🔴 保持圖片比例
            />
          </div>
        </>
      ) : (
        <div>沒有圖片</div> // 如果沒有圖片數據，顯示錯誤提示
      )}
    </div>
  );
}
