import express from 'express'
import db from '../config/mysql.js'

const router = express.Router()

// 得到所有商品資料
// GET /api/products
router.get('/', async (req, res) => {
  // type決定是否取得資料
  // type=data 需取得資料; type=count 不需取得資料
  // const type = req.query.type || 'all'

  // const page = Number(req.query.page) || 1
  // const perPage = Number(req.query.perpage) || 8

  //搜尋參數
  const nameLike = req.query.name_like || ''

  //篩選參數
  const brandIds = req.query.brand_ids
    ? req.query.brand_ids.split(',').map((id) => Number(id))
    : []
  const colorPids = req.query.color_pids
    ? req.query.color_pids.split(',').map((id) => Number(id))
    : []
  const colorIds = req.query.color_ids
    ? req.query.color_ids.split(',').map((id) => Number(id))
    : []

  const priceGte = Number(req.query.price_gte) || 1
  const priceLte = Number(req.query.price_lte) || 700000

  // const conditions = {nameLike, brandIds, colorPids, colorIds, priceGte, priceLte}

  //排序參數
  const sort = req.query.sort || 'price'
  const order = req.query.order || 'ASC'
  // const sortBy = { sort, order }

  try {
    let sql = `SELECT product.*, 
    brand.name AS brand_name, 
    product_sku.id AS product_sku_id, 
    product_sku.stock, 
    color.name AS color_name, 
    color.color_image, 
    color_palette.id AS color_palette_id, 
    image.image,
    CASE 
        WHEN ${
          colorPids.length > 0
            ? `color_palette.id IN (${colorPids.join(',')})`
            : '0'
        }
        AND ${
          colorIds.length > 0 ? `color.id IN (${colorIds.join(',')})` : '0'
        } THEN 1
        WHEN ${
          colorIds.length > 0 ? `color.id IN (${colorIds.join(',')})` : '0'
        } THEN 2
        WHEN ${
          colorPids.length > 0
            ? `color_palette.id IN (${colorPids.join(',')})`
            : '0'
        } THEN 3
        ELSE 4 
    END AS sort_priority
    FROM product 
    JOIN brand ON product.brand_id = brand.id 
    JOIN product_sku ON product.id = product_sku.product_id 
    JOIN color ON product_sku.color_id = color.id 
    JOIN color_palette ON color.color_palette_id = color_palette.id 
    JOIN image ON product_sku.id = image.product_sku_id WHERE 1=1`
    if (colorPids.length > 0 || colorIds.length > 0) {
      sql += ` AND product.id IN (
        SELECT DISTINCT product.id FROM product
          JOIN product_sku ON product.id = product_sku.product_id
          JOIN color ON product_sku.color_id = color.id
          JOIN color_palette ON color.color_palette_id = color_palette.id
          WHERE 1=1 
          ${
            colorPids.length > 0
              ? `AND color_palette.id IN (${colorPids.join(',')})`
              : ''
          }
          ${
            colorIds.length > 0 ? `AND color.id IN (${colorIds.join(',')})` : ''
          }
      )`
    }
    if (nameLike) sql += ` AND product.name LIKE '%${nameLike}%'`
    if (brandIds.length > 0) sql += ` AND brand.id IN (${brandIds.join(', ')})`
    if (priceGte && priceLte)
      sql += ` AND product.price BETWEEN ${priceGte} AND ${priceLte}`
    sql += ` AND image.sort_order = 1`
    sql += ` ORDER BY sort_priority ASC, product.${sort} ${order}`

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

//brands
router.get('/brands', async (req, res) => {
  try {
    const sql = `SELECT * FROM brand`
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

//colors
router.get('/colors', async (req, res) => {
  try {
    const sql = `SELECT * FROM color`
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

//color palette
router.get('/colorpalette', async (req, res) => {
  try {
    const sql = `SELECT * FROM color_palette`
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

//得到比較產品的資料
// GET /api/products/comparison?products=
router.get('/comparison', async (req, res) => {
  const { products } = req.query
  const productsString = products.split(",")
  console.log(productsString)
  try {
    if (!products) throw new Error('請提供查詢字串')

    const sql = `SELECT product.*,
    brand.name AS brand_name, 
    product_sku.id AS product_sku_id, 
    product_sku.stock, 
    color.name AS color_name, 
    color.color_image, 
    image.image,
    spec.neck_pickup, spec.middle_pickup, spec.bridge_pickup, spec.controls, spec.switching
    FROM product
    JOIN brand ON product.brand_id = brand.id 
    JOIN product_sku ON product.id = product_sku.product_id 
    JOIN color ON product_sku.color_id = color.id 
    JOIN image ON product_sku.id = image.product_sku_id
    JOIN spec ON product.id = spec.product_id
    WHERE image.sort_order = 1
    AND product_sku.id IN (?)`

    const [rows] = await db.query(sql, [productsString])

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

//得到可能會喜歡的產品資料
// GET /api/products/maylike/:colorId
router.get('/maylike/:colorId', async (req, res) => {
  const { colorId } = req.params
  const colorIdNum = Number(colorId)
  console.log(colorIdNum)
  try {
    if (!colorId) throw new Error('請提供color id')

    const sql = `SELECT product.*,
    brand.name AS brand_name, 
    product_sku.id AS product_sku_id, 
    product_sku.stock, 
    color.name AS color_name, 
    color.color_image, 
    image.image
    FROM product
    JOIN brand ON product.brand_id = brand.id 
    JOIN product_sku ON product.id = product_sku.product_id 
    JOIN color ON product_sku.color_id = color.id 
    JOIN image ON product_sku.id = image.product_sku_id
    WHERE image.sort_order = 1
    AND color.id = ?
    LIMIT 8`

    const [rows] = await db.query(sql, [colorIdNum])

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

// 得到首頁主打產品資料
// GET /api/products/trending
router.get('/trending', async (req, res) => {
  const sql = `SELECT product.*, brand.name AS brand_name, product_sku.id AS product_sku_id, product_sku.stock, color.name AS color_name, color.color_image, color.id AS color_id ,image.image, image.sort_order
  FROM product 
  JOIN brand ON product.brand_id = brand.id 
  JOIN product_sku ON product.id = product_sku.product_id 
  JOIN color ON product_sku.color_id = color.id 
  JOIN image ON product_sku.id = image.product_sku_id 
  JOIN spec ON product.id = spec.product_id 
  WHERE image.sort_order = 1 AND product.discount_price IS NOT NULL
  ORDER BY product.id ASC;`
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

// 得到單筆資料
// GET /api/products/:pid/:fskuid
//for product detail page
router.get('/:pid/:firstSkuId', async (req, res) => {
  const { pid, firstSkuId } = req.params
  const sql = `SELECT product.*, brand.name AS brand_name, product_sku.id AS product_sku_id, product_sku.stock, color.name AS color_name, color.color_image, color.id AS color_id ,image.image, image.sort_order, spec.neck_pickup, spec.middle_pickup, spec.bridge_pickup, spec.controls, spec.switching FROM product JOIN brand ON product.brand_id = brand.id JOIN product_sku ON product.id = product_sku.product_id JOIN color ON product_sku.color_id = color.id JOIN image ON product_sku.id = image.product_sku_id JOIN spec ON product.id = spec.product_id WHERE product.id = ? ORDER BY CASE WHEN product_sku.id = ? THEN 0 ELSE 1 END, image.sort_order;`
  try {
    const [rows] = await db.query(sql, [pid, firstSkuId])
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



// GET /api/products/search?q=
// router.get('/search', async (req, res) => {
//   const { q } = req.query
//   console.log(req.query)
//   try {
//     if (!q) throw new Error('請提供查詢字串')

//     const sql =
//       'SELECT product.*, brand.name AS brand_name FROM product JOIN brand ON product.brand_id = brand.id WHERE product.name LIKE ? OR brand.name LIKE ?'
//     const searchQuery = `%${q}%`
//     const [rows] = await db.query(sql, [searchQuery, searchQuery])

//     res.status(200).json({
//       status: 'success',
//       data: rows,
//       message: `搜尋成功, 條件: ${q}`,
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({
//       status: 'error',
//       message: err.message ? err.message : '搜尋失敗',
//     })
//   }
// })

export default router
