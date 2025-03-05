'use client'

import React, { useState, useEffect } from 'react'
import { useMyCoupon } from '@/hooks/use-coupon'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

const CouponAdminTable = () => {
  const [coupons, setCoupons] = useState([]) // 優惠券資料
  const [editingCouponId, setEditingCouponId] = useState(null) // 正在編輯的優惠券 ID
  const [newCoupon, setNewCoupon] = useState({
    // 新增優惠券的預設資料
    name: '',
    code: '',
    discount: 0,
    discountType: '',
    start: '',
    end: '',
    // 其他欄位...
  })

  useEffect(() => {
    // 模擬從後端取得資料 (實際應用中請使用 API 呼叫)
    const initialCoupons = [
      { id: 1, name: '夏季折扣', code: 'SUMMER10', discount: 10 },
      { id: 2, name: '新會員優惠', code: 'NEWUSER', discount: 5 },
    ]
    setCoupons(initialCoupons)
  }, [])

    // 處理輸入框的變更
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCoupon({ ...newCoupon, [name]: value })
  }

    // 新增優惠券
  const handleAddCoupon = () => {
    const newId =
      coupons.length > 0 ? Math.max(...coupons.map((c) => c.id)) + 1 : 1
    const couponToAdd = { ...newCoupon, id: newId } // 產生新的 id
    setCoupons([...coupons, couponToAdd])
    setNewCoupon({ name: '', code: '', discount: 0 }) // 清空輸入框
  }

    // 開始編輯優惠券
  const handleEditCoupon = (id) => {
    setEditingCouponId(id)
  }

    // 更新優惠券
  const handleUpdateCoupon = (updatedCoupon) => {
    const updatedCoupons = coupons.map((coupon) =>
      coupon.id === updatedCoupon.id ? updatedCoupon : coupon
    )
    setCoupons(updatedCoupons)
    setEditingCouponId(null) // 停止編輯
  }

    // 刪除優惠券
  const handleDeleteCoupon = (id) => {
    const updatedCoupons = coupons.filter((coupon) => coupon.id !== id)
    setCoupons(updatedCoupons)
  }

  return (
    <div className="coupon-admin-table">
      <h2>優惠券管理</h2>

      {/* 新增優惠券表單 */}
      <div className="add-coupon-form">
        <h3>新增優惠券</h3>
        <input
          type="text"
          name="name"
          placeholder="優惠券名稱"
          value={newCoupon.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="code"
          placeholder="優惠券代碼"
          value={newCoupon.code}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="discount"
          placeholder="折扣"
          value={newCoupon.discount}
          onChange={handleInputChange}
        />
        {/* <input
          type="text"
          name="type"
          placeholder="折扣類型"
          value={newCoupon.type}
          onChange={handleInputChange}
        /> */}
        <select name='type' onChange={handleInputChange}>
          <option value=''>請選擇</option>
          <option key='1' value='固定金額'>固定金額</option>
          <option key='2' value='折'>折</option>
        </select>
        <input
          type="text"
          name="start"
          placeholder="開始時間"
          value={newCoupon.startTime}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="end"
          placeholder="到期時間"
          value={newCoupon.endTime}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="上下架"
          value={newCoupon.status}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCoupon}>新增</button>
      </div>

      {/* 優惠券表格 */}
      <table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>代碼</th>
            <th>折扣</th>
            <th>類型</th>
            <th>開始時間</th>
            <th>到期時間</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="text"
                    value={coupon.name}
                    onChange={(e) =>
                      handleUpdateCoupon({ ...coupon, name: e.target.value })
                    }
                  />
                ) : (
                  coupon.name
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="text"
                    value={coupon.code}
                    onChange={(e) =>
                      handleUpdateCoupon({ ...coupon, code: e.target.value })
                    }
                  />
                ) : (
                  coupon.code
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="number"
                    value={coupon.discount}
                    onChange={(e) =>
                      handleUpdateCoupon({
                        ...coupon,
                        discount: parseFloat(e.target.value),
                      })
                    }
                  />
                ) : (
                  coupon.discount
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="text"
                    value={coupon.name}
                    onChange={(e) =>
                      handleUpdateCoupon({ ...coupon, name: e.target.value })
                    }
                  />
                ) : (
                  coupon.type
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="text"
                    value={coupon.name}
                    onChange={(e) =>
                      handleUpdateCoupon({ ...coupon, name: e.target.value })
                    }
                  />
                ) : (
                  coupon.name
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="text"
                    value={coupon.name}
                    onChange={(e) =>
                      handleUpdateCoupon({ ...coupon, name: e.target.value })
                    }
                  />
                ) : (
                  coupon.name
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="text"
                    value={coupon.name}
                    onChange={(e) =>
                      handleUpdateCoupon({ ...coupon, name: e.target.value })
                    }
                  />
                ) : (
                  coupon.name
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <button onClick={() => handleUpdateCoupon(coupon)}>
                    儲存
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEditCoupon(coupon.id)}>
                      編輯
                    </button>
                    <button onClick={() => handleDeleteCoupon(coupon.id)}>
                      刪除
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CouponAdminTable
