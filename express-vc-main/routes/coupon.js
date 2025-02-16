import express from 'express'
import db from '../db3.js'

const router = express.Router()

import { successResponse, errorResponse } from '../lib/utils.js'

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM `coupon`')
    res.status(200).json({
      status: 'success',
      data: rows,
      message: '取得資料成功',
    })
  } catch (err) {
    console.log(err)
  }
})

// user的優惠券
router.get('/users/:userId/coupons', async (res, req) => {
  const userId = Number(req.params.userId)
  const [results] = await db.query(
    `SELECT coupons FROM users WHERE id = ${userId}`
  )
  const result = results[0]
  res.json({ status: 'success', data: { result } })
})

// user取得優惠券
router.post('/users/userId/coupons', async (res, req) => {
  // const {userId} = req.params; 如果ID有在路徑 可以用此
  const userId = Number(req.params.userId)
  const { couponId } = req.body //送來的資料要包含ID

  try {
    // 驗證使用者是否存在
    const user = await db.query(`SELECT user FROM users WHERE id = ${userId}`)
    if (!user) throw new Error('請先登入!')

    // 驗證優惠券是否存在且有效
    const coupon = await db.query(`SELECT * FROM coupon WHERE id = ${couponId}`)
    if (!coupon) throw new Error('此優惠券已經無法領取!')

    const [results] = await db.query(
      `SELECT coupons FROM users WHERE id = ${userId}`
    )
    const found = results.findIndex((v) => (v.id = couponId))
    if (found || found != null) throw new Error('您已經領取過此優惠券!')

    // 需要user_coupons資料表
    const getCoupon = await db.query(
      `INSERT INTO user_coupons (id,name,code,discountTypeId,minPurchase,description,startTime,endTime,isDelete) VALUES (?,?,?,?,?,?,?,?,?)`
    )
    // 更新優惠券的 usersClaimed 數量(如有需要)
    //  await coupon.update({ usersClaimed: coupon.usersClaimed + 1 });
    // 更新使用者已使用優惠券的狀態
    //await db.query(UPDATE user_coupons SET isDelete = 1 WHERE user_id = 'user_id' AND coupon_id = 'coupon_id')

    res
      .status(200)
      .josn({ status: 'success', message: '優惠券已成功添加到您的帳戶' })

  } catch (err) {
    console.log(err)
  }
})
// user刪除優惠券
router.get('/users/userId/coupons', (res, req) => {})
// 使用優惠券
router.get('/users/userId/coupons', (res, req) => {})

export default router
