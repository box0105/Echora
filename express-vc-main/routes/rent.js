import express from 'express'
import db from '../db3.js'

const router = express.Router()

import { successResponse, errorResponse } from '../lib/utils.js'

//router prefix: /api/rent
// router.get('/', async (req, res) => {
//   try {
//     const [rows] = await db.execute('SELECT * FROM `rent`')
//     res.status(200).json({
//       status: 'success',
//       data: rows,
//       message: '取得資料成功',
//     })
//   } catch (error) {
//     errorResponse(res, error)
//   }
// })
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        rent.*, 
        rentColor.name AS colorName, 
        rentItemColor.stock AS stock
      FROM rent
      LEFT JOIN rentItemColor ON rent.id = rentItemColor.rentId
      LEFT JOIN rentColor ON rentItemColor.rentColorId = rentColor.id
    `)

    // 格式化查詢結果，將顏色和庫存資訊合併到 rentitemColors 陣列中
    const formattedData = rows.reduce((acc, row) => {
      let existingRent = acc.find((item) => item.id === row.id)
      if (existingRent) {
        existingRent.rentitemColors.push({
          colorName: row.colorName,
          stock: row.stock,
        })
      } else {
        acc.push({
          ...row,
          rentitemColors: row.colorName
            ? [{ colorName: row.colorName, stock: row.stock }]
            : [],
        })
      }
      return acc
    }, [])

    res.status(200).json({
      status: 'success',
      data: formattedData,
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
        rentItemColor.stock AS color_stock,
        rentImges.image AS image_url
      FROM rent
      JOIN stores ON rent.stores_id = stores.id
      JOIN rentBrand ON rent.rentBrandId = rentBrand.id
      JOIN rentItemColor ON rent.id = rentItemColor.rentId
      JOIN rentColor ON rentItemColor.rentColorId = rentColor.id
      JOIN rentImges ON rent.id = rentImges.rentId
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

    // 格式化查询结果
    const formattedRows = rows.reduce((acc, row) => {
      const existingRent = acc.find((rent) => rent.id === row.id)

      if (existingRent) {
        // 檢查如果顏色已經存在，不要重複新增
        if (
          !existingRent.rentitemColors.some(
            (color) => color.colorName === row.color_name
          )
        ) {
          existingRent.rentitemColors.push({
            colorName: row.color_name,
            stock: row.color_stock,
          })
        }
        // 檢查如果圖片已經存在，不要重複新增
        if (
          !existingRent.images.some(
            (image) => image.image_url === row.image_url
          )
        ) {
          existingRent.images.push({
            image_url: row.image_url,
          })
        }
      } else {
        acc.push({
          id: row.id,
          name: row.rent_name, // 修改為前端使用的 name
          price: row.price,
          store_name: row.store_name,
          address: row.address,
          brand_name: row.brand_name,
          rentitemColors: [
            {
              colorName: row.color_name,
              stock: row.color_stock,
            },
          ],
          images: [
            {
              image_url: row.image_url,
            },
          ],
        })
      }
      return acc
    }, [])
    console.log('格式化後的資料:', JSON.stringify(formattedRows, null, 2))
    res.status(200).json({
      status: 'success',
      data: formattedRows,
      message: '搜尋成功',
    })
  } catch (err) {
    console.error('錯誤:', err)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})
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
