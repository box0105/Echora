import express from 'express'
import db from '../config/mysql.js'

const router = express.Router()

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const [rows] =await db.query("SELECT * FROM product")
    res.status(200).json({
        status: "success",
        data: rows,
        message: "取得資料成功"
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message ? err.message : '取得資料失敗',
    })
  }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const [rows] =await db.query(`SELECT * FROM product WHERE id = ${pid}`);
        const row = rows[0];
        res.status(200).json({
            status: "success",
            data: row,
            message: "取得資料成功"
        })
      } catch (err) {
        console.log(err)
        res.status(400).json({
          status: 'error',
          message: err.message ? err.message : '取得資料失敗',
        })
      }
})

// GET /api/products/search
router.get('/search', async (req, res) => {
    res.json({
        status: "success",
        message: "連線成功"
    });
})

// *ask: "比較功能"怎麼設路由? 從productlist的網址上拿pid參數?

export default router
