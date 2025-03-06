'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function ComponentsOrderDetail() {
  const [orderItems, setOrderItems] = useState([])
  const [order, setOrder] = useState([])
  const { orderId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3005/api/myOrders/${orderId}`,
          {
            method: 'get',
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        const data = await res.json()
        setOrderItems(data.data)
        setOrder(data.order)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  if (!order || !orderItems.length) {
    return <p>載入中...</p>
  }

  return (
    <>
      <div className="">
        <br />
        <div className="row w-100 ">
          <div className="col col-6">
            <h3>訂單編號 : {order.orderNumber}</h3>
            <br />
            <p>建單日期 : {order.createdAt.split('.')[0]}</p>
            <p>收件人 : {order.recipient}</p>
            <p>電話 : {order.phone}</p>
            <p>E-mail : {order.email}</p>
            <p>地址 : {order.shippingAddress}</p>
            <p>付款方式 : {order.paymentMethod}</p>
            <p>取貨方式 : {order.shippingMethod}</p>
            <p>
              {order.coupon == ''
                ? '使用的優惠券 : 無'
                : `使用的優惠券 : ${order.coupon}`}
            </p>
            <p>
              {order.cost == 0 ? '折扣 : 無' : `折扣 : - NT$ ${order.cost}`}
            </p>
            <br />
            <hr />
            <h5>總金額 : NT$ {Number(order.totalAmount).toLocaleString()}</h5>
          </div>
          <div className="col col-6">
            <h3>訂購商品</h3>
            <br />
            <div className="">
              {orderItems.map((item) => (
                <div key={item.id}>
                  <div
                    className="card mb-3 p-1"
                    style={{
                      maxWidth: 400,
                      borderRadius: '0',
                      border: '1px solid #ccc',
                    }}
                  >
                    <div className="row g-0">
                      <div
                        className="col-md-3 d-flex align-items-center justify-content-center"
                        // style={{ maxHeight: 100 }}
                      >
                        <img
                          src={item.image}
                          className="img-fluid p-2"
                          alt="..."
                          style={{ maxHeight: 100 }}
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body p-2">
                          <h6 className="card-text">
                            <strong>商品名稱 :</strong> {item.name}
                          </h6>
                          {item.rentDate && (
                            <h6 className="card-text">
                              <strong>租借日期 :</strong> {item.rentDate}
                            </h6>
                          )}
                          {item.status && (
                            <h6 className="card-text">
                              <strong>票種 :</strong> {item.status}
                            </h6>
                          )}
                          <h6 className="card-text">
                            <strong>數量 :</strong> {item.count}
                          </h6>
                          <h6 className="card-text">
                            <strong>價錢 : </strong>NT${' '}
                            {Number(item.price).toLocaleString()}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <br />
      </div>
    </>
  )
}
