'use client'

import Image from 'next/image'
import '../_styles/coupons.scss'
import MemberLayout from '../layouts/memberLayout'
// import 'bootstrap/dist/css/bootstrap.min.css'

export default function OrderPage() {
  return (
    <MemberLayout>
      <div className='body'>
        <div className='section-title h4 '>我的優惠券</div>
        <section className='section'>
          <div className='gary-line div'>
          <Image className='image' src="/images/coupon/Vector.svg" alt='Vector' width={48} height={48}/>
          <ul>
            <li>類型:</li>
            <li>日期:</li>
            <li>折扣:</li>
          </ul>
          </div>
          <div className='gary-line div'>123</div>
        </section>
      </div>

    </MemberLayout>
  )
}
