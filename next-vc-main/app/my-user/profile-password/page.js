'use client'

import '../_styles/member.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import MemberLayout from '../layouts/memberLayout'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserUpdatePassword } from '@/services/rest-client/use-user'
import { useAuth } from '@/hooks/use-auth'

// 定義要在此頁呈現/編輯的會員資料初始物件
const initUserPassword = {
  current: '', // 原本密碼，要比對成功才能修改
  new: '', // 新密碼
  confirm: '', //確認新密碼用(前端檢查用，不送後端)
}

export default function PasswordPasswordPage() {
  const { updatePassword } = useUserUpdatePassword()
  const { user, isAuth, setIsAuth } = useAuth()
  const [userPasswordInput, setUserPasswordInput] = useState(initUserPassword)

  // 檢查登入狀態
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      setIsAuth(true)
    }
  }, [setIsAuth])

  // 輸入資料用
  const handleFieldChange = (e) => {
    setUserPasswordInput({
      ...userPasswordInput,
      [e.target.name]: e.target.value,
    })
  }

  // 送出表單用
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')

    // 表單驗証 - START
    if (
      !userPasswordInput.new ||
      !userPasswordInput.current ||
      !userPasswordInput.confirm
    ) {
      toast.error('密碼欄位為必填')
      return
    }

    if (userPasswordInput.new !== userPasswordInput.confirm) {
      toast.error('新密碼與確認密碼不同')
      return
    }
    // 表單驗証 - END

    try {
      const res = await fetch(
        `http://localhost:3005/api/users/${userId}/password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            currentPassword: userPasswordInput.current,
            newPassword: userPasswordInput.new,
          }),
        }
      )
      const resData = await res.json()
      if (resData.status === 'success') {
        toast.success('會員密碼修改成功')
      } else {
        toast.error(`會員密碼修改失敗: ${resData.message}`)
      }
    } catch (err) {
      toast.error(`會員密碼修改失敗: ${err.message}`)
    }
  }

  // 未登入時，不會出現頁面內容
  if (!isAuth) return <></>

  return (
    <>
      <MemberLayout>
        <div className="change-password-form">
          <div className="change-password-header">
            <div className="section-title h4">修改密碼</div>
          </div>
          <div className="change-password-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="current" className="form-label">
                  舊密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="current"
                  name="current"
                  value={userPasswordInput.current}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="new" className="form-label">
                  新密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="new"
                  name="new"
                  value={userPasswordInput.new}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirm" className="form-label">
                  確認新密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm"
                  name="confirm"
                  value={userPasswordInput.confirm}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                確認修改
              </button>
            </form>
          </div>
        </div>
        <footer className="footer" />
      </MemberLayout>
      <ToastContainer />
    </>
  )
}
