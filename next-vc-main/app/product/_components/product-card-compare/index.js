'use client'

import styles from './product-card-compare.module.scss'
import { useRouter } from 'next/navigation'
import { useProductState } from '@/services/rest-client/use-products'

export default function ProductCardCompare({ data = {} }) {
  const router = useRouter()
  const { setFirstSkuId } = useProductState()
  return (
    <>
      <div className="col p-2">
        <div
          className={`${styles['g-product-card']} position-relative`}
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
          </div>
        </div>
      </div>
    </>
  )
}
