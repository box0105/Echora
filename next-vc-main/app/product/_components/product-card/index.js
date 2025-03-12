'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './product-card.module.scss'
import { useProductState } from '@/services/rest-client/use-products'

export default function ProductCard({ data = {}, handleDragStart }) {
  const [mainImage, setMainImage] = useState(data.image)
  const { setFirstSkuId } = useProductState()
  const router = useRouter()

  // 當 data.image 變更時，更新 mainImage
  useEffect(() => {
    setMainImage(data.image)
  }, [data.image])

  return (
    <>
      {/* <div className="col p-2"> */}
      <div
        className={styles['g-product-card']}
        onClick={() => {
          setFirstSkuId(data.product_sku_id)
          router.push(`/product/detail/${data.id}`)
        }}
      >
        <div
          className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}
        >
          <div
            className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}
          >
            {data.brand_name}
          </div>
          <img
            className="h-100"
            src={`/images/product/pd-images/${mainImage}`}
            alt=""
            draggable
            onDragStart={(e) => handleDragStart(e, data)}
          />
        </div>
        <div className={styles['g-pd-text']}>
          <h6 className="h6">{data.name}</h6>
          <div className="d-flex gap-2">
            {data.discount_price ? (
              <>
                <h6
                  className="h6"
                  style={{
                    color: 'var(--grey500)',
                    textDecoration: 'line-through',
                  }}
                >
                  ${data.price.toLocaleString()}
                </h6>
                <h6 className="h6" style={{ color: 'var(--red)' }}>
                  ${data.discount_price.toLocaleString()}
                </h6>
              </>
            ) : (
              <h6 className="h6">${data.price.toLocaleString()}</h6>
            )}
          </div>
          <div className={styles['g-color-row']}>
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
          <p className={`p ${styles['g-color-text']}`}>
            {data.colors.length} {data.colors.length > 1 ? 'colors' : 'color'}
          </p>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
