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
                    <button type="button" className="btn" onClick={onDecrease(item.id)}>
                      <i className="fa-solid fa-minus fa-fw" />
                    </button>
                    <div type="button" className="btn">
                      {item.count}
                    </div>
                    <button type="button" className="btn" onClick={onIncrease(item.id)}>
                      <i className="fa-solid fa-plus fa-fw" />
                    </button>
                  </div>
                </div>
                {item.rentDate && (
                  <div className="d-flex align-items-end p-lg-2 py-lg-3 py-2">
                    <h4>租借日期: {item.rentDate}</h4>
                  </div>
                )}
                <h4 className="h3 p-lg-2">價錢: NT$ {item.price}</h4>
              </div>
              <div className="d-flex justify-content-center pt-lg-5 mt-lg-5 pt-3">
                <button className="btn" onClick={onRemove(item.id)}>移除商品</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}