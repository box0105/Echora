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

  // -------- 加入購物車 --------

  // 商品加入購物車
  const onAdd = (product, selectedColor) => {
    console.log(product.images[selectedColor.skuId][0])
    //box
    const color = selectedColor.name
    const stock = product.stock[selectedColor.skuId]
    const image = `/images/product/pd-images/${
      product.images[selectedColor.skuId][0]
    }`

    // 判斷此商品是否已經在購物車裡
    const foundIndex = cartItems.findIndex((v) => v.id === product.id)

    if (foundIndex !== -1) {
      // 如果有找到==>遞增商品數量
      // onIncrease(product.id)
      alert('已有相同商品在購物車內')
    } else {
      // 沒找到===>新增商品到購物車
      // product和item(購物車項目)相比，少了一個數量屬性count
      const newItem = { ...product, color, stock, image, count: 1 }

      // 加到購物車最前面
      const nextCartItems = [newItem, ...cartItems]
      // 設定到狀態
      setCartItems(nextCartItems)
    }
  }

  // 活動票加入購物車
  const onAddActivity = (activity) => {
    // 取出票券列表
    const actTickets = activity.selectedTickets

    // 檢查購物車內是否已經有相同的票券
    const existingTickets = cartItems.filter((item) =>
      actTickets.some((ticket) => ticket.id === item.id)
    )
    if (existingTickets.length > 0) {
      alert('已有相同商品在購物車內')
      return
    }

    // 將所有票券新增到購物車，每張票券預設 count: 1
    const newTickets = actTickets.map((ticket) => ({
      ...ticket,
      count: 1,
      status: ticket.name,
      activityId: activity.id, // 活動 ID
      name: activity.name, // 活動名稱
      activityDateStart: activity.date_start, // 活動開始時間
      activityDateEnd: activity.date_end, // 活動結束時間
      activityCity: activity.city, // 活動城市
      activityAddress: activity.address, // 活動地址
      image: activity.image, // 活動圖片
    }))

    // 更新購物車 (展開舊的購物車內容)
    setCartItems([...newTickets, ...cartItems])
  }

  // 清空購物車
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cartItem')
    localStorage.removeItem('coupon')
    localStorage.removeItem('userData')
    localStorage.removeItem('total')
    localStorage.removeItem('cost')
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
        onAddActivity,
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
