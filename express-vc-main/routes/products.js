import express from 'express'
import db from '../config/mysql.js'

const router = express.Router()

// 得到所有商品資料
// GET /api/products

router.get('/', async (req, res) => {
  // type決定是否取得資料
  // type=data 需取得資料; type=count 不需取得資料
  const type = req.query.type || 'all'

  const page = Number(req.query.page) || 1
  const perPage = Number(req.query.perpage) || 8

  //搜尋參數
  const nameLike = req.query.name_like || ""

  //篩選參數
  const brandIds = req.query.brand_ids ? req.query.brand_ids.split(",").map((id)=>Number(id)) : []
  const colorPids = req.query.color_pids ? req.query.color_pids.split(",").map((id)=>Number(id)) : []
  const colorIds = req.query.color_ids ? req.query.color_ids.split(",").map((id)=>Number(id)) : []

  const priceGte = Number(req.query.price_gte) || 0
  const priceLte = Number(req.query.price_lte) || 1000000

  // const conditions = {nameLike, brandIds, colorPids, colorIds, priceGte, priceLte}

  //排序參數
  const sort = req.query.sort || 'price'
  const order = req.query.order || 'DESC'
  // const sortBy = { sort, order }

  try{
    let sql =
      `SELECT product.*, brand.name AS brand_name, product_sku.id AS product_sku_id, product_sku.stock, color.name AS color_name, color.color_image, color_palette.id AS color_palette_id, image.image FROM product JOIN brand ON product.brand_id = brand.id JOIN product_sku ON product.id = product_sku.product_id JOIN color ON product_sku.color_id = color.id JOIN color_palette ON color.color_palette_id = color_palette.id JOIN image ON product_sku.id = image.product_sku_id WHERE 1=1`
      if(nameLike) sql += ` AND product.name LIKE '%${nameLike}%'`
      if(brandIds.length>0) sql +=` AND brand.id IN (${brandIds.join(", ")})`
      if(colorPids.length>0) sql +=` AND color_palette.id IN (${colorPids.join(", ")})`
      if(colorIds.length>0) sql +=` AND color.id IN (${colorIds.join(", ")})`
      if(priceGte && priceLte) sql +=` AND product.price BETWEEN ${priceGte} AND ${priceLte}`
      sql += ` AND image.sort_order = 1`
      sql += ` ORDER BY product.${sort} ${order}`
      // AND product.name LIKE "les"
      // AND brand.id IN (1, 2) 
      // AND color_palette.id IN (1)
      // AND color.id IN (1, 2)  
      // AND product.price BETWEEN 50000 AND 100000 
      // AND image.sort_order = 1 
      // ORDER BY product.name ASC

      // console.log("Generated SQL:", sql); 
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

// router.get('/', async (req, res) => {
//   try {
//     const sql =
//       'SELECT product.*, brand.name AS brand_name, product_sku.id AS product_sku_id, product_sku.stock, color.id As color_id ,color.name AS color_name, color.color_image, color_palette.name AS color_palette_name, image.image FROM product JOIN brand ON product.brand_id = brand.id JOIN product_sku ON product.id = product_sku.product_id JOIN color ON product_sku.color_id = color.id JOIN color_palette ON color.color_palette_id = color_palette.id JOIN image ON product_sku.id = image.product_sku_id WHERE image.sort_order = 1;'
//     const [rows] = await db.query(sql)
//     res.status(200).json({
//       status: 'success',
//       data: rows,
//       message: '取得資料成功',
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({
//       status: 'error',
//       message: err.message ? err.message : '取得資料失敗',
//     })
//   }
// })

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

// 得到單筆資料
// GET /api/products/:pid
//for product detail page
router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  const sql = `SELECT product.*, brand.name AS brand_name, product_sku.id AS product_sku_id, product_sku.stock, color.name AS color_name, color.color_image, image.image, image.sort_order, spec.neck_pickup, spec.middle_pickup, spec.bridge_pickup, spec.controls, spec.switching FROM product JOIN brand ON product.brand_id = brand.id JOIN product_sku ON product.id = product_sku.product_id JOIN color ON product_sku.color_id = color.id JOIN image ON product_sku.id = image.product_sku_id JOIN spec ON product.id = spec.product_id WHERE product.id = ${pid} ORDER BY image.sort_order;`
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
