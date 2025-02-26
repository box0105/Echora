import express from 'express'
import db from '../db3.js'
import bcrypt from 'bcrypt'
const router = express.Router()

router.post('/', async function (req, res) {
  const { email, otp, password } = req.body

  try {
    // 查詢資料庫中的 OTP
    const [otpRecord] = await db.query(
      'SELECT * FROM otp WHERE email = ? AND otp = ? AND expired_at > NOW()',
      [email, otp]
    )

    if (!otpRecord.length) {
      return res
        .status(400)
        .json({ status: 'error', message: '無效或過期的驗證碼' })
    }

    // 查詢資料庫中的用戶
    const [user] = await db.query('SELECT * FROM user WHERE email = ?', [email])

    if (!user.length) {
      return res.status(404).json({ status: 'error', message: '用戶不存在' })
    }

    // 哈希新密碼
    const hashedPassword = await bcrypt.hash(password, 10)

    // 更新用戶密碼
    await db.query('UPDATE user SET password = ? WHERE email = ?', [
      hashedPassword,
      email,
    ])

    // 刪除已使用的 OTP
    await db.query('DELETE FROM otp WHERE email = ?', [email])

    return res
      .status(200)
      .json({ status: 'success', message: '密碼已成功更新' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: 'error', message: '無法更新密碼' })
  }
})

export default router
