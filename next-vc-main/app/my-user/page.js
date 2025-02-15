'use client'

import './_styles/login_signup.scss'
<<<<<<< HEAD
import React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import {
=======
import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import useFirebase from './_hooks/use-firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAuthGoogleLogin,
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
  useAuthGet,
  useAuthLogout,
  useAuthLogin,
} from '@/services/rest-client/use-user'
<<<<<<< HEAD
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UserPage() {
  // 輸入表單用的狀態
  const [userInput, setUserInput] = useState({ username: '', password: '' })
=======

export default function UserPage() {
  // 輸入表單用的狀態
  const [userInput, setUserInput] = useState({ email: '', password: '' })

  // Firebase Google 登入
  const { loginGoogle, logoutFirebase } = useFirebase()
  const { googleLogin } = useAuthGoogleLogin()
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1

  // 登入後設定全域的會員資料用
  const { mutate } = useAuthGet()
  const { login } = useAuthLogin()
  const { logout } = useAuthLogout()

  // 取得登入狀態
<<<<<<< HEAD
  const { isAuth, isLoading } = useAuth()
=======
  const { isAuth } = useAuth()
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1

  // 輸入帳號與密碼框用
  const handleFieldChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

<<<<<<< HEAD
  // 處理登入
  const handleLogin = async () => {
    // 如果是已登入狀態，就不要再登入
=======
  // **處理一般登入**
  const handleLogin = async () => {
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
    if (isAuth) {
      toast.error('錯誤 - 會員已登入')
      return
    }

    const res = await login(userInput)
    const resData = await res.json()

<<<<<<< HEAD
    console.log(resData)

    if (resData?.status === 'success') {
      // 呼叫useAuthGet的mutate方法
      // 將會進行重新驗證(revalidation)(將資料標記為已過期並觸發重新請求)
      mutate()

=======
    if (resData?.status === 'success') {
      mutate()
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
      toast.success('已成功登入')
    } else {
      toast.error(`登入失敗`)
    }
  }

<<<<<<< HEAD
  // 處理登出
  const handleLogout = async () => {
    const res = await logout()
    const resData = await res.json()
    // 成功登出
    if (resData.status === 'success') {
      // 呼叫useAuthGet的mutate方法
      // 將會進行重新驗證(revalidation)(將資料標記為已過期並觸發重新請求)
      mutate()

      toast.success('已成功登出')
    } else {
      toast.error(`登出失敗`)
    }
  }

  // 處理檢查登入狀態
  const handleCheckAuth = async () => {
    if (isAuth) {
      toast.success('已登入會員')
    } else {
      toast.error(`非會員身份`)
    }
  }

  // if (isLoading) {
  //   return (
  //     <div>
  //       <h3>載入中...</h3>
  //     </div>
  //   )
  // }

=======
  // **處理 Google 登入**
  const handleGoogleLogin = () => {
    if (isAuth) {
      toast.error('錯誤 - 會員已登入')
      return
    }
    loginGoogle(async (providerData) => {
      console.log(providerData)

      const res = await googleLogin(providerData)
      const resData = await res.json()

      if (resData.status === 'success') {
        mutate()
        toast.success('已成功登入')
      } else {
        toast.error('Google 登入失敗')
      }
    })
  }

  // **處理登出（支援 Google + 一般帳號）**
  const handleLogout = async () => {
    logoutFirebase() // Google 登出 Firebase

    const res = await logout()
    const resData = await res.json()

    if (resData.status === 'success') {
      mutate()
      toast.success('已成功登出')
    } else {
      toast.error('登出失敗')
    }
  }

>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
  return (
    <>
      <div className="login-container">
        <div className="login-main">
<<<<<<< HEAD
          <span className="back"> &lt;返回 </span>
=======
          <Link href="/">
            <span className="back"> &lt;返回 </span>
          </Link>
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
          <img
            src="../images/user/login.jpg"
            alt="Login page hero illustration"
            className="hero-image"
          />
          <form className="form-container">
            <div className="brand-container">
              <div className="logo-wrapper">
                <img
                  src="../images/user/Echora-logo.png"
                  alt="Echora brand logo"
                  className="brand-logo"
                />
              </div>
              <div className="brand-text">
                <div className="brand-name-en">Echora</div>
                <div className="brand-name-zh">• 拾光</div>
              </div>
            </div>
            <div className="login">登入</div>
            <div className="input-field">
              <label htmlFor="email" className="visually-hidden">
                電子郵件
              </label>
              <input
                type="email"
<<<<<<< HEAD
                id="email"
=======
                name="email"
                id="email"
                value={userInput.email}
                onChange={handleFieldChange}
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
                className="form-input"
                placeholder="電子郵件"
                required
                aria-label="電子郵件"
              />
            </div>
            <div className="input-field password-field">
              <label htmlFor="password" className="visually-hidden">
                密碼
              </label>
              <input
                type="password"
<<<<<<< HEAD
                id="password"
=======
                name="password"
                id="password"
                value={userInput.password}
                onChange={handleFieldChange}
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
                className="form-input"
                placeholder="密碼"
                required
                aria-label="密碼"
              />
              <button
                type="button"
                className="show-password"
                aria-label="顯示密碼"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
            <Link href="/my-user/forget-password" className="forgot-password">
              {' '}
              忘記密碼?
<<<<<<< HEAD
            </a>
<<<<<<< HEAD
            <button type="submit" className="login-button">
              登入
            </button>
            <div className="social-login">
              {/* <button
        type="button"
        class="social-button"
        aria-label="使用line 登入"
      >
        <i class="bi bi-apple social-icon"></i>
      </button> */}
              <button
                type="button"
                className="social-button"
                aria-label="使用 Google 登入"
              >
                <i className="bi bi-google social-icon"> 使用 Google 登入 </i>
=======
=======
            </Link>
>>>>>>> dev
            <button
              type="button"
              className="login-button"
              onClick={handleLogin}
            >
              登入
            </button>
            <div className="social-login">
              <button
                type="button"
                className="social-button"
                onClick={handleGoogleLogin}
                aria-label="使用 Google 登入"
              >
                <i className="fa-brands fa-google me-2"></i> 使用 Google 登入
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
              </button>
            </div>
            <div className="signup-prompt">
              沒有帳號?
              <span className="signup-link" tabIndex={0} role="button">
<<<<<<< HEAD
                註冊
              </span>
            </div>
          </form>
        </div>
      </div>
=======
                <Link href="/my-user/register">註冊</Link>
              </span>
            </div>
          </form>
          {isAuth && (
            <button className="logout-button" onClick={handleLogout}>
              登出
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
    </>
  )
}
