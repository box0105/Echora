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
// router prefix: /api/rent/search
router.get("/search",async (req, res) => {
  const {q} = req.query;
  try{
    if(!q)throw new Error("沒有搜尋參數");

    const sql = "SELECT * FROM `rent` WHERE `name` LIKE ?";

    const [rows] = await db.execute(sql, [`${q}%`]);

  res.status(200).json({
    status: "success",
    data: rows,
    message: `搜尋成功, 條件${q}`
  })
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err.message?err.message:"搜尋失敗"
    })
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
