'use client'
import { useRouter } from 'next/navigation'

export default function DataPage() {
  const router = useRouter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cartItems = [
    {
      id: 1,
      name: 'Limited Edition Paranormal Troublemaker Telecaster® Deluxe',
      color: 'white',
      stockStatus: 2,
      image: '/images/cart/card2-img.png',
      price: 13999,
      count: 1,
    },
    {
      id: 2,
      name: '(租用) Limited Edition Paranormal Troublemaker Telecaster® Deluxe',
      color: 'white',
      rentDate: '2025-01-02 - 2025-01-04',
      stockStatus: 5,
      image: '/images/cart/card2-img.png',
      price: 2400,
      count: 1,
    },
    {
      id: 4,
      name: '衛武營國際音樂節-全票',
      stockStatus: 10,
      image: '/images/cart/card3.png',
      price: 700,
      count: 1,
    },
  ]

  function createLocalstorage() {
    localStorage.setItem('cartItem', JSON.stringify(cartItems))
  }



  return (
    <>
      <button onClick={()=>{
        createLocalstorage()
        alert("新增成功")
      }}>
        點選新建localstorage
      </button>
    </>
  )
}

