import express from 'express'
import db from '../config/mysql.js'

const router = express.Router()

// GET /api/products
//for product list page (product card)
router.get('/', async (req, res) => {
  try {
    const sql =
      'SELECT product.*, brand.name AS brand_name, product_sku.id AS product_sku_id, product_sku.stock, color.id As color_id ,color.name AS color_name, color.color_image, color_palette.name AS color_palette_name, image.image FROM product JOIN brand ON product.brand_id = brand.id JOIN product_sku ON product.id = product_sku.product_id JOIN color ON product_sku.color_id = color.id JOIN color_palette ON color.color_palette_id = color_palette.id JOIN image ON product_sku.id = image.product_sku_id WHERE image.sort_order = 1;'
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
//for product detail page
router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  const sql = `SELECT product.*, brand.name AS brand_name, product_sku.id AS product_sku_id, product_sku.stock, color.name AS color_name, color.color_image, image.image, spec.neck_pickup, spec.middle_pickup, spec.bridge_pickup, spec.controls, spec.switching FROM product JOIN brand ON product.brand_id = brand.id JOIN product_sku ON product.id = product_sku.product_id JOIN color ON product_sku.color_id = color.id JOIN image ON product_sku.id = image.product_sku_id JOIN spec ON product.id = spec.product_id WHERE product.id = ${pid};`
  try {
    const [rows] = await db.query(sql)
    // console.log(rows)
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

// *ask: "比較功能"怎麼設路由? 從productlist的網址上拿pid參數?

export default router
