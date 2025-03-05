'use client'
import './_styles/bootstrap.scss'
import './_styles/cart-checkkist.scss'
import './_styles/index.scss'
import './_styles/cart-information.scss'
import './_styles/cart-finish.scss'
import React, { useEffect } from 'react'
import Link from 'next/link'

export default function FinishPage() {
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const couponObj = localStorage.getItem('coupon')
    const couponId = JSON.parse(couponObj)?.couponId || ''
    console.log(couponId)
    const useCoupon = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/coupon/`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ userId: userId, couponId: couponId }),
        })
        const data = await res.json()
        console.log(data)
        return data
      } catch (err) {
        setError(err.message)
        console.log(err.message)
        return { status: 'fail' }
      }
    }
    useCoupon()
    localStorage.removeItem('coupon')
  }, [])

  return (
    <>
      <div className="m-background mb-5">
        <div className="m-checklist-section1">
          <div className="container-fluid d-flex justify-content-center m-index1">
            <div className="m-sec1-img w-75">
              <img className="img-fluid" src="/images/cart/流程圖3.svg" alt />
            </div>
            <div className="m-sec1-mobile w-75">
              <img
                className="img-fluid"
                src="/images/cart/流程圖3-手機.svg"
                alt
              />
            </div>
          </div>
        </div>
        <div className="m-finish-section2">
          <div className="container d-flex flex-column align-items-center">
            <div className="d-flex">
              <img
                className="py-3 mt-5"
                src="/images/cart/CheckCircle.svg"
                alt
              />
              <div className="h2 m-finish-order pt-4 mt-5">已收到您的訂單</div>
            </div>
            <h4 className="py-2 gray200">您可以在會員中心確認訂單狀態</h4>
          </div>
        </div>
        <div className="m-finish-section3 d-flex justify-content-center mt-4">
          <div className="m-sec3-tip">
            <h4>完成訂單後的注意事項</h4>
            <hr />
            <br />
            <h5>1 . 訂單確認</h5>
            <p>
              請您確認訂單內容是否正確，包含商品名稱、數量及價格。如有任何問題或需要協助，請立即聯繫我們的客服人員，我們將竭誠為您服務。
            </p>
            <h5>2 . 商品檢查與售後服務</h5>
            <p>
              收到商品後，請立即檢查包裝及商品是否完好無損。如有任何損壞或缺漏，請在商品簽收後的48小時內聯繫我們，並提供相關照片或證明。我們將協助您處理後續事宜。
            </p>
          </div>
        </div>
        <div className="m-finish-section4 d-flex justify-content-center">
          <Link href="http://localhost:3000/my-user/order">
            <button
              type="button"
              className="btn btn-dark px-5 py-2 mt-lg-5 mt-3 mb-5"
            >
              查看訂單
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
