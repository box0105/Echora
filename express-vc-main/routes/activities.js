import express from 'express'
import db from '../config/mysql.js'

const router = express.Router();

import { successResponse, errorResponse } from '../lib/utils.js'

/* router prefix: /api/activities */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM `activity`");
    res.status(200).json({
      statu: "success",
      data: rows,
      message: "取得資料成功",
    });
  } catch (error) {
    errorResponse(res, error);
  }
});

export default router
