'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import FormActivity from '../../_components/FormActivity'
import { useFilterPanel } from '@/hooks/use-filter-panel'
import { useFetch } from '@/hooks/use-fetch'
import { useRouter } from 'next/navigation'
import { toastSuccess, toastWarning } from '@/hooks/use-toast'

export default function AdminActivityState() {
  const { state } = useParams()
  const searchParams = useSearchParams()
  const isUpdate = state === 'update'
  const activityId = Number(searchParams?.get('id'))
  const router = useRouter()

  // Update 頁面時抓取資料
  const { data: act, isLoading } = useFetch(
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
      setImagePreviews([
        ...act.media.split(',').map((file) => ({
          id: file, // 直接使用檔名當 ID
          url: `/images/activity/${file}`, // 預覽檔名加上前綴
          type: 'uploaded',
        })),
      ])
    }
  }, [act])

  const [imagePreviews, setImagePreviews] = useState([]) // 圖片預覽
  const [imageFiles, setImageFiles] = useState([]) // 存放照片

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

    const newFileData = files.map((file) => {
      return {
        id: URL.createObjectURL(file), // 用 URL 作為暫時的 ID
        url: URL.createObjectURL(file),
        file: file,
        type: 'uploading',
      }
    })

    setImagePreviews((prev) => [...prev, ...newFileData])
    setImageFiles((prev) => [...prev, ...files])
  }

  // 刪除預覽（包含已上傳與未上傳）
  const handleImageDelete = (id, type) => {
    setImagePreviews((prev) => prev.filter((file) => file.id !== id))

    if (type === 'uploading') {
      // 刪除正在上傳的圖片
 
    } else {
      // 刪除已上傳的圖片
      setFormData((prevData) => ({
        ...prevData,
        media: prevData.media.filter((file) => file !== id),
      }))
    }
  }

  // 將門票的欄位整理為物件
  const handleTicketChange = (index, field, value) => {
    const updated = [...formData.type]
    if (!updated[index]) updated[index] = { name: '', stock: 0, price: 0 }
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
    if (formData?.signup_end && formData?.signup_start)
      setSignupError(
        formData.signup_end < formData.signup_start
          ? '報名開始日期應早於結束日期'
          : ''
      )
    if (formData?.signup_end)
      setTotalError(
        selectedDate[0] < formData.signup_end ? '報名時間應早於活動時間' : ''
      )
  }, [formData])

  // API create
  const createActivity = async (updatedFormData) => {
    const response = await fetch('http://localhost:3005/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFormData),
    })
    console.log('活動新增成功', await response.json())
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
      console.log('更新活動成功', await response.json())
    } catch (error) {
      console.error('更新活動失敗', error)
    }
  }

  // 表單提交與驗證
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 欄位驗證
    const requiredFields = [
      'name',
      'category_id',
      'music_genre_id',
      'date_start',
      'city',
      'dist',
      'address',
      'intro',
      'type',
      'article',
      'lineup',
    ]

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} 欄位未填寫！`)
        return
      }
    }

    // 如果有需要檢查日期的錯誤，則不進行提交
    if (signupError || totalError || dateError) {
      alert('請修正日期錯誤！')
      return
    }

    // if (imageFiles.length === 0) {
    //   alert('請上傳至少一張圖片！')
    //   return
    // }

    let newFilenames = []

    // 若有新上傳的圖片才執行 uploadImage
    if (imageFiles.length > 0) {
      newFilenames = await uploadImage()
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
      toastSuccess('活動更新完成')
    } else {
      createActivity(updatedFormData)
      toastSuccess('活動建立成功')
      router.push('/admin/activity')
    }
  }

  // API upload image
  const uploadImage = async () => {
    const formImage = new FormData()
    imageFiles.forEach((file) => {
      formImage.append('files', file) // 對應後端中間路由 upload.array('files', 5)
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
      console.log('圖片上傳成功', result)

      // 回傳新檔名
      return result.files.map((file) => file.newFileName)
    } catch (error) {
      console.error('圖片上傳失敗', error)
    }
  }

  if (state !== 'create' && state !== 'update') return
  return (
    <div className="card b-card b-filter-conds">
      <div className="row justify-content-between">
        <div className="col-auto">
          <h1>{state === 'create' ? '新增活動' : '修改活動'}</h1>
        </div>
      </div>

      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

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
        imageFiles={imageFiles}
        imagePreviews={imagePreviews}
        handleFileChange={handleFileChange}
        handleImageDelete={handleImageDelete}
        handleDateChange={handleDateChange}
        handleTicketChange={handleTicketChange}
        handleLineupChange={handleLineupChange}
        handleArticleChange={handleArticleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
