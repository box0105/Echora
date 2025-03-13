'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useMyCoupon } from '@/hooks/use-coupon'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { isValid, parseISO } from 'date-fns'
import DateTime from '../_components/DateTime'

const CouponAdminTable = () => {
  const [coupons, setCoupons] = useState([]) // 優惠券資料
  const [error, setError] = useState('') // 用於顯示時間錯誤訊息
  const [editingCouponId, setEditingCouponId] = useState(null) // 正在編輯的優惠券 ID
  const [editingCoupon, setEditingCoupon] = useState(null) // 儲存正在編輯的優惠券資料
  const [dateTime1, setDateTime1] = useState('');
  const [dateTime2, setDateTime2] = useState('');
  const [dateTime3, setDateTime3] = useState('');
  const [dateTime4, setDateTime4] = useState('');
  const [newCoupon, setNewCoupon] = useState({
    // 新增優惠券的預設資料
    name: '',
    code: '',
    typeId: '',
    discount: '',
    startTime: '',
    endTime: '',
    isDelete: 1,
    // 其他欄位...
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3005/api/coupon'
        const res = await fetch(url)
        if (!res.ok) throw new Error('狀態錯誤')
        const data = await res.json()
        // console.log(data.data)
        setCoupons(data.data)
      } catch (err) {
        console.log('發生錯誤', err)
      }
    }
    fetchData()
  }, [])

  // 處理輸入框的變更
  const handleInputChange = (e) => {
    const { name, value } = e.target
    // setNewCoupon((prevNewCoupon) => ({ ...prevNewCoupon, [name]: value }))
    setNewCoupon({ ...newCoupon, [name]: value })
    setError('')
    timeChange(name, value)
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
      discount: '',
      startTime: '',
      endTime: '',
      isDelete: 1,
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
    timeChange(name, value)
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
      // http://localhost:3005/api/coupon/resource
      const res = await fetch(`http://localhost:3005/api/coupon/admin`, {
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
      // http://localhost:3005/api/coupon/resource
      const res = await fetch(`http://localhost:3005/api/coupon/admin`, {
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
      // http://localhost:3005/api/coupon/resource
      const res = await fetch(`http://localhost:3005/api/coupon/admin`, {
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

  const timeChange = (name, value) => {
    switch (name) {
      case 'startTime':
        setDateTime1(value);
        break;
      case 'endTime':
        setDateTime2(value);
        break;
      case 'dateTime3':
        setDateTime3(value);
        break;
      case 'dateTime4':
        setDateTime4(value);
        break;
      default:
        break;
    }
  };

  return (

    <div className="container-fluid">

      <div className="heading row justify-content-between align-items-center mb-4">
        <div className="col-auto mt-1">
          <h2 className="mb-0 mt-2">優惠券後台管理</h2>
        </div>

      </div>

      {/* 新增優惠券表單 */}
      <h3 className=''>新增優惠券</h3>

      <div className="b-filter-card card p-4 shadow-sm k-create">
        <div className='row g-1'>
          <div className='p-0 col-12 '>
            <h5>名稱:
              <input
                className='ms-2 col-5'
                type="text"
                name="name"
                placeholder="優惠券名稱"
                value={newCoupon.name}
                onChange={handleInputChange}
              />
            </h5>

          </div>
          <div className=' p-0 col-12'>
            <h5>代碼:
              <input
                className='ms-2 col-5'
                type="text"
                name="code"
                placeholder="優惠券代碼"
                value={newCoupon.code}
                onChange={handleInputChange}
              />
            </h5>
          </div>

          <div className='col-12 p-0 h-100'>
            <h5>折扣類型、金額:</h5>
            <select className='col-lg-1 col-sm-4 me-2' name="typeId" value={newCoupon.typeId} onChange={handleInputChange}>
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
                className='col-lg-2 col-sm-4'
                type="number"
                name="discount"
                placeholder="折扣"
                value={newCoupon.discount}
                onChange={handleInputChange}
              />
            ) : (
              <input className='col-lg-2 col-sm-4' placeholder="折扣" value="" type="number" disabled />
            )}
          </div>

          <div className='col-lg-8 col-sm-12'>
            <h5>開始時間:
              <DateTime name='startTime' placeholder='開始時間' value={newCoupon.startTime} onChange={handleInputChange} />

            </h5>
          </div>

          <div className='col-lg-8 col-sm-12'>
            <h5>到期時間:
              <DateTime name='endTime' placeholder='到期時間' value={newCoupon.endTime} onChange={handleInputChange} />
            </h5>
          </div>

          <div className='col-12 p-0'>
            <select
              className='col-lg-1 col-sm-3'
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
          </div>

          <div className='col-12 mt-3'>
            <button onClick={handleAddCoupon} className='col-lg-1 col-sm-3 btn btn-primary'>新增</button>
            {error && <div className="error-message">{error}</div>}
          </div>

        </div>
      </div>

      {/* 優惠券表格 */}
      <hr></hr>
      <h3 className='mt-2 mb-2'>優惠券總覽</h3>
      <div className="b-filter-card card p-4 shadow-sm table-responsive ">
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
                <td className=''>
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
                      value={editingCoupon.startTime || ''}
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
                      value={editingCoupon.endTime || ''}
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
                      value={editingCoupon.isDelete || ''}
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
                    coupon.isDelete == 0 ? <div><img src="/images/coupon/check-mark-svgrepo-com.svg" width={24} height={24}/>上架</div> : <div><img src="/images/coupon/stop-svgrepo-com.svg" width={24} height={24}/>下架</div>
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
    </div>

  )
}

export default CouponAdminTable
