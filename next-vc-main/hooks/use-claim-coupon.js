'use client'

// POST /api/users/:userId/coupons
import { useState } from "react";

function useClaimCoupon(userId) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState(null);
  const [claimSuccess, setClaimSuccess] = useState(null);

  const claimCoupon = async (couponId) => {
    setIsClaiming(true);
    setClaimError(null);
    setClaimSuccess(null);

    try {
      const res = await fetch(`/api/users/${userId}/coupons`, {
        method: 'POST',
        headers: {
          'Content-type': 'app;ication/json',
        },
        body: JSON.stringify({ couponId })
      })

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || `領取失敗`)

      setClaimSuccess(data.message || `領取成功`)
    } catch (err) {
      setClaimError(err.message)
    }
  }
  return { isClaiming, claimError, claimSuccess, claimCoupon }
}

export default useClaimCoupon;