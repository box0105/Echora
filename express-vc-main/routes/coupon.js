import express from 'express'
import db from '../db3.js'
import { successResponse, errorResponse } from '../lib/utils.js'

const router = express.Router()

// 生成客戶端函式庫
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


router.use(express.json())

// 取得所有優惠券
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

//管理員登入
router.get('/admin/login', async (req, res) => {
  // 只有經過驗證的管理員才能訪問這個路由
  res.json({ message: '歡迎來到後台' });
})

// 管理員新增優惠券
router.post('/admin', async (req, res) => {

  // 請求主體的資料會儲存在 req.body 物件中
  const data = req.body
  const { id, name, code, typeId, discount, startTime, endTime, isDelete } = data
  console.log(id)
  console.log(name)
  console.log(code)
  console.log(typeId)
  console.log(discount)
  console.log(startTime)
  console.log(endTime)
  console.log(isDelete)
  // console.log(Array.isArray(couponId))
  try {
    const sql = `INSERT INTO coupon (id,name,code,typeId,discount,startTime,endTime,isDelete) VALUES (?,?,?,?,?,?,?,?)`
    const values = [id, name, code, typeId, discount, startTime, endTime, isDelete]
    await db.query(sql, values)
    res
      .status(200)
      .json({ status: 'success', message: '優惠券已成功添加' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'fail', message: err.message })
  }
})

// 管理員修改優惠券
router.put('/admin', async (req, res) => {
  const data = req.body
  const { id, name, code, typeId, discount, startTime, endTime, isDelete } = data
  console.log(data);

  try {
    const editCoupon = await db.query(
      'UPDATE coupon SET name = ?, code = ?, typeId = ?, discount = ?, startTime = ?, endTime = ?, isDelete = ? WHERE id = ?',
      [name, code, typeId, discount, startTime, endTime, isDelete, id]
    )
    console.log(editCoupon)
    res.status(200).json({ status: 'success', message: '修改成功' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 'fail', message: err.message })
  }
})

// 管理員刪除優惠券
router.delete('/admin', async (req, res) => {
  const data = req.body
  const { id } = data
  const [rows] = await db.query(`SELECT * FROM coupon WHERE id = ?`, [id])
  console.log(rows);

  try {
    const sql = 'DELETE FROM coupon WHERE id = ?'
    const values = [id]
    await db.query(sql, values)

    res.status(200).json({ status: 'success', message: '刪除成功!' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 'fail', message: '刪除失敗!' })
  }
})

// user的優惠券
router.get('/:userId', async (req, res) => {
  const userId = Number(req.params.userId)
  // if (!userId) throw new Error('請先登入!') //不確定是否要驗證
  if (!userId) {
    const message = '請先登入會員'
    res.status(200).json({ status: 'sign', data: [], message: message })
    return
  }
  const user = await db.query(`SELECT username FROM user WHERE id = ${userId}`)
  console.log(user);
  const [rows] = await db.query(
    `SELECT * FROM usercoupons WHERE userId = ${userId}`
  )

  console.log(rows)
  const message = rows.length > 0 ? '擁有的優惠券' : '目前未擁有優惠券'

  try {
    // 1. 使用 Prisma 查詢
    const datas = await prisma.userCoupons.findMany({
      where: {
        userId: userId,
      },
      include: {
        // user: true, 有需要才回傳使用者的資料 較敏感
        coupon: true,
      },
    })

    // 2. 轉換資料結構
    const userCheckCoupons = datas.map((data) => ({
      userId: userId,
      couponId: data.couponId,
      claimed: data.claimed,
      isDeleted: data.isDelete,
      name: data.coupon.name,
      code: data.coupon.code,
      typeId: data.coupon.typeId,
      discount: data.coupon.discount,
      minPurchase: data.coupon.minPurchase,
      description: data.coupon.description,
      startTime: data.coupon.startTime,
      endTime: data.coupon.endTime,
    }))
    console.log(userCheckCoupons);

    res.json({
      status: 'success',
      data: rows,
      userCheckCoupons: userCheckCoupons,
      message: message,
    })
  } catch (err) {
    console.log(err)
    res.json({ status: 'fail', message: err.message })
  }
})

