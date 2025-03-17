'use client'

import React, { useEffect, useState } from 'react'
import AdminPanel from './_components/AdminPanel'
import './_styles/admin.scss'
import './../activity/_styles/act.scss'
import { useAdminAuth } from '@/hooks/use-admin'
import { redirect, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-profile'
import { toastWarning } from '@/hooks/use-toast'

export default function AdminLayout({ children }) {
  // 修改 Admin 頁面的背景顏色
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--grey50)'

    // 清理函數以確保離開 Admin 頁面時不會影響其他頁面
    return () => {
      document.body.style.backgroundColor = '' // 恢復默認顏色
    }
  }, [])

  const [isAdmin, setIsAdmin] = useState(false)
  const { isAuth } = useAuth()

  useEffect(() => {
    const userId = Number(localStorage.getItem('userId'))
    console.log('取得localstorage userId:', userId)

    if (userId === 1) {
      setIsAdmin(userId)
    } else {
      setTimeout(() => {
        toastWarning('該使用者不具管理員權限')
      }, 400)
      redirect('/')
    }
  }, [isAuth])

  if (!isAdmin) {
    return <></>
  } else {
    return (
      <div className="container-fluid b-admin">
        <div className="row px-2 py-3">
          <AdminPanel />

          <main className="col-md-10 px-0 ps-md-2">{children}</main>
        </div>
      </div>
    )
  }
}
