'use client'

import React, { useState, useEffect } from 'react'

export default function Cart(props) {
  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <div className="d-flex align-items-end">
            <div className="h2 pe-5">購物車清單</div>
            <h3>2件商品</h3>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="row row-cols-1">
            <div className="col">
              <div className="card card1 mb-3">
                <div className="row g-0">
                  <div className="col-md-3 m-sec2-card">
                    <img src="/images/cart/card2-img.png" className="img-fluid" alt />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body p-lg-3 px-0">
                      <div className="d-flex flex-column justify-content-between">
                        <div>
                          <h3 className="h3 p-lg-x-1 p-lg-1">
                            Limited Edition Paranormal Troublemaker Telecaster®
                            Deluxe
                          </h3>
                          <h4 className="p-lg-1">顏色 : white</h4>
                          <div className="d-flex align-items-end p-lg-1 pb-lg-2 py-1">
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
                          <h4 className="h3 p-lg-1">價錢 : NT$ 13,999</h4>
                          <div className="d-flex justify-content-end">
                            <h5 className="btn p-1">移除商品</h5>
                          </div>
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
                    <img src="/images/cart/card3.png" className="img-fluid" alt />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body p-lg-3 px-0">
                      <div className="d-flex flex-column justify-content-between">
                        <div>
                          <h3 className="h3 p-lg-x-1 p-lg-1">
                            衛武營國際音樂節-全票
                          </h3>
                          <div className="d-flex align-items-end p-lg-1 pb-lg-2 py-1">
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
                          <h4 className="h3 p-lg-1">價錢 : NT$ 13,999</h4>
                          <div className="d-flex justify-content-end">
                            <h5 className="btn p-1">移除商品</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="py-3" />
          <div className="d-flex justify-content-between py-2">
            <h4 className="h4">總計 :</h4>
            <h4 className="h4">NT$ 27,998</h4>
          </div>
          <button type="button" className="btn btn-dark w-100 mt-3">
            前往結帳
          </button>
        </div>
      </div>
    </>
  )
}
