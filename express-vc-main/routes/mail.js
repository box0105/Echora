import express from 'express'
const router = express.Router()

// 寄送email函式
import { sendOtpMail } from '../lib/mail.js'

router.post('/', async function (req, res) {
  // 寄送email
  try {
    // 寄送otp信件(注意這個操作會耗時)
    // 如果要使用ethereal收信測試: https://ethereal.email/login
    // user: 'mittie.daniel91@ethereal.email',pass: 'b6en9s7EqjP9EPVKkd'
    // 使用gmail前要先設定應用程式密碼，並在server.config.js中設定好
    await sendOtpMail('hsuabby2@gmail.com', '123456', 'xxxyyy123')

    return res.status(200).json({ status: 'success', data: null })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: 'error', message: '無法寄送email' })
  }
})

export default router
