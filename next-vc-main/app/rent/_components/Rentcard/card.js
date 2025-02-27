'use client'

import React, { useState } from 'react'
import './card.scss'

export default function RentCards({ data }) {
  if (!data || data.length === 0) {
    return <p>目前沒有租賃商品。</p>
  }

  return (
    <>
      {data.map((item) => {
        console.log('Rendering item:', item)
        return <RentcardCard key={item.id} {...item} /> // 确保正确传递 props
      })}
    </>
  )
}

function RentcardCard({ name, price, rentitemColors, brand_name }) {
  // 确保使用 useState 来管理图片
  const [mainImage, setMainImage] = useState(
    rentitemColors?.[0]?.images?.[0]
      ? `/images/Rent/pd-images/${rentitemColors[0].images[0]}`
      : '/images/Rent/default.jpg'
  )

  const stock = rentitemColors?.[0]?.stock || 0
  const image = rentitemColors?.[0]?.images?.[0]
    ? `/images/Rent/pd-images/${rentitemColors[0].images[0]}`
    : '/images/Rent/default.jpg'

  const colorImage = (color) => color?.color_image || 'default-color.svg';



  return (
    <div className="col p-2">
      <div className="g-product-card">
        <div className="g-pd-img d-flex justify-content-center align-items-center position-relative">
          <div className="g-brand-name d-flex justify-content-center align-items-center position-absolute">
            {brand_name}
          </div>
          <img
            className="h-100"
            src={mainImage} // 使用state来管理主要图片
            alt={name}
          />
        </div>
        <div className="g-pd-text">
          <h6 className="h6">{name}</h6>
          <div className="d-flex gap-3">
            <h6 className="h6">${price.toLocaleString()}</h6>
            <p className="stock-text">Stock: {stock}</p>
          </div>
          <div className="g-color-row">
  {rentitemColors?.map((color) => (
    <div key={color.id}>
      <img
        width="22px"
        src={`/images/Rent/color-images/${color.color_image || 'default-color.svg'}`}
        alt={color.name || '颜色'}
      />
    </div>
  ))}
</div>

          <p className="p g-color-text">
            {rentitemColors?.length} {rentitemColors?.length > 1 ? 'colors' : 'color'}
          </p>
        </div>
      </div>
    </div>
  )
}
