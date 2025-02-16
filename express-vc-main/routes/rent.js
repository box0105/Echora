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
    let sql = 'SELECT * FROM `rent` WHERE 1=1 ' // 起始 SQL，1=1 保证 WHERE 子句始终有效
    const params = []
    const {
      nameLike,
      categoryIds,
      priceGte,
      priceLte,
      storesName,
      storesAddress,
      color,
      // ... 其他筛选条件
    } = req.query

    if (nameLike) {
      sql += 'AND `name` LIKE ? '
      params.push(`%${nameLike}%`)
    }

    if (categoryIds) {
      const ids = JSON.parse(categoryIds) // 解析 JSON 数组
      if (Array.isArray(ids) && ids.length > 0) {
        sql += 'AND `category_id` IN (?) ' // 使用 IN 查询
        params.push(ids)
      }
    }

    if (priceGte) {
      sql += 'AND `price` >= ? '
      params.push(priceGte)
    }

    if (priceLte) {
      sql += 'AND `price` <= ? '
      params.push(priceLte)
    }

    if (storesName) {
      sql +=
        'AND `stores_id` IN (SELECT `id` FROM `stores` WHERE `name` LIKE ?) ' // 子查询
      params.push(`%${storesName}%`)
    }

    if (storesAddress) {
      sql +=
        'AND `stores_id` IN (SELECT `id` FROM `stores` WHERE `address` LIKE ?) ' // 子查询
      params.push(`%${storesAddress}%`)
    }

    if (color) {
      sql +=
        'AND `rent_color_id` IN (SELECT `id` FROM `rent_color` WHERE `name` LIKE ?) ' // 子查询
      params.push(`%${color}%`)
    }

    // ... 其他筛选条件，类似 storesName 和 storesAddress

    const [rows] = await db.execute(sql, params)

    res.status(200).json({
      status: 'success',
      data: rows,
      message: '搜尋成功',
    })
  } catch (err) {
    console.error(err)
    errorResponse(res, err) // 使用 utils.js 中的错误处理函数
  }
})
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
