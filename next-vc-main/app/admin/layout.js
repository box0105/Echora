'use client'

import React, { useEffect, useState } from 'react'
import AdminPanel from './_components/AdminPanel'
import './_styles/admin.scss'
import './../activity/_styles/act.scss'
import { useAdminAuth } from '@/hooks/use-admin';
import { redirect,useRouter } from 'next/navigation';
import { flatMap } from 'lodash'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-profile'


export default function AdminLayout({ children }) {
  const [admin, setAdmin] = useState(null)
  const { logout, token } = useAdminAuth();
  const [check, setCheck] = useState(false)
  const { isAuth } = useAuth()
  const router = useRouter()
  const { userProfile, setUserProfile } = useUser()


  useEffect(() => {
    console.log({userProfile});
    if (!userProfile || userProfile.username != "admin") {
      // redirect('/');
      router.push('/')
    }
  }, [userProfile])

  useEffect(() => {
    const admin = localStorage.getItem('userId')
    console.log('取得localstorage', admin);
    setAdmin(admin)
    setCheck(true)
  }, [isAuth])

  useEffect(() => {
    console.log(admin);
      if (admin != 1 && admin != null) {
        console.log(admin, '123');
        router.push('/');
      } else {
        setCheck(true)
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
  if(userProfile.username !== "admin"){
  return(
    <>
      沒有權限
    </>
  )
  }else{
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
