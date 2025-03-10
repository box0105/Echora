'use client'

import React, { useEffect, useState } from 'react'
import AdminPanel from './_components/AdminPanel'
import './_styles/admin.scss'
import './../activity/_styles/act.scss'
import { useAdminAuth } from '@/hooks/use-admin';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { flatMap } from 'lodash'
import { useAuth } from '@/hooks/use-auth'


export default function AdminLayout({ children }) {
  const router = useRouter();
  // 管理後反而無法進入
  // const admin = localStorage.getItem('userId')
  const [admin, setAdmin] = useState(null)
  // const admin = localStorage.getItem('userId')
  const { logout, token } = useAdminAuth();
  const [check, setCheck] = useState(false)
    const { isAuth } = useAuth()
  
// useEffect(()=>{
//   if(!isAuth){
//     redirect('/');
//   }
// })
  useEffect(() => {
    const admin = localStorage.getItem('userId')
    console.log('取得localstorage',admin);
    setAdmin(admin)
    setCheck(true)
  }, [])

  useEffect(() => {
    console.log(admin);
   if(admin !== null){
    if (admin != 1) {
      console.log(admin, '123');
      redirect('/');
    } else {
      setCheck(true)
    }
   }
  }, [check])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3005/api/coupon/admin/login'
        const res = await fetch(url)
        if (!res.ok) throw new Error('狀態錯誤')
        const data = await res.json()
        // console.log(data.data)
        // setCoupons(data.data)
      } catch (err) {
        console.log('發生錯誤', err)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="container-fluid">
      <div className="row px-2 py-3">
        <AdminPanel />
        <main className="col-md-10 px-0 ps-md-2">{children}</main>
      </div>
    </div>
  )
}
