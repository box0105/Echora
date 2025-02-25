import express from 'express'
import db from '../config/mysql.js'

const router = express.Router()

//取得會員的收藏商品id
router.get('/:uid', async (req, res) => {
  const {uid} = req.params
  try {
    const sql = `SELECT favorite.product_id FROM favorite WHERE favorite.user_id = ?`
    const [rows] = await db.query(sql, [uid])
    const favoriteIds = rows.map((v)=>v.product_id)
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
router.put('/:uid/:pid', async (req, res) => {
  const {pid, uid} = req.params
  try {
    const sql = `INSERT INTO favorite (user_id, product_id) VALUES (?, ?)`
    await db.query(sql, [uid, pid])
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
router.delete('/:uid/:pid', async (req, res) => {
    const {pid, uid} = req.params
  try {
    const sql = `DELETE FROM favorite WHERE user_id = ? AND product_id = ?`
    await db.query(sql, [uid, pid])
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
