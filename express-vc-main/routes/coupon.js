import express from 'express'
import db from '../db3.js'

const router = express.Router();

import { successResponse, errorResponse } from '../lib/utils.js'

router.get("/",async (req,res)=>{
  try{
    const [rows] = await db.execute("SELECT * FROM `coupons`")
    res.status(200).json({
      status:'success',
      data:rows,
      message:'取得資料成功'
    })
  }catch(err){
    console.log(err);
  }
})

export default router