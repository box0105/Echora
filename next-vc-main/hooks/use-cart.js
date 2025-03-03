// 1.建⽴與導出它
import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

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
  const onIncrease = (cartItemKey) => {
    const nextCartItems = cartItems.map((v) => {
      // 在陣列中找到id為cartItemId的物件，將count屬性+1
      if (v.key === cartItemKey) return { ...v, count: v.count + 1 }
      // 其它沒有影響的物件值直接返回
      else return v
    })

    // 設定到狀態
    setCartItems(nextCartItems)
  }

  // 遞減商品數量
  const onDecrease = (cartItemKey) => {
    const nextCartItems = cartItems.map((v) => {
      // 在陣列中找到id為cartItemId的物件，將count屬性+1
      if (v.key === cartItemKey) return { ...v, count: v.count - 1 }
      // 其它沒有影響的物件值直接返回
      else return v
    })

    // 設定到狀態
    setCartItems(nextCartItems)
  }

  // 刪除商品
  const onRemove = (cartItemKey) => {
    const nextCartItems = cartItems.filter((item) => item.key !== cartItemKey)
    setCartItems(nextCartItems)
  }

  // -------- 加入購物車 --------

  const fristToast = () => {
    toast.success('加入購物車成功', {
      position: 'bottom-right',
    })
  }
  const nextToast = () => {
    toast.info('已有相同商品在購物車內！', {
      position: 'bottom-right',
    })
  }

  // 商品加入購物車
  const onAdd = (product, selectedColor) => {
    // 從 selectedColor 取得所需資訊
    const color = selectedColor.name
    const stock = product.stock[selectedColor.skuId]
    const image = `/images/product/pd-images/${
      product.images[selectedColor.skuId][0]
    }`

    // 生成該商品的唯一 key（以 product-{id} 為例）
    const productKey = `product-${product.id}-${color}`

    // 檢查購物車中是否已經存在這個 key 的商品
    const foundIndex = cartItems.findIndex((item) => item.key === productKey)

    if (foundIndex !== -1) {
      // 若已有相同商品，則顯示提示訊息（或依需求遞增數量）
      nextToast()
    } else {
      // 若沒有相同商品，則新增到購物車，並預設數量為 1
      const newItem = {
        ...product,
        color,
        stock,
        image,
        count: 1,
        key: productKey,
      }

      // 將新商品加入購物車（加到最前面）
      setCartItems([newItem, ...cartItems])
      fristToast()
    }
  }

  // 活動票加入購物車
  const onAddActivity = (activity) => {
    // 取出票券列表
    const actTickets = activity.selectedTickets

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
      key: `activity-${activity.id}-${ticket.id}`,
    }))

    // 檢查購物車內是否已經有相同的票券
    const existingTickets = cartItems.some((item) =>
      newTickets.some((ticket) => ticket.key === item.key)
    )
    if (existingTickets) {
      nextToast()
      return
    }

    fristToast()
    // 更新購物車 (展開舊的購物車內容)
    setCartItems([...newTickets, ...cartItems])
  }

  // 租借加入購物車
  const onAddRent = (rent) => {
    // 產生租借項目的唯一 key
    const rentKey = `rent-${rent.id}-${rent.date_start}-${rent.date_end}-${rent.color}`

    // 檢查購物車內是否已經有相同的租借項目
    const existingRent = cartItems.some((item) => item.key === rentKey)
    if (existingRent) {
      nextToast()
      return
    }

    const newRent = {
      count: 1,
      id: rent.id,
      name: `(租借)${rent.name}`,
      rentDate: `${rent.date_start} - ${rent.date_end}`,
      stock: rent.stock,
      rentStore: rent.rentStore,
      brand: rent.brand,
      image: rent.image,
      color: rent.color,
      price: rent.total_price,
      key: rentKey,
    }

    setCartItems([newRent, ...cartItems])
    fristToast()
  }

  // 清空購物車
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cartItem')
    // localStorage.removeItem('coupon')
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
        onAddRent,
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
