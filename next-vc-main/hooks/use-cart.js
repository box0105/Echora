// 1.建⽴與導出它
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

// 設定displayName可以在瀏覽器的react devtools上看到名稱，有助於除錯
CartContext.displayName = 'CartContext'

// 建立一個Provider元件，自訂這個勾子所需的context用的狀態
export function MyCartProvider({ children }) {
  // 購物中的商品
  const [cartItems, setCartItems] = useState([])
  // 記錄是否完成第一次渲染的信號
  const [didMount, setDidMount] = useState(false)

  // 遞增商品數量
  const onIncrease = (cartItemId) => {
    const nextCartItems = cartItems.map((v) => {
      // 在陣列中找到id為cartItemId的物件，將count屬性+1
      if (v.id === cartItemId) return { ...v, count: v.count + 1 }
      // 其它沒有影響的物件值直接返回
      else return v
    })

    // 設定到狀態
    setCartItems(nextCartItems)
  }

  // 遞減商品數量
  const onDecrease = (cartItemId) => {
    const nextCartItems = cartItems.map((v) => {
      // 在陣列中找到id為cartItemId的物件，將count屬性+1
      if (v.id === cartItemId) return { ...v, count: v.count - 1 }
      // 其它沒有影響的物件值直接返回
      else return v
    })

    // 設定到狀態
    setCartItems(nextCartItems)
  }

  // 刪除商品
  const onRemove = (cartItemId) => {
    const nextCartItems = cartItems.filter((v) => {
      return v.id !== cartItemId
    })
    // 設定到狀態
    setCartItems(nextCartItems)
  }

  // 加入商品到購物車
  const onAdd = (product) => {
    // 判斷此商品是否已經在購物車裡
    const foundIndex = cartItems.findIndex((v) => v.id === product.id)

    if (foundIndex !== -1) {
      // 如果有找到==>遞增商品數量
      onIncrease(product.id)
    } else {
      // 沒找到===>新增商品到購物車
      // product和item(購物車項目)相比，少了一個數量屬性count
      const newItem = { ...product, count: 1 }
      // 加到購物車最前面
      const nextCartItems = [newItem, ...cartItems]
      // 設定到狀態
      setCartItems(nextCartItems)
    }
  }

  // 清空購物車
  const clearCart = () => {
    setCartItems([])
  }

  // 計算總數量&總金額(使用reduce, 累加/歸納)
  const totalQty = cartItems.reduce((acc, v) => acc + v.count, 0)
  const totalAmount = cartItems.reduce((acc, v) => acc + v.count * v.price, 0)

  // 第一次渲染之後
  useEffect(() => {
    // 從local storage取出資料設定到cartItems
    setCartItems(JSON.parse(localStorage.getItem('cartItem')) || [])
    // 信號值改為true 代表初次渲染完成
    setDidMount(true)
  }, [])

  // 之後渲染聽監cartItems變化，同步化到local storage
  useEffect(() => {
    // 避開第一次渲染
    if (didMount) {
      // 當cartItems有變動時，儲存到local storage
      localStorage.setItem('cartItem', JSON.stringify(cartItems))
    }
    // eslint-disable-next-line
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        totalQty,
        onAdd,
        onDecrease,
        onIncrease,
        onRemove,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/**
 *  useCart勾子是專門用來取得購物車狀態的
 *
 * @returns {{
 *  cartItems: {id: number, name: string, price: number, count: number}[],
 *  totalAmount: number,
 *  totalQty: number,
 *  onAdd: (product: {id: number, name: string, price: number}) => void,
 *  onDecrease: (cartItemId: number) => void,
 *  onIncrease: (cartItemId: number) => void,
 *  onRemove: (cartItemId: number) => void
 * }}
 */
export const useMyCart = () => useContext(CartContext)
