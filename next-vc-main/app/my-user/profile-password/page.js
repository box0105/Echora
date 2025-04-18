'use client'

import '../_styles/member.scss'
import MemberLayout from '../layouts/memberLayout'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import { toastError, toastSuccess, toastWarning } from '@/hooks/use-toast'
import 'react-toastify/dist/ReactToastify.css'
import { useUserUpdatePassword } from '@/services/rest-client/use-user'
import { useAuth } from '@/hooks/use-auth'

const initUserPassword = {
  current: '', // 原本密碼，要比對成功才能修改
  new: '', // 新密碼
  confirm: '', //確認新密碼用(前端檢查用，不送後端)
}

export default function PasswordPage() {
  const { updatePassword } = useUserUpdatePassword()
  const { user, isAuth, setIsAuth } = useAuth()
  const [userPasswordInput, setUserPasswordInput] = useState(initUserPassword)
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      setIsAuth(true)
    }
  }, [setIsAuth])

  const handleFieldChange = (e) => {
    setUserPasswordInput({
      ...userPasswordInput,
      [e.target.name]: e.target.value,
    })
  }

  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')

    if (
      !userPasswordInput.new ||
      !userPasswordInput.current ||
      !userPasswordInput.confirm
    ) {
      toastError('密碼欄位為必填')
      return
    }

    if (userPasswordInput.new !== userPasswordInput.confirm) {
      toastError('新密碼與確認密碼不同')
      return
    }

    try {
      const res = await fetch(
        `https://echora-kwvs.onrender.com/api/users/${userId}/password`,
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
        toastSuccess('會員密碼修改成功', {
          autoClose: 2000,
          position: 'bottom-right',
        })
      } else {
        toastError(`會員密碼修改失敗: ${resData.message}`)
      }
    } catch (err) {
      toastError(`會員密碼修改失敗: ${err.message}`)
    }
  }

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
              <div className="mb-4 position-relative">
                <label htmlFor="current" className="a-form-label">
                  舊密碼
                </label>
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  className="form-control"
                  id="current"
                  name="current"
                  value={userPasswordInput.current}
                  onChange={handleFieldChange}
                  required
                />
                <button
                  className={`fa ${
                    showPassword.current
                      ? 'fa-regular fa-eye-slash'
                      : 'fa-regular fa-eye'
                  } position-absolute`}
                  style={{ top: '60%', right: '10px', cursor: 'pointer' }}
                  onClick={() => toggleShowPassword('current')}
                  aria-label="Toggle password visibility" // 可選，為無障礙提供更清晰的描述
                ></button>
              </div>
              <div className="mb-4 position-relative">
                <label htmlFor="new" className="a-form-label">
                  新密碼
                </label>
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  className="form-control"
                  id="new"
                  name="new"
                  value={userPasswordInput.new}
                  onChange={handleFieldChange}
                  required
                />
                <button
                  className={`fa ${
                    showPassword.new
                      ? 'fa-regular fa-eye-slash'
                      : 'fa-regular fa-eye'
                  } position-absolute`}
                  style={{ top: '60%', right: '10px', cursor: 'pointer' }}
                  onClick={() => toggleShowPassword('new')}
                  aria-label="Toggle password visibility" // 可選，為無障礙提供清晰的描述
                ></button>
              </div>
              <div className="mb-4 position-relative" style={{ width: '100%' }}>
                <label htmlFor="confirm" className="a-form-label">
                  確認新密碼
                </label>
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  className="form-control"
                  id="confirm"
                  name="confirm"
                  value={userPasswordInput.confirm}
                  onChange={handleFieldChange}
                  required
                />
                <button
                  className={`fa ${
                    showPassword.confirm
                      ? 'fa-regular fa-eye-slash'
                      : 'fa-regular fa-eye'
                  } position-absolute`}
                  style={{ top: '60%', right: '10px', cursor: 'pointer' }}
                  onClick={() => toggleShowPassword('confirm')}
                  aria-label="Toggle confirm password visibility" // 可選，為無障礙提供清晰的描述
                ></button>
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
