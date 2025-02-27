import express from 'express'
import db from '../config/mysql.js'
import multer from 'multer'

const router = express.Router()
const upload = multer()

router.get('/', async (req, res) => {
  const { userId } = req.query

  try {
    const sql = 'SELECT * FROM `myorder` WHERE userId = ?'
    const [rows] = await db.query(sql, [userId])
    res.status(200).json({
      status: 'success',
      data: rows,
      message: '取得資料成功',
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message ? err.message : '取得資料失敗',
    })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params // 🔹 讀取 orderId

  try {
    const sql = 'SELECT * FROM `myorderitem` WHERE orderId = ?'
    const [rows] = await db.query(sql, [id])

    // 取得訂單資訊（假設訂單存放在 `myorders` 表）
    const orderSql = 'SELECT * FROM `myorder` WHERE id = ?'
    const [orderRows] = await db.query(orderSql, [id])

    res.status(200).json({
      status: 'success',
      order: orderRows[0], // 訂單資訊
      data: rows, // 訂單商品
      message: '取得訂單商品成功',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: '取得訂單商品失敗',
    })
  }
})

// POST http://localhost:3005/api/myOrders
router.post('/', upload.none(), async function (req, res) {
  try {
    // 解析 localStorage & 表單 傳來的資料
    const cartItems = JSON.parse(req.body.cartItems)
    const userData = JSON.parse(req.body.userData)

    const {
      userId,
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
      cost,
      coupon,
    } = userData

    // 組合配送地址
    const shippingAddress = `${city}${country}${address}`

    // 插入 orders 表格（先新增訂單）
    const orderSql =
      'INSERT INTO `myorder` (`userId`,`orderNumber`,`shippingAddress`, `recipient`, `phone`, `email`, `shippingMethod`, `paymentMethod`, `totalAmount`, `cost`, `coupon`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const [orderResult] = await db.execute(orderSql, [
      userId,
      orderNumber,
      shippingAddress,
      recipient,
      phone,
      email,
      shippingMethod,
      paymentMethod,
      totalAmount,
      cost,
      coupon || "",
    ])

    console.log('新增訂單成功:', orderResult)

    // 取得新訂單的 ID
    const orderId = orderResult.insertId

    // 插入 order_items 表格（新增購物車商品）
    const items = cartItems.map((item) => {
      const { name, color, image, price, count, brand, rentDate, status } = item
      const total = price * count
      return [
        orderId,
        name,
        color,
        image,
        price,
        count,
        total,
        brand,
        rentDate,
        status,
      ]
    })
    const itemSql =
      'INSERT INTO `myorderitem` (orderId, name, color, image, price, count, total, brand, rentDate, status) VALUES ?'

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
