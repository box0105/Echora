
// POST /api/users/:userId/coupons
import { createContext, useContext, useState, useEffect } from "react";

const CouponContext = createContext(null)

// 設定displayName可以在瀏覽器的react devtools上看到名稱，有助於除錯
CouponContext.displayName = 'CouponContext'

export function MyCouponProvider({ children }) {

  // 錯誤物件
  const [error, setError] = useState(null);

  const claimCoupon = async (userId, couponId) => {

    try {
      const res = await fetch(`http://localhost:3005/api/coupon/resource`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, couponId: couponId })
      })

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `領取失敗`)

      console.log(data);
    } catch (err) {
      setError(err.message)
      console.log(err.message);
    }
  }



  return (
    <CouponContext.Provider value={{ claimCoupon }}>
      {children}
    </CouponContext.Provider>
  )
}

export const useMyCoupon = () => useContext(CouponContext)