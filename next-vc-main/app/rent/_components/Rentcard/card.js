'use client'

import React from 'react'
import './card.scss'

export default function RentcardCard({ item }) {
  // 確保 item 不為 undefined，再進行解構
  if (!item) {
    return null // 如果 item 為 undefined，返回 null，不渲染卡片
  }

  const { imageUrl, name, price, colors, inStock } = item || {}

  // 渲染顏色選項
  const renderColorOptions = () => {
    if (colors && colors.length > 0) {
      return colors.map((color, idx) => (
        <img key={idx} src={color} alt={`color-${idx}`} />
      ))
    }
    return (
      <>
        <img src="/images/Rent/circle-gray.png" alt="default-gray" />
        <img src="/images/Rent/circle-blue.png" alt="default-blue" />
      </>
    )
  }

  // 渲染庫存狀態
  const renderStockStatus = () => {
    if (inStock) {
      return (
        <div className="in-stock d-flex align-items-center">
          <img src="/images/Rent/instock-green.png" alt="in-stock" />
          <p className="m-0">有庫存</p>
        </div>
      )
    } else {
      return (
        <div className="out-stock d-flex align-items-center">
          <img src="/images/Rent/instock-red.png" alt="out-stock" />
          <p className="m-0">無庫存</p>
        </div>
      )
    }
  }

  return (
    <div className="col-6 col-sm-6 col-md-4">
      <div className="card-top">
        <div className="c-card-img d-flex justify-content-center align-items-center">
          <img
            src={imageUrl || '/images/Rent/card23-img.png'}
            className="card-img-top"
            alt={name || 'Product Image'}
          />
        </div>

        <div className="card-body">
          <h3 className="card-title">{name || 'Product Name'}</h3>
          <div className="d-flex">
            <h5 className="card-text">${price || '0'}</h5>
          </div>

          {/* 顏色選項 */}
          <div className="c-card-color pt-2 d-flex gap-1">
            {renderColorOptions()}
          </div>

          {/* 庫存狀態 */}
          <div className="stock pt-2">{renderStockStatus()}</div>
        </div>
      </div>
    </div>
  )
}
