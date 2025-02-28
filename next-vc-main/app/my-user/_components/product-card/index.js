'use client'

import styles from './product-card.module.scss'
import { useRouter } from 'next/navigation'

export default function ProductCard({ data = {}, removeFavItem }) {
  const router = useRouter()
  return (
    <>
      <div className="col p-2">
        <div className={`${styles['g-product-card']} position-relative`}
        onClick={() => router.push(`/product/detail/${data.id}`)}
        >
          <div className={`${styles['g-x']} position-absolute`}
          onClick={(e) => {
            e.stopPropagation()
            removeFavItem(data.product_sku_id)
            }}>
            <img width="13px" src="/images/product/list/x.svg"></img>
          </div>
          <div className={`${styles['g-overlay']} position-absolute`}><h6>移除此商品</h6></div>
          <div className={`${styles['g-pd-img']} d-flex justify-content-center align-items-center position-relative`}>
            <div className={`${styles['g-brand-name']} d-flex justify-content-center align-items-center position-absolute`}>
              {data.brand_name}
            </div>
            <img
              className="h-100"
              src={`/images/product/pd-images/${data.image}`}
              alt=""
            />
          </div>
          <div className={styles['g-pd-text']}>
            <h6 className="h7">{data.name}</h6>
            <div className="d-flex gap-3">
              <h6 className="h7">${data.price.toLocaleString()}</h6>
            </div>
            <p className="p">Color : {data.color_name}</p>
            <button
              className={`${styles['g-add-to-cart']} d-flex justify-content-center align-items-center`}
              onClick={(e) => {
                e.stopPropagation()
                console.log(data)
              }}
            >
              <h6 className="m-0">加入購物車</h6>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
