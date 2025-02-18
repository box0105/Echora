import express from 'express'
import db from '../db3.js'

const router = express.Router()

import { successResponse, errorResponse } from '../lib/utils.js'

//router prefix: /api/rent
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM `rent`')
    res.status(200).json({
      status: 'success',
      data: rows,
      message: '取得資料成功',
    })
  } catch (error) {
    errorResponse(res, error)
  }
})
// 修改后的 /api/rent/search 路由
router.get('/search', async (req, res) => {
  try {
    // SQL 查询语句
    let sql = `
    SELECT 
      rent.id, 
      rent.name AS rent_name, 
      rent.price, 
      stores.name AS store_name, 
      stores.address,
      rentBrand.name AS brand_name,
      rentColor.name AS color_name,
      rentItemColor.stock AS color_stock
    FROM rent
    JOIN stores ON rent.stores_id = stores.id
    JOIN rentBrand ON rent.rentBrandId = rentBrand.id
    JOIN rentItemColor ON rent.id = rentItemColor.rentId
    JOIN rentColor ON rentItemColor.rentColorId = rentColor.id
    WHERE 1=1
  `

    const params = []

    // 只在有值时才添加查询条件
    if (req.query.rentName && req.query.rentName !== '') {
      sql += ` AND rent.name LIKE ?`
      params.push(`%${req.query.rentName}%`)
    }

    if (req.query.storeName && req.query.storeName !== '') {
      sql += ` AND stores.name LIKE ?`
      params.push(`%${req.query.storeName}%`)
    }

    if (req.query.brandName && req.query.brandName !== '') {
      sql += ` AND rentBrand.name LIKE ?`
      params.push(`%${req.query.brandName}%`)
    }

    if (req.query.colorName && req.query.colorName !== '') {
      sql += ` AND rentColor.name LIKE ?`
      params.push(`%${req.query.colorName}%`)
    }

    if (req.query.storeAddress && req.query.storeAddress !== '') {
      sql += ` AND stores.address LIKE ?`
      params.push(`%${req.query.storeAddress}%`)
    }

    // 只在价格范围有输入时才添加条件
    if (req.query.priceMin && req.query.priceMax) {
      sql += ` AND rent.price BETWEEN ? AND ?`
      params.push(req.query.priceMin, req.query.priceMax)
    }

    // 调试输出
    console.log('SQL:', sql)
    console.log('Params:', params)

    // 执行查询
    const [rows] = await db.execute(sql, params)

    console.log('SQL:', sql)
    console.log('Params:', params)
    res.status(200).json({ status: 'success', data: rows, message: '搜尋成功' })
  } catch (err) {
    console.error('錯誤:', err)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// router.get('/search', async (req, res) => {
//   const { q } = req.query
//   console.log(req.query)
//   try {
//     if (!q) throw new Error('請提供查詢字串')

//     let sql = `
//       SELECT rent.id, rent.name AS rent_name, rent.price, stores.name AS store_name, stores.address
//       FROM rent
//       JOIN stores ON rent.stores_id = stores.id
//       WHERE rent.name LIKE ? OR stores.name LIKE ?
//     `
//     const searchQuery = `%${q}%`

//     const [rows] = await db.execute(sql, [searchQuery, searchQuery])
//     res.status(200).json({ status: 'success', data: rows, message: '搜尋成功' })
//   } catch (err) {
//     console.error('錯誤:', err)
//     res.status(500).json({ status: 'error', message: '伺服器錯誤' })
//   }
// })
// router prefix: /api/rent/:pid
router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  try {
    const [rows] = await db.query(`SELECT * FROM rent WHERE id = ${pid}`)
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

export default router
