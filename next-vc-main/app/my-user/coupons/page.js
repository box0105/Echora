'use client'

import Image from 'next/image'
import '../_styles/coupons.scss'
import './style.scss'
import MemberLayout from '../layouts/memberLayout'
import React, { useState, useEffect } from 'react'

// import 'bootstrap/dist/css/bootstrap.min.css'

export default function OrderPage() {
  const [coupon, setCoupon] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3005/api/coupon'
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
    <MemberLayout>
      <div className="k-body">
        <div className="section-title h4 ">我的優惠券</div>
        <section className="section">
          {/* <div className="gary-line div">
            <Image
              className="image"
              src="/images/coupon/Vector.svg"
              alt="Vector"
              width={48}
              height={48}
            />
            <ul>
              <li>類型:</li>
              <li>日期:</li>
              <li>折扣:</li>
            </ul>
          </div>
          <div className="gary-line div">123</div> */}

          {coupon.map((item) => (
            <div className="gary-line div">
              <Image
                className="image"
                src="/images/coupon/Vector.svg"
                alt="Vector"
                width={48}
                height={48}
              />
              <li
                key={item.id}
                id={item.id}
              >
                <div className="image-col">
                  <div className="text">
                    <strong>{item.name}</strong>
                    <br />
                    使用日期: {time(item.startTime)}~{time(item.endTime)}
                    <br />
                    折扣: ${item.discount}
                  </div>
                  <br />

                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      notifyAndGet(item.name)
                    }}
                  >
                    領取
                  </button>
                </div>
              </li>
            </div>
          ))}
        </section>
      </div>
    </MemberLayout>
  )
}
