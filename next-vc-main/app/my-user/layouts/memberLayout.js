'use client'

import '../_styles/member.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/style0.scss'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  useAuthGoogleLogin,
  useAuthGet,
  useAuthLogout,
  useAuthLogin,
} from '@/services/rest-client/use-user'
import { useAuth } from '@/hooks/use-auth'
import { toastError, toastWarning } from '@/hooks/use-toast'

export default function MemberLayout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const orderId = Number(params?.orderId)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const { user, isAuth, setIsAuth } = useAuth()
  const isActive = (path) => {
    return pathname === path ? 'active' : ''
  }

  const getPageTitle = () => {
    switch (pathname) {
      case '/my-user/profile':
        return '關於我'
      case '/my-user/order':
        return '我的訂單'
      case `/my-user/order/${orderId}`:
        return '訂單詳情'
      case '/my-user/favorites':
        return '我的收藏'
      case '/my-user/coupons':
        return '我的優惠券'
      case '/my-user/profile-password':
        return '修改密碼'
      default:
        return '會員中心'
    }
  }
  const { mutate } = useAuthGet()
  const router = useRouter()
  // **處理登出（支援 Google + 一般帳號）**
  const handleLogout = async () => {
    try {
      const res = await fetch('https://echora-kwvs.onrender.com/api/users/logout', {
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
        toastError(`登出失敗: ${resData.message}`)
      }
    } catch (err) {
      toastError(`登出失敗: ${err.message}`)
    }
  }
  return (
    <div>
      <main className="main">
        <div className="container">
          {/* <h2 className="page-title">{getPageTitle()}</h2> */}
          {/* <hr /> */}

          <div className="hamburger-member" id="hamburger-member">
            <button
              className="dropdown-content no-border"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              <h5 className="tab-link d-flex justify-content-between">
                <Link href={pathname}>
                  <span>{getPageTitle()}</span>
                  <i className="fa-solid fa-caret-down"></i>
                </Link>
              </h5>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content dropdown">
                <h5 className="tab-link" data-tab="profile">
                  <Link href="/my-user/profile"> 關於我</Link>
                </h5>
                <h5 className="tab-link" data-tab="orders">
                  <Link href="/my-user/order"> 我的訂單</Link>
                </h5>
                <h5 className="tab-link" data-tab="favorites">
                  <Link href="/my-user/favorites"> 我的收藏</Link>
                </h5>
                <h5 className="tab-link" data-tab="coupons">
                  <Link href="/my-user/coupons"> 我的優惠券</Link>
                </h5>
              </div>
            )}
          </div>

          <div className="a-content">
            <aside className="sidebar">
              <div className="sidebar-section">
                <h2 className={`sidebar-title ${isActive('/my-user/profile')}`}>
                  <Link href="/my-user/profile">個人資料</Link>
                </h2>
                <h2
                  className={`sidebar-title ${isActive(
                    '/my-user/profile-password'
                  )}`}
                >
                  <Link href="/my-user/profile-password">修改密碼</Link>
                </h2>
              </div>
              <div className="sidebar-section">
                <h2
                  className={`sidebar-title ${
                    isActive(`/my-user/order`) ||
                    isActive(`/my-user/order/${orderId}`)
                  }`}
                >
                  <Link href="/my-user/order"> 我的訂單</Link>
                </h2>
              </div>
              <div className="sidebar-section">
                <h2
                  className={`sidebar-title ${isActive('/my-user/favorites')}`}
                >
                  <Link href="/my-user/favorites"> 我的收藏</Link>
                </h2>
              </div>
              <div className="sidebar-section">
                <h2 className={`sidebar-title ${isActive('/my-user/coupons')}`}>
                  <Link href="/my-user/coupons"> 我的優惠券</Link>
                </h2>
              </div>
              <div className="sidebar-section">
                <h2 className={`sidebar-title`}>
                  <button
                    onClick={handleLogout}
                    className="sidebar-title"
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'none',
                      padding: '0',
                    }}
                  >
                    登出
                  </button>
                </h2>
              </div>
            </aside>
            <div className="profile-content w-100">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
