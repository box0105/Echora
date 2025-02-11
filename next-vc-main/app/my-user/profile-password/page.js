'use client'

import '../_styles/member.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState } from 'react'
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
  // const { updatePassword } = useUserUpdatePassword()
  // // 需要會員登入時的id
  // const { isAuth } = useAuth()
  // // 本頁狀態用
  // const [userPasswordInput, setUserPasswordInput] = useState(initUserPassword)

  // // 輸入資料用
  // const handleFieldChange = (e) => {
  //   setUserPasswordInput({
  //     ...userPasswordInput,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // // 送出表單用
  // const handleSubmit = async (e) => {
  //   // 阻擋表單預設送出行為
  //   e.preventDefault()

  //   // 表單驗証 - START
  //   if (
  //     !userPasswordInput.new ||
  //     !userPasswordInput.current ||
  //     !userPasswordInput.confirm
  //   ) {
  //     toast.error('密碼欄位為必填')
  //     return // 跳出函式
  //   }

  //   if (userPasswordInput.new !== userPasswordInput.confirm) {
  //     toast.error('新密碼與確認密碼不同')
  //     return // 跳出函式
  //   }
  //   // 表單驗証 - END

  //   // 送到伺服器進行更新
  //   const password = {
  //     currentPassword: userPasswordInput.current,
  //     newPassword: userPasswordInput.new,
  //   }
  //   const res = await updatePassword(password)
  //   const resData = await res.json()

  //   console.log(resData)

  //   if (resData.status === 'success') {
  //     toast.success('會員密碼修改成功')
  //   } else {
  //     toast.error('會員密碼修改失敗')
  //   }
  // }

  // // 未登入時，不會出現頁面內容
  // if (!isAuth) return <></>

  return (
    <>
      <div>
        <header />
        <main className="main">
          <div className="container">
            <h1 className="page-title">關於我</h1>
            <hr />
            <div className="hamburger-member" id="hamburger-member">
              <div className="dropdown-content dropdown">
                <h5>
                  關於我 <i className="fa-solid fa-caret-down" />
                </h5>
                <h5 className="tab-link active" data-tab="orders">
                  我的訂單
                </h5>
                <h5 className="tab-link active" data-tab="favorites">
                  我的收藏
                </h5>
                <h5>我的優惠券</h5>
              </div>
            </div>
            <div className="content">
              <aside className="sidebar">
                <div className="sidebar-section">
                  <h2 className="sidebar-title">關於我</h2>
                  <ul className="sidebar-menu">
                    <li className="sidebar-item active">個人資料</li>
                    <li className="sidebar-item">修改密碼</li>
                  </ul>
                </div>
                <div className="sidebar-section">
                  <h2 className="sidebar-title">我的訂單</h2>
                </div>
                <div className="sidebar-section">
                  <h2 className="sidebar-title">我的收藏</h2>
                </div>
                <div className="sidebar-section">
                  <h2 className="sidebar-title">我的優惠券</h2>
                </div>
              </aside>
              <div className="change-password-form">
                <div className="change-password-header">
                  <div className="change-password-title h4">修改密碼</div>
                </div>
                <div className="change-password-body">
                  <form action method="post">
                    <div className="mb-4">
                      <label htmlFor="old-password" className="form-label">
                        舊密碼
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="old-password"
                        name="old-password"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="new-password" className="form-label">
                        新密碼
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="new-password"
                        name="new-password"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="confirm-password" className="form-label">
                        確認新密碼
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirm-password"
                        name="confirm-password"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-dark">
                      確認修改
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer" />
      </div>
    </>
  )
}
