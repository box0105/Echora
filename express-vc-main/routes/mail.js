import express from 'express'
import db from '../db3.js'
const router = express.Router()

// 寄送email函式
import { sendOtpMail } from '../lib/mail.js'

router.post('/', async function (req, res) {
  const { email } = req.body

  try {
    // 查詢資料庫中的用戶
    const [user] = await db.query('SELECT * FROM user WHERE email = ?', [email])

    if (!user.length) {
      return res
        .status(404)
        .json({ status: 'error', message: '此email尚未註冊' })
    }

    // 檢查是否有未過期的 OTP
    const [existingOtp] = await db.query(
      'SELECT * FROM otp WHERE email = ? AND expired_at > NOW()',
      [email]
    )

    if (existingOtp.length > 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '有尚未過期的驗證碼，請稍後再試。' })
    }

    // 生成新的 OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // 保存 OTP 到資料庫
    await db.query(
      'INSERT INTO otp (email, otp, expired_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))',
      [email, otp]
    )

    // 寄送 OTP 信件
    await sendOtpMail(email, otp)

    return res.status(200).json({ status: 'success', data: null })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: 'error', message: '無法寄送email' })
  }
})

export default router
