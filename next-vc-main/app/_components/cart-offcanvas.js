'use client'
import CartList from '../my-cart/checklist/_components/cart-list'
import React, { useState, useEffect, useRef } from 'react'

export default function CartOffcanvas({ show, onClose }) {
  const [cartItems, setCartItems] = useState([]) // 初始化狀態
  const [totalAmount, setTotalAmount] = useState(0)
  const offcanvasRef = useRef(null)

  // 根據 show 控制 offcanvas 的顯示或隱藏
  useEffect(() => {
    if (offcanvasRef.current) {
      const bsOffcanvas = new window.bootstrap.Offcanvas(offcanvasRef.current)
      if (show) {
        bsOffcanvas.show()
      } else {
        bsOffcanvas.hide()
      }
    }
  }, [show])

  // 讀取 localStorage 中的購物車資料並計算總金額
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItem')) || []
    setCartItems(storedCart)

    const total = storedCart.reduce((acc, v) => acc + v.count * v.price, 0)
    setTotalAmount(total)
  }, [])

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      ref={offcanvasRef}  // 指定 ref 給 offcanvas 最外層元素
    >
      <div className="offcanvas-header">
        <div className="d-flex align-items-end">
          <div className="h2 pe-5">購物車清單</div>
          <h3>{cartItems.length}件商品</h3>
        </div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={onClose}  // 點選關閉時呼叫 onClose callback
        />
      </div>
      <div className="offcanvas-body">
        <CartList cartItems={cartItems} />
        <hr className="py-3" />
        <div className="d-flex justify-content-between py-2">
          <h4 className="h4">總計 :</h4>
          <h4 className="h4">NT$ {totalAmount}</h4>
        </div>
        <button type="button" className="btn btn-dark w-100 mt-3">
          前往結帳
        </button>
      </div>
    </div>
  )
}
