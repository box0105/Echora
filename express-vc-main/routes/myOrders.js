import express from 'express'
import db from '../config/mysql.js'
import multer from 'multer'

const router = express.Router()
const upload = multer()

// POST http://loaclhost:3005/api/myOrders
router.post('/', upload.none(), async function (req, res) {
  try {
    // 解析 localStorage & 表單 傳來的資料
    const cartItems = JSON.parse(req.body.cartItems)
    const userData = JSON.parse(req.body.userData)

    const {
      city,
      country,
      address,
      recipient,
      phone,
      email,
      shippingMethod,
      paymentMethod,
      totalAmount,
      orderNumber,
    } = userData

    // 組合配送地址
    const shippingAddress = `${city}${country}${address}`

    // 插入 orders 表格（先新增訂單）
    const orderSql =
      'INSERT INTO `myorder` (`orderNumber`,`shippingAddress`, `recipient`, `phone`, `email`, `shippingMethod`, `paymentMethod`, `totalAmount`) VALUES (?, ?, ?, ?, ?, ?, ?,?)'
    const [orderResult] = await db.execute(orderSql, [
      orderNumber,
      shippingAddress,
      recipient,
      phone,
      email,
      shippingMethod,
      paymentMethod,
      totalAmount,
    ])

    console.log('新增訂單成功:', orderResult)

    // 取得新訂單的 ID
    const orderId = orderResult.insertId

    // 插入 order_items 表格（新增購物車商品）
    const items = cartItems.map((item) => {
      const { name, color, image, price, count, brand, rentDate } = item
      const total = price * count
      return [orderId, name, color, image, price, count, total, brand, rentDate]
    })
    const itemSql =
      'INSERT INTO `myorderitem` (orderId, name, color, image, price, count, total, brand, rentDate) VALUES ?'

    db.query(itemSql, [items])

    console.log('新增訂單商品成功')
    return res.json({ status: 'success', message: '訂單與商品成功寫入資料庫' })
  } catch (error) {
    console.error('order:', error)
    return res
      .status(500)
      .json({ status: 'error', message: '訂單寫入失敗', error })
  }
})

export default router
