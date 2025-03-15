'use client'

import React, { useState, useEffect } from 'react'
import ZipcodeSelector from '../../_components/ZipcodeSelector'
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import FormActivity from '../../_components/FormActivity'
import { useFilterPanel } from '@/hooks/use-filter-panel'
import { useFetch } from '@/hooks/use-fetch'
import { useActivity } from '@/hooks/use-activity'
import { toastInfo, toastSuccess, toastWarning } from '@/hooks/use-toast'
import { NumberZh } from 'number-zh'

export default function AdminActivityState() {
  const { state } = useParams()
  const searchParams = useSearchParams()
  const activityId = Number(searchParams?.get('id'))
  const isUpdate = state === 'update'

  const router = useRouter()
  const numberZh = new NumberZh()

  const { reFetch: reFetchAllActivity } = useActivity()

  // Update 頁面時抓取資料
  const {
    data: act,
    isLoading,
    error,
    reFetch: reFetchThisActivity,
  } = useFetch(
    isUpdate ? `http://localhost:3005/api/activities/${activityId}` : null
  )

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    music_genre_id: '',
    date_start: '',
    date_end: '',
    signup_start: '',
    signup_end: '',
    city: '',
    dist: '',
    address: '',
    zipcode: '',
    intro: '',
    media: '',
    type: [{ name: '', price: '', stock: '' }],
    article: [{ title: '', content: '', images: '' }],
    lineup: [{ bands: '' }],
  })

  // Update 頁面時把資料載入 formdata 呈現在畫面上
  useEffect(() => {
    if (act) {
      setFormData({
        name: act?.name,
        category_id: act?.category_id,
        music_genre_id: act?.music_genre_id,
        date_start: act.date_start
          ? new Date(act.date_start).toISOString().split('T')[0]
          : '',
        date_end: act.date_end
          ? new Date(act.date_end).toISOString().split('T')[0]
          : '',
        signup_start: act.signup_start
          ? new Date(act.signup_start).toISOString().split('T')[0]
          : '',
        signup_end: act.signup_end
          ? new Date(act.signup_end).toISOString().split('T')[0]
          : '',
        city: act?.city,
        dist: act?.dist,
        address: act?.address,
        zipcode: act?.zipcode,
        intro: act?.intro,
        media: act?.media.split(','),
        type: act?.type,
        article: act?.article,
        lineup: act?.lineup,
      })
      setTicketNum(act?.type.length)
      setBandNum(act?.lineup.length)
      setArticleNum(act?.article.length)
      setImageItems([
        ...act.media.split(',').map((file) => ({
          id: file, // 直接使用檔名當 ID
          url: `/images/activity/${file}`, // 預覽檔名加上前綴
          type: 'uploaded',
        })),
      ])
    }
    if (error) {
      setTimeout(() => {
        // 延遲，確保進到列表頁才通知
        toastWarning('該活動不存在')
      }, 600)

      redirect('/admin/activity')
    }
  }, [act, error])

  const [imageItems, setImageItems] = useState([]) // 用來儲存圖片的統一狀態

  const [ticketNum, setTicketNum] = useState(1)
  const [bandNum, setBandNum] = useState(1)
  const [articleNum, setArticleNum] = useState(1)

  const {
    selectedCategories,
    selectedGenres,
    selectedDate,
    error: dateError,
    handleDateChange,
  } = useFilterPanel()

  // 上傳圖片後預覽 (還未送出)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    if (files.length > 10) {
      toastWarning('一次最多上傳 10 張照片')
      return
    }

    const newFileData = files.map((file, i) => {
      return {
        id: `${Date.now()}_${i}`,
        url: URL.createObjectURL(file),
        file: file,
        type: 'uploading',
      }
    })

    setImageItems((prev) => [...prev, ...newFileData])
  }

  // 刪除預覽（包含 uploaded 與 uploading）
  const handleImageDelete = (id, type) => {
    setImageItems((prev) => prev.filter((file) => file.id !== id))

    // 刪除為已有的圖片時，也更新 formData
    if (type === 'uploaded') {
      setFormData((prevData) => ({
        ...prevData,
        media: prevData.media.filter((file) => file !== id),
      }))
    } else if (type === 'uploading') {
      // 若刪除上傳中的，要重置檔案輸入框
      // document.querySelector('#addImage').value = null
    }
  }

  // 將門票的欄位整理為物件
  const handleTicketChange = (index, field, value) => {
    const updated = [...formData.type]
    if (!updated[index]) updated[index] = { name: '', stock: '', price: '' }
    updated[index][field] = value
    setFormData({ ...formData, type: updated })
  }

  // 將陣容加入 formData
  const handleLineupChange = (index, value) => {
    const updated = [...formData.lineup]
    if (!updated[index]) updated[index] = { bands: '' }
    updated[index]['bands'] = value
    setFormData({ ...formData, lineup: updated })
  }

  // 將文章加入 formData
  const handleArticleChange = (index, field, value) => {
    const updated = [...formData.article]
    if (!updated[index]) updated[index] = { title: '', content: '', images: '' }
    updated[index][field] = value
    setFormData({ ...formData, article: updated })
  }

  // 日期檢查
  const [signupError, setSignupError] = useState('')
  const [totalError, setTotalError] = useState('')
  useEffect(() => {
    // 報名開始 > 結束
    if (formData.signup_end && formData.signup_start)
      setSignupError(
        formData.signup_end < formData.signup_start
          ? '報名開始日期應早於結束日期'
          : ''
      )
    else setSignupError('')

    // 報名時間 > 活動時間
    if (selectedDate)
      setTotalError(
        selectedDate[0] < formData?.signup_end ||
          selectedDate[0] < formData?.signup_start
          ? '報名時間應早於活動時間'
          : ''
      )
    else setTotalError('')
  }, [formData])

  // API create
  const createActivity = async (updatedFormData) => {
    try {
      const response = await fetch('http://localhost:3005/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      })

      const data = await response.json()
      if (data.status === 'success') {
        // 列表頁資料重新抓取
        reFetchAllActivity()
      } else {
        toastInfo(`有表單欄位為空，請確認填寫`)
        console.error('活動新增失敗', data)
      }
    } catch (error) {
      console.error('活動新增遇到錯誤', error)
    }
  }

  // API update
  const updateActivity = async (updatedFormData) => {
    if (!activityId) {
      console.error('缺少 activityId, 無法更新活動')
      return
    }
    try {
      const response = await fetch(
        `http://localhost:3005/api/activities/${activityId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        }
      )
      const data = await response.json()
      if (data.status === 'success') {
        toastSuccess(`活動更新完成`)
        // 列表頁跟詳細頁的資料都重新抓取
        reFetchAllActivity()
        reFetchThisActivity()
      } else {
        toastInfo(`有表單欄位為空，請確認填寫`)
        console.error('活動更新失敗', data)
      }
    } catch (error) {
      console.error('活動更新遇到錯誤', error)
    }
  }

  // 表單提交與驗證
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 檢查日期錯誤
    if (signupError || totalError || dateError) {
      toastWarning('請修正日期錯誤！')
      return
    }

    // 檢查有無上傳照片
    // if (imageFiles.length === 0) {
    //   toastInfo('請上傳至少一張圖片！')
    //   return
    // }

    // 表單欄位驗證
    const requiredFields = [
      'name',
      'category_id',
      'music_genre_id',
      'date_start',
      'city',
      'dist',
      'address',
      'intro',
    ]

    for (let field of requiredFields) {
      if (!formData[field]) {
        toastInfo(`${field} 欄位未填寫！`)
        return
      }
    }

    // 表單欄位驗證 (一對多)
    const checkEmptyFields = (arr, fields, name) => {
      for (let i = 0; i < arr.length; i++) {
        for (let field of fields) {
          if (arr[i][field] === '') {
            toastInfo(`${name}${numberToZh(i + 1)} 的 ${field} 欄位未填寫！`)
            return false
          }
        }
      }
      return true
    }

    if (
      !checkEmptyFields(formData.type, ['name', 'price', 'stock'], '門票') ||
      !checkEmptyFields(formData.lineup, ['bands'], '陣容') ||
      !checkEmptyFields(formData.article, ['title', 'content'], '文章')
    ) {
      return
    }

    let newFilenames = []

    // 若有新上傳 (uploading) 的圖片才執行 uploadImage
    if (imageItems.some((item) => item.type === 'uploading')) {
      const uploadedFiles = await uploadImage()

      // 確保檔案上傳成功
      if (uploadedFiles.length > 0) {
        newFilenames.push(...uploadedFiles)
      } else return
    } else if (formData.media.length === 0) {
      // 當前圖片為空時，那就一定要上傳
      toastInfo('請上傳至少一張圖片!')
      return
    }

    // 更新 formData
    const updatedFormData = {
      ...formData,
      // 保留原有圖片，加入上傳照片
      media:
        newFilenames.length > 0
          ? [...formData.media, ...newFilenames]
          : [...formData.media],

      // 過濾 type、article、lineup 陣列內的 id, activity_id，讓 prisma 自動對應
      type: formData.type.map(({ id, activity_id, ...rest }) => rest),
      article: formData.article.map(({ id, activity_id, ...rest }) => rest),
      lineup: formData.lineup.map(({ id, activity_id, ...rest }) => rest),
    }

    // 呼叫 API
    if (isUpdate) {
      updateActivity(updatedFormData)
    } else {
      createActivity(updatedFormData)
      router.push('/admin/activity')
      setTimeout(() => {
        // 延遲，確保進到列表頁才通知
        toastSuccess('活動新增完成')
      }, 400)
    }
  }

  // API upload image
  const uploadImage = async () => {
    const formImage = new FormData()
    imageItems.forEach((item) => {
      formImage.append('files', item.file) // 對應後端中間路由 upload.array('files', 5)
    })

    try {
      const response = await fetch(
        'http://localhost:3005/api/activities/uploads',
        {
          method: 'POST',
          body: formImage,
        }
      )

      const result = await response.json()

      if (result.status === 'success') {
        console.log('圖片上傳成功', result)
        // 回傳新檔名
        return result.files.map((file) => file.newFileName)
      } else {
        toastWarning(result.error)

        // 移除格式錯誤的圖片
        setImageItems((prev) =>
          prev.filter((item) => item.type !== 'uploading')
        )
        return []
      }
    } catch (error) {
      console.error('圖片上傳失敗', error)
      return []
    }
  }

  // 數字中文化
  const numberToZh = (num) => {
    const zh = numberZh.numberToZh(num)
    const newzh = num > 9 ? zh.slice(1) : zh
    return newzh
  }

  if (state !== 'create' && state !== 'update') return
  return (
    <div className="card b-card b-filter-conds">
      <div className="row justify-content-between">
        <div className="col-auto">
          <h1>{state === 'create' ? '新增活動' : '修改活動'}</h1>
        </div>
      </div>

      {/* Update : 有抓取到 formData.zipcode，再載入 ZipcodeSelector*/}
      {formData.zipcode && <ZipcodeSelector />}
      {/* Create : 預設載入 */}
      <ZipcodeSelector />

      <FormActivity
        isLoading={isLoading}
        isUpdate={isUpdate}
        formData={formData}
        setFormData={setFormData}
        selectedCategories={selectedCategories}
        selectedGenres={selectedGenres}
        selectedDate={selectedDate}
        dateError={dateError}
        signupError={signupError}
        totalError={totalError}
        ticketNum={ticketNum}
        setTicketNum={setTicketNum}
        bandNum={bandNum}
        setBandNum={setBandNum}
        articleNum={articleNum}
        setArticleNum={setArticleNum}
        imageItems={imageItems}
        handleFileChange={handleFileChange}
        handleImageDelete={handleImageDelete}
        handleDateChange={handleDateChange}
        handleTicketChange={handleTicketChange}
        handleLineupChange={handleLineupChange}
        handleArticleChange={handleArticleChange}
        handleSubmit={handleSubmit}
        numberToZh={numberToZh}
      />
    </div>
  )
}
