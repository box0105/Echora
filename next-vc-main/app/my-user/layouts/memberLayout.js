'use client'

import '../_styles/member.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/style0.scss'
import { useState } from 'react'

export default function MemberLayout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div>
      <main className="main">
        <div className="container">
          <h1 className="page-title">關於我</h1>
          <hr />

          <div className="hamburger-member" id="hamburger-member">
            <div
              className="dropdown-content no-border"
              type="button"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              <h5 className="tab-link">關於我</h5>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content dropdown">
                <h5 className="tab-link" data-tab="orders">
                  我的訂單
                </h5>
                <h5 className="tab-link" data-tab="favorites">
                  我的收藏
                </h5>
                <h5 className="tab-link" data-tab="coupons">
                  我的優惠券
                </h5>
              </div>
            )}
          </div>

          <div className="content">
            <aside className="sidebar">
              <div className="sidebar-section">
                <h2 className="sidebar-title">關於我</h2>
                <ul className="sidebar-menu">
                  <li className="sidebar-item active">個人資料</li>
                  <li className="sidebar-item">修改密碼</li>
                </ul>
              </div>
              <div className="sidebar-section">
                <h2 className="sidebar-title">我的訂單</h2>
              </div>
              <div className="sidebar-section">
                <h2 className="sidebar-title">我的收藏</h2>
              </div>
              <div className="sidebar-section">
                <h2 className="sidebar-title">我的優惠券</h2>
              </div>
            </aside>
            <div className="profile-content">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
