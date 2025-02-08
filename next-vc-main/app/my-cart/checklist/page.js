'use client'
import './css/bootstrap.scss'
import './css/cart-checkkist.scss'
import './css/style0.scss'
import './css/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import React, { useState, useEffect } from 'react'

export default function ChecklistPage(props) {
  return (
    <>
      <div className="m-background">
        <div className="m-checklist-section1">
          <div className="container-fluid d-flex justify-content-center m-index1">
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
                <h3>2件商品</h3>
              </div>
              <div className="row row-cols-1">
                <div className="col">
                  <div className="card card1 mb-3">
                    <div className="row g-0">
                      <div className="col-md-3 m-sec2-card">
                        <img
                          src="/images/cart/card2-img.png"
                          className="img-fluid"
                          alt
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body p-lg-3 p-0">
                          <div className="d-flex flex-column justify-content-between">
                            <div>
                              <h3 className="h3 p-lg-x-2 p-lg-2">
                                Limited Edition Paranormal Troublemaker
                                Telecaster® Deluxe
                              </h3>
                              <h4 className="p-lg-2">顏色 : white</h4>
                              <div className="d-flex align-items-end p-lg-2">
                                <img src="/images/cart/box-icon.svg" alt />
                                <h4 className="ps-2">有庫存</h4>
                              </div>
                              <div className="d-flex align-items-end p-lg-2 pb-lg-3 py-2">
                                <h4>數量 :</h4>
                                <div
                                  className="btn-group btn-group-sm"
                                  role="group"
                                  aria-label="Basic outlined example"
                                >
                                  <button type="button" className="btn">
                                    <i className="fa-solid fa-minus fa-fw" />
                                  </button>
                                  <button type="button" className="btn">
                                    1
                                  </button>
                                  <button type="button" className="btn">
                                    <i className="fa-solid fa-plus fa-fw" />
                                  </button>
                                </div>
                              </div>
                              <h4 className="h3 p-lg-2">價錢 : NT$ 13,999</h4>
                            </div>
                            <div className="d-flex justify-content-center pt-lg-5 mt-lg-5 pt-3">
                              <h5 className="btn">移除商品</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card card1 mb-3">
                    <div className="row g-0">
                      <div className="col-md-3 m-sec2-card">
                        <img
                          src="/images/cart/card2-img.png"
                          className="img-fluid"
                          alt
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body p-lg-3 p-0">
                          <div className="d-flex flex-column justify-content-between">
                            <div>
                              <h3 className="h3 p-lg-x-2 p-lg-2">
                                (租用)Limited Edition Paranormal Troublemaker
                                Telecaster® Deluxe
                              </h3>
                              <h4 className="p-lg-2">顏色 : white</h4>
                              <div className="d-flex align-items-end p-lg-2">
                                <img src="/images/cart/box-icon.svg" alt />
                                <h4 className="ps-2">有庫存</h4>
                              </div>
                              <div className="d-flex align-items-end p-lg-2 py-lg-3 py-2">
                                <h4>租借日期 : 2025-01-02 - 2025-01-04</h4>
                              </div>
                              <h4 className="h3 p-lg-2">價錢 : NT$ 2,400</h4>
                            </div>
                            <div className="d-flex justify-content-center pt-lg-5 mt-lg-5 pt-3">
                              <h5 className="btn">移除商品</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card card1 mb-3">
                    <div className="row g-0">
                      <div className="col-md-3 m-sec2-card">
                        <img
                          src="/images/cart/card3.png"
                          className="img-fluid"
                          alt
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body p-lg-3 p-0">
                          <div className="d-flex flex-column justify-content-between">
                            <div>
                              <h3 className="h3 p-lg-x-2 p-lg-2">
                                衛武營國際音樂節-全票
                              </h3>
                              <div className="d-flex align-items-end p-lg-2">
                                <img src="/images/cart/box-icon.svg" alt />
                                <h4 className="ps-2">有庫存</h4>
                              </div>
                              <div className="d-flex align-items-end p-lg-2 pb-lg-3 py-2">
                                <h4>數量 :</h4>
                                <div
                                  className="btn-group btn-group-sm"
                                  role="group"
                                  aria-label="Basic outlined example"
                                >
                                  <button type="button" className="btn">
                                    <i className="fa-solid fa-minus fa-fw" />
                                  </button>
                                  <button type="button" className="btn">
                                    1
                                  </button>
                                  <button type="button" className="btn">
                                    <i className="fa-solid fa-plus fa-fw" />
                                  </button>
                                </div>
                              </div>
                              <h4 className="h3 p-lg-2">價錢 : NT$ 700</h4>
                            </div>
                            <div className="d-flex justify-content-center pt-lg-5 mt-lg-5 pt-3">
                              <h5 className="btn">移除商品</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-sec2-col4 col-lg-4 col-12">
              <div className="h3 pt-4 pb-2">訂單確認</div>
              <div className="d-flex justify-content-between py-2">
                <h5>小計 :</h5>
                <h5>NT$ 27,998</h5>
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
                <h5>-20%</h5>
              </div>
              <hr />
              <div className="d-flex justify-content-between py-3">
                <h4 className="h4">總計 :</h4>
                <h4 className="h4">NT$ 22,398</h4>
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
