'use client'
import { useMyCart } from '@/hooks/use-cart'
import { stringify } from 'querystring'

export default function CartItem({ item }) {
  const { cartItems, onDecrease, onIncrease, onRemove } = useMyCart()

  return (
    <div className="card card1 mb-3 p-0">
      {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
      <div className="row g-0">
        <div className="col-md-3 m-sec2-card py-3 px-0">
          <img
            src={item.image}
            className="img-fluid"
            alt={item.name}
            style={{ maxHeight: '100%' }}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body h-100 p-lg-3 p-0 d-flex flex-column">
            <div className="d-flex flex-column justify-content-between flex-grow-1">
              <div className="ps-2 ps-md-0">
                <h4 className="h5 p-lg-x-2 p-lg-1">{item.name}</h4>
                {item.brand && <h6 className="p-lg-1">品牌 : {item.brand}</h6>}
                {item.color && <h6 className="p-lg-1">顏色 : {item.color}</h6>}
                {item.status && (
                  <h6 className="p-lg-1">票種 : {item.status}</h6>
                )}
                {item.rentDate && (
                  <div className="d-flex align-items-end p-lg-1">
                    <h6>租借日期 : {item.rentDate}</h6>
                  </div>
                )}
                <div className="d-flex align-items-end p-lg-1">
                  {item.stock >= item.count ? (
                    <img
                      src="/images/cart/box-icon.svg"
                      alt="stock icon"
                      style={{ width: '18px' }}
                    />
                  ) : (
                    <img src="/images/cart/box-icon-red.svg" alt="stock icon" />
                  )}
                  <h6 className="ps-2 mb-0">
                    {item.stock > item.count ? '有庫存' : '已達庫存上限'}
                  </h6>
                </div>
                <div className="d-flex align-items-end p-lg-1 pb-lg-1 py-2">
                  <h6>數量 :</h6>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        if (item.count > 1) {
                          onDecrease(item.key)
                        }
                      }}
                    >
                      <i className="fa-solid fa-minus fa-fw" />
                    </button>
                    <div type="button" className="btn">
                      {item.count}
                    </div>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        if (item.stock > item.count) {
                          onIncrease(item.key)
                        }
                      }}
                    >
                      <i className="fa-solid fa-plus fa-fw" />
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="p-lg-1 mb-0" style={{fontWeight : 700}}>價錢: NT$ {item.price.toLocaleString()}</h5>
                  <button
                    type="button"
                    className="btn m-cart-remove btn-sm m-lg-0 m-2"
                    onClick={() => {
                      onRemove(item.key)
                    }}
                  >
                    移除商品
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
