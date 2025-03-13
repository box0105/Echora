'use client'

import '../_styles/member.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/style0.scss'
import MemberLayout from '../layouts/memberLayout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import { toastWarning, toastSuccess, toastError } from '@/hooks/use-toast'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
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
  city: '',
  district: '',
}

const taiwanCities = {
  // ...existing code...
}

export default function ProfilePage() {
  const { user, isAuth } = useAuth()
  const [profileInput, setProfileInput] = useState(initUserProfile)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [remainingAddress, setRemainingAddress] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      return
    }

    const userId = localStorage.getItem('userId')
    if (!userId) return

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
          const { city, district, address } = resData.data
          if (address) {
            const remainingAddress = address.replace(`${city} ${district} `, '')
            setSelectedCity(city)
            setSelectedDistrict(district)
            setRemainingAddress(remainingAddress)
          }
          setProfileInput(resData.data)
          console.log('User profile data:', resData.data)
        } else {
          toastWarning(`獲取會員資料失敗: ${resData.message}`)
        }
      } catch (err) {
        toastWarning(`獲取會員資料失敗: ${err.message}`)
      }
    }
    fetchUserProfile()
  }, [isAuth, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileInput((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleCityChange = (e) => {
    const city = e.target.value
    setSelectedCity(city)
    setSelectedDistrict('')
    setRemainingAddress('')
    setProfileInput((prevProfile) => ({
      ...prevProfile,
      city: city,
      district: '',
      address: '',
    }))
  }

  const handleDistrictChange = (e) => {
    const district = e.target.value
    setSelectedDistrict(district)
    setProfileInput((prevProfile) => ({
      ...prevProfile,
      district: district,
      address: `${selectedCity} ${district} ${remainingAddress}`,
    }))
  }

  const handleRemainingAddressChange = (e) => {
    const address = e.target.value
    setRemainingAddress(address)
    setProfileInput((prevProfile) => ({
      ...prevProfile,
      address: address,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const phoneRegex = /^09\d{8}$/ // 確保完整的10碼
    if (!phoneRegex.test(profileInput.phone)) {
      toastWarning('請輸入有效的台灣手機號碼（09開頭，共10位數字）')
      return // 阻止表單提交
    }

    const userId = localStorage.getItem('userId')
    try {
      const res = await fetch(`http://localhost:3005/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userId')}`,
        },
        body: JSON.stringify(profileInput),
      })
      const resData = await res.json()
      if (resData.status === 'success') {
        toastSuccess('會員資料更新成功', {
          position: 'bottom-right',
          autoClose: 1000,
          onClose: () => window.location.reload('/my-user/profile'),
        })
        setProfileInput((prevProfile) => ({
          ...prevProfile,
          ...resData.data,
        }))
      } else {
        toastError(`更新會員資料失敗: ${resData.message}`)
      }
    } catch (err) {
      toastError(`更新會員資料失敗: ${err.message}`)
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
                  className="form-control a-form-control"
                  value={profileInput?.username || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email/帳號
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control a-form-control"
                  value={profileInput?.email || ''}
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
                    checked={profileInput?.sex === 'female'}
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
                    checked={profileInput?.sex === 'male'}
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
                    checked={profileInput?.sex === 'other'}
                    onChange={handleInputChange}
                  />
                  <span className="gender-radio" />
                  <span>不便透露</span>
                </label>
              </fieldset>
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
                  className="form-control a-form-control"
                  value={profileInput?.phone || ''}
                  onChange={handleInputChange}
                  placeholder="請輸入電話號碼"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  地址
                </label>
                <select
                  id="city"
                  name="city"
                  className="form-control a-form-control"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="">請選擇縣市</option>
                  {Object.keys(taiwanCities).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {selectedCity && taiwanCities[selectedCity] && (
                  <select
                    id="district"
                    name="district"
                    className="form-control a-form-control"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <option value="">請選擇區域</option>
                    {taiwanCities[selectedCity].map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                )}
                {selectedDistrict && (
                  <input
                    type="text"
                    id="remainingAddress"
                    name="remainingAddress"
                    className="form-control a-form-control"
                    value={remainingAddress}
                    onChange={handleRemainingAddressChange}
                    placeholder="請輸入詳細地址"
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="postcode" className="form-label">
                  郵遞區號
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  className="form-control a-form-control"
                  value={profileInput?.postcode || ''}
                  onChange={handleInputChange}
                  placeholder="請輸入郵遞區號"
                />
              </div>
            </div>
            {/* <div className="section-header">
              <h4 className="form-label">頭貼</h4>
              <img
                src={profileInput.avatar || '../images/user/article-2'}
                alt="頭貼"
              />
              <input type="file" name="avatar" onChange={handleFileChange} />
            </div> */}
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
