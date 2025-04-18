'use client'
import { useState, useEffect } from 'react'
import styles from './rent-card-carousel.module.scss'
import { useProductState } from '@/services/rest-client/use-products'
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function RentCardCarousel() {
  const [data, setData] = useState([])  // 用来存储获取到的数据
  const [isLoading, setIsLoading] = useState(true)  // 用来控制加载状态
  const [isError, setIsError] = useState(false)  // 错误处理
  const router = useRouter()
  const { setFirstSkuId } = useProductState()

  // 获取数据的函数
  const getData = async () => {
    try {
      const res = await fetch('https://echora-kwvs.onrender.com/api/api/rent')  // 你的 API 地址
      const result = await res.json()
      // setData(result.data)  // 设置获取到的数据
      const shuffledData = result.data.sort(() => Math.random() - 0.5).slice(0, 12)

    setData(shuffledData)  // 設置隨機排序後的資料
    } catch (err) {
      console.error('Error fetching data:', err)
      setIsError(true)  // 设置错误状态
    } finally {
      setIsLoading(false)  // 请求完成后关闭加载状态
    }
  }

  // 在组件加载时调用获取数据函数
  useEffect(() => {
    getData()
  }, [])  // 空依赖数组，确保只在组件加载时调用一次

  if (isLoading) {
    return <div>Loading...</div>  // 显示加载状态
  }

  if (isError) {
    return <div>Error loading data</div>  // 显示错误信息
  }

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
            {/* 自定义左右箭头按钮 */}
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
                      router.push(`/rent/${product.id}`)
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
                      <div className="d-flex gap-3">
                        <h6 className="h6">
                          ${product.price.toLocaleString()}/天
                        </h6>
                      </div>
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
