'use client'

import './_styles/login_signup.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import useFirebase from './_hooks/use-firebase'
import { toast, ToastContainer } from 'react-toastify'
import { toastError, toastSuccess, toastWarning } from '@/hooks/use-toast'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAuthGoogleLogin,
  useAuthGet,
  useAuthLogout,
  useAuthLogin,
} from '@/services/rest-client/use-user'
import { useRouter } from 'next/navigation'
import { set } from 'lodash'
import { useAdminAuth } from '@/hooks/use-admin';

export default function UserPage() {
  const [userInput, setUserInput] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const { loginGoogle, logoutFirebase } = useFirebase()
  const { googleLogin } = useAuthGoogleLogin()

  const { mutate } = useAuthGet()
  const { login } = useAuthLogin()
  const { logout } = useAuthLogout()

  const { isAuth, setIsAuth } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [admin, setAdmin] = useState(false)
  const { adminlogin } = useAdminAuth(); // 從 Context 取得 login 函數

  useEffect(() => {
    setIsClient(true)
  }, [])

  const checkFormValidity = (email, password) => {
    if (email.length > 0 && password.length > 0) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUserInput((prevState) => ({ ...prevState, [name]: value }))
    checkFormValidity(
      name === 'email' ? value : userInput.email,
      name === 'password' ? value : userInput.password
    )
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async () => {
    if (isAuth) {
      toastError('錯誤 - 會員已登入')
      return
    }

    if (!userInput.email || !userInput.password) {
      toastError('請提供 email 和 password')
      return
    }

    try {
      const res = await fetch('https://echora-kwvs.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      })

      const resData = await res.json()
      console.log(resData)

      if (resData?.status === 'success') {
        localStorage.setItem('userId', resData.data.user.id)
        // toast.success('已成功登入', { autoClose: 2000 }) // 先顯示通知
        setTimeout(() => {
          setIsAuth(true) // 延遲改變 isAuth，避免 useEffect 立即觸發
          mutate()
          if (isClient) {
            router.push('/')
          }
        }, 1500) // 確保 `toast` 先出現再跳轉


      } else {
        toastError(`登入失敗: ${resData.message}`)
      }
    } catch (err) {
      toastError(`登入失敗: ${err.message}`)
    }
  }
  const handleGoogleLogin = async () => {
    if (isAuth) {
      toastError('錯誤 - 會員已登入')
      return
    }

    try {
      loginGoogle(async (providerData) => {
        console.log(providerData)

        const res = await fetch('https://echora-kwvs.onrender.com/api/auth/google-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(providerData),
        })

        const resData = await res.json()

        if (resData.status === 'success') {
          localStorage.setItem('userId', resData.data.user.id)
          setIsAuth(true)
          mutate()
          // toast.success('已成功登入')
          setTimeout(() => {
            if (isClient) {
              router.push('/')
            }
          }, 2000)
        } else {
          toastError('Google 登入失敗')
          console.log('Google login error:', resData.message)
        }
      })
    } catch (error) {
      toastError('Google 登入失敗')
      console.error('Google login error:', error)
    }
  }

  const handleLogout = async () => {
    logoutFirebase()

    const res = await logout()
    const resData = await res.json()

    if (resData.status === 'success') {
      mutate()
      // toast.success('已成功登出')
    } else {
      toastError('登出失敗')
    }
  }

  useEffect(() => {
    if (isAuth) {
      router.push('/')
    }
  }, [isAuth, router])

  return (
    <>
      <div className="login-container">
        <div className="login-main">
          <Link href="/">
            <span className="back"> &lt; 回首頁 </span>
          </Link>
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
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="input-field">
              <label htmlFor="email" className="visually-hidden">
                電子郵件
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userInput.email}
                onChange={handleFieldChange}
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
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={userInput.password}
                onChange={handleFieldChange}
                className="form-input"
                placeholder="密碼"
                required
                aria-label="密碼"
              />
              <button
                type="button"
                className="show-password"
                aria-label="顯示密碼"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'
                    }`}
                ></i>
              </button>
            </div>
            <Link href="/my-user/forget-password" className="forgot-password">
              {' '}
              忘記密碼?
            </Link>
            <button
              type="button"
              className={`login-button ${isFormValid ? 'hover' : ''}`}
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
              </button>
            </div>
            <div className="signup-prompt">
              沒有帳號?
              <span className="signup-link" tabIndex={0} role="button">
                <Link href="/my-user/register">註冊</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
