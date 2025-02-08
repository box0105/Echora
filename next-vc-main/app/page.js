'use client'
import './_styles/bootstrap.scss'
import './_styles/nav.scss'
import './_styles/style0.scss'
import './_styles/index.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Cart from './_components/cart'

import React, { useState, useEffect } from 'react'

export default function AppPage(props) {
  return (
    <>
      <div className="m-background">
        <nav className="g-header px-modified">
          <div className="container-fluid">
            <div className="g-nav-top row">
              <div className="g-logo col-lg-4 col-6 order-1 ps-0">
                <img className="g-pc-logo" src="/images/nav/logo.svg" alt />
                <img className="g-mb-logo" src="/images/nav/logo-mb.svg" alt />
              </div>
              <form
                action
                className="col-lg-4 col-12 order-lg-2 order-3 d-flex align-items-center p-0 mt-lg-0 mt-3"
              >
                <input
                  type="search"
                  className="form-control focus-ring g-search-field"
                  placeholder="搜尋商品關鍵字"
                />
              </form>
              <div className="g-right-menu d-flex gap-4 col-lg-4 col-6 order-2 d-flex justify-content-end align-items-center p-0">
                <a href>
                  <img src="/images/nav/heart.svg" alt />
                </a>
                <a href>
                  <img src="/images/nav/account.svg" alt />
                </a>
                {/* 購物車按鈕設定 */}
                <a
                  className="btn p-0"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <img src="/images/nav/cart.svg" alt />
                </a>
                {/* ^^^^^^^^^^^  */}
                <a href className="hamburger">
                  <img src="/images/nav/hamburger.svg" alt />
                </a>
              </div>
            </div>
            <div className="g-nav-bottom">
              <ul className="d-flex justify-content-center gap-5 list-unstyled">
                <li>
                  <a href>
                    <div className="d-flex">
                      <h6 className="h7">ELECTRIC GUITARS</h6>
                      <p className="px-1">/</p>
                      <p style={{ fontWeight: 500 }}>電吉他商品</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href>
                    <div className="d-flex">
                      <h6 className="h7">MUSIC FESTIVALS</h6>
                      <p className="px-1">/</p>
                      <p style={{ fontWeight: 500 }}>音樂活動</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href>
                    <div className="d-flex">
                      <h6 className="h7">RENTAL SERVICE</h6>
                      <p className="px-1">/</p>
                      <p style={{ fontWeight: 500 }}>商品租借</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href>
                    <div className="d-flex">
                      <h6 className="h7">SPECIAL EVENTS</h6>
                      <p className="px-1">/</p>
                      <p style={{ fontWeight: 500 }}>特別優惠</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid m-section1">
          <div className="card text-bg-dark m-section1-card1">
            <img src="/images/cart/section1-img2.png" className="card-img" alt="..." />
            <div className="card-img-overlay d-flex justify-content-end align-items-center">
              {/* <div class="col-4 m-section1-card1-text">
        <h5 class="card-title">SPECIAL OFFER</h5>
        <p class="card-text">聖誕季優惠活動 LES系列9折優惠</p>
        <button class="card-text btn btn-outline-light m-section1-btn">
          <small>SHOP NOW</small>
        </button>
      </div> */}
            </div>
          </div>
          <div className="m-section1-mobile">
            <img src="/images/cart/section1-img2.png" alt />
          </div>
        </div>
        <div className="m-section2">
          <div className="container-fluid m-index">
            <div className="m-index-title">
              <h1 className="h3">
                SHOP BY PALETTE<span> / 商品風格分類</span>
              </h1>
            </div>
            <div className="row mb-2">
              <div className="col-lg-7 col-6 m-section2-col m-section2-col1">
                <div className="m-section2-line d-flex flex-column justify-content-center">
                  <h4>JSHINE</h4>
                  <p>曜彩系列</p>
                </div>
              </div>
              <div className="col-lg-5 col-6 m-section2-col m-section2-col2">
                <div className="m-section2-line d-flex flex-column justify-content-center">
                  <h4>SUNRISE WOOD</h4>
                  <p>晨曦木韻系列</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5 col-6 m-section2-col m-section2-col3">
                <div className="m-section2-line d-flex flex-column justify-content-center">
                  <h4>GREY &amp; WHITE</h4>
                  <p>石韻白系列</p>
                </div>
              </div>
              <div className="col-lg-7 col-6 m-section2-col m-section2-col4">
                <div className="m-section2-line d-flex flex-column justify-content-center">
                  <h4>MIDNIGHT CITY</h4>
                  <p>夜晚城市系列</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-section3">
          <div className="container-fluid m-index">
            <div className="m-index-title">
              <h1 className="h3">
                TRENDING DEALS<span> / 熱門優惠商品</span>
              </h1>
            </div>
            <div className="row row-cols-lg-4 row-cols-1">
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
        <div className="m-section4">
          <div className="container-fluid m-index">
            <div className="m-index-title">
              <h1 className="h3">
                RECENT ACTIVITIES<span> / 近期活動</span>
              </h1>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card">
                  <img
                    src="/images/cart/card3.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title h5">
                      Weiwuying International Music Festival
                    </h5>
                    <p className="card-text h6">衛武營國際音樂節</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="/images/cart/card3.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title h5">
                      Weiwuying International Music Festival
                    </h5>
                    <p className="card-text h6">衛武營國際音樂節</p>
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
