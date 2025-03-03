'use client'

import '../../_styles/order.scss'
import MemberLayout from '../../layouts/memberLayout'
import ComponentsOrderDetail from '../../_components/order-detail'
import { useRouter } from 'next/navigation'

export default function OrderPage() {
  const router = useRouter()
  return (
    <MemberLayout>
      <div className="order-form">
        <button
          className="btn btn-light btn-sm"
          onClick={() => {
            router.push('/my-user/order')
          }}
        >
          返回
        </button>
        {/* <div className="order-header">
          <div className="order-title section-title h4">訂單詳情</div>
        </div> */}
        <div className="row order-summary m-0">
          <ComponentsOrderDetail />
        </div>
      </div>
      <footer className="footer" />
    </MemberLayout>
  )
}
