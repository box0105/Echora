import express from 'express'
const router = express.Router()
import * as crypto from 'crypto'
// 用來產生JWT token的函式
import jsonwebtoken from 'jsonwebtoken'
// 用來處理FormData的中介軟體
import multer from 'multer'
// `upload.none()`可用來處理沒有檔案上傳時，要獲取FormData的資料
const upload = multer()
// 中介軟體，存取隱私會員資料用
import authenticate from '../middlewares/authenticate.js'

import { generateToken } from '../lib/otp.js'

// 導入服務層的函式
import {
  login,
  createOtp,
  verifyOtp,
  hasUnexpiredOtpByEmail,
  resetPassword,
} from '../services/auth.js'
import {
  getUserById,
  getUserFavorites,
  getUserByField,
  createUser,
  updateUserDataByField,
} from '../services/user.js'
// 寄送email函式
import { sendOtpMail } from '../lib/mail.js'
// 導入回應函式
import { successResponse, errorResponse, isDev } from '../lib/utils.js'

// 設定環境變數
import { serverConfig } from '../config/server.config.js'

// 取得安全的私鑰字串
const accessTokenSecret = serverConfig.jwt.secret
// otp 用
const otpExpire = serverConfig.otp.expire

// 登入主機共用，產生JWT存取令牌(access token)
// 需要準備登入完成放在最後一行，例如: `await generateAccessToken(res, user)`
const generateAccessToken = async (res, user) => {
  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jsonwebtoken.sign(user, accessTokenSecret, {
    expiresIn: '3d', // 有效期限3天
  })

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  // 如果是正式環境，sameSite: 'none' 要設定secure: true，表示只有https連線才會傳送cookie
  const option = isDev
    ? { httpOnly: true }
    : {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        domain: serverConfig.domain,
      }

  // 設定cookie
  res.cookie('accessToken', accessToken, option)

  // 取得會員id
  const userId = user.id
  // 取得會員所有資料，包含profile
  const allUserData = await getUserById(userId)
  // 取得會員收藏清單
  const favorites = await getUserFavorites(userId)

  // 傳送access token回應(例如react可以儲存在state中使用)
  successResponse(res, { user: allUserData, favorites })
}

const logoutClearCookie = (res) => {
  // 如果是正式環境，sameSite: 'none' 要設定secure: true，表示只有https連線才會傳送cookie，也需要domain
  const option = isDev
    ? { httpOnly: true }
    : {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        domain: serverConfig.domain,
      }

  // 清除cookie，登入用的accessToken
  res.clearCookie('accessToken', option)
  // 清除cookie，一般的SESSION_ID
  res.clearCookie('SESSION_ID', option)
}

// 檢查登入狀態用(GET)
router.get('/check', authenticate, async (req, res) => {
  // 取得使用者id，從req.user.id取得(透過JWT解碼)
  const userId = req.user.id

  try {
    // 取得會員所有資料，包含profile
    const user = await getUserById(userId)
    // 取得會員收藏清單
    const favorites = await getUserFavorites(userId)
    successResponse(res, { user, favorites })
  } catch (error) {
    errorResponse(res, error)
  }
})

// 本地端伺服器登入用
router.post('/login', upload.none(), async (req, res) => {
  // 如果是開發環境，顯示訊息
  if (isDev) console.log(req.body)

  try {
    // 需要加上await等待取得資料
    // user是會員資料，不包含profile
    const user = await login(req.body)

    // 產生存取令牌(access token)，其中包含會員資料，會回應到前端
    await generateAccessToken(res, user)
  } catch (error) {
    errorResponse(res, error)
  }
})

router.post('/google-login', async function (req, res) {
  // 如果是開發環境，顯示訊息
  if (isDev) console.log(req.body)

  const { providerId, displayName, email, uid, photoURL } = req.body

  // 檢查從react來的資料
  if (!providerId || !uid) {
    return errorResponse(res, { message: '缺少google登入資料' })
  }

  const googleUid = uid

  try {
    // 查詢資料庫是否有同email的會員資料
    // const emailUser = await getUserByEmail(email)
    const emailUser = await getUserByField({ email })

    // 查詢資料庫是否有同googleUid的資料
    // const googleUidUser = await getUserByGoogleUid(googleUid)
    const googleUidUser = await getUserByField({ googleUid })

    // 最後要加到JWT的會員資料
    let user = null

    // 特殊流程: google登入時查詢到已經有同樣gmail的資料，這時要先進行更新(連結)後再登入
    // 有emailUser，但沒有googleUidUser  ==> 進行更新googleUid ==> 登入
    if (!googleUidUser && emailUser) {
      // user = await updateUserGoogleUidByEmail(email, googleUid)
      user = await updateUserDataByField({ email }, { googleUid })
    }

    // 兩者都有存在(代表是有已存在的會員) -> 登入
    if (googleUidUser && emailUser) {
      user = googleUidUser
    }

    // 兩者都不存在 -> 建立一個新會員資料(無帳號與密碼) -> 登入
    if (!googleUidUser && !emailUser) {
      const newUser = {
        // 用googleUid當帳號(因為帳號是必要的，這裡不會用到)
        username: String(googleUid),
        name: displayName,
        // 用亂數產生密碼(因為密碼是必要的，這裡不會用到)，長度20
        password: crypto.randomBytes(10).toString('hex'),
        email: email,
        googleUid,
        avatar: photoURL,
      }

      // 新增會員資料
      user = await createUser(newUser)
    }

    if (isDev) console.log('user', user)

    // 產生存取令牌(access token)，其中包含會員資料，會回應到前端
    await generateAccessToken(res, user)
  } catch (error) {
    errorResponse(res, error)
  }
})

