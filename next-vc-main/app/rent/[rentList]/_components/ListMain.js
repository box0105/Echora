import { useState, useEffect, useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import styles from './ImageGallery.module.scss';

const ImageSlider = ({ images, imageBasePath = '/images/Rent/pd-images/', brand }) => {
  const [mainImage, setMainImage] = useState(images[0] || 'default-image.jpg')
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollIndex, setScrollIndex] = useState(0)
  const visibleThumbnails = 3 // 顯示的縮略圖數量

  // 根據品牌名稱決定主圖是否添加 w-100 類別
  const mainImageClass = brand === 'Gibson' ? 'w-100' : '';

  useEffect(() => {
    if (images[0]) {
      setMainImage(images[0])
    }
  }, [images])

  const handleImageClick = (img, index) => {
    setMainImage(img || 'default-image.jpg')
    setActiveIndex(index)
  }

  const handleKeyDown = (e, img, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleImageClick(img, index)
    }
  }

  const handleScrollUp = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleScrollDown = () => {
    setScrollIndex((prev) =>
      Math.min(prev + 1, images.length - visibleThumbnails)
    )
  }

  // useEffect(() => {
  //   console.log('images:', images)
  // }, [images])

  useEffect(() => {
    if (images[0]) {
      setMainImage(images[0])
    }
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.update() // 強制更新 Swiper
    }
  }, [images])
  return (
    <div className="relative w-full max-w-lg d-flex">
      {/* 桌面端側邊縮略圖 */}
      <div
        className="d-flex flex-column align-items-center d-none d-lg-flex ps-2 gap-2"
        style={{
          paddingTop: '10rem',
          width: '200px',
          height: '800px',
          position: 'relative',
        }}
      >
        <button
          className="btn btn-light"
          onClick={handleScrollUp}
          disabled={scrollIndex === 0}
        >
          <img src="/images/Rent/Vector.png" alt="上移" />
        </button>

        {/* 縮略圖 */}
        <div className="overflow-hidden" style={{ height: '500px' }}>
          <div
            className="d-flex flex-column justify-content-center gap-4"
            style={{
              transform: `translateY(-${scrollIndex * 110}px)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                tabIndex="0"
                onClick={() => handleImageClick(img, index)}
                onKeyDown={(e) => handleKeyDown(e, img, index)}
                role="button"
                className="text-center"
              >
                <Image
                  src={`${imageBasePath}${img || 'default-image.jpg'}`}
                  alt={`縮略圖 ${index}`}
                  width={100}
                  height={100}
                  className={`${styles.image} ${index === activeIndex ? styles.active : ''}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn btn-light"
          onClick={handleScrollDown}
          disabled={scrollIndex >= images.length - visibleThumbnails}
        >
          <img src="/images/Rent/arrow.png" alt="下移" />
        </button>
      </div>

      {/* 移動端輪播圖 */}
      <div className="d-lg-none w-100" style={{ height: '500px' }}>
        <Swiper modules={[Navigation]} loop={true} slidesPerView={1} 
        observer={true}          // 新增：監聽 Swiper 自身變化
        observeParents={true} 
         style={{ height: '100%' }}>
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={`${imageBasePath}${img || 'default-image.jpg'}`}
                width={300}
                height={450}
                // layout="responsive"
                alt={`輪播圖 ${index}`}
                style={{ objectFit: 'contain' }}
                className="w-100"
                priority={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 桌面版主圖 */}
      <div style={{ marginLeft: '160px' }} className="d-none d-lg-block">
        <div
          className="c-bpiv d-none d-lg-block w-100"
          style={{ height: '900px', paddingTop: '72px', paddingBottom: '72px' }}
        >
          <Image
            key={mainImage}
            className={`main-pic h-100 object-fit-contain ${mainImageClass}`}
            src={`${imageBasePath}${mainImage}`}
            alt="主圖"
            width={535}
            height={800}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageSlider;
