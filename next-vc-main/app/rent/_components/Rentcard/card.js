'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/router'; // 使用useRouter进行跳转
import Link from 'next/link'; // 使用Link
import './card.scss';

export default function RentCards({ data }) {
  if (!data || data.length === 0) {
    return <p>目前沒有租賃商品。</p>;
  }

  return (
    <>
      {data.map((item) => (
        <RentcardCard key={item.id} {...item} />
      ))}
    </>
  );
}

function RentcardCard({ id, name, price, rentitemColors, brand_name }) {
  // 取得預設圖片
  const defaultImage =
    rentitemColors?.[0]?.images?.[0]
      ? `/images/Rent/pd-images/${rentitemColors[0].images[0]}`
      : '/images/Rent/default.jpg';

  // 設定主圖片狀態，初始值為 defaultImage
  const [mainImage, setMainImage] = useState(defaultImage);

  return (
    <div className="col p-2" style={{ cursor: 'pointer' }}>
      {/* 使用 Link 包裹整个卡片 */}
      <Link href={`/rent/${id}`}>
        
          <div className="g-product-card">
            <div className="g-pd-img d-flex justify-content-center align-items-center position-relative">
              <div className="g-brand-name d-flex justify-content-center align-items-center position-absolute">
                {brand_name}
              </div>
              <img className="h-100" src={mainImage} alt={name} />
            </div>
            <div className="g-pd-text">
              <h6 className="h6">{name}</h6>
              <div className="d-flex gap-3">
                <h6 className="h6">${price.toLocaleString()}</h6>
              </div>
              <div className="g-color-row">
                {rentitemColors?.map((color) => (
                  <div
                    key={color.id}
                    onMouseEnter={() =>
                      setMainImage(
                        color.images?.[0]
                          ? `/images/Rent/pd-images/${color.images[0]}`
                          : '/images/Rent/default.jpg'
                      )
                    }
                    onMouseLeave={() => setMainImage(defaultImage)}
                    onClick={() =>
                      setMainImage(
                        color.images?.[0]
                          ? `/images/Rent/pd-images/${color.images[0]}`
                          : '/images/Rent/default.jpg'
                      )
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      width="22px"
                      src={`/images/Rent/color-images/${
                        color.color_image || 'default-color.svg'
                      }`}
                      alt={color.name || '顏色'}
                    />
                  </div>
                ))}
              </div>
              <p className="p g-color-text">
                {rentitemColors?.length} {rentitemColors?.length > 1 ? 'colors' : 'color'}
              </p>
            </div>
          </div>
        
      </Link>
    </div>
  );
}
