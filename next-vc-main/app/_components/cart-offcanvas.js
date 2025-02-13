import CartList from '../my-cart/checklist/_components/cart-list'
import { useMyCart } from '@/hooks/use-cart'
import Link from 'next/link';

export default function CartOffcanvas({ show, onClose }) {
  const { cartItems, totalAmount, totalQty, clearCart } = useMyCart()

  return (
    <div
      className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} // 動態加上 "show" class
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style={{
        visibility: show ? 'visible' : 'hidden',
        transform: show ? 'translateX(0)' : 'translateX(100%)', // 控制開關動畫
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <div className="offcanvas-header">
        <div className="d-flex align-items-end">
          <div className="h2 pe-5">購物車清單</div>
          <h3>{totalQty}件商品</h3>
        </div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
      <div className="offcanvas-body">
        <CartList cartItems={cartItems} />
        <hr className="py-3" />
        <div className="d-flex justify-content-between py-2">
          <h4 className="h4">總計 :</h4>
          <h4 className="h4">NT$ {totalAmount}</h4>
        </div>
        <Link href="/my-cart/checklist">
          <butaton type="button" className="btn btn-dark w-100 mt-3" onClick={onClose}>
            前往結帳
          </butaton>
        </Link>
        <button type="button" className="btn btn-light w-100 mt-3" onClick={clearCart}>
          清空購物車
        </button>
      </div>
    </div>
  )
}
