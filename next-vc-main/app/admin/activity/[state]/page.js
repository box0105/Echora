'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useFilterPanel } from '@/hooks/use-filter-panel'
import FormDate from '@/app/activity/_components/FormDate'
import FormTitleWithBtn from '../../_components/FormTitleWithBtn'
import ZipcodeSelector from '../../_components/ZipcodeSelector'

export default function AdminActivityState() {
  const { state } = useParams()
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
    intro: '',
    media: '',
    type: [{}],
    article: [{ title: '', content: '', images: '' }],
    lineup: [{}],
  })
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const newFileData = files.map((file) => {
      return {
        url: URL.createObjectURL(file),
        file: file,
      }
    })

    setImagePreviews((prev) => [
      ...prev,
      ...newFileData.map((item) => item.url),
    ])
    setImageFiles((prev) => [...prev, ...newFileData.map((item) => item.file)])
  }

  // 將門票的欄位整理為一個物件
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

  // API
  const createActivity = async (updatedFormData) => {
    const response = await fetch('http://localhost:3005/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFormData),
    })
    console.log(await response.json())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 進行表單欄位驗證
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
      'lineup'
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

    if (imageFiles.length === 0) {
      alert('請上傳至少一張圖片！')
      return
    }
    
    const newFilenames = await uploadImage()

    // 更新 formData
    const updatedFormData = {
      ...formData,
      media: newFilenames, // 將新檔名設置到 media
    }

    // 呼叫 createActivity 時傳遞 updatedFormData
    createActivity(updatedFormData)
  }

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
      console.log('活動圖片上傳成功', result)

      // 回傳新檔名
      return result.files.map((file) => file.newFileName)
    } catch (error) {
      console.error('活動圖片上傳失敗', error)
    }
  }

  if (state !== 'create') return <h3>state invalid</h3>
  return (
    <div className="card b-card b-filter-conds">
      <div className="row justify-content-between">
        <div className="col-auto">
          <h1>新增活動</h1>
        </div>
      </div>

      <form className="b-admin-form d-flex flex-column">
        <div className="col-6">
          <h4 className="b-cond-title">名稱</h4>
          <input
            type="text"
            className="form-control"
            value={formData?.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="col-12">
          <h4 className="b-cond-title">活動類型</h4>
          <div className="b-option-container">
            {selectedCategories
              .map((item) => item.name)
              .map((v, i) => {
                const id = i + 1
                return (
                  <div className="col-auto" key={`cate-${id}`}>
                    <label
                      className={`btn btn-outline-secondary mb-0 ${
                        formData?.category_id == id ? 'active' : ''
                      }`}
                      htmlFor={`cate-${id}`}
                    >
                      {v}
                    </label>
                    <input
                      id={`cate-${id}`}
                      type="radio"
                      name="genre"
                      className="d-none"
                      value={i + 1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: e.target.value,
                        })
                      }
                    />
                  </div>
                )
              })}
          </div>
        </div>

        <div className="col-12">
          <h4 className="b-cond-title">音樂類型</h4>
          <div className="b-option-container">
            {selectedGenres
              .map((item) => item.name)
              .map((v, i) => {
                const id = i + 1
                return (
                  <div className="col-auto" key={`genre-${id}`}>
                    <label
                      className={`btn btn-outline-secondary mb-0 ${
                        formData?.music_genre_id == id ? 'active' : ''
                      }`}
                      htmlFor={`genre-${id}`}
                    >
                      {v}
                    </label>
                    <input
                      id={`genre-${id}`}
                      type="radio"
                      name="genre"
                      className="d-none"
                      value={i + 1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          music_genre_id: e.target.value,
                        })
                      }
                    />
                  </div>
                )
              })}
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <FormDate
              title="活動時間"
              error={dateError || totalError}
              onChange1={(e) => {
                handleDateChange([e.target.value, selectedDate[1]])
                setFormData({
                  ...formData,
                  date_start: e.target.value,
                })
              }}
              onChange2={(e) => {
                handleDateChange([selectedDate[0], e.target.value])
                setFormData({
                  ...formData,
                  date_end: e.target.value,
                })
              }}
            />
          </div>
          <div className="col-6">
            <FormDate
              title="報名時間"
              error={signupError}
              selected={[formData?.signup_start, formData?.signup_end]}
              onChange1={(e) => {
                setFormData({
                  ...formData,
                  signup_start: e.target.value,
                })
              }}
              onChange2={(e) => {
                setFormData({
                  ...formData,
                  signup_end: e.target.value,
                })
              }}
            />
          </div>
        </div>

        <div className="col-12">
          <FormTitleWithBtn
            title="門票"
            num={ticketNum}
            onAdd={setTicketNum}
            handleForm={() =>
              setFormData((prev) => ({
                // formData 儲存的也要刪除
                ...prev,
                type: prev.type.slice(0, ticketNum - 1),
              }))
            }
          />

          {[...Array(ticketNum)].map((_, index) => (
            <div key={index} className="row mb-3 gy-4">
              <div className="col-6">
                <label className="form-label">名稱 {index + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    handleTicketChange(index, 'name', e.target.value)
                  }
                  required
                />
              </div>
              <div className="col-3">
                <label className="form-label">價格 {index + 1}</label>
                <input
                  type="number"
                  className="form-control"
                  // value={formData?.type[0]?.price}
                  min={0}
                  onChange={(e) => {
                    if (e.target.value)
                      handleTicketChange(
                        index,
                        'price',
                        parseInt(e.target.value)
                      )
                  }}
                  required
                />
              </div>
              <div className="col-3">
                <label className="form-label">數量 {index + 1}</label>
                <input
                  type="number"
                  className="form-control"
                  // value={formData?.type[0]?.stock}
                  min={0}
                  onChange={(e) => {
                    if (e.target.value)
                      handleTicketChange(
                        index,
                        'stock',
                        parseInt(e.target.value)
                      )
                  }}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="col-12">
          <h4 className="b-cond-title">地址</h4>
          <input
            className="js-demeter-tw-zipcode-selector d-none"
            data-city="#city"
            data-dist="#dist"
          />

          <div className="row align-items-end">
            <div className="col-6">
              <div className="d-flex align-self-stretch">
                <div className="col">
                  <select
                    id="city"
                    placeholder="請選擇縣市"
                    className="w-100"
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.currentTarget.value })
                    }
                  ></select>
                </div>
                <div className="col-1"></div>
                <div className="col">
                  <select
                    id="dist"
                    placeholder="請選擇鄉鎮區"
                    className="w-100"
                    onChange={(e) =>
                      setFormData({ ...formData, dist: e.currentTarget.value })
                    }
                  ></select>
                </div>
              </div>
            </div>

            <div className="col-6 ms-auto">
              <label className="form-label">地點</label>
              <input
                type="text"
                className="form-control"
                value={formData?.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <h4 className="b-cond-title">描述</h4>
          <textarea
            className="form-control"
            rows={12}
            required
            value={formData?.intro}
            onChange={(e) =>
              setFormData({ ...formData, intro: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <FormTitleWithBtn
            title="陣容"
            num={bandNum}
            onAdd={setBandNum}
            handleForm={() =>
              setFormData((prev) => ({
                // formData 儲存的也要刪除
                ...prev,
                lineup: prev.lineup.slice(0, bandNum - 1),
              }))
            }
          />

          <div className="row row-cols-2 mb-3 gy-4">
            {[...Array(bandNum)].map((_, index) => (
              <div className="col" key={index}>
                <label className="form-label">陣容 {index + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleLineupChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-12">
          <FormTitleWithBtn
            title="文章"
            num={articleNum}
            onAdd={setArticleNum}
            handleForm={() =>
              setFormData((prev) => ({
                // formData 儲存的也要刪除
                ...prev,
                article: prev.article.slice(0, articleNum - 1),
              }))
            }
          />

          <div className="row gy-4">
            {[...Array(articleNum)].map((_, index) => (
              <React.Fragment key={index}>
                <div className="col-6">
                  <div className="row gy-4">
                    <div className="col-12">
                      <label className="form-label">標題 {index + 1}</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) =>
                          handleArticleChange(index, 'title', e.target.value)
                        }
                      />
                    </div>

                    <div className="col-12">
                      <input type="file" multiple className="form-control" />
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-1 g-3"></div>
                  </div>
                </div>

                <div className="col-6">
                  <label className="form-label">內容 {index + 1}</label>
                  <textarea
                    className="form-control"
                    rows={8}
                    onChange={(e) =>
                      handleArticleChange(index, 'content', e.target.value)
                    }
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="col-12">
          <h4 className="b-cond-title">活動圖片</h4>
          <div className="b-img-upload row row-cols-xl-3 row-cols-lg-2 row-cols-1 g-3">
            {imagePreviews.map((src, i) => (
              <div className="col position-relative" key={i}>
                <div className="ratio ratio-16x9 border rounded">
                  <Image
                    className="object-fit-cover"
                    alt={`preview-${i}`}
                    src={src}
                    fill
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="col-6">
            <input
              type="file"
              id="addImage"
              className="form-control mt-4"
              name="files"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button
            className="btn btn-dark mb-0"
            type="button"
            onClick={handleSubmit}
          >
            完成
          </button>
          <Link
            href="/admin/activity"
            className="btn btn-outline-secondary ms-2 mb-0"
          >
            取消
          </Link>
        </div>

        {/* 載入台灣縣市選擇器 */}
        <ZipcodeSelector />
      </form>
    </div>
  )
}
