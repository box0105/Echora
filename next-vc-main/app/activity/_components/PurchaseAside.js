'use client'

import { useState } from 'react'
import { useMyCart } from '@/hooks/use-cart'
import { dateFormat } from '../_utils/dateFormat'

export default function PurchaseAside({ data }) {
  const tickets = data?.type
  const isFree = tickets[0]?.price != 0

  const [selectedTickets, setSelectedTickets] = useState(new Set())
  const [error, setError] = useState('')
  const { onAddActivity } = useMyCart()

  // 選取的票卷
  const toggleTicketSelection = (ticketId) => {
    setSelectedTickets((prev) => {
      const newSelection = new Set(prev)
      if (newSelection.has(ticketId)) {
        newSelection.delete(ticketId)
      } else {
        newSelection.add(ticketId)
      }
      setError('')
      return newSelection
    })
  }

  // 整理資料，放入購物車
  const onCart = (e) => {
    e.preventDefault()
    const selectedTicketData = [...selectedTickets].map((tid) => tickets[tid])

    if (!selectedTicketData.length) {
      setError('請選擇票卷方案')
      return
    }

    const cartData = {
      id: data.id,
      name: data.name,
      date_start: dateFormat(data.date_start),
      date_end: dateFormat(data.date_end),
      city: data.city,
      dist: data.dist,
      address: data.address,
      image: `/images/activity/${data.media.split(',')[0]}`,
      selectedTickets: selectedTicketData, // 選擇的票券
    }

    onAddActivity(cartData)
    console.log(JSON.stringify(cartData, null, 2))
  }

  return (
    <aside className="b-aside">
      <h3 className="mb-4">門票方案</h3>
      <form>
        <div className="row row-cols-1 gy-2">
          {tickets.map((ticket, i) => (
            <button
              type="button"
              key={ticket?.id}
              className={`b-ticket col d-flex justify-content-between align-items-center pt-3 pb-2 ${
                selectedTickets.has(i) ? 'active' : ''
              }`}
              onClick={() => toggleTicketSelection(i)}
              style={{ cursor: 'pointer' }}
            >
              <h4>{ticket?.name}</h4>
              <div className="h4">
                {isFree ? `NT$ ${ticket?.price} / 人` : 'NT$ 0'}
              </div>
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="b-purchaseBtn b-btn b-load-btn w-100"
          onClick={onCart}
          disabled={!isFree}
          style={{
            cursor: !isFree ? 'not-allowed' : 'pointer',
            opacity: !isFree ? 0.5 : 1,
          }}
        >
          加入購物車
        </button>
        <div className="mt-2 text-center text-danger">{error}</div>

        <div className="b-warning mt-5">
          <h3 className="mt-4 mb-3">注意事項</h3>
          <ul className="ps-3">
            <li>票種分為單日或雙日門票。</li>
            <li>各票種數量皆有限，售完為止。</li>
            <li>
              購買取票成功後可於使用者票券中，憑電子票券開啟 QR Code
              掃描已兌換活動手環入場。
            </li>
            <li>門票僅限指定日期及場次使用，逾期無效。</li>
            <li>
              如遇不可抗力因素，本活動將公布變動，詳細活動內容及未盡事宜請洽活動官網或粉絲專頁。
            </li>
            <li>
              購票前請詳閱注意事項，一旦購票成功視為同意上述所有活動注意事項。
            </li>
          </ul>
        </div>
      </form>
    </aside>
  )
}
