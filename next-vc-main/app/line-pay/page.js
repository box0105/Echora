'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import { isDev, apiURL } from '@/config'
import { useMyCart } from '@/hooks/use-cart'
// 載入loading元件
import { PuffLoader } from 'react-spinners'

export default function LinePayPage() {
  // 檢查是否登入

  const { clearCart } = useMyCart()

  // 從line-pay回來後要進行loading，確認交易需要一小段時間
  const [loading, setLoading] = useState(true)

  // 商品用狀態
  const [price, setPrice] = useState(100)
  const [quantity, setQuantity] = useState(2)

  // confirm回來用的，在記錄確認之後，line-pay回傳訊息與代碼，例如
  // {returnCode: '1172', returnMessage: 'Existing same orderId.'}
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })

  // 取得網址參數，例如: ?transactionId=xxxxxx
  const searchParams = useSearchParams()
  const router = useRouter()

  if (isDev) console.log('transactionId', searchParams.get('transactionId'))

  // 導向至LINE Pay付款頁面
  const goLinePay = async () => {
    // 先連到node伺服器後端，取得LINE Pay付款網址
    const res = await fetch(
      `${apiURL}/line-pay-test-only/reserve?amount=${quantity * price}`,
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
        window.location.href = resData.data.paymentUrl
      }
    } else {
      toast.error('付款失敗')
    }
  }

  // 確認交易，處理伺服器通知line pay已確認付款，為必要流程
  const handleConfirm = async (transactionId) => {
    const res = await fetch(
      `${apiURL}/line-pay-test-only/confirm?transactionId=${transactionId}`,
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
      const submitOrder = async () => {
        // 從 localStorage 讀取購物車資料
        const cartItems = localStorage.getItem('cartItem')
        const userData = localStorage.getItem('userData')

        const formData = new FormData()
        formData.append('userData', userData)
        formData.append('cartItems', cartItems)

        // 發送 POST 請求到後端 API 儲存資料
        try {
          const response = await fetch('https://echora-kwvs.onrender.com/api/api/myOrders', {
            method: 'POST',
            body: formData,
          })

          if (response.ok) {
            clearCart()
            setTimeout(() => {
              router.replace('/my-cart/finish')
            }, 3000)
          } else {
            alert('訂單提交失敗！')
          }
        } catch (error) {
          console.error('錯誤:', error)
          alert('訂單提交過程中出現錯誤')
        }
      }
      submitOrder()
      // 呈現結果
      setResult(resData.data)
      // 顯示成功訊息
    } else {
      toast.error('付款失敗')
      setTimeout(() => {
        router.replace('/')
      }, 3000)
    }
  }

  // confirm回來用的
  useEffect(() => {
    if (searchParams?.get('transactionId') && searchParams?.get('orderId')) {
      // 出現loading動畫
      setLoading(true)
      // 向server發送確認交易api
      handleConfirm(searchParams.get('transactionId'))
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const orderDisplay = (
    <>
      <h2>購買商品清單</h2>
      <div>
        商品名稱和ID都是在後端路由直接設定範例用，這裡只有價格會變動
        <br />
        數量:
        <input
          type="number"
          name="quantity"
          value={quantity === 0 ? '' : quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value))
          }}
        />
        單價:
        <input
          type="number"
          name="price"
          value={price === 0 ? '' : price}
          onChange={(e) => {
            setPrice(Number(e.target.value))
          }}
        />
      </div>
      <hr />
      <br />
      總價: {quantity * price}
      <br />
      {/* 圖檔都在public資料夾 */}
      <Image
        alt=""
        src="/line-pay/LINE-Pay(h)_W85_n.png"
        width={85}
        height={25}
      />
      <button onClick={goLinePay}>前往付款</button>
    </>
  )

  if (loading)
    return (
      <>
        <div className="d-flex flex-column align-items-center justify-content-center pt-5 mt-5">
          <div className="m-127px"></div>
          <div className="mb-4">
            <PuffLoader color="#00b853" size={70} />
          </div>
          <div>
            <h4>確認付款中，請稍後...</h4>
          </div>
        </div>
      </>
    )

  return <></>
}
