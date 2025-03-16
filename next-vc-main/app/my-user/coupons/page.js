'use client'

import Image from 'next/image'
import '../_styles/coupons.scss'
import MemberLayout from '../layouts/memberLayout'
import React, { useState, useEffect, useCallback } from 'react'
import { useMyCoupon } from '@/hooks/use-coupon'
import { useAuth } from '@/hooks/use-auth'

export default function UserCouponPage() {
  const [coupon, setCoupon] = useState([])
  const { time, clear } = useMyCoupon()
  const [user, setUser] = useState(null)
  const [btn, setBtn] = useState(false)
  const { isAuth } = useAuth()

  useEffect(() => {
    const user = localStorage.getItem('userId')
    setUser(user)
    console.log(user)
  }, [user])

  useEffect(() => {
    if (isAuth) {
      fetchData()
    }
  }, [isAuth, user])

  //useCallback(fn,deps)記憶一個函數 當(fn,deps)的deps(依賴項陣列)值變化才會重新建立函數 節省效能
  const fetchData = useCallback(async () => {
    if (!user) return // 確保 user 存在
    try {
      const url = `http://localhost:3005/api/coupon/${user}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('狀態錯誤')
      const data = await res.json()
      console.log(data.userCheckCoupons)
      setCoupon(data.userCheckCoupons)
    } catch (err) {
      console.log(err.message)
    }
  }, [user]) //空陣列 表示fetchData沒有依賴任何外部變數

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [fetchData, btn, user, setBtn])

  const handleClearClick = async () => {
    if (!user) return // 確保 user 存在
    // 呼叫 clear 函數
    await clear(user)
    // 設定 btn 狀態變數為 true，觸發 useEffect Hook 重新執行
    setBtn((prev) => !prev)
  }

  return (
    <MemberLayout>
      <div className="body k-body">
        <div className="section-title h4 ">我的優惠券</div>
        <section className="section">
          {coupon.map((item) =>
            item.isDeleted == false ? (
              <div className="gary-line div" key={item.id}>
                <Image
                  className="image"
                  src="/images/coupon/Vector.svg"
                  alt="Vector"
                  width={48}
                  height={48}
                />
                <li key={item.id} id={item.id}>
                  <div className="image-col">
                    <div className="text">
                      <strong>{item.name}</strong>
                      <br />
                      使用日期: {time(item.startTime)}~{time(item.endTime)}
                      <br />
                      折扣: ${item.discount}
                    </div>
                    <br />

                    {/* <button
                    className="btn btn-dark"
                    onClick={() => {
                      notifyAndGet(item.name)
                    }}
                  >
                    領取
                  </button> */}
                  </div>
                </li>
              </div>
            ) : (
              ''
            )
          )}

          <div className="h4 mb-0">
            已使用/已失效
            <div className="clear">
              <button
                className="btn btn-dark"
                onClick={async () => {
                  if (isAuth) {
                    handleClearClick()
                  } else {
                    alert('錯誤')
                  }
                }}
              >
                全部清除
              </button>
            </div>
          </div>
          {coupon.map((item) =>
            item.isDeleted == true ? (
              <div className="gary-line div garybg" key={item.id}>
                <Image
                  className="image "
                  src="/images/coupon/Vector-b.svg"
                  alt="Vector"
                  width={48}
                  height={48}
                />
                <li key={item.id} id={item.id}>
                  <div className="image-col">
                    <div className="text">
                      <strong>{item.name}</strong>
                      <br />
                      使用日期: {time(item.startTime)}~{time(item.endTime)}
                      <br />
                      折扣: ${item.discount}
                    </div>
                    <br />

                    {/* <button
                    className="btn btn-light"
                    onClick={() => {
                      notifyAndGet(item.name)
                    }}
                  >
                    刪除
                  </button> */}
                  </div>
                </li>
              </div>
            ) : (
              ''
            )
          )}
        </section>
      </div>
    </MemberLayout>
  )
}
