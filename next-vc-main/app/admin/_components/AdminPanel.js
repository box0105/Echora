'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminPanel() {
  const pathName = usePathname();

  return (
    <nav className="b-nav col-md-2 mb-5 bg-white card p-3 d-flex flex-column align-items-center">
      <Link href="/admin" className='w-100 text-center'>
        <Image
          src="/images/header/logo-mb.svg"
          alt="Logo"
          width={150}
          height={50}
        />
      </Link>
      
      <ul className="nav flex-column align-self-stretch mt-3 pt-3">
        <li className={`nav-item ${pathName?.includes('activity') ? 'active' : ''}`}>
          <h6 className="mb-0">
            <Link href="/admin/activity" className="nav-link">
              <i className="fa-solid fa-table-list me-3 text-secondary" />
              活動管理
            </Link>
          </h6>
        </li>
        <li className={`nav-item ${pathName?.includes('coupon') ? 'active' : ''}`}>
          <h6 className="mb-0">
            <Link href="/admin/coupon" className="nav-link">
              <i className="fa-solid fa-table-list me-3 text-secondary" />
              優惠券管理
            </Link>
          </h6>
        </li>
        <li className="nav-item">
          <h6 className="mb-0">
            <Link href="/" className="nav-link">
              <i className="fa-solid fa-house me-3 text-secondary" />
              返回首頁
            </Link>
          </h6>
        </li>
        <li className="nav-item">
          <h6 className="mb-0">
            <Link href="/my-user" className="nav-link">
              <i className="fa-solid fa-right-from-bracket me-3 text-secondary" />
              登出
            </Link>
          </h6>
        </li>
      </ul>
    </nav>
  )
}
