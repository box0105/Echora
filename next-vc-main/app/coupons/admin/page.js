'use client'

import React, { useState, useEffect } from 'react'
import { useMyCoupon } from '@/hooks/use-coupon'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { isValid, parseISO } from 'date-fns';

const CouponAdminTable = () => {
  const { time } = useMyCoupon()
  const [coupons, setCoupons] = useState([]) // 優惠券資料
  const [timeError, setTimeError] = useState(''); // 用於顯示時間錯誤訊息
  const [editingCouponId, setEditingCouponId] = useState(null) // 正在編輯的優惠券 ID
  const [editingCoupon, setEditingCoupon] = useState(null) // 儲存正在編輯的優惠券資料
  const [newCoupon, setNewCoupon] = useState({
    // 新增優惠券的預設資料
    name: '',
    code: '',
    type: '',
    discount: 0,
    startTime: '',
    endTime: '',
    status: '下架',
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
    // setNewCoupon((prevNewCoupon) => ({ ...prevNewCoupon, [name]: value }))
    setNewCoupon({ ...newCoupon, [name]: value })
    setTimeError('');
  }

  // 新增優惠券
  const handleAddCoupon = () => {
    // 轉換時間字串為 Date 物件
    const startDate = parseISO(newCoupon.startTime)
    const endDate = parseISO(newCoupon.endTime)

    // 驗證日期格式
    if (!isValid(startDate) || !isValid(endDate)) {
      setTimeError('時間格式不正確')
      return
    }

    // 比較開始和結束時間
    if (endDate <= startDate) {
      setTimeError('結束時間必須晚於開始時間')
      return
    }

    const newId =
      coupons.length > 0 ? Math.max(...coupons.map((c) => c.id)) + 1 : 1
    const couponToAdd = { ...newCoupon, id: newId } // 產生新的 id
    setCoupons([...coupons, couponToAdd])
    setNewCoupon({
      name: '',
      code: '',
      type: '',
      discount: 0,
      startTime: '',
      endTime: '',
      status: '',
    }) // 清空輸入框

  }

  // 開始編輯優惠券
  const handleEditCoupon = (id) => {
    const couponToEdit = coupons.find((coupon) => coupon.id === id) //找出要編輯的優惠券
    setEditingCouponId(id)
    setEditingCoupon({ ...couponToEdit }) //複製一份資料到editingCoupon
  }

  //處理編輯模式下輸入框的變更
  const handleEditingInputChange = (e) => {
    const { name, value } = e.target
    setEditingCoupon({ ...editingCoupon, [name]: value })
  }

  // 更新優惠券
  const handleUpdateCoupon = () => {
    const updatedCoupons = coupons.map((coupon) =>
      coupon.id === editingCoupon.id ? editingCoupon : coupon
    )
    setCoupons(updatedCoupons)
    setEditingCoupon(null) //清空
    setEditingCouponId(null) // 停止編輯
  }

  // 刪除優惠券
  const handleDeleteCoupon = (id) => {
    const updatedCoupons = coupons.filter((coupon) => coupon.id !== id)
    setCoupons(updatedCoupons)
  }

  //轉換時間
  function formatDateTime(time) {
    const date = new Date(time)
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    } // 使用 24 小時制
    const dateString = date.toLocaleDateString(undefined, dateOptions)
    const timeString = date.toLocaleTimeString(undefined, timeOptions)
    return `${dateString} ${timeString}`
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
        <select name="type" value={newCoupon.type} onChange={handleInputChange}>
          <option value="">請選擇</option>
          <option key="1" value="固定金額">
            固定金額
          </option>
          <option key="2" value="百分比">
            百分比
          </option>
        </select>
        {newCoupon.type != '' ? (
          <input
            type="number"
            name="discount"
            placeholder="折扣"
            value={newCoupon.discount}
            onChange={handleInputChange}
          />
        ) : (
          <input placeholder="折扣" value="" type="number" disabled />
        )}
        <input
          type="datetime-local"
          name="startTime"
          placeholder="開始時間"
          value={newCoupon.startTime}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="endTime"
          placeholder="到期時間"
          value={newCoupon.endTime}
          onChange={handleInputChange}
        />
        <select
          name="status"
          value={newCoupon.status}
          onChange={handleInputChange}
        >
          <option key="1" value="上架">
            上架
          </option>
          <option key="2" value="下架">
            下架
          </option>
        </select>
        <button onClick={handleAddCoupon}>新增</button>
        {timeError && <div className="error-message">{timeError}</div>}
      </div>

      {/* 優惠券表格 */}
      <table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>代碼</th>
            <th>類型</th>
            <th>折扣</th>
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
                    name="name"
                    value={editingCoupon.name || ''} //確保有值
                    onChange={handleEditingInputChange}
                  />
                ) : (
                  coupon.name
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="text"
                    name="code"
                    value={editingCoupon.code || ''}
                    onChange={handleEditingInputChange}
                  />
                ) : (
                  coupon.code
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <select
                    name="type"
                    value={editingCoupon.type || ''}
                    onChange={handleEditingInputChange}
                  >
                    <option value="">請選擇</option>
                    <option value="固定金額">固定金額</option>
                    <option value="百分比">百分比</option>
                  </select>
                ) : (
                  coupon.type
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="number"
                    name="discount"
                    value={editingCoupon.discount || ''}
                    onChange={handleEditingInputChange}
                  />
                ) : (
                  coupon.discount
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formatDateTime(editingCoupon.startTime) || ''}
                    onChange={handleEditingInputChange}
                  />
                ) : (
                  formatDateTime(coupon.startTime)
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={formatDateTime(editingCoupon.endTime) || ''}
                    onChange={handleEditingInputChange}
                  />
                ) : (
                  formatDateTime(coupon.endTime)
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <select
                    name="status"
                    value={editingCoupon.status || '下架'}
                    onChange={handleEditingInputChange}
                  >
                    <option key="1" value="上架">
                      上架
                    </option>
                    <option key="2" value="下架">
                      下架
                    </option>
                  </select>
                ) : (
                  coupon.status
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
