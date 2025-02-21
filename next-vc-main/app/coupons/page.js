'use client'

import './style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { useMyCoupon } from '@/hooks/use-coupon'

export default async function CouponPage() {
  const [coupon, setCoupon] = useState([])
  const { notifyAndGet } = useMyCoupon()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3005/api/coupon'
        const res = await fetch(url)
        if (!res.ok) throw new Error('狀態錯誤')
        const data = await res.json()
        // console.log(data.data)
        setCoupon(data.data)
      } catch (err) {
        console.log('發生錯誤', err)
      }
    }
    fetchData()
  }, [])

  // 轉換時間格式
  const time = (time) => {
    if (!time) {
      console.log('沒有時間')
    } else console.log('輸入時間')
    const isoDateString = time
    const date = new Date(isoDateString)

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    const readableDate = date.toLocaleDateString('zh-TW', options) // 繁體中文

    // console.log(readableDate); 輸出：2024/7/27 （或 2024年7月27日，取決於地區設定）
    return readableDate
  }

  return (
    <>
      <div className="container-fluid">
        <main className="k-main">
          <div className="content ">
            <div className="title flex-column">
              <div>SPECIAL OFFER</div>
              <span>聖誕季優惠活動 LES系列9折優惠</span>
            </div>
            <div className="title flex-column">
              <h1 className="btn btn-outline-light">立即加入會員</h1>
              <h6>活動期間:2024/12/01 - 2025/01/31</h6>
            </div>
          </div>
        </main>

        <article className="k-article">
          <div className="k-title">
            <h1 className="h1" aria-current="page" href="#">
              COUPONS / <span className="span">會員優惠券專區</span>
            </h1>
          </div>
          <div className="row row-cols-lg-4 row-cols-md-4 row-cols-sm-1 row-cols-xm-1 row-cols-xxm-1  ">
            {coupon.map((item) => (
              <li
                key={item.id}
                id={item.id}
                className=" col-lg-3 col-md-6 col-sm-12 col-xxl-3 image-col"
              >
                <div className="col ">
                  <div className="text">
                    {item.name}
                    <br />${item.discount}
                  </div>
                  <br />

                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      notifyAndGet(item.id)
                    }}
                  >
                    領取
                  </button>
                </div>
              </li>
            ))}
          </div>
          <div className="k-btn">
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                coupon.map((item) => {
                  notifyAndGet(coupon.map((item) => item.id))
                })
              }}
            >
              全部領取
            </button>
          </div>
        </article>
        <hr />
      </div>
    </>
  )
}
