'use client'

import './style.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useRef, useState, useEffect } from 'react'
import { useMyCoupon } from '@/hooks/use-coupon'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import Swal from 'sweetalert2'
// import { array } from 'prop-types'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import required modules
import { Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules'

export default function CouponPage() {
  const [coupon, setCoupon] = useState([])
  const [userCoupons, setUserCoupons] = useState([])
  const { notifyAndGet, notifyAndGetAll, time } = useMyCoupon()
  const { isAuth } = useAuth()
  const progressCircle = useRef(null)
  const progressContent = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://echora-kwvs.onrender.com/api/coupon'
        const res = await fetch(url)
        if (!res.ok) throw new Error('狀態錯誤')
        const data = await res.json()
        console.log(data.data)
        setCoupon(data.data)
      } catch (err) {
        console.log('發生錯誤', err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isAuth) {
      fetchUserCoupon()
    }
  }, [isAuth])

  const fetchUserCoupon = async () => {
    const userId = getUserId()
    console.log(userId)
    try {
      const url = `https://echora-kwvs.onrender.com/api/coupon/${userId}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('狀態錯誤')
      const data = await res.json()
      console.log(data)
      setUserCoupons(data.data)
    } catch (err) {
      console.log('發生錯誤', err)
    }
    // fetchUserCoupon()
  }

  const getUserId = () => localStorage.getItem('userId')

  return (
    <>
      <div className="container-fluid k-container">
        <main className="k-main">
          {/* <div className="content ">
            <div className="title flex-column">
              <div>SPECIAL OFFER</div>
              <span>聖誕季優惠活動 LES系列9折優惠</span>
            </div>
            <div className="title flex-column">
              <Link href="/my-user">
                <h1 className=" btn btn-outline-light mt-2">立即加入會員</h1>

              </Link>
              <h6>活動期間:2024/12/01 - 2025/01/31</h6>
            </div>
          </div> */}
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="k-Swiper"
          >
            <SwiperSlide>
              <div className="k-content">
                <div className="title flex-column">
                  <div>SPECIAL OFFER</div>
                  <span>聖誕季優惠活動 七折優惠券趕快領取</span>
                </div>
                <div className="title flex-column">
                  <Link href="/my-user">
                    <h1 className=" btn btn-outline-light mt-2">
                      立即加入會員
                    </h1>
                  </Link>
                  <h6>活動期間:2024/12/01 - 2025/01/31</h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="k-content">
                <div className="title flex-column">
                  <div>SPECIAL OFFER</div>
                  <span>共襄盛舉音樂節 最高可折五百元優惠券</span>
                </div>
                <div className="title flex-column">
                  <Link href="/my-user">
                    <h1 className=" btn btn-outline-light mt-2">
                      立即加入會員
                    </h1>
                  </Link>
                  <h6>活動期間:2025/2/28 - 2025/3/10</h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="k-content">
                <div className="title flex-column">
                  <div>SPECIAL OFFER</div>
                  <span>大港開唱 領取優惠大膽「暢」買</span>
                </div>
                <div className="title flex-column">
                  <Link href="/my-user">
                    <h1 className=" btn btn-outline-light mt-2">
                      立即加入會員
                    </h1>
                  </Link>
                  <h6>活動期間:2025/3/29 - 2025/4/15</h6>
                </div>
              </div>
            </SwiperSlide>
            {/* <SwiperSlide>
              <div className="content">
                <div className="title flex-column">
                  <div>SPECIAL OFFER</div>
                  <span>聖誕季優惠活動 LES系列9折優惠</span>
                </div>
                <div className="title flex-column">
                  <Link href="/my-user">
                    <h1 className=" btn btn-outline-light mt-2">
                      立即加入會員
                    </h1>
                  </Link>
                  <h6>活動期間:2024/12/01 - 2025/01/31</h6>
                </div>
              </div>
            </SwiperSlide> */}
            {/* <SwiperSlide>
              <div className="content">
                <div className="title flex-column">
                  <div>SPECIAL OFFER</div>
                  <span>聖誕季優惠活動 LES系列9折優惠</span>
                </div>
                <div className="title flex-column">
                  <Link href="/my-user">
                    <h1 className=" btn btn-outline-light mt-2">
                      立即加入會員
                    </h1>
                  </Link>
                  <h6>活動期間:2024/12/01 - 2025/01/31</h6>
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </main>

        <article className="k-article">
          <div className="k-title">
            <h1 className="h1" aria-current="page" href="#">
              COUPONS / <span className="span">會員優惠券專區</span>
            </h1>
          </div>
          <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-md-auto row-cols-sm-auto ">
            {coupon
              .filter((item) => item.isDelete != 1)
              .map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className=" col-lg-4 col-md-6 col-sm-12 col-xxl-3 image-col"
                >
                  <div className="col">
                    <div className="text">
                      <div className="d-flex"></div>
                      <div className="h3">
                        <b>{item.name}</b>
                      </div>
                      <div>
                        使用時間:
                        <br />
                        {time(item.startTime)}~{time(item.endTime)}
                      </div>
                      <div className="ms-3">
                        {userCoupons
                          .map((v) => v.couponId)
                          .includes(item.id) ? (
                          <button
                            className="btn btn-secondary "
                            onClick={async () => {
                              if (isAuth) {
                                await notifyAndGet(item.id, item.typeId)
                                await fetchUserCoupon()
                              } else {
                                Swal.fire({
                                  text: '請先登入',
                                  icon: 'info',
                                  iconColor: 'var(--grey700)',
                                  confirmButtonColor: 'var(--grey900)',
                                })
                                // alert('請先登入')
                              }
                            }}
                          >
                            {userCoupons
                              .map((v) => v.couponId)
                              .includes(item.id)
                              ? '已領取'
                              : '領取'}
                          </button>
                        ) : (
                          <button
                            className="btn btn-dark "
                            onClick={async () => {
                              if (isAuth) {
                                await notifyAndGet(item.id, item.typeId)
                                await fetchUserCoupon()
                              } else {
                                Swal.fire({
                                  text: '請先登入',
                                  icon: 'info',
                                  iconColor: 'var(--grey700)',
                                  confirmButtonColor: 'var(--grey900)',
                                })
                                // alert('請先登入')
                              }
                            }}
                          >
                            {userCoupons
                              .map((v) => v.couponId)
                              .includes(item.id)
                              ? '已領取'
                              : '領取'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </div>
          <div className="k-btn">
            <button
              className="btn btn-outline-dark"
              onClick={async () => {
                if (isAuth) {
                  await notifyAndGetAll()
                  await fetchUserCoupon()
                } else {
                  Swal.fire({
                    text: '請先登入',
                    icon: 'info',
                    iconColor: 'var(--grey700)',
                    confirmButtonColor: 'var(--grey900)',
                  })
                  // alert('請先登入')
                }
              }}
            >
              全部領取
            </button>
          </div>
        </article>
      </div>
    </>
  )
}
