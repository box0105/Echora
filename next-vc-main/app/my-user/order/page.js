'use client'

import '../_styles/order.scss'
import MemberLayout from '../layouts/memberLayout'
import OrderList from '../_components/order-list'

export default function OrderPage() {
  return (
    <MemberLayout>
      <div className="order-form">
        <div className="order-header">
          <div className="order-title section-title h4">我的訂單</div>
        </div>
        <div className="row order-summary w-100 m-0">
          <OrderList />
        </div>
      </div>
      <footer className="footer" />
    </MemberLayout>
  )
}
