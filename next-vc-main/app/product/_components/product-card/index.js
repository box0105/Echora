'use client'
import './product-card.scss'

export default function ProductCard({ data = {} }) {
  return (
    <>
      <div className="col p-2">
        <div className="g-product-card">
          <div className="g-pd-img d-flex justify-content-center align-items-center">
            <img
              className="h-100"
              src={`/images/product/pd-images/${data.image}`}
              alt=""
            />
          </div>
          <div className="g-pd-text">
            <h6 className="h6">{data.name}</h6>
            <div className="d-flex gap-3">
              <h6 className="h6">${data.price}</h6>
            </div>
            <div className="g-color-row">
              {/* /images/product/color-images/data.color_image */}
              <img width="22px" src="/images/product/list/lightblue.svg" />
              <img width="22px" src="/images/product/list/darkblue.svg" />
              <img width="22px" src="/images/product/list/purple.svg" />
            </div>
            <p className="p g-color-text">2 colors</p>
            {/* fetch出共有幾個顏色 */}
          </div>
        </div>
      </div>
    </>
  )
}
