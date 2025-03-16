'use client'

import '../_styles/login_signup.scss'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import {
  useAuthGet,
  useAuthLogout,
  useAuthGetOtpToken,
  useAuthResetPassword,
} from '@/services/rest-client/use-user'
import Link from 'next/link'

// 載入loading元件
import { RotatingLines } from 'react-loader-spinner'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toastWarning, toastError, toastSuccess } from '@/hooks/use-toast'
export default function ForgetPasswordPage() {
  // 登入後設定全域的會員資料用
  const { mutate } = useAuthGet()
  const { logout } = useAuthLogout()
  const { requestOtpToken, isMutating: isRequesting } = useAuthGetOtpToken()
  const { resetPassword, isMutating: isResetting } = useAuthResetPassword()
  const { isAuth } = useAuth()

  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')

  // 新增狀態來追蹤輸入欄是否有資料
  const [isEmailFilled, setIsEmailFilled] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)

  // 載入loading元件
  const [loadingStep1, setLoadingStep1] = useState(false)
  const [loadingStep2, setLoadingStep2] = useState(false)
  const [showStep1, setShowStep1] = useState(true)
  const [showStep2, setShowStep2] = useState(false)

  const router = useRouter()

  // 處理登出
  const handleLogout = async () => {
    const res = await logout()
    const resData = await res.json()
    // 成功登出
    if (resData.status === 'success') {
      // 呼叫useAuthGet的mutate方法
      // 將會進行重新驗證(revalidation)(將資料標記為已過期並觸發重新請求)
      mutate()

      // toast.success('已成功登出')
    } else {
      toastError(`登出失敗`)
    }
  }

  // 處理要求一次性驗証碼用
  const handleRequestOtpToken = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3005/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const resData = await response.json()
      if (resData.status === 'success') {
        toastSuccess('驗證碼已發送到您的電子郵件')
        setIsOtpSent(true) // 更新狀態以顯示驗證碼已寄送的訊息
      } else {
        toastError(resData.message)
      }
    } catch (err) {
      toastError('無法發送驗證碼')
      console.log(err.message)
    }
  }

  // 處理重設密碼用
  const handleResetPassword = async () => {
    const res = await resetPassword(email, password, token)
    const resData = await res.json()
    // 除錯用
    console.log(resData)

    if (resData.status === 'success') {
      toastSuccess('資訊 - 密碼已成功修改，導向使用者登入頁面')

      setTimeout(() => {
        router.push('/my-user')
      }, 2000)
    } else {
      toastError(`錯誤 - ${resData.message}`)
    }
  }

  // 用loading來控制spinner動畫的顯示
  useEffect(() => {
    if (isRequesting) {
      setLoadingStep1(true)
      setTimeout(() => {
        setLoadingStep1(false)
        setShowStep1(false)
        setShowStep2(true)
      }, 5000)
    }
  }, [isRequesting])

  useEffect(() => {
    if (isResetting) {
      setShowStep2(false)
      setLoadingStep2(false)
      setTimeout(() => {
        setLoadingStep2(false)
      }, 5000)
    }
  }, [isResetting])

  const spinner1 = (
    <>
      <RotatingLines eight={40} width={40} />
      寄出郵件中，請稍後...
    </>
  )
  const spinner2 = (
    <>
      <RotatingLines eight={40} width={40} />
      更新密碼中，請稍後...
    </>
  )

  const sectionStep1 = (
    <section id="step1">
      <h3>第一步: 輸入註冊的電子郵件信箱</h3>
      <label>
        電子郵件信箱:
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setIsEmailFilled(e.target.value.includes('@'))
          }}
          disabled={!showStep1}
        />
      </label>
      <br />
      <button
        onClick={handleRequestOtpToken}
        className={`login-button ${isEmailFilled ? 'hover' : ''}`}
      >
        取得驗証碼
      </button>
      <p>
        注意驗証碼有效期間為
        <span style={{ fontWeight: 700, color: 'red' }}>5分鐘</span>
        ，需要到期後才能再重新寄送。
      </p>
    </section>
  )

  const sectionStep2 = (
    <section id="step2">
      <h3>第二步: 輸入在電子郵件信箱中獲得的一次性驗証碼，與新的密碼</h3>
      <label>
        一次性驗証碼:
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          disabled={!showStep2}
        />
      </label>
      <br />
      <label>
        新密碼:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!showStep2}
        />
      </label>
      <br />
      <button onClick={handleResetPassword} disabled={!showStep2}>
        重設密碼
      </button>
    </section>
  )

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
          <form className="forget-password-container">
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
            <div className="login">忘記密碼</div>

            {!isOtpSent ? (
              <>
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
                <button
                  onClick={handleRequestOtpToken}
                  className={`login-button ${isEmailFilled ? 'hover' : ''}`}
                  disabled={!isEmailFilled}
                >
                  獲取驗證碼
                </button>
              </>
            ) : (
              <p
                className="mt-5"
                style={{
                  fontWeight: 400,
                  fontSize: '15px',
                  textAlign: 'center',
                }}
              >
                驗證碼已寄出，請透過郵件連結使用該碼重設密碼
              </p>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
