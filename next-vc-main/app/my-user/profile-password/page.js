'use client'

import '../_styles/member.scss'
import MemberLayout from '../layouts/memberLayout'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
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
      toast.error('密碼欄位為必填')
      return
    }

    if (userPasswordInput.new !== userPasswordInput.confirm) {
      toast.error('新密碼與確認密碼不同')
      return
    }

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
                <label htmlFor="current" className="form-label">
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
                <i
                  className={`fa ${
                    showPassword.current ? 'fa-eye-slash' : 'fa-eye'
                  } position-absolute`}
                  style={{ top: '60%', right: '10px', cursor: 'pointer' }}
                  onClick={() => toggleShowPassword('current')}
                ></i>
              </div>
              <div className="mb-4 position-relative">
                <label htmlFor="new" className="form-label">
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
                <i
                  className={`fa ${
                    showPassword.new ? 'fa-eye-slash' : 'fa-eye'
                  } position-absolute`}
                  style={{ top: '60%', right: '10px', cursor: 'pointer' }}
                  onClick={() => toggleShowPassword('new')}
                ></i>
              </div>
              <div className="mb-4 position-relative">
                <label htmlFor="confirm" className="form-label">
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
                <i
                  className={`fa ${
                    showPassword.confirm ? 'fa-eye-slash' : 'fa-eye'
                  } position-absolute`}
                  style={{ top: '60%', right: '10px', cursor: 'pointer' }}
                  onClick={() => toggleShowPassword('confirm')}
                ></i>
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
