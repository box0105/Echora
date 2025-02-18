'use client'

import '../_styles/member.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/style0.scss'
import MemberLayout from '../layouts/memberLayout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/hooks/use-auth'
import PreviewUploadImage from './_components/preview-upload-image'
import TWZipCode from './_components/tw-zipcode'
import { Oval } from 'react-loader-spinner'

const initUserProfile = {
  username: '',
  email: '',
  sex: '',
  phone: '',
  postcode: '',
  address: '',
}

export default function ProfilePage() {
  const { user, isAuth } = useAuth()
  const [userProfile, setUserProfile] = useState(initUserProfile)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    // console.log('Current token:', userId)
    // if (!isAuth || !user?.id) return
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userId')}`, // 附帶 token
          },
        })
        const resData = await res.json()
        console.log('API 回傳資料:', resData)
        if (resData.status === 'success') {
          setUserProfile(resData.data)
          console.log('User profile data:', resData.data)
        } else {
          toast.error(`獲取會員資料失敗: ${resData.message}`)
        }
      } catch (err) {
        toast.error(`獲取會員資料失敗: ${err.message}`)
      }
    }

    fetchUserProfile()
  }, [user, isAuth])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')
    try {
      const res = await fetch(`http://localhost:3005/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userId')}`,
        },
        body: JSON.stringify(userProfile),
      })
      const resData = await res.json()
      if (resData.status === 'success') {
        toast.success('會員資料更新成功')
      } else {
        toast.error(`更新會員資料失敗: ${resData.message}`)
      }
    } catch (err) {
      toast.error(`更新會員資料失敗: ${err.message}`)
    }
  }

  return (
    <>
      <MemberLayout>
        <form className="profile-form" onSubmit={handleSubmit}>
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
                  name="username"
                  className="form-control"
                  value={userProfile.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={userProfile.email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <div className="password-group">
                  <div>
                    <label htmlFor="password" className="form-label">
                      密碼
                    </label>
                    <div type="password" id="password" readOnly>
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
                <label htmlFor="phone" className="form-label">
                  電話號碼
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={userProfile.phone}
                  onChange={handleInputChange}
                  placeholder="請輸入電話號碼"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  地址
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={userProfile.address}
                  onChange={handleInputChange}
                  placeholder="請輸入地址"
                />
              </div>
              <div className="form-group">
                <label htmlFor="postcode" className="form-label">
                  郵遞區號
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  className="form-control"
                  value={userProfile.postcode}
                  onChange={handleInputChange}
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
                    name="sex"
                    value="female"
                    className="visually-hidden"
                    checked={userProfile.sex === 'female'}
                    onChange={handleInputChange}
                  />
                  <span className="gender-radio" />
                  <span>女</span>
                </label>
                <label className="gender-label">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    className="visually-hidden"
                    checked={userProfile.sex === 'male'}
                    onChange={handleInputChange}
                  />
                  <span className="gender-radio" />
                  <span>男</span>
                </label>
                <label className="gender-label">
                  <input
                    type="radio"
                    name="sex"
                    value="other"
                    className="visually-hidden"
                    checked={userProfile.sex === 'other'}
                    onChange={handleInputChange}
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
      <ToastContainer />
    </>
  )
}
