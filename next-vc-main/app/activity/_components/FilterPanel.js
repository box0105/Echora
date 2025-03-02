'use client'

import React, { useState, useEffect } from 'react'
import { useFetch } from '@/hooks/use-fetch'

import FormCheckbox from './FormCheckbox'
import FormDate from './FormDate'
import FormSelect from './FormSelect'
import PriceSlider from './PriceSlider'

export default function FilterPanel({ isOpen, onClose, onChange }) {
  // 渲染選項
  const { data } = useFetch('http://localhost:3005/api/activities/options')
  const city = [
    '基隆市',
    '台北市',
    '新北市',
    '桃園市',
    '新竹市',
    '新竹縣',
    '苗栗縣',
    '台中市',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義市',
    '嘉義縣',
    '台南市',
    '高雄市',
    '屏東縣',
    '宜蘭縣',
    '花蓮縣',
    '台東縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
  ]

  // 紀錄選擇
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(5000)

  const initDate = () => {
    const start = new Date()
    const end = new Date(start)
    end.setMonth(end.getMonth() + 1)
    return [start.toISOString().split('T')[0], end.toISOString().split('T')[0]]
  }
  const [selectedDate, setSelectedDate] = useState(initDate())
  const [error, setError] = useState('')

  // 初次渲染選項
  useEffect(() => {
    if (data) {
      setSelectedCategories(
        data.categories.map((v, i) => ({
          id: i + 1,
          name: v.name,
          checked: false,
        }))
      )
      setSelectedGenres(
        data.genres.map((v, i) => ({ id: i + 1, name: v.name, checked: false }))
      )
    }
  }, [data])

  // 日期檢查
  useEffect(() => {
    const message =
      selectedDate[0] > selectedDate[1] ? '活動開始日期應該早於結束日期' : ''
    setError(message)
  }, [selectedDate])

  // 控制 FilterPanel 開啟關閉
  if (!isOpen) return <></>

  return (
    <div className="b-filter-slide d-flex flex-column align-items-center">
      <div className="b-filter-title d-flex justify-content-between align-items-center w-100">
        <h4>
          <button
            className="b-btn-unstyled"
            onClick={() => {
              // 重設選項
              setSelectedCategories((prev) =>
                prev.map((v) => ({ ...v, checked: false }))
              )
              setSelectedGenres((prev) =>
                prev.map((v) => ({ ...v, checked: false }))
              )
              setSelectedDate(initDate)
              setSelectedCity('')
              setSelectedPrice(5000)
              // 網址物件清空條件
              onChange({
                categoryIds: null,
                genreIds: null,
                date: null,
                city: null,
                price: null,
              })
            }}
          >
            清除篩選條件
          </button>
        </h4>
        <button className="b-filter-close-btn b-btn-unstyled" onClick={onClose}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <div className="w-100 b-filter-conds d-flex flex-column align-items-start align-self-stretch">
        <FormCheckbox
          title="活動類型"
          selected={selectedCategories}
          onChange={setSelectedCategories}
        />
        <FormCheckbox
          title="音樂類型"
          selected={selectedGenres}
          onChange={setSelectedGenres}
        />
        <FormDate
          title="活動時間"
          selected={selectedDate}
          error={error}
          onChange1={(e) => setSelectedDate([e.target.value, selectedDate[1]])}
          onChange2={(e) => setSelectedDate([selectedDate[0], e.target.value])}
        />
        <FormSelect
          title="城市"
          options={city}
          selected={selectedCity}
          onChange={setSelectedCity}
        />
        <PriceSlider
          selected={selectedPrice}
          max={5000}
          percent={0.5}
          onChange={setSelectedPrice}
        />

        <button
          className="b-btn b-load-btn"
          disabled={Boolean(error)}
          style={{ opacity: error ? 0.5 : 1 }}
          onClick={() => {
            onClose()
            // 將選中資訊加入篩選物件
            onChange({
              categoryIds: selectedCategories
                .filter((v) => v.checked)
                .map((v) => v.id),
              genreIds: selectedGenres
                .filter((v) => v.checked)
                .map((v) => v.id),
              date: selectedDate,
              city: selectedCity,
              price: selectedPrice,
            })
            // 視窗移動到活動列表的高度
            document
              .querySelector('.b-title')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          顯示商品
        </button>
      </div>
    </div>
  )
}
