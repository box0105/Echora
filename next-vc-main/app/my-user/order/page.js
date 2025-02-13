'use client'

import '../_styles/order.scss'
import MemberLayout from '../layouts/memberLayout'
// import 'bootstrap/dist/css/bootstrap.min.css'

export default function OrderPage() {
  return (
    <MemberLayout>
      <div className="order-form">
        <div className="order-header">
          <div className="order-title section-title h4 ms-2">我的訂單</div>
        </div>
        <div className="row order-summary">
          <div className="col-6 col-md-4 col-sm-6 order-image mb-2 h-100">
            <img
              className="order-image"
              src="../images/user/ibanez.jpg"
              alt="Ibanez 電吉他"
            />
          </div>
          <div className="col-6 col-md-8 col-sm-6">
            <p>
              <strong>Ibanez AZ2204NW 電吉他 MGR薄荷綠</strong>
            </p>
            <p>單單雙 小搖座 AZ Prestige</p>
            <p>顏色: JSHINE</p>
            <p>數量: 1</p>
            <p className="fw-bold fs-4">NT$25,900</p>
            <div className="p-3 mt-4 total col-sm-12">
              <p className="d-flex justify-content-between">
                <span>小計</span> <span className="ms-auto">NT$25,900</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>運費</span> <span>NT$500</span>
              </p>
              <hr />
              <p className="d-flex justify-content-between fw-bold mt-3">
                <span>所有商品</span> <span>NT$26,400</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer" />
    </MemberLayout>
  )
}
