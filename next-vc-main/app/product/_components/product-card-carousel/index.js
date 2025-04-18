'use client'
import styles from './product-card-carousel.module.scss'
import { useProductState } from '@/services/rest-client/use-products'
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function ProductCardCarousel({ data = [] }) {
  const router = useRouter()
  const { setFirstSkuId } = useProductState()
  return (
    <>
      <section
        className={`${styles['g-also-like']} ${styles['d-px-modified']}`}
      >
        <div className="container-fluid p-0">
          <div
            className={`${styles['g-like-title']} d-flex align-items-baseline gap-1`}
          >
            <h1 className="h1">YOU MAY ALSO LIKE</h1>
            <h5 className="h5 px-1">/</h5>
            <h4>您可能也會喜歡</h4>
          </div>
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
                  <button
                    className={styles['g-product-card']}
                    onClick={() => {
                      setFirstSkuId(product.product_sku_id)
                      router.push(`/product/detail/${product.id}`)
                    }}
                  >
                    <div
                      className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
                    >
                      <div
                        className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
                      >
                        {product.brand_name}
                      </div>
                      <img
                        className="h-100"
                        src={`/images/product/pd-images/${product.image}`}
                        alt=""
                      />
                    </div>
                    <div className={styles['g-pd-text']}>
                      <h6 className="h6">{product.name}</h6>
                      <div className="d-flex gap-2">
                        {product.discount_price ? (
                          <>
                            <h6
                              className="h7"
                              style={{
                                color: 'var(--grey500)',
                                textDecoration: 'line-through',
                              }}
                            >
                              ${product.price.toLocaleString()}
                            </h6>
                            <h6 className="h7" style={{ color: 'var(--red)' }}>
                              ${product.discount_price.toLocaleString()}
                            </h6>
                          </>
                        ) : (
                          <h6 className="h7">${product.price.toLocaleString()}</h6>
                        )}
                      </div>
                      {/* <div className={styles['g-color-row']}>
                        <div>
                          <img width="22px" src="" alt="" />
                        </div>
                      </div>
                      <p className={`p ${styles['g-color-text']}`}>2 colors</p> */}
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}
