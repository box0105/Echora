'use client'

import '../_styles/member.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/style0.scss'
import {
  useAuthGet,
  useUserUpdateProfile,
} from '@/services/rest-client/use-user'
import { useState, useEffect } from 'react'
// import { useAuth } from '@/hooks/use-auth'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import PreviewUploadImage from './_components/preview-upload-image'
import TWZipCode from './_components/tw-zipcode'
// 載入loading元件
import { Oval } from 'react-loader-spinner'

// 定義要在此頁呈現/編輯的會員資料初始物件
const initUserProfile = {
  name: '',
  bio: '',
  sex: '',
  phone: '',
  avatar: '',
  birth: '',
  postcode: '',
  address: '',
}

export default function ProfilePage() {
  // const { mutate } = useAuthGet()
  // const { updateProfile } = useUserUpdateProfile()
  // // 會員資料在user.profile中
  // const { isAuth, user, isLoading } = useAuth()
  // const [profileInput, setProfileInput] = useState(initUserProfile)

  // // 輸入一般資料用
  // const handleFieldChange = (e) => {
  //   setProfileInput({ ...profileInput, [e.target.name]: e.target.value })
  // }

  // // 送出表單用
  // const handleSubmit = async (e) => {
  //   // 阻擋表單預設送出行為
  //   e.preventDefault()

  //   // 這裡可以作表單驗証

  //   // 送到伺服器進行更新 更新會員資料用，不包含avatar
  //   const res = await updateProfile(profileInput)
  //   const resData = await res.json()
  //   console.log('resData', resData)

  //   // console.log(res.data)
  //   if (resData.status === 'success') {
  //     // 重新取得會員資料
  //     mutate()
  //     toast.success('會員資料修改成功')
  //   } else {
  //     toast.error('會員資料修改失敗')
  //   }
  // }

  // // 載入完成後向要會員資料
  // useEffect(() => {
  //   if (!isAuth) return

  //   // eslint-disable-next-line
  //   const { avatar, ...rest } = user.profile
  //   setProfileInput(rest)
  //   // eslint-disable-next-line
  // }, [isAuth])

  // // 未登入時，不會出現頁面內容
  // if (!isAuth) return <></>
  // // 載入中動畫
  // if (isLoading)
  //   return (
  //     <Oval
  //       visible={true}
  //       height="80"
  //       width="80"
  //       color="#4fa94d"
  //       ariaLabel="oval-loading"
  //       wrapperStyle={{}}
  //       wrapperClass=""
  //     />
  // )

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
              <form className="profile-form">
                <div className="section-header">
                  <h4 className="section-title">個人資料</h4>
                </div>
                <div className="form-container">
                  <div className="left">
                    <div className="form-group">
                      <label htmlFor="lastname" className="form-label">
                        姓氏
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        className="form-control"
                        defaultValue="Chen"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="firstname" className="form-label">
                        名字
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        className="form-control"
                        defaultValue="Mike"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        defaultValue="1234567@gmail.com"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <div className="password-group">
                        <div>
                          <label htmlFor="password" className="form-label">
                            密碼
                          </label>
                          <div
                            type="password"
                            id="password"
                            className
                            value="******"
                            readOnly
                          >
                            ******
                          </div>
                        </div>
                        <button type="button" className="change-password">
                          修改
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <label htmlFor="lastname" className="form-label">
                        電話號碼
                      </label>
                      <input
                        type="text"
                        id="phone"
                        className="form-control"
                        defaultValue
                        placeholder="請輸入電話號碼"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname" className="form-label">
                        地址
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="form-control"
                        defaultValue
                        placeholder="請輸入地址"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname" className="form-label">
                        郵遞區號
                      </label>
                      <input
                        type="text"
                        id="postcode"
                        className="form-control"
                        defaultValue
                        placeholder="請輸入郵遞區號"
                      />
                    </div>
                    <fieldset className="gender-group form-group">
                      <legend className="form-label">
                        性別 <span>(選填)</span>
                      </legend>
                      <label className="gender-label">
                        <input
                          type="radio"
                          name="gender"
                          defaultValue="female"
                          className="visually-hidden"
                        />
                        <span className="gender-radio" />
                        <span>女</span>
                      </label>
                      <label className="gender-label">
                        <input
                          type="radio"
                          name="gender"
                          defaultValue="male"
                          className="visually-hidden"
                        />
                        <span className="gender-radio" />
                        <span>男</span>
                      </label>
                      <label className="gender-label">
                        <input
                          type="radio"
                          name="gender"
                          defaultValue="other"
                          className="visually-hidden"
                        />
                        <span className="gender-radio" />
                        <span>不便透露</span>
                      </label>
                    </fieldset>
                  </div>
                </div>
                <button type="submit" className="submit-btn">
                  變更儲存
                </button>
              </form>
            </div>
          </div>
        </main>
        <footer className="footer" />
      </div>
    </>
  )
}
