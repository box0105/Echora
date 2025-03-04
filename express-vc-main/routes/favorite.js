import express from 'express'
import db from '../config/mysql.js'

const router = express.Router()

//取得會員的收藏商品清單
router.get('/list/:uid', async (req, res) => {
  const {uid} = req.params
  try {
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
    JOIN color_palette ON color.color_palette_id = color_palette.id 
    JOIN image ON product_sku.id = image.product_sku_id
    JOIN favorite ON favorite.product_sku_id = product_sku.id AND favorite.user_id = ?
    WHERE image.sort_order = 1
    ORDER BY product.id ASC`
    const [rows] = await db.query(sql, [uid])
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

//取得會員的收藏商品sku_id
router.get('/:uid', async (req, res) => {
  const {uid} = req.params
  try {
    const sql = `SELECT favorite.product_sku_id FROM favorite WHERE favorite.user_id = ?`
    const [rows] = await db.query(sql, [uid])
    const favoriteIds = rows.map((v)=>v.product_sku_id)
    res.status(200).json({
      status: 'success',
      data: favoriteIds,
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

//加入收藏
router.put('/:uid/:skuid', async (req, res) => {
  const {uid, skuid} = req.params
  try {
    const sql = `INSERT INTO favorite (user_id, product_sku_id) VALUES (?, ?)`
    await db.query(sql, [uid, skuid])
    res.status(200).json({
      status: 'success',
      message: '新增成功',
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message ? err.message : '新增失敗',
    })
  }
})

//取消收藏
router.delete('/:uid/:skuid', async (req, res) => {
    const {uid, skuid} = req.params
  try {
    const sql = `DELETE FROM favorite WHERE user_id = ? AND product_sku_id = ?`
    await db.query(sql, [uid, skuid])
    res.status(200).json({
      status: 'success',
      message: '刪除成功',
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message ? err.message : '刪除失敗',
    })
  }
})

export default router
