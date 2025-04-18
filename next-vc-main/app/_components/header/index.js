'use client'
import styles from './header.module.scss'
import '../../product/list/list.scss'
import CartOffcanvas from '../cart-offcanvas'
import { useMyCart } from '@/hooks/use-cart'
import { useActivity } from '@/hooks/use-activity'
import { useRent } from '@/hooks/use-rent'
import { useRouter, usePathname } from 'next/navigation'
import { useProductState } from '@/services/rest-client/use-products'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-profile'
import {
  useAuthGoogleLogin,
  useAuthGet,
  useAuthLogout,
  useAuthLogin,
} from '@/services/rest-client/use-user'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHeaderHeight } from '@/hooks/use-header'

export default function Header() {
  const { totalQty } = useMyCart()
  const [showCart, setShowCart] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // header滾動效果
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const { headerRef } = useHeaderHeight()
  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > prevScrollY && currentScrollY > 50) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }

    setPrevScrollY(currentScrollY)
  }

  useEffect(() => {
    // 監聽滾動事件
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY])

  // header 在不同路徑改變顏色
  const pathName = usePathname()
  const getBackgroundColor = () => {
    if (
      pathName.includes('/product/list') ||
      pathName.includes('/product/comparison') ||
      pathName == '/activity'
    )
      return 'g-white-color'
    return 'g-ori-color'
  }

  // search
  // 在不同路徑改變搜尋框的文字
  // const pathName = usePathname()
  const getSearchPlaceholder = () => {
    if (pathName.includes('/activity')) return '搜尋活動名稱或表演樂團'
    else if (pathName.includes('/rent')) return '搜尋電吉他租借商品'
    else return '搜尋電吉他商品'
  }

  const router = useRouter()
  const [searchName, setSearchName] = useState('')
  const { criteria, setCriteria, defaultCriteria } = useProductState()
  const isFirstRender = useRef(true) // 追蹤是否為初次渲染
  const { updateQueryParams, deleteQueryParams } = useActivity()
  const { query, setQuery } = useRent()

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (pathName.includes('/activity')) {
        updateQueryParams({ search: searchName })
      } else if (pathName.includes('/rent')) {
        updateQueryParams({ search: searchName })
      } else {
        if (criteria.nameLike == '' && searchName == '') return
        setCriteria((prev) => ({
          ...prev,
          nameLike: searchName,
        }))
      }
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false // 初次渲染時設定為 false，下一次才會觸發
      return
    }
    router.push('/product/list')
  }, [criteria])

  const [showDropdown, setShowDropdown] = useState(false)
  const { user, isAuth, setIsAuth } = useAuth()
  const { userProfile, setUserProfile } = useUser()
  // const { loginGoogle, logoutFirebase } = useFirebase()
  const { logout } = useAuthLogout()
  const { mutate } = useAuthGet()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      setIsAuth(false)
      return
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userId')}`, // 附帶 token
          },
        })
        const resData = await res.json()
        // console.log('API 回傳資料:', resData)
        if (resData.status === 'success') {
          setUserProfile(resData.data)
          console.log('User profile data:', resData.data)
        } else {
          toast.error(`獲取會員資料失敗: ${resData.message}`)
        }
      } catch (err) {
        toast.error(`獲取會員資料失敗: ${err.message}`)
      }
    }

    fetchUserProfile()
  }, [isAuth])

  // **處理登出（支援 Google + 一般帳號）**
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const resData = await res.json()

      if (resData.status === 'success') {
        // 清除 localStorage 中的 userId
        localStorage.removeItem('userId')
        setIsAuth(false)
        mutate()
        // toast.success('已成功登出')
        router.push('/')
      } else {
        toast.error(`登出失敗: ${resData.message}`)
      }
    } catch (err) {
      toast.error(`登出失敗: ${err.message}`)
    }
  }
  return (
    <>
      <nav
        ref={headerRef}
        className={`${styles['g-header']} ${styles['px-modified']} ${
          styles[getBackgroundColor()]
        } ${isVisible ? styles['visible'] : `${styles['hidden']} hidden`}`}
      >
        <div className="container-fluid">
          <div className={`${styles['g-nav-top']} row`}>
            <div className={`${styles['g-logo']} col-lg-4 col-6 order-1 ps-0`}>
              <Link href="/">
                <img
                  className={styles['g-pc-logo']}
                  src="/images/header/logo.svg"
                />
                <img
                  className={styles['g-mb-logo']}
                  src="/images/header/logo-mb.svg"
                />
              </Link>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="col-lg-4 col-12 order-lg-2 order-3 d-flex align-items-center p-0 mt-lg-0 mt-3"
            >
              <input
                type="text"
                className={`form-control focus-ring ${styles['g-search-field']}`}
                placeholder={getSearchPlaceholder()}
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={handleSearch}
              />
            </form>
            <div
              className={`${styles['g-right-menu']} d-flex gap-4 col-lg-4 col-6 order-2 d-flex justify-content-end align-items-center p-0 `}
            >
              <Link href={isAuth ? '/my-user/profile' : '/my-user'}>
                <div className="position-relative">
                  {isAuth && userProfile.username && (
                    <div className={`${styles['username']}`}>
                      Hi! {userProfile.username}
                    </div>
                  )}
                </div>
              </Link>
              <div
                className="position-relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link href={isAuth ? '/my-user/profile' : '/my-user'}>
                  <img src="/images/header/account.svg" />
                </Link>
                {isAuth && userProfile.username == 'admin' && showDropdown && (
                  <div className={styles['dropdown-menu']}>
                    {userProfile.username == 'admin' && (
                      <Link href="/admin/activity">後台管理</Link>
                    )}
                  </div>
                )}
              </div>
              {isAuth && (
                <Link href="/my-user/favorites">
                  <img src="/images/header/heart.svg" />
                </Link>
              )}

              <a
                className={styles['m-cart']}
                href="true"
                onClick={(e) => {
                  e.preventDefault()
                  setShowCart(true)
                }}
              >
                <img src="/images/header/cart.svg" />
                <div className={styles['m-circle']}>{totalQty}</div>
              </a>
              <button
                className={styles.hamburger}
                onClick={() => {
                  setMenuOpen(true)
                }}
              >
                <img src="/images/header/hamburger.svg" />
              </button>
            </div>
          </div>
          <div className={styles['g-nav-bottom']}>
            <ul className="d-flex justify-content-center gap-5 list-unstyled">
              <li>
                <Link href="/product/list">
                  <div className="d-flex">
                    <h6 className="h7">ELECTRIC GUITARS</h6>
                    <p className="px-1">/</p>
                    <p style={{ fontWeight: 500 }}>電吉他商品</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/activity"
                  onClick={() => {
                    // 清空活動篩選條件 & Search欄位
                    deleteQueryParams() //這行出現error
                    setSearchName('')
                  }}
                >
                  <div className="d-flex">
                    <h6 className="h7">MUSIC FESTIVALS</h6>
                    <p className="px-1">/</p>
                    <p style={{ fontWeight: 500 }}>音樂活動</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/rent">
                  <div className="d-flex">
                    <h6 className="h7">RENTAL SERVICE</h6>
                    <p className="px-1">/</p>
                    <p style={{ fontWeight: 500 }}>商品租借</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/coupons">
                  <div className="d-flex">
                    <h6 className="h7">SPECIAL EVENTS</h6>
                    <p className="px-1">/</p>
                    <p style={{ fontWeight: 500 }}>特別優惠</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* hamburger menu bar */}
      <section
        className={`${styles['g-menu-bar-sec']} ${
          menuOpen ? styles.active : ''
        }`}
      >
        <div className="container-fluid p-0">
          <div className={styles['g-menu-bar']}>
            <div className="d-flex justify-content-between pb-4">
              <img className="ps-3" src="/images/header/logo-mb.svg" />
              <button
                className={styles['g-x']}
                onClick={() => {
                  setMenuOpen(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setMenuOpen(false)
                }}
                aria-label="關閉菜單"
              >
                <img width="16px" src="/images/header/x.svg" alt="關閉" />
              </button>
            </div>
            <ul className="list-unstyled">
              <li>
                <Link href="/product/list">
                  <div
                    className="d-flex"
                    onClick={() => setMenuOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMenuOpen(false)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <h6 className="h7 mb-0">ELECTRIC GUITARS</h6>
                    <p className="px-1 mb-0">/</p>
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                      電吉他商品
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/activity">
                  <div
                    className="d-flex"
                    onClick={() => setMenuOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMenuOpen(false)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <h6 className="h7 mb-0">MUSIC FESTIVALS</h6>
                    <p className="px-1 mb-0">/</p>
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                      音樂活動
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/rent">
                  <div
                    className="d-flex"
                    onClick={() => setMenuOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMenuOpen(false)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <h6 className="h7 mb-0">RENTAL SERVICE</h6>
                    <p className="px-1 mb-0">/</p>
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                      商品租借
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/coupons">
                  <div
                    className="d-flex"
                    onClick={() => setMenuOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMenuOpen(false)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <h6 className="h7 mb-0">SPECIAL EVENTS</h6>
                    <p className="px-1 mb-0">/</p>
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                      特別優惠
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Offcanvas：根據 showCart 控制顯示，並傳入 onClose 用於關閉 */}
      <CartOffcanvas show={showCart} onClose={() => setShowCart(false)} />
      <ToastContainer autoClose={3000} />
    </>
  )
}
