import express from 'express'
import db from '../db3.js'

const router = express.Router()

import { successResponse, errorResponse } from '../lib/utils.js'

router.use(express.json())

// 測試取得所有優惠券
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
router.get('/:userId', async (req, res) => {
  const userId = Number(req.params.userId)
  // const user = await db.query(`SELECT user FROM user WHERE id = ${userId}`)
  // if (!user) throw new Error('請先登入!') 不確定是否要驗證

  const [results] = await db.query(
    `SELECT * FROM usercoupons WHERE userId = ${userId}`
  )
  const result = results[0]
  const message = results.length > 0 ? '擁有的優惠券' : '目前未擁有優惠券'

  try {
    res.json({ status: 'success', data: { result }, message: message })

  } catch (err) {
    console.log(err);
    res.json({ status: 'fail', message: "有錯誤" })
  }
})

// user取得優惠券
router.post('/:userId/:couponId', async (req, res) => {
  // const {userId} = req.params; 如果ID有在路徑 可以用此
  const userId = Number(req.params.userId)
  // const { couponId } = req.body //送來的資料要包含ID
  // const couponId = Number(req.params.couponId)

  // 請求主體的資料會儲存在 req.body 物件中
  const data = req.body;
  const { couponId } = data
  console.log(couponId);
  // console.log(Array.isArray(couponId));


  try {
    // 驗證使用者是否存在
    const [row] = await db.query(`SELECT * FROM user WHERE id = ?`, [userId])
    const user = row[0]
    if (!user) throw new Error('請先登入!')
    // console.log(user);

    // 驗證優惠券是否存在且有效
    const [ticket] = await db.query(`SELECT * FROM coupon WHERE id IN (?)`, [couponId])
    const coupon = ticket[0];
    if (!coupon || coupon == null) throw new Error('此優惠券已經無法領取!')

    // 驗證已擁有
    const [results] = await db.query(
      'SELECT * FROM UserCoupons WHERE userId = ? AND couponId IN (?)',
      [userId, couponId]
    )
    if (results.length > 0) throw new Error('您已經領取過此優惠券!')

    // 需要user_coupons資料表
    if (Array.isArray(couponId)) {
      console.log('陣列');
      couponId.forEach(async (id) => {
        const sql = `INSERT INTO usercoupons (userId,couponId,claimed,isDelete) VALUES (?,?,?,?)`
        const values = [userId, id, true, false]
        await db.query(sql, values)
      })
    } else {
      console.log('不是陣列');
      const sql =
        `INSERT INTO usercoupons (userId,couponId,claimed,isDelete) VALUES (?,?,?,?)`
      const values = [userId, couponId, true, false]
      await db.query(sql, values)
    }


    // 更新優惠券的 usersClaimed 數量(如有需要)
    //  await coupon.update({ usersClaimed: coupon.usersClaimed + 1 });

    res.status(200).json({ status: 'success', message: '優惠券已成功添加到您的帳戶' })

  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 'fail', message: err.message })
  }
})

// user刪除優惠券
router.delete('/:userId/:couponId', async (req, res) => {
  const couponId = req.params.couponId
  const userId = req.params.userId

  try {
    // const deletecoupon = await db.query("DELETE FROM usercoupons WHERE userId = ? AND couponId = ?",
    //   [userId, couponId])
    res.status(200).json({ status: 'success', message: '刪除成功!' })
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', message: '刪除失敗!' })
  }
})

// 使用優惠券
router.put('/:userId/:couponId', async (req, res) => {
  // 更新使用者已使用優惠券的狀態
  //await db.query(UPDATE user_coupons SET isDelete = 1 WHERE user_id = 'user_id' AND coupon_id = 'coupon_id')
  const { cartItem } = req.body
  const couponId = req.params.couponId
  const userId = req.params.userId


  try {
    // if (!cartItem) throw new Error("沒有可以使用優惠券的商品!")

    const usedcoupon = await db.query(`UPDATE usercoupons SET isDelete = 1 , claimed = 0 WHERE userId = ? AND couponId = ?`, [userId, couponId])
    console.log(usedcoupon);
    res.status(200).json({ status: 'success', message: '折扣完成' })
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', message: err.message })
  }
})
// 復原(測試環境)
router.put('/re/:userId/:couponId', async (req, res) => {
  const couponId = req.params.couponId
  const userId = req.params.userId
  try {
    const re = await db.query(`UPDATE usercoupons SET isDelete = 0 , claimed = 1 WHERE userId = ? AND couponId = ?`, [userId, couponId])

    res.status(200).json({ status: 'success', message: '復原成功' })
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', message: '復原失敗' })
  }

})

router.post('/resource', (req, res) => {

  // 請求主體的資料會儲存在 req.body 物件中
  const data = req.body;
  const { couponId } = data
  console.log(couponId);
  // console.log(Array.isArray(couponId));
  if (Array.isArray(couponId)) {
    console.log('陣列');
    return
  }
  console.log(data); // { key1: 'value1', key2: 'value2' }
  res.status(200).json({ status: 'success', message: '測試成功' })
});


export default router
