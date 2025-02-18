'use client'

import '../_styles/member.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/style0.scss'
import MemberLayout from '../layouts/memberLayout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PreviewUploadImage from './_components/preview-upload-image'
import { jwtDecode } from 'jwt-decode'
import TWZipCode from './_components/tw-zipcode'
import { Oval } from 'react-loader-spinner'

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
  const [userProfile, setUserProfile] = useState(initUserProfile)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/users/1') // 替換為實際的用戶 ID
        const resData = await res.json()
        // console.log('API 回傳資料:', resData)
        if (resData.status === 'success') {
          setUserProfile(resData.data)
          // console.log(resData.data)
        } else {
          toast.error(`獲取會員資料失敗: ${resData.message}`)
        }
      } catch (err) {
        toast.error(`獲取會員資料失敗: ${err.message}`)
      }
    }

    fetchUserProfile()
  }, [])
  return (
    <>
      <MemberLayout>
        <form className="profile-form">
          <div className="section-header">
            <h4 className="section-title h4">個人資料</h4>
          </div>
          <div className="a-form-container">
            <div className="left">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  姓名
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  defaultValue={userProfile?.username || ''}
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
                  defaultValue={userProfile?.email || ''}
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
                      defaultValue={userProfile?.password || ''}
                      readOnly
                    >
                      ******
                    </div>
                  </div>
                  <button type="button" className="change-password">
                    <Link
                      href="/my-user/profile-password"
                      className="change-password"
                    >
                      修改
                    </Link>
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
      </MemberLayout>
    </>
  )
}
