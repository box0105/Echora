'use client'

import { useState } from 'react'

export default function PurchaseAside({ ticket }) {
  const [total, setTotal] = useState(1)
  const isFree = ticket.price != 0

  return (
    <aside className="b-aside">
      <h3 className="mb-4">{isFree ? '購買門票' : '領取門票'}</h3>
      <form>
      <div className="b-price h3 pb-3">
        {isFree ? `NT$ ${ticket.price} / 人` : '本活動免費入場'}
      </div>
      <div className="b-amount row gx-4">
        <div className="col-auto d-flex align-items-center">
          <h4 className="mb-0">數量</h4>
        </div>
        <div className="col-auto">
          <input
            type="number"
            className="form-control"
            name="ticket_price"
            value={total}
            onChange={(e) => {
              // 保持數字介於1~4
              let value = Number(e.target.value) || 1
              value = Math.max(1, Math.min(4, value))
              setTotal(value)
            }}
            min={1}
            max={4}
            step={1}
            required
          />
        </div>
      </div>
      <div className="b-purchaseBtn b-btn b-load-btn w-100">
        {isFree ? '購買門票' : '領取門票'}
      </div>
      <div className="b-warning mt-5">
        <h3 className="mt-4 mb-3">注意事項</h3>
        <ul className="ps-3">
          <li>每筆訂單最多購買 4 張票券。</li>
          <li>各票種數量皆有限，售完為止。</li>
          <li>購買成功者可於使用者票券中開啟 QR Code 掃描進場。</li>
          <li>門票僅限指定日期及場次使用，逾期無效。</li>
          <li>
            如遇不可抗力因素，本活動將公布變動，詳細活動內容及未盡事宜請洽活動官網或粉絲專頁。
          </li>
          {/* <li>所有票種皆為雙日入場資格，越早購買價格越優惠！</li> */}
        </ul>
      </div>
      </form>
    </aside>
  )
}
