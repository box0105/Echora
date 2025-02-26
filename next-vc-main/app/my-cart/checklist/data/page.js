'use client'

export default function DataPage() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cartItems = [
    {
      id: 1,
      name: 'Limited Edition Paranormal Troublemaker Telecaster® Deluxe',
      brand: 'Fender',
      color: 'white',
      stock: 2,
      image: '/images/cart/card2-img.png',
      price: 13999,
      count: 1,
    },
    {
      id: 2,
      name: '(租用) Limited Edition Paranormal Troublemaker Telecaster® Deluxe',
      brand: 'Fender',
      color: 'white',
      rentDate: '2025-01-02 - 2025-01-04',
      stock: 5,
      image: '/images/cart/card2-img.png',
      price: 2400,
      count: 1,
    },
    {
      id: 3,
      name: '衛武營國際音樂節',
      stock: 10,
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
        alert("加入成功")
      }}>
        加入購物車
      </button>
    </>
  )
}

