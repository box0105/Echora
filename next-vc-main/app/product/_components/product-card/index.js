'use client'
import "./product-card.scss"

export default function ProductCard() {
  return (
    <>
      <div className="col p-2">
        <div className="g-product-card">
          <div className="g-pd-img d-flex justify-content-center align-items-center">
            <img
              className="h-100"
              src="/images/product/list/0119151776_fen_ins_frt_1_rr-Photoroom.png"
            />
          </div>
          <div className="g-pd-text">
            <h6 className="h6">Product Name Product Name Product Name</h6>
            <div className="d-flex gap-3">
              <h6 className="h6">$79000</h6>
            </div>
            <div className="g-color-row">
              <img width="22px" src="/images/product/list/lightblue.svg" />
              <img width="22px" src="/images/product/list/darkblue.svg" />
              <img width="22px" src="/images/product/list/purple.svg" />
            </div>
            <p className="p g-color-text">2 colors</p>
          </div>
        </div>
      </div>
    </>
  )
}
