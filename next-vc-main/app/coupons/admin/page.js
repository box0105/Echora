'use client'

import React, { useState, useEffect } from 'react'
import { useMyCoupon } from '@/hooks/use-coupon'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { isValid, parseISO } from 'date-fns'

const CouponAdminTable = () => {
  const { time } = useMyCoupon()
  const [coupons, setCoupons] = useState([]) // 優惠券資料
  const [error, setError] = useState('') // 用於顯示時間錯誤訊息
  const [editingCouponId, setEditingCouponId] = useState(null) // 正在編輯的優惠券 ID
  const [editingCoupon, setEditingCoupon] = useState(null) // 儲存正在編輯的優惠券資料
  const [newCoupon, setNewCoupon] = useState({
    // 新增優惠券的預設資料
    name: '',
    code: '',
    typeId: '',
    discount: 0,
    startTime: '',
    endTime: '',
    isDelete: '下架',
    // 其他欄位...
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://echora-kwvs.onrender.com/api/api/coupon'
        const res = await fetch(url)
        if (!res.ok) throw new Error('狀態錯誤')
        const data = await res.json()
        console.log(data.data)
        setCoupons(data.data)
      } catch (err) {
        console.log('發生錯誤', err)
      }
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   // 模擬從後端取得資料 (實際應用中請使用 API 呼叫)
  //   const initialCoupons = [
  //     { id: 1, name: '夏季折扣', code: 'SUMMER10', discount: 10 },
  //     { id: 2, name: '新會員優惠', code: 'NEWUSER', discount: 5 },
  //   ]
  //   setCoupons(initialCoupons)
  // }, [])

  // 處理輸入框的變更
  const handleInputChange = (e) => {
    const { name, value } = e.target
    // setNewCoupon((prevNewCoupon) => ({ ...prevNewCoupon, [name]: value }))
    setNewCoupon({ ...newCoupon, [name]: value })
    setError('')
  }

  // 新增優惠券
  const handleAddCoupon = () => {
    // 轉換時間字串為 Date 物件
    const startDate = parseISO(newCoupon.startTime)
    const endDate = parseISO(newCoupon.endTime)

    // 驗證日期格式
    if (!isValid(startDate) || !isValid(endDate)) {
      setError('時間格式不正確')
      return
    }

    // 比較開始和結束時間
    if (endDate <= startDate) {
      setError('結束時間必須晚於開始時間')
      return
    }

    const newId = coupons.length > 0 ? Math.max(...coupons.map((c) => c.id)) + 1 : 1
    const couponToAdd = { ...newCoupon, id: newId } // 產生新的 id
    setCoupons([...coupons, couponToAdd])
    createCoupon(couponToAdd)
    setNewCoupon({
      name: '',
      code: '',
      typeId: '',
      discount: 0,
      startTime: '',
      endTime: '',
      isDelete: '',
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
    updateCoupon(editingCoupon.id)
    setEditingCoupon(null) //清空
    setEditingCouponId(null) // 停止編輯
  }

  // 刪除優惠券
  const handleDeleteCoupon = (id) => {
    const updatedCoupons = coupons.filter((coupon) => coupon.id !== id)
    setCoupons(updatedCoupons)
    const deletedCoupon = coupons.filter((coupon) => coupon.id == id)
    deleteCoupon()
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

  const createCoupon = async (couponToAdd) => {
    // const userId = getUserId() 改成管理員
    try {
      // https://echora-kwvs.onrender.com/api/api/coupon/resource
      const res = await fetch(`https://echora-kwvs.onrender.com/api/api/coupon/admin`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id: couponToAdd.id, name: couponToAdd.name, code: couponToAdd.code, typeId: couponToAdd.typeId, discount: couponToAdd.discount, startTime: couponToAdd.startTime, endTime: couponToAdd.endTime, isDelete: couponToAdd.isDelete }),
      })

      const data = await res.json()

      console.log(data)
      return data
    } catch (err) {
      setError(err.message)
      console.log(err.message)
      return { status: 'fail' }
    }
  }

  const updateCoupon = async (couponID) => {
    // const userId = getUserId() 改成管理員

    try {
      // https://echora-kwvs.onrender.com/api/api/coupon/resource
      const res = await fetch(`https://echora-kwvs.onrender.com/api/api/coupon/admin`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: couponID,
          name: editingCoupon.name,
          code: editingCoupon.code,
          typeId: editingCoupon.typeId,
          discount: editingCoupon.discount,
          startTime: editingCoupon.startTime,
          endTime: editingCoupon.endTime,
          isDelete: editingCoupon.isDelete
        }),
      })

      const data = await res.json()

      console.log(data)
      return data
    } catch (err) {
      setError(err.message)
      console.log(err.message)
      return { status: 'fail' }
    }
  }

  const deleteCoupon = async () => {
    // const userId = getUserId() 改成管理員
    try {
      // https://echora-kwvs.onrender.com/api/api/coupon/resource
      const res = await fetch(`https://echora-kwvs.onrender.com/api/api/coupon/admin`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id: editingCoupon.id }),
      })

      const data = await res.json()

      console.log(data)
      return data
    } catch (err) {
      setError(err.message)
      console.log(err.message)
      return { status: 'fail' }
    }
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
        <select name="typeId" value={newCoupon.typeId} onChange={handleInputChange}>
          <option value="">請選擇</option>
          <option key="1" value="1">
            固定金額
          </option>
          <option key="2" value="2">
            百分比
          </option>
        </select>
        {newCoupon.typeId != '' ? (
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
          name="isDelete"
          value={newCoupon.isDelete}
          onChange={handleInputChange}
        >
          <option key="1" value="0">
            上架
          </option>
          <option key="2" value="1">
            下架
          </option>
        </select>
        <button onClick={handleAddCoupon}>新增</button>
        {error && <div className="error-message">{error}</div>}
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
                    name="typeId"
                    value={editingCoupon.typeId || ''}
                    onChange={handleEditingInputChange}
                  >
                    <option value="1">固定金額</option>
                    <option value="2">百分比</option>
                  </select>
                ) : (
                  <div>{coupon.typeId == 1 ? '固定金額' : '百分比'}</div>
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
                    name="isDelete"
                    value={editingCoupon.isDelete || '下架'}
                    onChange={handleEditingInputChange}
                  >
                    <option key="1" value="0">
                      上架
                    </option>
                    <option key="2" value="1">
                      下架
                    </option>
                  </select>
                ) : (
                  coupon.isDelete
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <div>
                    <button onClick={() => {
                      handleUpdateCoupon(coupon.id)
                    }}>
                      儲存
                    </button>
                    <button onClick={() => handleDeleteCoupon(coupon.id)}>
                      刪除
                    </button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => handleEditCoupon(coupon.id)}>
                      編輯
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
