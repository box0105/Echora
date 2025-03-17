'use client'

import React, { useEffect, useState } from 'react'
import AdminPanel from './_components/AdminPanel'
import './_styles/admin.scss'
import './../activity/_styles/act.scss'
import { useAdminAuth } from '@/hooks/use-admin'
import { redirect, useRouter } from 'next/navigation'
import { flatMap } from 'lodash'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-profile'
// import { ToastContainer } from 'react-toastify'
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

  const [isAdmin, setIsAdmin] = useState(null)
  // const { logout, token } = useAdminAuth()
  // const [check, setCheck] = useState(false)
  const { isAuth } = useAuth()
  // const router = useRouter()
  // const { userProfile, setUserProfile } = useUser()

  // useEffect(() => {
  //   console.log({userProfile});
  //   if (!userProfile || userProfile.username != "admin") {
  //     // redirect('/');
  //     router.push('/')
  //   }
  // }, [userProfile])

  useEffect(() => {
    const userId = Number(localStorage.getItem('userId'))
    console.log('取得localstorage userId: ', userId)
    // setAdmin(admin)
    // setCheck(true)

    if (userId === 1) {
      setIsAdmin(userId)
    } else {
      toastWarning('該使用者不具管理員權限')
      redirect('/')
    }
  }, [isAuth])

  // useEffect(() => {
  //     if (admin !== 1 && admin != null) {
  //       console.log(admin, '123');
  //       router.push('/');
  //     } else {
  //       setCheck(true)
  //     }
  // }, [check])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const url = 'http://localhost:3005/api/coupon/admin/login'
  //       const res = await fetch(url)
  //       if (!res.ok) throw new Error('狀態錯誤')
  //       const data = await res.json()
  //       // console.log(data.data)
  //       // setCoupons(data.data)
  //     } catch (err) {
  //       console.log('發生錯誤', err)
  //     }
  //   }
  //   fetchData()
  // }, [])

  if (!isAdmin) {
    return <></>
  } else {
    return (
      <div className="container-fluid b-admin">
        <div className="row px-2 py-3">
          <AdminPanel />
          <main className="col-md-10 px-0 ps-md-2">{children}</main>
        </div>
        {/* 載入吐司 */}
        {/* <ToastContainer /> */}
      </div>
    )
  }
}
