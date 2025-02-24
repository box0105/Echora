'use client'

import React from 'react'
import './card.scss'

export default function RentCards({ data }) {
  if (!data || data.length === 0) {
    return <p>目前沒有租賃商品。</p>
  }

  return (
    <>
      {data.map((item) => {
        console.log('RentCards 組件的 item:', JSON.stringify(item, null, 2)) // 添加這行
        return <RentcardCard key={item.id} {...item} /> // 確保這裡正確傳遞 props
      })}
    </>
  )
}

function RentcardCard({ name, price, images, rentitemColors }) {
  console.log(
    'RentcardCard 組件的 rentitemColors:',
    JSON.stringify(rentitemColors, null, 2)
  ) // 添加這行
  // 修改這裡
  console.log(rentitemColors)
  const rentColors = rentitemColors?.map((color) => color.colorName) || []
  const stock = rentitemColors?.[0]?.stock || 0
  const image = images?.[0]?.image_url || '/images/Rent/default.jpg' // 添加預設圖片

  return (
    <>
      <div className="col-6 col-sm-6 col-md-4">
        <div className="card-top">
          <div className="c-card-img d-flex justify-content-center align-items-center">
            <img src={image} className="card-img-top" alt={name} />
          </div>

          <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <div className="d-flex">
              <h5 className="card-text">${parseFloat(price).toFixed(2)}</h5>
            </div>
            <div className="c-card-color pt-2 d-flex gap-1">
              {rentColors && // 修改這裡
                rentColors.map((color, index) => (
                  <img
                    key={index}
                    src={`/images/Rent/circle-${color.toLowerCase()}.png`}
                    alt={color.colorName}
                  />
                ))}
            </div>
            <div className="stock pt-2">
              <div className={stock > 0 ? 'in-stock' : 'out-stock'}>
                <img
                  src={`/images/Rent/instock-${
                    stock > 0 ? 'green' : 'red'
                  }.png`}
                  alt={stock > 0 ? '有庫存' : '無庫存'}
                />
                <p className="m-0">{stock > 0 ? '有庫存' : '無庫存'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
