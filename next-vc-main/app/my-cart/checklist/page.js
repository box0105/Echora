'use client'
import './_styles/bootstrap.scss'
import './_styles/cart-checkkist.scss'
import './_styles/style0.scss'
import './_styles/index.scss'
import '../../_styles/nav.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import CartList from './_components/cart-list'

import React, { useState, useEffect } from 'react'

export default function ChecklistPage(props) {
  const [cartItems, setCartItems] = useState([]) // 初始化狀態
  const [totalAmount, setTotalAmount] = useState(0)
  const [total, setTotal] = useState(0)
  const [coupon, setCoupon] = useState(1000)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItem')) || []
    setCartItems(storedCart)

    // 計算總金額
    const total = storedCart.reduce(
      (acc, v) => acc + v.count * v.price,
      0
    )
    const totalMax = total - coupon
    setTotal(totalMax)
    setTotalAmount(total)
  }, [cartItems]) // 空依賴陣列，確保只在組件掛載時執行

  return (
    <>
      <div className="m-background">
        <div className="m-checklist-section1">
          <div className="container-fluid p-0 d-flex justify-content-center m-index1">
            <div className="m-sec1-img w-75">
              <img className="img-fluid" src="/images/cart/流程圖.svg" alt />
            </div>
            <div className="m-sec1-mobile w-75">
              <img
                className="img-fluid"
                src="/images/cart/流程圖-手機.svg"
                alt
              />
            </div>
          </div>
        </div>
        <div className="m-checklist-section2 w-100">
          <div className="container-fluid m-index1 row">
            <div className="m-sec2-col8 col-lg-8 col-12">
              <div className="d-flex justify-content-between align-items-end py-4">
                <div className="h2">購物車清單</div>
                <h3>{cartItems.length} 件商品</h3>
              </div>
              <div className="row row-cols-1">
                <CartList cartItems={cartItems} />
              </div>
            </div>
            <div className="m-sec2-col4 col-lg-4 col-12">
              <div className="h3 pt-4 pb-2">訂單確認</div>
              <div className="d-flex justify-content-between py-2">
                <h5>小計 :</h5>
                <h5>NT$ {totalAmount}</h5>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h5>運費 :</h5>
                <h5>Free</h5>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h5>優惠券 :</h5>
                <select
                  className="form-select form-select-sm w-50"
                  aria-label="Small select example"
                >
                  <option selected>未使用優惠券</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h5>折扣 :</h5>
                <h5>-{coupon}</h5>
              </div>
              <hr />
              <div className="d-flex justify-content-between py-3">
                <h4 className="h4">總計 :</h4>
                <h4 className="h4">NT$ {total}</h4>
              </div>
              <button type="button" className="btn btn-dark w-100 mt-5">
                結帳
              </button>
            </div>
          </div>
        </div>
        <div className="m-section3 w-100">
          <div className="container-fluid m-index">
            <div className="m-index-title">
              <h1 className="h3">
                TRENDING DEALS<span> / 熱門優惠商品</span>
              </h1>
            </div>
            <div className="row row-cols-lg-4 row-cols-1 w-100 g-0">
              <div className="col card-group">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img
                    src="/images/cart/card2-img.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Product Name</h3>
                    <h4 className="card-text">Productttt</h4>
                    <div className="d-flex">
                      <h5 className="card-text">$77999</h5>
                      <span>$72900</span>
                    </div>
                    <p>2 COLORS</p>
                  </div>
                </div>
              </div>
              <div className="col card-group d-none d-lg-block">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img
                    src="/images/cart/card2-img.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Product Name</h3>
                    <h4 className="card-text">Productttt</h4>
                    <div className="d-flex">
                      <h5 className="card-text">$77999</h5>
                      <span>$72900</span>
                    </div>
                    <p>2 COLORS</p>
                  </div>
                </div>
              </div>
              <div className="col card-group d-none d-lg-block">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img
                    src="/images/cart/card2-img.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Product Name</h3>
                    <h4 className="card-text">Productttt</h4>
                    <div className="d-flex">
                      <h5 className="card-text">$77999</h5>
                      <span>$72900</span>
                    </div>
                    <p>2 COLORS</p>
                  </div>
                </div>
              </div>
              <div className="col card-group d-none d-lg-block">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img
                    src="/images/cart/card2-img.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Product Name</h3>
                    <h4 className="card-text">Productttt</h4>
                    <div className="d-flex">
                      <h5 className="card-text">$77999</h5>
                      <span>$72900</span>
                    </div>
                    <p>2 COLORS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
