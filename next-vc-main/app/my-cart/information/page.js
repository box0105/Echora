'use client'
import './_styles/bootstrap.scss'
import './_styles/cart-checkkist.scss'
import './_styles/index.scss'
import './_styles/cart-information.scss'
import React, { useRef } from 'react'
import { useMyCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isDev, apiURL } from '@/config'
// 載入loading元件

export default function InformationPage() {
  const { totalAmount, clearCart, cartItems } = useMyCart()

  //#region EC Pay
  const payFormDiv = useRef(null)
  const createEcpayForm = (params, action) => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = action
    for (const key in params) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = params[key]
      form.appendChild(input)
    }
    // 回傳form表單的物件參照
    return payFormDiv.current.appendChild(form)
    // 以下是直接送出表單的方式
    // form.submit()
  }

  const goEcpay = async () => {
    // 先連到node伺服器後端，取得EC Pay付款網址
    const res = await fetch(`${apiURL}/ecpay-test-only?amount=${totalAmount}`, {
      method: 'GET',
      // 讓fetch能夠傳送cookie
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const resData = await res.json()

    if (isDev) console.log(resData)

    if (resData.status === 'success') {
      // 建立表單，回傳的是表單的物件參照
      const payForm = createEcpayForm(resData.data.params, resData.data.action)

      if (isDev) console.log(payForm)

      if (window.confirm('確認要導向至ECPay(綠界金流)進行付款?')) {
        //送出表單
        payForm.submit()
      }
    } else {
      toast.error('付款失敗')
    }
  }
  //#endregion
  // ---------------------------------------

  //#region LIne Pay
  // 取得網址參數，例如: ?transactionId=xxxxxx/
  const searchParams = useSearchParams()
  const router = useRouter()

  if (isDev) console.log('transactionId', searchParams.get('transactionId'))

  // 導向至LINE Pay付款頁面
  const goLinePay = async () => {
    // 先連到node伺服器後端，取得LINE Pay付款網址
    const res = await fetch(
      `${apiURL}/line-pay-test-only/reserve?amount=${totalAmount}&items=${cartItems.name}`,
      {
        method: 'GET',
        // 讓fetch能夠傳送cookie
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    const resData = await res.json()

    console.log(resData)

    if (resData.status === 'success') {
      if (window.confirm('確認要導向至LINE Pay進行付款?')) {
        //導向至LINE Pay付款頁面
        router.replace((window.location.href = resData.data.paymentUrl))
      }
    } else {
      toast.error('付款失敗')
    }
  }
  //#endregion
  // ---------------------------------------

  //#region 送出事件
  const handleSubmit = async (event) => {
    event.preventDefault()

    const target = event.target

    // 從表單中獲取用戶資料
    const userData = {
      recipient: target.recipient.value,
      phone: target.phone.value,
      email: target.email.value,
      city: target.city.value,
      country: target.country.value,
      address: target.address.value,
      shippingMethod: target.shippingMethod.value,
      paymentMethod: target.paymentMethod.value,
      totalAmount: totalAmount,
    }

    // 將 userData 寫入 localStorage
    localStorage.setItem('userData', JSON.stringify(userData))

    if (userData.paymentMethod == 'linePay') {
      goLinePay()
    } else if (userData.paymentMethod == 'ECpay') {
      goEcpay()
    }
  }
  //#endregion
  // ---------------------------------------

  return (
    <>
      <div className="m-background">
        <div className="m-checklist-section1">
          <div className="container-fluid d-flex justify-content-center m-index1">
            <div className="m-sec1-img w-75 ">
              <img className="img-fluid" src="/images/cart/流程圖2.svg" alt />
            </div>
            <div className="m-sec1-mobile w-75">
              <img
                className="img-fluid"
                src="/images/cart/流程圖2-手機.svg"
                alt
              />
            </div>
          </div>
        </div>
        <div className="m-checklist-section2 w-100">
          <form action="" method="POST" onSubmit={handleSubmit}>
            <div className="container-fluid m-index1 row">
              <div className="m-sec2-col8 col-lg-8 col-12">
                <div className="d-flex justify-content-between align-items-end pt-4 pb-2">
                  <h2 className="h4">基本資料</h2>
                  <div>
                    <input
                      type="checkbox"
                      name="user-information"
                      id="user-information"
                    />
                    <label className="ps-1" htmlFor="user-information">
                      <h4>填入使用者資料</h4>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 pe-1">
                    <input
                      className="w-100 p-3"
                      type="text"
                      placeholder="收件人姓名"
                      id="recipient"
                      name="recipient"
                      required
                    />
                  </div>
                  <div className="col-6 ps-1">
                    <input
                      className="w-100 p-3"
                      type="text"
                      placeholder="手機"
                      id="phone"
                      name="phone"
                      required
                    />
                  </div>
                  <div className="col12">
                    <input
                      className="w-100 p-3 mt-2"
                      type="email"
                      placeholder="E-mail"
                      id="email"
                      name="email"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex align-items-end pt-4 pb-2">
                  <h2 className="h4">地址</h2>
                </div>
                <div className="row">
                  <div className="col-6 pe-1">
                    <input
                      className="w-100 p-3"
                      type="text"
                      placeholder="縣市"
                      id="city"
                      name="city"
                      required
                    />
                  </div>
                  <div className="col-6 ps-1">
                    <input
                      className="w-100 p-3"
                      type="text"
                      placeholder="鄉鎮 / 市區"
                      id="country"
                      name="country"
                      required
                    />
                  </div>
                  <div className="col12">
                    <input
                      className="w-100 p-3 mt-2"
                      type="text"
                      placeholder="地址"
                      id="address"
                      name="address"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex align-items-end pt-4 pb-2">
                  <h2 className="h4">取貨方式</h2>
                </div>
                <div className="form-check py-3 mb-2">
                  <input
                    type="radio"
                    name="shippingMethod"
                    id="flexRadioDefault1"
                    value="homeDelivery"
                    defaultChecked
                  />
                  <label
                    className="form-check-label ps-2"
                    htmlFor="flexRadioDefault1"
                  >
                    宅配到府
                  </label>
                </div>
                <div className="form-check py-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    id="flexRadioDefault2"
                    value="storePickup"
                  />
                  <label
                    className="form-check-label ps-2"
                    htmlFor="flexRadioDefault2"
                  >
                    來店自取
                  </label>
                </div>
                <div className="d-flex align-items-end pt-4 pb-2">
                  <h2 className="h4">付款方式</h2>
                </div>
                <div className="form-check py-3 mb-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="flexRadioDefault3"
                    value="linePay"
                    defaultChecked
                  />
                  <label
                    className="form-check-label ps-2"
                    htmlFor="flexRadioDefault3"
                  >
                    LINE Pay
                  </label>
                </div>
                <div className="form-check py-3 mb-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="flexRadioDefault4"
                    value="ECpay"
                  />
                  <label
                    className="form-check-label ps-2"
                    htmlFor="flexRadioDefault4"
                  >
                    綠界科技ECPay
                  </label>
                </div>
                {/* <div className="form-check py-3 pe-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="flexRadioDefault5"
                    value="creditCard"
                  />
                  <label
                    className="form-check-label ps-2"
                    htmlFor="flexRadioDefault5"
                  >
                    信用卡
                  </label>
                  <div className="row pt-2">
                    <div className="col-lg-6">
                      <div className="col-12">
                        <input
                          className="w-100 p-3"
                          type="creditCard"
                          placeholder="卡號 1234 1234 1234 1234"
                        />
                      </div>
                      <div className="row">
                        <div className="col-6 mt-3">
                          <input
                            className="w-100 p-3"
                            type="text"
                            placeholder="到期日 MM / YY"
                          />
                        </div>
                        <div className="col-6">
                          <input
                            className="w-100 p-3 mt-3"
                            type="text"
                            placeholder="安全碼 CVC"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div ref={payFormDiv} style={{ display: 'none' }}></div>
              </div>
              <div className="m-sec2-col4 col-lg-4 col-12">
                <div className="h3 pt-4 pb-2">訂單摘要</div>
                <div className="d-flex justify-content-between py-2">
                  <h5>小計 :</h5>
                  <h5>NT$ {totalAmount}</h5>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <h5>運費 :</h5>
                  <h5>Free</h5>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <h5>折扣 :</h5>
                  <h5>-20%</h5>
                </div>
                <hr />
                <div className="d-flex justify-content-between py-3">
                  <h4 className="h4">總計 :</h4>
                  <h4 className="h4">NT$ {totalAmount}</h4>
                </div>
                {/* <div className="row row-cols-1 pt-4 d-md-block d-none">
                <CartList cartItems={cartItems} />
              </div> */}
                <button type="submit" className="btn btn-dark w-100 mt-5">
                  下訂單
                </button>
                <Link href="/my-cart/checklist">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-3"
                  >
                    返回確認商品
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
