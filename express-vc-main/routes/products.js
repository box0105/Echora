import express from 'express'
import db from '../config/mysql.js'

const router = express.Router()

// GET /api/products
// fetch所有產品的所有資料
router.get('/', async (req, res) => {
  try {
    const sql =
      'SELECT product.*, brand.name AS brand_name, product_sku.id AS product_sku_id, product_sku.stock, color.name AS color_name, color.color_image, color_palette.name AS color_palette_name, image.image FROM product JOIN brand ON product.brand_id = brand.id JOIN product_sku ON product.id = product_sku.product_id JOIN color ON product_sku.color_id = color.id JOIN color_palette ON color.color_palette_id = color_palette.id JOIN image ON product_sku.id = image.product_sku_id WHERE image.sort_order = 1;'
    const [rows] = await db.query(sql)
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

// GET /api/products/search?q=
router.get('/search', async (req, res) => {
  const { q } = req.query
  console.log(req.query)
  try {
    if (!q) throw new Error('請提供查詢字串')

    const sql =
      'SELECT product.*, brand.name AS brand_name FROM product JOIN brand ON product.brand_id = brand.id WHERE product.name LIKE ? OR brand.name LIKE ?'
    const searchQuery = `%${q}%`
    const [rows] = await db.query(sql, [searchQuery, searchQuery])

    res.status(200).json({
      status: 'success',
      data: rows,
      message: `搜尋成功, 條件: ${q}`,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message ? err.message : '搜尋失敗',
    })
  }
})

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  try {
    const [rows] = await db.query(`SELECT * FROM product WHERE id = ${pid}`)
    const row = rows[0]
    res.status(200).json({
      status: 'success',
      data: row,
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

// *ask: "比較功能"怎麼設路由? 從productlist的網址上拿pid參數?

export default router
