'use client'
import '../../_styles/login_signup.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useState, useEffect } from 'react'
import {
  useAuthResetPasswordHash,
  useAuthCheckSecret,
  useAuthResetPassword,
} from '@/services/rest-client/use-user'
import { useAuth } from '@/hooks/use-auth'
import { useSearchParams, useRouter } from 'next/navigation'
import { isDev } from '@/config'
// 載入loading元件
import { RotatingLines } from 'react-loader-spinner'
import { toast, ToastContainer } from 'react-toastify'
import { toastWarning, toastError, toastSuccess } from '@/hooks/use-toast'
import Link from 'next/link'

export default function HashTokenPage() {
  const { resetPasswordHash, isMutating: isResetting } =
    useAuthResetPasswordHash()
  const { checkSecret } = useAuthCheckSecret()
  // 輸入表單用的狀態
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadingStep2, setLoadingStep2] = useState(false)
  const [isSecretValid, setIsSecretValid] = useState(false)
  // 新增狀態來追蹤輸入欄是否有資料
  const [isEmailFilled, setIsEmailFilled] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { isAuth } = useAuth()
  // 取得網址參數，例如: ?secret=xxxxxx
  const searchParams = useSearchParams()
  const router = useRouter()

  // 表單提交處理函數
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toastError('新密碼和確認密碼不一致')
      return
    }

    try {
      const response = await fetch('http://localhost:3005/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }),
      })

      const resData = await response.json()
      if (resData.status === 'success') {
        toastSuccess('密碼已成功更新')
        router.push('/my-user')
      } else {
        toastError(resData.message)
      }
    } catch (err) {
      toastError('無法更新密碼')
      console.log(err.message)
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-main">
          <Link href="/">
            <span className="back"> &lt;返回 </span>
          </Link>
          <img
            src="../../images/user/login.jpg"
            alt="Login page hero illustration"
            className="hero-image"
          />
          <form className="forget-password-container" onSubmit={handleSubmit}>
            <div className="brand-container">
              <div className="logo-wrapper">
                <img
                  src="../../images/user/Echora-logo.png"
                  alt="Echora brand logo"
                  className="brand-logo"
                />
              </div>
              <div className="brand-text">
                <div className="brand-name-en">Echora</div>
                <div className="brand-name-zh">• 拾光</div>
              </div>
            </div>
            <div className="login">更新密碼</div>

            <div className="input-field">
              <label htmlFor="email" className="visually-hidden">
                電子郵件
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setIsEmailFilled(e.target.value.includes('@'))
                }}
                className="form-input"
                placeholder="請輸入電子郵件"
                required
                aria-label="電子郵件"
              />
            </div>
            <div className="input-field">
              <label htmlFor="otp" className="visually-hidden">
                驗證碼
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-input"
                placeholder="請輸入驗證碼"
                required
                aria-label="驗證碼"
              />
            </div>
            <div className="input-field">
              <label htmlFor="password" className="visually-hidden">
                新密碼
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="請輸入新密碼"
                required
                aria-label="新密碼"
              />
              <button
                type="button"
                className="show-password"
                aria-label="顯示密碼"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </button>
            </div>
            <div className="input-field">
              <label htmlFor="confirm-password" className="visually-hidden">
                確認密碼
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                placeholder="請再次輸入新密碼"
                required
                aria-label="確認密碼"
              />
              <button
                type="button"
                className="show-password"
                aria-label="顯示確認密碼"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i
                  className={`fa-solid ${
                    showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </button>
            </div>
            <button
              type="submit"
              className={`login-button ${isEmailFilled ? 'hover' : ''}`}
            >
              更新密碼
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
