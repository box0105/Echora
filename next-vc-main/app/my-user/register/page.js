'use client'

import '../_styles/login_signup.scss'
<<<<<<< HEAD
import { useState } from 'react'
import { useUserRegister } from '@/services/rest-client/use-user'
import { useAuth } from '@/hooks/use-auth'
=======
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState, useEffect } from 'react'
import { useUserRegister } from '@/services/rest-client/use-user'
import { useAuth } from '@/hooks/use-auth'
import useFirebase from '../_hooks/use-firebase'
import Link from 'next/link'
import { useAuthGoogleLogin } from '@/services/rest-client/use-user'
<<<<<<< HEAD
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1

// newUser資料範例(物件) 註: name改為在profile資料表中
// {
//     "username":"ginny",
//     "password":"123456",
//     "name":"金妮",
//     "email":"ginny@test.com",
// }
=======
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
>>>>>>> dev

export default function RegisterPage() {
  const { register, isMutating, isError } = useUserRegister()
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { isAuth } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

<<<<<<< HEAD
=======
  // Firebase Google 登入
  const { loginGoogle, logoutFirebase } = useFirebase()
  const { googleLogin } = useAuthGoogleLogin()

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
        toast.success('已成功登入')
        if (isClient) {
          router.push('/') // 重定向到首頁
        }
      } else {
        toast.error('Google 登入失敗')
      }
    })
  }

>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
  // 輸入帳號 密碼用
  const handleFieldChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()
    // 檢查是否有登入，如果有登入就不能註冊
    if (isAuth) {
      toast.error('錯誤 - 會員已登入')
      return
    }

    // 確保所有必需字段都有值
    if (!userInput.username || !userInput.email || !userInput.password) {
      toast.error('請提供 username, email 和 password')
      return
    }

    try {
      const res = await register(userInput)
      const resData = await res.json()
      if (resData.status === 'success') {
        toast.success('資訊 - 會員註冊成功')
        if (isClient) {
          router.push('/') // 重定向到首頁
        }
      } else {
        if (resData.message.includes('重複的 email')) {
          setErrorMessage('此 email 已被使用')
        } else {
          setErrorMessage(`錯誤 - 註冊失敗: ${resData.message}`)
        }
      }
    } catch (err) {
      if (err.response?.data?.message.includes('重複的 email')) {
        setErrorMessage('此 email 已被使用')
      } else {
        setErrorMessage(
          `錯誤 - 註冊失敗: ${err.response?.data?.message || err.message}`
        )
      }
    }
  }

  // 切換密碼顯示狀態
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
          <form onSubmit={handleSubmit} className="form-container">
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
            <div className="login">創建帳戶</div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="name-container">
              <div className="input-field-signup">
                <label htmlFor="name" className="visually-hidden">
                  姓氏
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userInput.username}
                  className="form-input"
                  onChange={handleFieldChange}
                  placeholder="姓名"
                  required
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="email" className="visually-hidden">
                電子郵件
              </label>
              <input
                type="email"
                name="email"
                id="email"
<<<<<<< HEAD
=======
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
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
<<<<<<< HEAD
=======
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
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </button>
            </div>
            <Link href="/my-user/forget-password" className="forgot-password">
              {' '}
              忘記密碼?
            </Link>

            <button type="submit" className="login-button">
              繼續
            </button>
            <div className="social-login">
<<<<<<< HEAD
              {/* <button
        type="button"
        class="social-button"
        aria-label="使用 Apple 登入"
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
              已經有帳號?
              <span className="signup-link" tabIndex={0} role="button">
<<<<<<< HEAD
                登入
=======
                <Link href="/my-user">登入</Link>
>>>>>>> 7c65590620b8dc8efd648a4dcc2b7ec5b85d79d1
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
