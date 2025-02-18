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
    let sql = `
      SELECT rent.*, stores.*
      FROM rent
      JOIN stores ON rent.stores_id = stores.id
      WHERE 1=1
    `
    const [rows] = await db.execute(sql, )
    res.status(200).json({ status: 'success', data: rows, message: '搜尋成功' })
  } catch (err) {
    console.error('錯誤:', err)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
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