// user取得單張優惠券
router.post('/:userId', async (req, res) => {
  // const {userId} = req.params; 如果ID有在路徑 可以用此
  const userId = Number(req.params.userId)
  // const typeId = Number(req.params.typeId)
  // const { couponId } = req.body //送來的資料要包含ID
  // const couponId = Number(req.params.couponId)

  // 請求主體的資料會儲存在 req.body 物件中
  const data = req.body
  const { couponId } = data
  const { typeId } = data
  console.log(couponId)
  console.log(typeId)
  console.log(Array.isArray(couponId))

  try {
    // 驗證使用者是否存在
    if (!userId) {
      res.status(200).json({ status: 'sign', data: [], message: '請先登入' })
      return
    }

    const [row] = await db.query(`SELECT * FROM user WHERE id = ?`, [userId])
    const user = row[0]
    // console.log(user);

    // 驗證優惠券是否存在且有效
    const [ticket] = await db.query(`SELECT * FROM coupon WHERE id = ?`, [
      couponId,
    ])
    const coupon = ticket[0]
    if (!coupon || coupon == null) throw new Error('此優惠券已經無法領取!')

    // 驗證已擁有
    const [results] = await db.query(
      'SELECT * FROM userCoupons WHERE userId = ? AND couponId = ?',
      [userId, couponId]
    )
    if (results.length > 0) throw new Error('您已經領取過此優惠券!')

    // 需要user_coupons資料表
    if (Array.isArray(couponId)) {
      console.log('陣列')
      couponId.forEach(async (id) => {
        const [row] = await db.query(`SELECT typeId FROM coupon WHERE id = ?`, [
          id,
        ])
        const typeId = row[0]
        console.log(typeId)
        const sql = `INSERT INTO usercoupons (userId,couponId,couponTypeId,claimed,isDelete) VALUES (?,?,?,?,?)`
        const values = [userId, id, typeId, true, false]
        await db.query(sql, values)
      })
    } else {
      console.log('不是陣列')
      const sql = `INSERT INTO usercoupons (userId,couponId,couponTypeId,claimed,isDelete) VALUES (?,?,?,?,?)`
      const values = [userId, couponId, typeId, true, false]
      await db.query(sql, values)
    }

    // 更新優惠券的 usersClaimed 數量(如有需要)
    //  await coupon.update({ usersClaimed: coupon.usersClaimed + 1 });

    res
      .status(200)
      .json({ status: 'success', message: '優惠券已成功添加到您的帳戶' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'fail', message: err.message })
  }
})
// user取得所有優惠券
router.post('/:userId/all', async (req, res) => {
  const userId = Number(req.params.userId)
  // console.log(userId);
  const [A] = await db.query(`SELECT * FROM coupon WHERE isDelete = ? `, [false])
  const [B] = await db.query(`SELECT * FROM usercoupons WHERE claimed = ? AND userId = ?`, [true, userId])
  // console.log(A);
  // console.log(B);

  // 自訂比較函數，判斷兩個物件是否重複 (根據 id 判斷)
  function areObjectsEqual(obj1, obj2) {
    return obj1.id === obj2.couponId // 修改此處以符合您的比較邏輯
  }

  const newA = A.filter(
    (objA) => !B.some((objB) => areObjectsEqual(objA, objB))
  )
  console.log(newA)

  try {
    // 驗證使用者是否存在
    if (!userId) throw new Error('請先登入!')

    const [row] = await db.query(`SELECT * FROM user WHERE id = ?`, [userId])
    const user = row[0]
    console.log(user);

    //驗證已領取
    if (newA.length == 0) throw new Error('您已經全部領取了!')

    newA.forEach(async (item) => {
      const sql = 'INSERT INTO usercoupons (userId,couponId,couponTypeId,claimed,isDelete) VALUES (?,?,?,?,?)'
      const values = [userId, item.id, item.typeId, true, false]
      await db.query(sql, values)
    })

    res
      .status(200)
      .json({ status: 'success', message: '優惠券已成功添加到您的帳戶' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'fail', message: err.message })
  }
})

// user刪除優惠券
router.delete('/', async (req, res) => {
  const userId = req.body.userId
  const [rows] = await db.query(`SELECT * FROM usercoupons WHERE userId = ? AND isDelete = ?`, [userId, true])
  // console.log(rows);

  try {
    rows.forEach(async (item) => {
      const sql = 'DELETE FROM usercoupons WHERE userId = ? AND isDelete = ?'
      const values = [item.userId, true]
      await db.query(sql, values)
    })

    res.status(200).json({ status: 'success', message: '刪除成功!' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 'fail', message: '刪除失敗!' })
  }
})

// 使用優惠券
router.put('/', async (req, res) => {
  // 更新使用者已使用優惠券的狀態
  //await db.query(UPDATE user_coupons SET isDelete = 1 WHERE user_id = 'user_id' AND coupon_id = 'coupon_id')
  // const { cartItem } = req.body
  const couponId = req.body.couponId
  const userId = req.body.userId
  console.log(couponId);
  console.log(userId);

  try {
    // if (!cartItem) throw new Error("沒有可以使用優惠券的商品!")

    const usedcoupon = await db.query(
      `UPDATE usercoupons SET isDelete = 1 , claimed = 0 WHERE userId = ? AND couponId = ?`,
      [userId, couponId]
    )
    console.log(usedcoupon)
    res.status(200).json({ status: 'success', message: '折扣完成' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 'fail', message: err.message })
  }
})
// 復原(測試環境)
router.put('/re/:userId/:couponId', async (req, res) => {
  const couponId = req.params.couponId
  const userId = req.params.userId
  try {
    const re = await db.query(
      `UPDATE usercoupons SET isDelete = 0 , claimed = 1 WHERE userId = ? AND couponId = ?`,
      [userId, couponId]
    )

    res.status(200).json({ status: 'success', message: '復原成功' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 'fail', message: '復原失敗' })
  }
})

// router.post('/resource', (req, res) => {
//   // 請求主體的資料會儲存在 req.body 物件中
//   const data = req.body
//   const { couponId } = data
//   console.log(couponId)
//   // console.log(Array.isArray(couponId));
//   if (Array.isArray(couponId)) {
//     console.log('陣列')
//     return
//   }
//   console.log(data) // { key1: 'value1', key2: 'value2' }
//   res.status(200).json({ status: 'success', message: '測試成功' })
// })

export default router
