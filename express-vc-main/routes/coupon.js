import express from 'express'
import db from '../db3.js'

const router = express.Router();

import { successResponse, errorResponse } from '../lib/utils.js'

router.get("/",async (req,res)=>{
  try{
    const [rows] = await db.execute("SELECT * FROM `coupon`")
    res.status(200).json({
      status:'success',
      data:rows,
      message:'取得資料成功'
    })
  }catch(err){
    console.log(err);
  }
})

// user的優惠券
router.get('/users/:userId/coupons', async (res,req)=>{
 const userId = Number(req.params.userId)
 const [results] = await db.query(`SELECT coupons FROM users WHERE id = ${userId}`)
 const result = results[0]
 res.json({status:'success',data:{result}})
})
// user取得優惠券
router.post('/users/userId/coupons', (res,req)=>{
  
})
// user刪除優惠券
router.get('/users/userId/coupons', (res,req)=>{
  
})
// 使用優惠券
router.get('/users/userId/coupons', (res,req)=>{
  
})

export default router