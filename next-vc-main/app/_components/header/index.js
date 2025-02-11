'use client'
import './header.scss'

import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="g-header px-modified">
        <div className="container-fluid">
          <div className="g-nav-top row">
            <div className="g-logo col-lg-4 col-6 order-1 ps-0">
              <img className="g-pc-logo" src="/images/header/logo.svg" />
              <img className="g-mb-logo" src="/images/header/logo-mb.svg" />
            </div>
            <form
              action
              className="col-lg-4 col-12 order-lg-2 order-3 d-flex align-items-center  p-0 mt-lg-0 mt-3"
            >
              <input
                type="text"
                className="form-control focus-ring g-search-field"
                placeholder="搜尋商品關鍵字"
              />
            </form>
            <div className="g-right-menu d-flex gap-4 col-lg-4 col-6 order-2 d-flex justify-content-end align-items-center p-0">
              <a href="">
                <img src="/images/header/heart.svg" />
              </a>
              <a href="">
                <img src="/images/header/account.svg" />
              </a>
              <a href="">
                <img src="/images/header/cart.svg" />
              </a>
              <button className="hamburger" onClick={() => {setMenuOpen(true)}}>
                <img src="/images/header/hamburger.svg" />
              </button>
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
      {/* hamburger menu bar */}
      <section className={`g-menu-bar-sec ${menuOpen ? "active" : "" }`}>
        <div className="container-fluid p-0">
          <div className="g-menu-bar">
            <div className="d-flex justify-content-between pb-4">
              <img className="ps-3" src="/images/header/logo-mb.svg" />
              <img className="g-x" width="16px" src="/images/header/x.svg" onClick={() => {setMenuOpen(false)}}/>
            </div>
            <ul className="list-unstyled">
              <li>
                <a href>
                  <div className="d-flex">
                    <h6 className="h7 mb-0">ELECTRIC GUITARS</h6>
                    <p className="px-1 mb-0">/</p>
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                      電吉他商品
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href>
                  <div className="d-flex">
                    <h6 className="h7 mb-0">MUSIC FESTIVALS</h6>
                    <p className="px-1 mb-0">/</p>
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                      音樂活動
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href>
                  <div className="d-flex">
                    <h6 className="h7 mb-0">RENTAL SERVICE</h6>
                    <p className="px-1 mb-0">/</p>
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                      商品租借
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href>
                  <div className="d-flex">
                    <h6 className="h7 mb-0">SPECIAL EVENTS</h6>
                    <p className="px-1 mb-0">/</p>
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                      特別優惠
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
