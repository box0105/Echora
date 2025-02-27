'use client'

import React from 'react'
import './cardmod.scss'

export default function RentcardCardMod({ data }) {
  if (!data || data.length === 0) {
    return <p>目前沒有租賃商品。</p>
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 g-3 mt-0">
      {data.map((item, index) => (
        <div className="col-6 col-sm-6 col-md-4" key={index}>
          <div className="card-top-mod">
            <div className="c-card-img d-flex justify-content-center align-items-center">
              <img
                src={
                  item.image
                    ? `/images/Rent/pd-images/${item.image}`
                    : '/images/Rent/default.jpg'
                } // 使用傳遞的圖片
                className="card-img-top img-fluid"
                alt={item.name || 'Product Image'}
              />
            </div>

            <div className="card-body">
              <h4 className="card-title">{item.name || 'Product Name'}</h4>
              <div className="d-flex">
                <h5 className="card-text">
                  ${parseFloat(item.price).toFixed(2) || '0'}
                </h5>
              </div>

              <div className="c-card-color-mod pt-2">
                {/* 顯示顏色圖片 */}
                {item.colorImages?.map((colorImage, idx) => (
                  <img
                    key={idx}
                    src={`/images/Rent/color-images/${colorImage}`}
                    alt={`Color ${idx}`}
                  />
                ))}
              </div>

              <div className="stock-status pt-2">
                <div className={item.stock > 0 ? 'in-stock' : 'out-stock'}>
                  <img
                    src={`/images/Rent/instock-${
                      item.stock > 0 ? 'green' : 'red'
                    }.png`}
                    alt={item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  />
                  <p className="m-0">{item.stock > 0 ? '有庫存' : '無庫存'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
