'use client'
import './_styles/bootstrap.scss'
import './_styles/cart-checkkist.scss'
import './_styles/index.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

import CartList from './_components/cart-list'
import { useMyCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

export default function ChecklistPage() {
  const { cartItems, totalAmount, totalQty } = useMyCart()
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    router.replace('/my-cart/information')
  }

  //#region 優惠券選單
  const [userCoupons, setUserCoupons] = useState([])
  const [discountedAmount, setDiscountedAmount] = useState(0)
  const [countedAmount, setCountedAmount] = useState(totalAmount)
  const { isAuth } = useAuth()

  useEffect(() => {
    localStorage.setItem('cost', JSON.stringify(discountedAmount))
    localStorage.setItem('total', JSON.stringify(countedAmount))
  }, [discountedAmount])

  // useEffect(() => {
  //   setCountedAmount(totalAmount)
  // }, [totalAmount])

  useEffect(() => {
    if (isAuth) {
      fetchUserCoupon()
    }
  }, [isAuth])

  const fetchUserCoupon = async () => {
    const userId = localStorage.getItem('userId')
    try {
      const url = `http://localhost:3005/api/coupon/${userId}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('狀態錯誤')
      const data = await res.json()
      
      setUserCoupons(data.userCheckCoupons)
    } catch (err) {
      console.log('發生錯誤', err)
    }
    // fetchUserCoupon()
  }

  // const handleCouponChange = (e) => {
  //   const selectedCoupon = userCoupons.find(
  //     (coupon) => coupon.name === e.target.value
  //   )

  //   if (!selectedCoupon) {
  //     // 如果沒有選擇優惠券，回復原始價格
  //     setDiscountedAmount(0)
  //     setCountedAmount(totalAmount)
  //     return
  //   }

  //   if (selectedCoupon.typeId == 2) {
  //     // 假設 discount 是百分比
  //     const discountAmount = Math.round(
  //       (totalAmount * selectedCoupon.discount) / 100
  //     )
  //     setDiscountedAmount(totalAmount - discountAmount)
  //     setCountedAmount(discountAmount)
  //   } else if (selectedCoupon.typeId == 1) {
  //     const discountAmount = Math.round(totalAmount - selectedCoupon.discount)
  //     setDiscountedAmount(totalAmount - discountAmount)
  //     setCountedAmount(discountAmount)
  //   }

  //   localStorage.setItem('coupon', JSON.stringify(selectedCoupon))
  // }

  //#region  GPT寫的

  // 返回時重新選擇優惠券
  useEffect(() => {
    const storedCoupon = localStorage.getItem('coupon')
    if (storedCoupon) {
      const selectedCoupon = JSON.parse(storedCoupon)
      // 當優惠券存在，設置選項為已選擇的優惠券
      setDiscountedAmount(0) // 清除原先的折扣
      setCountedAmount(totalAmount) // 清除原先的金額
      handleCouponChange({ target: { value: selectedCoupon.name } }) // 呼叫 handleCouponChange 函式
    }
  }, [totalAmount]) // 監聽 totalAmount 變化

  useEffect(() => {
    const storedCoupon = localStorage.getItem('coupon')
    const selectedCoupon = storedCoupon ? JSON.parse(storedCoupon) : null

    if (!selectedCoupon) {
      setDiscountedAmount(0)
      setCountedAmount(totalAmount)
      return
    }

    if (selectedCoupon.typeId == 2) {
      // 百分比折扣
      const discountAmount = Math.round(
        (totalAmount * selectedCoupon.discount) / 100
      )
      setDiscountedAmount(totalAmount - discountAmount)
      setCountedAmount(discountAmount)
    } else if (selectedCoupon.typeId == 1) {
      // 固定金額折扣
      const discountAmount = Math.round(selectedCoupon.discount)
      setDiscountedAmount(discountAmount)
      setCountedAmount(totalAmount - discountAmount)
    }
  }, [totalAmount]) // 監聽 totalAmount 變化

  const handleCouponChange = (e) => {
    const selectedCoupon = userCoupons.find(
      (coupon) => coupon.name === e.target.value
    )

    if (!selectedCoupon) {
      setDiscountedAmount(0)
      setCountedAmount(totalAmount)
      localStorage.removeItem('coupon')
      return
    }

    localStorage.setItem('coupon', JSON.stringify(selectedCoupon))

    if (selectedCoupon.typeId == 2) {
      // 百分比折扣
      const discountAmount = Math.round(
        (totalAmount * selectedCoupon.discount) / 100
      )
      setDiscountedAmount(totalAmount - discountAmount)
      setCountedAmount(discountAmount)
    } else if (selectedCoupon.typeId == 1) {
      // 固定金額折扣
      const discountAmount = Math.round(selectedCoupon.discount)
      setDiscountedAmount(discountAmount)
      setCountedAmount(totalAmount - discountAmount)
    }
  }
  //#endregion
  // ------------------

  //#endregion
  // ------------------

  console.log(userCoupons)
  return (
    <>
      <div className="m-background mb-5">
        <div className="m-checklist-section1">
          <div className="container-fluid d-flex justify-content-center m-index1">
            <div className="m-sec1-img w-75">
              <img className="img-fluid" src="/images/cart/流程圖.svg" alt />
            </div>
            <div className="m-sec1-mobile w-75">
              <img
                className="img-fluid"
                src="/images/cart/流程圖-手機.svg"
                alt
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="m-checklist-section2 w-100">
          <div className="container-fluid m-index1 row">
            <div className="m-sec2-col8 col-lg-8 col-12">
              <div className="d-flex justify-content-between align-items-end py-4">
                <div className="h2">購物車清單</div>
                <h3 className="">{totalQty} 件商品</h3>
              </div>
              <CartList cartItems={cartItems} />
            </div>
            <div className="m-sec2-col4 col-lg-4 col-12">
              <div className="h3 pt-4 pb-2">訂單確認</div>
              <div className="d-flex justify-content-between py-2">
                <h5>小計 :</h5>
                <h5>NT$ {totalAmount}</h5>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h5>運費 :</h5>
                <h5>Free</h5>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h5>優惠券 :</h5>
                <select
                  className="form-select form-select-sm w-50"
                  aria-label="Small select example"
                  onChange={handleCouponChange}
                >
                  <option value="">請選擇優惠券</option>
                  {userCoupons.map(
                    (coupon) =>
                      coupon.isDeleted == false && (
                        <option key={coupon.couponId} value={coupon.name}>
                          {coupon.name}
                        </option>
                      )
                  )}
                </select>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h5>折扣 :</h5>
                <h5>
                  {discountedAmount == 0 ? '' : `- NT$ ${discountedAmount}`}
                </h5>
              </div>
              <hr />
              <div className="d-flex justify-content-between py-3">
                <h4 className="h4">總計 :</h4>
                <h4 className="h4">NT$ {countedAmount}</h4>
              </div>
              <button type="submit" className="btn btn-dark w-100 mt-5">
                結帳
              </button>
            </div>
          </div>
        </form>
        {/* <div className="m-section3 w-100">
          <div className="container-fluid m-index">
            <div className="m-index-title">
              <h1 className="h3">
                TRENDING DEALS<span> / 熱門優惠商品</span>
              </h1>
            </div>
            <div className="row row-cols-lg-4 row-cols-1 w-100 g-0">
              <div className="col card-group">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img
                    src="/images/cart/card2-img.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Product Name</h3>
                    <h4 className="card-text">Productttt</h4>
                    <div className="d-flex">
                      <h5 className="card-text">$77999</h5>
                      <span>$72900</span>
                    </div>
                    <p>2 COLORS</p>
                  </div>
                </div>
              </div>
              <div className="col card-group d-none d-lg-block">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img
                    src="/images/cart/card2-img.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Product Name</h3>
                    <h4 className="card-text">Productttt</h4>
                    <div className="d-flex">
                      <h5 className="card-text">$77999</h5>
                      <span>$72900</span>
                    </div>
                    <p>2 COLORS</p>
                  </div>
                </div>
              </div>
              <div className="col card-group d-none d-lg-block">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img
                    src="/images/cart/card2-img.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Product Name</h3>
                    <h4 className="card-text">Productttt</h4>
                    <div className="d-flex">
                      <h5 className="card-text">$77999</h5>
                      <span>$72900</span>
                    </div>
                    <p>2 COLORS</p>
                  </div>
                </div>
              </div>
              <div className="col card-group d-none d-lg-block">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img
                    src="/images/cart/card2-img.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h3 className="card-title">Product Name</h3>
                    <h4 className="card-text">Productttt</h4>
                    <div className="d-flex">
                      <h5 className="card-text">$77999</h5>
                      <span>$72900</span>
                    </div>
                    <p>2 COLORS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}
