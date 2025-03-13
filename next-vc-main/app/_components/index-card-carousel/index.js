'use client'
import styles from './product-card-carousel.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import ProductCard from "../../product/_components/product-card"

export default function IndexCardCarousel({ data = [] }) {
  return (
    <>
      <section
        className={`${styles['g-main-trending']} ${styles['g-trending-px-modified']} pt-0 m-anime m-section2-col5 m-section2-colx`}
      >
        <div className="container-fluid p-0">
          {/* swiper */}
          <div className={styles['g-swiper-sec']}>
            {/* 自定義左右箭頭按鈕 */}
            <div className={styles['custom-swiper-button-prev']}>
              <img
                className=""
                src="/images/product/detail/arrow_left.svg"
                alt=""
              />
            </div>
            <div className={styles['custom-swiper-button-next']}>
              <img
                className=""
                src="/images/product/detail/arrow_right.svg"
                alt=""
              />
            </div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={4}
              navigation={{
                nextEl: `.${styles['custom-swiper-button-next']}`,
                prevEl: `.${styles['custom-swiper-button-prev']}`,
              }}
              breakpoints={{
                390: { slidesPerView: 1 },
                768: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              className={`mySwiper ${styles['g-my-swiper']}`}
            >
              {data?.map((product, i) => (
                <SwiperSlide key={i} className={styles['g-swiper-slide']}>
                <ProductCard data={product}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}
