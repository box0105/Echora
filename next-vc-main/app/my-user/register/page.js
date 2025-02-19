'use client'

import '../_styles/login_signup.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState, useEffect } from 'react'
import { useUserRegister } from '@/services/rest-client/use-user'
import { useAuth } from '@/hooks/use-auth'
import useFirebase from '../_hooks/use-firebase'
import Link from 'next/link'
import { useAuthGoogleLogin } from '@/services/rest-client/use-user'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

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
  const [isFormValid, setIsFormValid] = useState(false) // 用於控制按鈕樣式

  const { isAuth } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 檢查表單是否有效
  const checkFormValidity = (email, password) => {
    if (email.length > 0 && password.length > 0) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  // 輸入帳號 密碼用
  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUserInput((prevState) => ({ ...prevState, [name]: value }))
    checkFormValidity(
      name === 'email' ? value : userInput.email,
      name === 'password' ? value : userInput.password
    )
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

  return (
    <>
      <div className="login-container">
        <div className="login-main">
          <Link href="/">
            <span className="back"> &lt;返回 </span>
          </Link>

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

            <button
              type="submit"
              className={`login-button ${isFormValid ? 'hover' : ''}`}
            >
              繼續
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
              已經有帳號?
              <span className="signup-link" tabIndex={0} role="button">
                <Link href="/my-user">登入</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
