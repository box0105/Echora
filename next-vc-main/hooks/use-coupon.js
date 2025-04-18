// POST /api/users/:userId/coupons
import { createContext, useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CouponContext = createContext(null)

// 設定displayName可以在瀏覽器的react devtools上看到名稱，有助於除錯
CouponContext.displayName = 'CouponContext'

export function MyCouponProvider({ children }) {
  // 錯誤物件
  const [error, setError] = useState(null)
  // const [userId, setUserId] = useState()

  // useEffect(() => {
  //   const userId = localStorage.getItem('userId')
  //   setUserId(userId)
  // }, []) useEffect在元件渲染完後執行 會有時序問題 使用函式執行取值會是較好的做法 可以在要執行功能的時候才取值 
  const getUserId = () => localStorage.getItem('userId')

  const claimCoupon = async (couponId, typeId) => {
    const userId = getUserId()
    try {
      // https://echora-kwvs.onrender.com/api/coupon/resource
      const res = await fetch(`https://echora-kwvs.onrender.com/api/coupon/${userId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, couponId: couponId, typeId: typeId }),
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

  const claimCoupons = async () => {
    const userId = getUserId()
    try {
      const res = await fetch(`https://echora-kwvs.onrender.com/api/coupon/${userId}/all`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
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

  // 領取提示
  const notifyAndGet = async (itemId, typeId) => {
    const MySwal = withReactContent(Swal)
    try {
      const result = await MySwal.fire({
        title: '要領取優惠券嗎?',
        text: '優惠券將加入會員-我的優惠券',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
      })
      if (result.isConfirmed) {
        // 進行領取
        const res = await claimCoupon(itemId, typeId)
        console.log(res)
        // callback()

        console.log(res.status);
        if (res.status == 'sign') {
          MySwal.fire({
            title: '無法領取',
            text: `請先登入`,
            icon: 'warning',
          })
        }

        if (res.status == 'fail' || res.status == 'error') {
          MySwal.fire({
            title: '無法領取',
            text: `已經擁有優惠券`,
            icon: 'warning',
          })
        } else {
          MySwal.fire({
            title: '領取成功',
            text: `優惠券已領取`,
            icon: 'success',
          })
        }
      }
    } catch (err) {
      console.error('領取優惠券時發生錯誤:', err)
      setError(err.message)
      MySwal.fire({
        title: '領取失敗',
        text: `領取優惠券時發生錯誤: ${err.message}`,
        icon: 'error',
      })
    }
  }

  //全部領取提示
  const notifyAndGetAll = async () => {
    const MySwal = withReactContent(Swal)
    try {
      const result = await MySwal.fire({
        title: '要領取全部優惠券嗎?',
        text: '優惠券將加入會員-我的優惠券',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
      })
      if (result.isConfirmed) {
        // 進行領取
        const res = await claimCoupons()
        console.log(res)
        // callback()

        if (res.status == 'sign') {
          MySwal.fire({
            title: '無法領取',
            text: `請先登入`,
            icon: 'warning',
          })
        }

        if (res.status == 'fail') {
          MySwal.fire({
            title: '無法領取',
            text: `已經擁有優惠券`,
            icon: 'warning',
          })
        } else {
          MySwal.fire({
            title: '領取成功',
            text: `優惠券已領取`,
            icon: 'success',
          })
        }
      }
    } catch (err) {
      console.error('領取優惠券時發生錯誤:', err)
      setError(err.message)
      MySwal.fire({
        title: '領取失敗',
        text: `領取優惠券時發生錯誤: ${err.message}`,
        icon: 'error',
      })
    }
  }

  // 轉換時間格式
  const time = (time) => {

    const isoDateString = time
    const date = new Date(isoDateString)

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    const readableDate = date.toLocaleDateString('zh-TW', options) // 繁體中文

    // console.log(readableDate); 輸出：2024/7/27 （或 2024年7月27日，取決於地區設定）
    return readableDate
  }

  //全部刪除
  const clear = async (userId) => {
    try {
      // https://echora-kwvs.onrender.com/api/coupon/resource
      const res = await fetch(`https://echora-kwvs.onrender.com/api/coupon/`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
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
    <CouponContext.Provider value={{ claimCoupon, notifyAndGet, notifyAndGetAll, time, clear }}>
      {children}
    </CouponContext.Provider>
  )
}

export const useMyCoupon = () => useContext(CouponContext)