// 本地端伺服器登出用
router.post('/logout', authenticate, async (req, res) => {
  // 清除cookie
  logoutClearCookie(res)

  // 回應，不回傳資料
  successResponse(res)
})

// #region ------------ 以下為OTP路由 ------------
// 產生一筆otp
router.post('/otp', upload.none(), async (req, res) => {
  const { email } = req.body

  if (!email) {
    return errorResponse(res, { message: '缺少必要資料' })
  }

  try {
    // 檢查此email是否存在
    const user = await getUserByField({ email })

    if (!user) {
      return errorResponse(res, { message: '使用者不存在' })
    }

    // 檢查是否有未過期的otp
    const hasUnexpiredOtp = await hasUnexpiredOtpByEmail(email)

    if (hasUnexpiredOtp) {
      return errorResponse(res, { message: '有尚未過期的otp，請稍後再試。' })
    }

    // 產生一筆新的totp
    const newOtp = generateToken(email)
    // 30 秒後會重新改變
    const second =
      newOtp.totp.period - (Math.floor(Date.now() / 1000) % newOtp.totp.period)

    // 預設 5 分鐘過期(5 * 60 * 1000)
    const exp = Date.now() + otpExpire
    // otp token
    const token = newOtp.token

    // 產生一個隨機hash
    const hash = crypto.randomBytes(10).toString('hex')
    // 過期時間(日期物件)
    const expiredAt = new Date(exp)
    // 資料庫建立一筆otp
    const otp = await createOtp(email, token, hash, expiredAt)

    if (isDev) console.log('db:otp:', otp)

    // 將otp資料存入session
    req.session.otp = {
      email: email, // 會員email
      hash: hash, // 產生的特定hash，用於返回網站時驗証用
      token: token, // 產生的 token
      uri: newOtp.uri, // 產生的 uri
      changeAt: Date.now() + second * 1000, // 30 秒後會重新改變
      exp: exp, // 過期時間，毫秒值
    }

    // 寄送otp信件(注意這個操作會耗時)
    await sendOtpMail(email, token, hash)

    if (isDev) console.log('final: req.session.otp:', req.session.otp)

    // 傳送otp回應，回應hash資料
    successResponse(res, { hashToken: hash })
  } catch (error) {
    errorResponse(res, error)
  }
})

// 重設密碼用(透過email)
router.post('/reset-password', async (req, res) => {
  const { email, token, password } = req.body

  if (!token || !email || !password) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }

  try {
    const isValid = await verifyOtp(email, token)

    if (!isValid) {
      return errorResponse(res, { message: '驗証碼錯誤' })
    }

    // 重設密碼(注意這裡面除了會執行更新密碼外，在更新後也會刪除otp資料)
    await resetPassword(email, password)

    // 清除session資料
    req.session.destroy()

    // 清除cookie
    logoutClearCookie(res)

    // 成功
    successResponse(res)
  } catch (error) {
    errorResponse(res, error)
  }
})

// 重設密碼用(透過hash，不用email)
router.post('/reset-password-hash', async (req, res) => {
  const { secret, token, password } = req.body

  isDev && console.log('req.body:', req.body)
  isDev && console.log('req.session.otp:', req.session.otp)

  if (!token || !secret || !password) {
    return errorResponse(res, { message: '缺少必要資料' })
  }

  if (req.session?.otp?.hash !== secret) {
    return errorResponse(res, { message: '驗証安全字串錯誤' })
  }

  // 從session中取得email
  const email = req.session.otp.email

  try {
    const isValid = await verifyOtp(email, token)

    if (!isValid) {
      return errorResponse(res, { message: '驗証碼錯誤' })
    }

    // 重設密碼(注意這裡面除了會執行更新密碼外，在更新後也會刪除otp資料)
    await resetPassword(email, password)

    // 清除session資料
    req.session.destroy()

    // 清除cookie
    logoutClearCookie(res)

    // 成功
    successResponse(res)
  } catch (error) {
    errorResponse(res, error)
  }
})

// 重設密碼用(透過hash，不用email)
router.post('/check-secret', async (req, res) => {
  const { secret } = req.body

  isDev && console.log('req.body:', req.body)
  isDev && console.log('req.session.otp:', req.session.otp)

  if (!secret) {
    return errorResponse(res, { message: '缺少必要資料' })
  }

  if (req.session?.otp?.hash !== secret) {
    return errorResponse(res, { message: '驗証安全字串錯誤' })
  }

  // 成功
  successResponse(res)
})
// #endregion ------------ 以上為OTP路由 ------------

export default router
