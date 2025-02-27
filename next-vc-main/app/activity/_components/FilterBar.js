'use client'

import Image from 'next/image'
import '../../../app/product/list/list.scss' // Guan style'

export default function FilterBar({ actNum, onOpen, sort }) {
  const activeSortBtn = (e, type, order) => {
    if (document.querySelector('.b-btn-unstyled .active'))
      document
        .querySelector('.b-btn-unstyled .active')
        .classList.remove('active')
    e.target.classList.add('active')
    sort(type, order)
  }

  return (
    <>
      {/* Title */}
      <div className="g-pdlist-title px-modified">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center">
            <h4 className="h4 mb-0">ACTIVITY</h4>
            <h4 className="mb-0">活動一覽</h4>
          </div>
        </div>
      </div>
      {/* Filter row */}
      <div className="b-filter-bar g-pdlist-topbar px-modified">
        <div className="container-fluid d-flex justify-content-between p-0">
          <div className="g-left d-flex align-items-center">
            {/* 商品數量 */}
            <h6 className="g-amount mb-0">{actNum} 項活動</h6>
            {/* 篩選 */}
            <button
              className="b-btn-unstyled g-fliter d-sm-flex d-none"
              onClick={onOpen}
            >
              <Image
                src="/images/product/list/filter.svg"
                alt="篩選"
                width={16}
                height={19}
              />
              <h6 className="mb-0">篩選</h6>
            </button>
          </div>
          <div className="g-right d-flex align-items-center">
            {/* 排序 */}
            <div className="g-order d-flex">
              <Image
                src="/images/product/list/order.svg"
                alt="排序"
                width={14}
                height={19}
              />
              <h6 className="mb-0">排序</h6>
              {/* 排序欄位 */}
              <div className="g-order-sec">
                <button
                  className="b-btn-unstyled w-100"
                  onClick={(e) => activeSortBtn(e, 'price', 'asc')}
                >
                  <h6>價格由低至高</h6>
                </button>
                <button
                  className="b-btn-unstyled w-100"
                  onClick={(e) => activeSortBtn(e, 'price', 'desc')}
                >
                  <h6>價格由高至低</h6>
                </button>
                <button
                  className="b-btn-unstyled w-100"
                  onClick={(e) => activeSortBtn(e, 'id', 'asc')}
                >
                  <h6>活動編號 1 - 9</h6>
                </button>
                <button
                  className="b-btn-unstyled w-100"
                  onClick={(e) => activeSortBtn(e, 'id', 'desc')}
                >
                  <h6>活動編號 9 - 1</h6>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
