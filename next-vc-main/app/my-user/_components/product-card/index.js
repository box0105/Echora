'use client'

import './product-card.scss'

export default function ProductCard({ data = {}, removeFavItem }) {
  return (
    <>
      <div className="col p-2">
        <div className="g-product-card position-relative"
        >
          <div className="g-x position-absolute"
          onClick={() => {removeFavItem(data.product_sku_id)}}>
            <img width="13px" src="/images/product/list/x.svg"></img>
          </div>
          <div className="overlay position-absolute"><h6>移除此商品</h6></div>
          <div className="g-pd-img d-flex justify-content-center align-items-center position-relative">
            <div className="g-brand-name d-flex justify-content-center align-items-center position-absolute">
              {data.brand_name}
            </div>
            <img
              className="h-100"
              src={`/images/product/pd-images/${data.image}`}
              alt=""
            />
          </div>
          <div className="g-pd-text">
            <h6 className="h7">{data.name}</h6>
            <div className="d-flex gap-3">
              <h6 className="h7">${data.price.toLocaleString()}</h6>
            </div>
            <p className="p">Color : {data.color_name}</p>
            <button
              className="g-add-to-cart d-flex justify-content-center align-items-center"
              onClick={() => {
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
