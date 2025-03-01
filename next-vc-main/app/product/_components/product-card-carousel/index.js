'use client'
import styles from './product-card-carousel.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function ProductCardCarousel() {
  return (
    <>
      <section
        className={`${styles['g-also-like']} ${styles['d-px-modified']}`}
      >
        <div className="container-fluid">
          <div
            className={`${styles['g-like-title']} d-flex align-items-baseline gap-1`}
          >
            <h1 className="h1">YOU MAY ALSO LIKE</h1>
            <h5 className="h5 px-1">/</h5>
            <h4>您可能也會喜歡</h4>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={5}
            navigation={{
              nextEl: '.custom-swiper-button-next',
              prevEl: '.custom-swiper-button-prev',
            }}
            breakpoints={{
              390: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1200: { slidesPerView: 5 },
            }}
            className="mySwiper"
          >
              <SwiperSlide>
              <div className={styles['g-product-card']}>
                <div
                  className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                >
                  <div
                    className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                  >
                    Gibson
                  </div>
                  <img className="h-100" src="" alt="" />
                </div>
                <div className={styles['g-pd-text']}>
                  <h6 className="h6">Product Name Product Name Product Name</h6>
                  <div className="d-flex gap-3">
                    <h6 className="h6">$79000</h6>
                    {/* <h6 class="h6">$72900</h6> */}
                  </div>
                  <div className={styles['g-color-row']}>
                    <div>
                      <img width="22px" src="" alt="" />
                    </div>
                  </div>
                  <p className={`p ${styles['g-color-text']}`}>2 colors</p>
                </div>
              </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className={styles['g-product-card']}>
                <div
                  className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                >
                  <div
                    className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                  >
                    Gibson
                  </div>
                  <img className="h-100" src="" alt="" />
                </div>
                <div className={styles['g-pd-text']}>
                  <h6 className="h6">Product Name Product Name Product Name</h6>
                  <div className="d-flex gap-3">
                    <h6 className="h6">$79000</h6>
                    {/* <h6 class="h6">$72900</h6> */}
                  </div>
                  <div className={styles['g-color-row']}>
                    <div>
                      <img width="22px" src="" alt="" />
                    </div>
                  </div>
                  <p className={`p ${styles['g-color-text']}`}>2 colors</p>
                </div>
              </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className={styles['g-product-card']}>
                <div
                  className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                >
                  <div
                    className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                  >
                    Gibson
                  </div>
                  <img className="h-100" src="" alt="" />
                </div>
                <div className={styles['g-pd-text']}>
                  <h6 className="h6">Product Name Product Name Product Name</h6>
                  <div className="d-flex gap-3">
                    <h6 className="h6">$79000</h6>
                    {/* <h6 class="h6">$72900</h6> */}
                  </div>
                  <div className={styles['g-color-row']}>
                    <div>
                      <img width="22px" src="" alt="" />
                    </div>
                  </div>
                  <p className={`p ${styles['g-color-text']}`}>2 colors</p>
                </div>
              </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className={styles['g-product-card']}>
                <div
                  className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                >
                  <div
                    className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                  >
                    Gibson
                  </div>
                  <img className="h-100" src="" alt="" />
                </div>
                <div className={styles['g-pd-text']}>
                  <h6 className="h6">Product Name Product Name Product Name</h6>
                  <div className="d-flex gap-3">
                    <h6 className="h6">$79000</h6>
                    {/* <h6 class="h6">$72900</h6> */}
                  </div>
                  <div className={styles['g-color-row']}>
                    <div>
                      <img width="22px" src="" alt="" />
                    </div>
                  </div>
                  <p className={`p ${styles['g-color-text']}`}>2 colors</p>
                </div>
              </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className={styles['g-product-card']}>
                <div
                  className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                >
                  <div
                    className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                  >
                    Gibson
                  </div>
                  <img className="h-100" src="" alt="" />
                </div>
                <div className={styles['g-pd-text']}>
                  <h6 className="h6">Product Name Product Name Product Name</h6>
                  <div className="d-flex gap-3">
                    <h6 className="h6">$79000</h6>
                    {/* <h6 class="h6">$72900</h6> */}
                  </div>
                  <div className={styles['g-color-row']}>
                    <div>
                      <img width="22px" src="" alt="" />
                    </div>
                  </div>
                  <p className={`p ${styles['g-color-text']}`}>2 colors</p>
                </div>
              </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className={styles['g-product-card']}>
                <div
                  className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                >
                  <div
                    className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                  >
                    Gibson
                  </div>
                  <img className="h-100" src="" alt="" />
                </div>
                <div className={styles['g-pd-text']}>
                  <h6 className="h6">Product Name Product Name Product Name</h6>
                  <div className="d-flex gap-3">
                    <h6 className="h6">$79000</h6>
                    {/* <h6 class="h6">$72900</h6> */}
                  </div>
                  <div className={styles['g-color-row']}>
                    <div>
                      <img width="22px" src="" alt="" />
                    </div>
                  </div>
                  <p className={`p ${styles['g-color-text']}`}>2 colors</p>
                </div>
              </div>
              </SwiperSlide>
            {/* 自定義左右箭頭按鈕 */}
            <div className={styles['custom-swiper-button-prev']}>&#10094;</div>
            <div className={styles['custom-swiper-button-next']}>&#10095;</div>
          </Swiper>
          <div className={`${styles['g-like-row']} row row-cols-4`}>
            <img
              className={`${styles['g-left-arrow']} p-0`}
              src="/images/product/detail/arrow.svg"
              alt=""
            />
            <div className="col p-0">
              <div className={styles['g-product-card']}>
                <div
                  className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                >
                  <div
                    className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                  >
                    Gibson
                  </div>
                  <img className="h-100" src="" alt="" />
                </div>
                <div className={styles['g-pd-text']}>
                  <h6 className="h6">Product Name Product Name Product Name</h6>
                  <div className="d-flex gap-3">
                    <h6 className="h6">$79000</h6>
                    {/* <h6 class="h6">$72900</h6> */}
                  </div>
                  <div className={styles['g-color-row']}>
                    <div>
                      <img width="22px" src="" alt="" />
                    </div>
                  </div>
                  <p className={`p ${styles['g-color-text']}`}>2 colors</p>
                </div>
              </div>
            </div>
            <div className="col p-0">
              <div className={styles['g-product-card']}>
                <div
                  className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                >
                  <div
                    className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                  >
                    Gibson
                  </div>
                  <img className="h-100" src="" alt="" />
                </div>
                <div className={styles['g-pd-text']}>
                  <h6 className="h6">Product Name Product Name Product Name</h6>
                  <div className="d-flex gap-3">
                    <h6 className="h6">$79000</h6>
                    {/* <h6 class="h6">$72900</h6> */}
                  </div>
                  <div className={styles['g-color-row']}>
                    <div>
                      <img width="22px" src="" alt="" />
                    </div>
                  </div>
                  <p className={`p ${styles['g-color-text']}`}>2 colors</p>
                </div>
              </div>
            </div>
            <img
              className={`${styles['g-right-arrow']} p-0`}
              src="/images/product/detail/arrow-right.svg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  )
}
