'use client'
import styles from './header.module.scss'
import CartOffcanvas from '../cart-offcanvas'
import { useMyCart } from '@/hooks/use-cart'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const { totalQty } = useMyCart()
  const [showCart, setShowCart] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // search
  const router = useRouter()
  const [searchName, setSearchName ] = useState('')
  
  const handleSearch = (e) => {
    if(e.key === 'Enter' && searchName.trim() !== ''){
      // console.log("導航至:", `/product/list?name_like=${encodeURIComponent(searchName)}`);
      router.push(`/product/list?name_like=${searchName}`);
      // window.location.href = `/product/list?name_like=${encodeURIComponent(searchName)}`
    }
  }

  return (
    <>
      <nav className={`${styles['g-header']} ${styles['px-modified']}`}>
        <div className="container-fluid">
          <div className={`${styles['g-nav-top']} row`}>
            <div className={`${styles['g-logo']} col-lg-4 col-6 order-1 ps-0`}>
              <img className={styles['g-pc-logo']} src="/images/header/logo.svg" />
              <img className={styles['g-mb-logo']} src="/images/header/logo-mb.svg" />
            </div>
            <form
              action
              className="col-lg-4 col-12 order-lg-2 order-3 d-flex align-items-center p-0 mt-lg-0 mt-3"
            >
              <input
                type="text"
                className={`form-control focus-ring ${styles['g-search-field']}`}
                placeholder="搜尋商品名稱關鍵字"
                value={searchName}
                onChange={(e)=>setSearchName(e.target.value)}
                onKeyDown={handleSearch}
              />
            </form>
            <div className={`${styles['g-right-menu']} d-flex gap-4 col-lg-4 col-6 order-2 d-flex justify-content-end align-items-center p-0`}>
              <a href="">
                <img src="/images/header/heart.svg" />
              </a>
              <a href="">
                <img src="/images/header/account.svg" />
              </a>
              <a
                className={styles['m-cart']}
                href=""
                onClick={(e) => {
                  e.preventDefault()
                  setShowCart(true)
                }}
              >
                <img src="/images/header/cart.svg" />
                <div className={styles['m-circle']}>{totalQty}</div>
              </a>
              <button className={styles.hamburger} onClick={() => { setMenuOpen(true) }}>
                <img src="/images/header/hamburger.svg" />
              </button>
            </div>
          </div>
          <div className={styles['g-nav-bottom']}>
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
      <section className={`${styles['g-menu-bar-sec']} ${menuOpen ? styles.active : ""}`}>
        <div className="container-fluid p-0">
          <div className={styles['g-menu-bar']}>
            <div className="d-flex justify-content-between pb-4">
              <img className="ps-3" src="/images/header/logo-mb.svg" />
              <img className={styles['g-x']} width="16px" src="/images/header/x.svg" onClick={() => { setMenuOpen(false) }} />
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
      {/* Offcanvas：根據 showCart 控制顯示，並傳入 onClose 用於關閉 */}
      <CartOffcanvas show={showCart} onClose={() => setShowCart(false)} />
    </>
  )
}
