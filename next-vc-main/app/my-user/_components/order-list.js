'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OrderList() {
  const [orders, setOrders] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId')
      try {
        const res = await fetch(
          `http://localhost:3005/api/myOrders?userId=${userId}`,
          {
            method: 'get',
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        const data = await res.json()
        setOrders(data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  console.log(orders)

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">訂單編號</th>
            <th scope="col">建立日期</th>
            <th scope="col">付款方式</th>
            <th scope="col">寄件方式</th>
            <th scope="col">總金額</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => {
                router.push(`/my-user/order/${order.id}`)
              }}
            >
              <td><h6>{order.orderNumber}</h6></td>
              <td><h6>{order.createdAt.split('.')[0]}</h6></td>
              <td><h6>{order.paymentMethod}</h6></td>
              <td><h6>{order.shippingMethod}</h6></td>
              <td><h6>NT$ {order.totalAmount}</h6></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
