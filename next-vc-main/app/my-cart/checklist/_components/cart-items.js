import { useState, useEffect } from 'react'

export default function CartItem({ item }) {
  const [count, setCount] = useState(item.count || 1) // 初始數量來自 localStorage

  useEffect(() => {
    // 當 count 變動時，更新 localStorage
    updateCartItemInLocalStorage(item.id, count)
  }, [count]) // 監聽 count 變化

  const total = item.price * count

  return (
    <div className="card card1 mb-3">
      <div className="row g-0">
        <div className="col-md-3 m-sec2-card py-3">
          <img src={item.image} className="img-fluid" alt={item.name} />
        </div>
        <div className="col-md-9">
          <div className="card-body p-lg-3 p-0">
            <div className="d-flex flex-column justify-content-between">
              <div>
                <h3 className="h3 p-lg-x-2 p-lg-2">{item.name}</h3>
                {item.color && <h4 className="p-lg-2">顏色: {item.color}</h4>}
                <div className="d-flex align-items-end p-lg-2">
                  {item.stockStatus != 0 ? (
                    <img src="/images/cart/box-icon.svg" alt="stock icon" />
                  ) : (
                    <img src="/images/cart/box-icon-red.svg" alt="stock icon" />
                  )}
                  <h4 className="ps-2">
                    {item.stockStatus != 0 ? '有庫存' : '無庫存'}
                  </h4>
                </div>
                <div className="d-flex align-items-end p-lg-2 pb-lg-3 py-2">
                  <h4>數量 :</h4>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button type="button" className="btn" onClick={removeOne}>
                      <i className="fa-solid fa-minus fa-fw" />
                    </button>
                    <div type="button" className="btn">
                      {count}
                    </div>
                    <button type="button" className="btn" onClick={addOne}>
                      <i className="fa-solid fa-plus fa-fw" />
                    </button>
                  </div>
                </div>
                {item.rentDate && (
                  <div className="d-flex align-items-end p-lg-2 py-lg-3 py-2">
                    <h4>租借日期: {item.rentDate}</h4>
                  </div>
                )}
                <h4 className="h3 p-lg-2">價錢: NT$ {total}</h4>
              </div>
              <div className="d-flex justify-content-center pt-lg-5 mt-lg-5 pt-3">
                <button className="btn" onClick={removeItem}>移除商品</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  function addOne() {
    setCount(count + 1)
  }

  function removeOne() {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  function removeItem() {
    removeCartItemFromLocalStorage(item.id)
  }
}

// 更新 localStorage 內的數量
function updateCartItemInLocalStorage(itemId, newCount) {
  const cartItems = JSON.parse(localStorage.getItem('cartItem')) || []
  const updatedCart = cartItems.map((cartItem) =>
    cartItem.id === itemId ? { ...cartItem, count: newCount } : cartItem
  )
  localStorage.setItem('cartItem', JSON.stringify(updatedCart))
}

// 從 localStorage 移除商品
function removeCartItemFromLocalStorage(itemId) {
  const cartItems = JSON.parse(localStorage.getItem('cartItem')) || []
  const updatedCart = cartItems.filter((cartItem) => cartItem.id !== itemId)
  localStorage.setItem('cartItem', JSON.stringify(updatedCart))
  window.location.reload() // 刷新頁面讓 UI 更新
}
