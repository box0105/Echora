'use client'

import styles from './product-card.module.scss'
import { useRouter } from 'next/navigation'
import { useProductState } from '@/services/rest-client/use-products'
import { useMyCart } from '@/hooks/use-cart'

export default function ProductCard({ data = {}, removeFavItem }) {
  const router = useRouter()
  const { setFirstSkuId } = useProductState()
  const { onAdd } = useMyCart()
  return (
    <>
      <div className="col p-2">
        <button
          className={`${styles['g-product-card']} position-relative`}
          onClick={() => {
            setFirstSkuId(data.product_sku_id)
            router.push(`/product/detail/${data.id}`)
          }}
        >
          <div
            className={`${styles['g-x']} position-absolute`}
            onClick={(e) => {
              e.stopPropagation()
              removeFavItem(data.product_sku_id)
            }}
          >
            <img width="13px" src="/images/product/list/x.svg"></img>
          </div>
          <div className={`${styles['g-overlay']} position-absolute`}>
            <h6>移除此商品</h6>
          </div>
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
              src={`/images/product/pd-images/${data.image}`}
              alt=""
            />
          </div>
          <div className={styles['g-pd-text']}>
            <h6 className="h7">{data.name}</h6>
            <div className="d-flex gap-2">
              {data.discount_price ? (
                <>
                  <h6
                    className="h7"
                    style={{
                      color: 'var(--grey500)',
                      textDecoration: 'line-through',
                    }}
                  >
                    ${data.price.toLocaleString()}
                  </h6>
                  <h6 className="h7" style={{ color: 'var(--red)' }}>
                    ${data.discount_price.toLocaleString()}
                  </h6>
                </>
              ) : (
                <h6 className="h7">${data.price.toLocaleString()}</h6>
              )}
            </div>
            <p className="p">Color : {data.color_name}</p>
            <button
              className={`${styles['g-add-to-cart']} d-flex justify-content-center align-items-center`}
              onClick={(e) => {
                e.stopPropagation()
                onAdd(data)
              }}
            >
              <h6 className="m-0">加入購物車</h6>
            </button>
          </div>
        </button>
      </div>
    </>
  )
}
