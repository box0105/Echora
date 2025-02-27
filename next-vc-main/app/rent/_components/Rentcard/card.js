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
        console.log('Rendering item:', item)
        return <RentcardCard key={item.id} {...item} /> // 确保这里正确传递 props
      })}
    </>
  )
}

function RentcardCard({ name, price, rentitemColors, brand_name }) {
  console.log(rentitemColors)
  console.log('rentitemColors[0].images[0]:', rentitemColors[0]?.images[0])

  const stock = rentitemColors?.[0]?.stock || 0
  const image = rentitemColors?.[0]?.images?.[0]
    ? `/images/Rent/pd-images/${rentitemColors[0].images[0]}`
    : '/images/Rent/default.jpg'

  const colorImage = rentitemColors?.[0]?.color_image
    ? `/images/Rent/color-images/${rentitemColors[0].color_image}`
    : '/images/Rent/default-color.svg'

  console.log('image type:', typeof image)
  console.log('image value:', image)

  return (
    <>
      <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <div className="card-top">
          {/* 新增這層 */}
          <div className="card">
            <div className="c-card-img d-flex justify-content-center align-items-center w-100">
              <div className="c-brand-name d-flex justify-content-center align-items-center position-absolute">
                {brand_name || '無品牌'}
              </div>
              <img src={image} className="h-100 " alt={name} />
            </div>
            <div className="card-body">
              <h3 className="card-title">{name}</h3>
              <div className="d-flex">
                <h5 className="card-text">${parseFloat(price).toFixed(2)}</h5>
              </div>
              <div className="c-card-color pt-2 d-flex gap-1">
                <img src={colorImage} alt={rentitemColors?.[0]?.color_name} />
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
      </div>
    </>
  )
}
