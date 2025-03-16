'use client'

import React from 'react'
import { useFilterPanel } from '@/hooks/use-filter-panel'
import FormCheckbox from './FormCheckbox'
import FormDate from './FormDate'
import FormSelect from './FormSelect'
import PriceSlider from './PriceSlider'
import { toastInfo } from '@/hooks/use-toast'

export default function FilterPanel({ isOpen, onClose, onChange }) {
  const {
    selectedCategories,
    selectedGenres,
    selectedCity,
    selectedPrice,
    selectedDate,
    error,
    city,
    resetFilters,
    handleDateChange,
    setSelectedCategories,
    setSelectedGenres,
    setSelectedCity,
    setSelectedPrice,
  } = useFilterPanel()

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
              resetFilters()
              // 網址物件清空條件
              onChange({
                categoryIds: null,
                genreIds: null,
                date: null,
                city: null,
                price: null,
              })
              toastInfo('重設篩選條件')
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
          onChange1={(e) => handleDateChange([e.target.value, selectedDate[1]])}
          onChange2={(e) => handleDateChange([selectedDate[0], e.target.value])}
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
              .querySelector('.g-pdlist-title')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          顯示商品
        </button>
      </div>
    </div>
  )
}
