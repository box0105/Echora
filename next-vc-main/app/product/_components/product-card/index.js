'use client'
import { useState, useEffect } from 'react'
import './product-card.scss'

export default function ProductCard({ data = {} }) {
  const [mainImage, setMainImage] = useState(data.image)

  // 當 data.image 變更時，更新 mainImage
  useEffect(() => {
    setMainImage(data.image)
  }, [data.image])

  return (
    <>
      <div className="col p-2">
        <div className="g-product-card">
          <div className="g-pd-img d-flex justify-content-center align-items-center position-relative">
            <div className="g-brand-name d-flex justify-content-center align-items-center position-absolute">{data.brand_name}</div>
            <img
              className="h-100"
              src={`/images/product/pd-images/${mainImage}`}
              alt=""
            />
          </div>
          <div className="g-pd-text">
            <h6 className="h6">{data.name}</h6>
            <div className="d-flex gap-3">
              <h6 className="h6">${data.price.toLocaleString()}</h6>
            </div>
            <div className="g-color-row">
              {data.colors.map((color) => (
                <div
                  key={color.id}
                  onMouseEnter={() => setMainImage(data.images[color.skuId])}
                  onMouseLeave={() => setMainImage(data.image)}
                >
                  <img
                    width="22px"
                    src={`/images/product/color-images/${color.image}`}
                    alt={color.name}
                  />
                </div>
              ))}
            </div>
            <p className="p g-color-text">
              {data.colors.length} {data.colors.length > 1 ? 'colors' : 'color'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
