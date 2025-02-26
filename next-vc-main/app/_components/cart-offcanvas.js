import CartList from '../my-cart/checklist/_components/cart-list'
import { useMyCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { useEffect, useState } from 'react'

export default function CartOffcanvas({ show, onClose }) {
  const { cartItems, totalAmount, totalQty, clearCart } = useMyCart()
  const { isAuth } = useAuth()
  const [isVisible, setIsVisible] = useState(show)
  // const [clientCartItems, setClientCartItems] = useState([])
  // const [clientAuth, setClientAuth] = useState(false)

  // useEffect(() => {
  //   setClientAuth(isAuth)
  // }, [isAuth])

  // useEffect(() => {
  //   setClientCartItems(cartItems)
  // }, [cartItems])

  useEffect(() => {
    if (show) {
      setIsVisible(true) // 顯示時立刻設定為可見
    } else {
      // 關閉時延遲 300ms（與 transition 時間一致），讓動畫播放完再隱藏
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [show])

  return (
    <div
      className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} // 動態加上 "show" class
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style={{
        visibility: isVisible ? 'visible' : 'hidden', // 延遲隱藏
        transform: show ? 'translateX(0)' : 'translateX(100%)', // 控制滑動動畫
        transition: 'transform 0.3s ease-in-out', // 設定動畫時間
      }}
    >
      <div className="offcanvas-header">
        {cartItems.length == 0 ? (
          ''
        ) : (
          <div className="d-flex align-items-end">
            <div className="h2 pe-5">購物車清單</div>
            <h3>{totalQty}件商品</h3>
          </div>
        )}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
      {cartItems.length == 0 ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div>
            <h4>購物車是空的</h4>
            <Link href="/product/list">
              <button
                type="button"
                className="btn btn-dark w-100 mt-3"
                onClick={onClose}
              >
                前往購物
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="offcanvas-body">
          <CartList cartItems={cartItems} />
          <hr className="py-3" />
          <div className="d-flex justify-content-between py-2">
            <h4 className="h4">總計 :</h4>
            <h4 className="h4">NT$ {totalAmount}</h4>
          </div>
          {isAuth ? (
            <Link href="/my-cart/checklist">
              <button
                type="button"
                className="btn btn-dark w-100 mt-3"
                onClick={onClose}
              >
                前往結帳
              </button>
            </Link>
          ) : (
            <Link href="/my-user">
              <button
                type="button"
                className="btn btn-dark w-100 mt-3"
                onClick={onClose}
              >
                請先登入會員
              </button>
            </Link>
          )}
          <button
            type="button"
            className="btn btn-light w-100 mt-3"
            onClick={clearCart}
          >
            清空購物車
          </button>
        </div>
      )}
    </div>
  )
}
