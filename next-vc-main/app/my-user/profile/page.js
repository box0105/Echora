'use client'

import '../_styles/member.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/style0.scss'
import MemberLayout from '../layouts/memberLayout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
// import { toast, ToastContainer } from 'react-toastify'
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
  台北市: [
    '中正區',
    '大同區',
    '中山區',
    '松山區',
    '大安區',
    '萬華區',
    '信義區',
    '士林區',
    '北投區',
    '內湖區',
    '南港區',
    '文山區',
  ],
  新北市: [
    '板橋區',
    '新莊區',
    '中和區',
    '永和區',
    '土城區',
    '樹林區',
    '三峽區',
    '鶯歌區',
    '三重區',
    '蘆洲區',
    '五股區',
    '泰山區',
    '林口區',
    '八里區',
    '淡水區',
    '三芝區',
    '石門區',
    '金山區',
    '萬里區',
    '汐止區',
    '瑞芳區',
    '貢寮區',
    '平溪區',
    '雙溪區',
    '深坑區',
    '石碇區',
    '新店區',
    '坪林區',
    '烏來區',
  ],
  基隆市: [
    '仁愛區',
    '信義區',
    '中正區',
    '中山區',
    '安樂區',
    '暖暖區',
    '七堵區',
  ],
  桃園市: [
    '桃園區',
    '中壢區',
    '平鎮區',
    '八德區',
    '楊梅區',
    '蘆竹區',
    '龜山區',
    '大溪區',
    '大園區',
    '觀音區',
    '新屋區',
    '龍潭區',
    '復興區',
  ],
  新竹市: ['東區', '北區', '香山區'],
  新竹縣: [
    '竹北市',
    '湖口鄉',
    '新豐鄉',
    '新埔鎮',
    '關西鎮',
    '芎林鄉',
    '寶山鄉',
    '竹東鎮',
    '五峰鄉',
    '橫山鄉',
    '尖石鄉',
    '北埔鄉',
    '峨眉鄉',
  ],
  苗栗縣: [
    '苗栗市',
    '頭份市',
    '竹南鎮',
    '後龍鎮',
    '通霄鎮',
    '苑裡鎮',
    '卓蘭鎮',
    '造橋鄉',
    '西湖鄉',
    '頭屋鄉',
    '公館鄉',
    '大湖鄉',
    '泰安鄉',
    '銅鑼鄉',
    '三義鄉',
    '南庄鄉',
    '獅潭鄉',
  ],
  台中市: [
    '中區',
    '東區',
    '南區',
    '西區',
    '北區',
    '北屯區',
    '西屯區',
    '南屯區',
    '太平區',
    '大里區',
    '霧峰區',
    '烏日區',
    '豐原區',
    '后里區',
    '石岡區',
    '東勢區',
    '和平區',
    '新社區',
    '潭子區',
    '大雅區',
    '神岡區',
    '大肚區',
    '沙鹿區',
    '龍井區',
    '梧棲區',
    '清水區',
    '大甲區',
    '外埔區',
    '大安區',
  ],
  彰化縣: [
    '彰化市',
    '鹿港鎮',
    '和美鎮',
    '北斗鎮',
    '員林市',
    '溪湖鎮',
    '田中鎮',
    '二林鎮',
    '線西鄉',
    '伸港鄉',
    '福興鄉',
    '秀水鄉',
    '花壇鄉',
    '芬園鄉',
    '大村鄉',
    '埔鹽鄉',
    '埔心鄉',
    '永靖鄉',
    '社頭鄉',
    '二水鄉',
    '田尾鄉',
    '埤頭鄉',
    '芳苑鄉',
    '大城鄉',
    '竹塘鄉',
    '溪州鄉',
  ],
  南投縣: [
    '南投市',
    '埔里鎮',
    '草屯鎮',
    '竹山鎮',
    '集集鎮',
    '名間鄉',
    '鹿谷鄉',
    '中寮鄉',
    '魚池鄉',
    '國姓鄉',
    '水里鄉',
    '信義鄉',
    '仁愛鄉',
  ],
  雲林縣: [
    '斗六市',
    '斗南鎮',
    '虎尾鎮',
    '西螺鎮',
    '土庫鎮',
    '北港鎮',
    '林內鄉',
    '古坑鄉',
    '大埤鄉',
    '莿桐鄉',
    '褒忠鄉',
    '二崙鄉',
    '崙背鄉',
    '麥寮鄉',
    '台西鄉',
    '東勢鄉',
    '元長鄉',
    '四湖鄉',
    '口湖鄉',
    '水林鄉',
  ],
  嘉義市: ['東區', '西區'],
  嘉義縣: [
    '太保市',
    '朴子市',
    '布袋鎮',
    '大林鎮',
    '民雄鄉',
    '溪口鄉',
    '新港鄉',
    '六腳鄉',
    '東石鄉',
    '義竹鄉',
    '鹿草鄉',
    '水上鄉',
    '中埔鄉',
    '竹崎鄉',
    '梅山鄉',
    '番路鄉',
    '大埔鄉',
    '阿里山鄉',
  ],
  台南市: [
    '中西區',
    '東區',
    '南區',
    '北區',
    '安平區',
    '安南區',
    '永康區',
    '歸仁區',
    '新化區',
    '左鎮區',
    '玉井區',
    '楠西區',
    '南化區',
    '仁德區',
    '關廟區',
    '龍崎區',
    '官田區',
    '麻豆區',
    '佳里區',
    '西港區',
    '七股區',
    '將軍區',
    '學甲區',
    '北門區',
    '新營區',
    '後壁區',
    '白河區',
    '東山區',
    '六甲區',
    '下營區',
    '柳營區',
    '鹽水區',
  ],
  高雄市: [
    '楠梓區',
    '左營區',
    '鼓山區',
    '三民區',
    '鹽埕區',
    '前金區',
    '新興區',
    '苓雅區',
    '前鎮區',
    '旗津區',
    '小港區',
    '鳳山區',
    '大寮區',
    '鳥松區',
    '林園區',
    '仁武區',
    '大樹區',
    '大社區',
    '岡山區',
    '路竹區',
    '橋頭區',
    '梓官區',
    '彌陀區',
    '永安區',
    '燕巢區',
    '田寮區',
    '阿蓮區',
    '茄萣區',
    '湖內區',
    '旗山區',
    '美濃區',
    '內門區',
    '杉林區',
    '甲仙區',
    '六龜區',
    '茂林區',
    '桃源區',
    '那瑪夏區',
  ],
  屏東縣: [
    '屏東市',
    '潮州鎮',
    '東港鎮',
    '恆春鎮',
    '萬丹鄉',
    '長治鄉',
    '麟洛鄉',
    '九如鄉',
    '里港鄉',
    '鹽埔鄉',
    '高樹鄉',
    '萬巒鄉',
    '內埔鄉',
    '竹田鄉',
    '新埤鄉',
    '枋寮鄉',
    '枋山鄉',
    '三地門鄉',
    '霧台鄉',
    '瑪家鄉',
    '泰武鄉',
    '來義鄉',
    '春日鄉',
    '獅子鄉',
    '車城鄉',
    '牡丹鄉',
    '滿州鄉',
  ],
  台東縣: [
    '台東市',
    '成功鎮',
    '關山鎮',
    '長濱鄉',
    '池上鄉',
    '東河鄉',
    '鹿野鄉',
    '延平鄉',
    '卑南鄉',
    '大武鄉',
    '太麻里鄉',
    '綠島鄉',
    '蘭嶼鄉',
    '達仁鄉',
  ],
  花蓮縣: [
    '花蓮市',
    '鳳林鎮',
    '玉里鎮',
    '新城鄉',
    '吉安鄉',
    '壽豐鄉',
    '光復鄉',
    '豐濱鄉',
    '瑞穗鄉',
    '萬榮鄉',
    '卓溪鄉',
  ],
  宜蘭縣: [
    '宜蘭市',
    '羅東鎮',
    '蘇澳鎮',
    '頭城鎮',
    '礁溪鄉',
    '壯圍鄉',
    '員山鄉',
    '冬山鄉',
    '五結鄉',
    '三星鄉',
    '大同鄉',
    '南澳鄉',
  ],
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
        const res = await fetch(`https://echora-kwvs.onrender.com/api/api/users/${userId}`, {
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
      const res = await fetch(`https://echora-kwvs.onrender.com/api/api/users/${userId}`, {
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
                <label htmlFor="username" className="a-form-label">
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
                <label htmlFor="email" className="a-form-label">
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
                    <label htmlFor="password" className="a-form-label">
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
                <legend className="a-form-label">
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
                <label htmlFor="phone" className="a-form-label">
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
                <label htmlFor="address" className="a-form-label">
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
                <label htmlFor="postcode" className="a-form-label">
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
              <h4 className="a-form-label">頭貼</h4>
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
    </>
  )
}
