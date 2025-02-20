'use client'
import { useMyCart } from '@/hooks/use-cart'

export default function CartItem({ item }) {
  const { cartItems,
    onDecrease,
    onIncrease,
    onRemove,
  } = useMyCart()

  return (
    <div className="card card1 mb-3">
      <div className="row g-0">
        <div className="col-md-3 m-sec2-card py-3">
          <img src={item.image} className="img-fluid" alt={item.name} />
        </div>
        <div className="col-md-9">
          <div className="card-body h-100 p-lg-3 p-0 d-flex flex-column">
            <div className="d-flex flex-column justify-content-between flex-grow-1">
              <div>
                <h4 className="h3 p-lg-x-2 p-lg-1">{item.name}</h4>
                {item.rentDate && (
                  <div className="d-flex align-items-end p-lg-1">
                    <h5>租借日期: {item.rentDate}</h5>
                  </div>
                )}
                {item.color && <h5 className="p-lg-1">顏色: {item.color}</h5>}
                <div className="d-flex align-items-end p-lg-1">
                  {item.stockStatus >= item.count ? (
                    <img src="/images/cart/box-icon.svg" alt="stock icon" />
                  ) : (
                    <img src="/images/cart/box-icon-red.svg" alt="stock icon" />
                  )}
                  <h5 className="ps-2">
                    {item.stockStatus > item.count ? '有庫存' : '已達庫存上限'}
                  </h5>
                </div>
                <div className="d-flex align-items-end p-lg-1 pb-lg-1 py-2">
                  <h5>數量 :</h5>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button type="button" className="btn" onClick={() => {
                      if (item.count > 1) {
                        onDecrease(item.id)
                      }
                    }}>
                      <i className="fa-solid fa-minus fa-fw" />
                    </button>
                    <div type="button" className="btn">
                      {item.count}
                    </div>
                    <button type="button" className="btn" onClick={() => { if(item.stockStatus > item.count){onIncrease(item.id)} }}>
                      <i className="fa-solid fa-plus fa-fw" />
                    </button>
                  </div>
                </div>
                <h5 className="h4 p-lg-1">價錢: NT$ {item.price}</h5>
              </div>
              <div className="d-flex justify-content-center align-items-end pt-3 mt-auto">
                <button type="button" className="btn" onClick={() => { onRemove(item.id) }}>移除商品</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}