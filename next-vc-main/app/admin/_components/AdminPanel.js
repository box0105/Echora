'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ClimbingBoxLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import { toastSuccess } from '@/hooks/use-toast'

export default function AdminPanel() {
  const pathName = usePathname()
  const router = useRouter()

  // 導向到對應的一般頁面
  let href = '/'
  if (pathName?.includes('activity')) href = '/activity'
  else if (pathName?.includes('coupon')) href = '/coupons'

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
        router.push('/')
        setTimeout(() => {
          toastSuccess('管理者登出成功')
        }, 600)
      } else {
        toast.error(`登出失敗: ${resData.message}`)
      }
    } catch (err) {
      toast.error(`登出失敗: ${err.message}`)
    }
  }

  return (
    <nav className="b-nav col-md-2 mb-5 bg-white card p-3 d-flex flex-column align-items-center">
      <Link href={href} className="w-100 text-center">
        <Image
          src="/images/header/logo-mb.svg"
          alt="Logo"
          width={150}
          height={50}
        />
      </Link>

      <ul className="nav flex-column align-self-stretch mt-3 pt-3">
        <li
          className={`nav-item ${
            pathName?.includes('activity') ? 'active' : ''
          }`}
        >
          <h6 className="mb-0">
            <Link href="/admin/activity" className="nav-link">
              <i className="fa-solid fa-table-list me-3 text-secondary" />
              活動管理
            </Link>
          </h6>
        </li>
        <li
          className={`nav-item ${pathName?.includes('coupon') ? 'active' : ''}`}
        >
          <h6 className="mb-0">
            <Link href="/admin/coupon" className="nav-link">
              <i className="fa-solid fa-table-list me-3 text-secondary" />
              優惠券管理
            </Link>
          </h6>
        </li>
        <li className="nav-item">
          <h6 className="mb-0">
            <Link href={href} className="nav-link">
              <i className="fa-solid fa-house me-3 text-secondary" />
              一般頁面
            </Link>
          </h6>
        </li>

        <li className="nav-item">
          <h6 className="mb-0">
            <Link href="/my-user" className="nav-link" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket me-3 text-secondary" />
              登出
            </Link>
          </h6>
        </li>
      </ul>

      <ToastContainer autoClose={3000} />
    </nav>
  )
}
