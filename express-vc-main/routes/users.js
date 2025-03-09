import express from 'express'
import db from '../db3.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// #region ------ GET ------
/* router prefix: /api/users */
// 查詢所有會員資料
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM user')

    // 回傳成功的結果
    res.status(200).json({
      status: 'success',
      data: rows,
      message: '取得會員資料成功',
    })
  } catch (err) {
    // 若查詢失敗，回傳錯誤訊息
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message ? err.message : '取得會員資料失敗',
    })
  }
})

// 查詢單一會員資料
router.get('/:id', async (req, res) => {
  const userId = req.params.id // 取得 URL 參數中的 id

  try {
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [userId])

    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '找不到該會員',
      })
    }

    res.status(200).json({
      status: 'success',
      data: rows[0], // 因為返回的是一個數組，選擇返回第一個會員資料
      message: '取得會員資料成功',
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message ? err.message : '取得會員資料失敗',
    })
  }
})
// #endregion ------------

// #region ------ POST ------
// 新增會員資料(後面更新資料庫再有哪些欄位要改)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: '請提供 username, email 和 password',
    })
  }

  try {
    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10)

    // 新增會員資料
    const result = await db.query(
      'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    )

    // 回傳成功訊息
    res.status(201).json({
      status: 'success',
      message: '會員資料新增成功',
      data: {
        id: result.insertId,
        username,
        email,
      },
    })
  } catch (err) {
    // 若發生錯誤，回傳錯誤訊息
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message || '新增會員資料失敗',
    })
  }
})

// 登入會員
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: '請提供 email 和 password',
    })
  }

  try {
    // 查詢會員資料
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email])

    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '此email尚未註冊',
      })
    }

    const user = rows[0]

    // 檢查帳戶是否被鎖定
    if (user.is_locked && user.lock_until > Date.now()) {
      return res.status(403).json({
        status: 'error',
        message: '帳戶已鎖定，請稍後3分鐘再試',
      })
    }

    // 驗證密碼
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      // 更新失敗次數
      const failedAttempts = user.failed_attempts + 1
      let isLocked = user.is_locked
      let lockUntil = user.lock_until

      if (failedAttempts >= 3) {
        isLocked = true
        lockUntil = new Date(Date.now() + 5 * 60 * 1000) // 鎖定 5 分鐘
      }

      await db.query(
        'UPDATE user SET failed_attempts = ?, is_locked = ?, lock_until = ? WHERE id = ?',
        [failedAttempts, isLocked, lockUntil, user.id]
      )

      return res.status(400).json({
        status: 'error',
        message: '密碼錯誤，輸入錯誤超過3次將被鎖定5分鐘',
      })
    }

    // 重置失敗次數
    await db.query(
      'UPDATE user SET failed_attempts = 0, is_locked = 0, lock_until = NULL WHERE id = ?',
      [user.id]
    )

    // 生成 JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({
      status: 'success',
      message: '登入成功',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message || '登入失敗',
    })
  }
})

// 登出會員
router.post('/logout', (req, res) => {
  // 清除客戶端的 JWT token 和 userId
  res.clearCookie('token')
  res.status(200).json({
    status: 'success',
    message: '登出成功',
  })
})
// #endregion ------------

// #region ------ PUT ------
// 更新會員資料
router.put('/:id', async (req, res) => {
  const userId = req.params.id
  const { username, phone, city, district, address, email, postcode, sex } =
    req.body

  // 構建動態 SQL 語句和參數數組
  let updateFields = []
  let updateValues = []

  if (username) {
    updateFields.push('username = ?')
    updateValues.push(username)
  }
  if (phone) {
    updateFields.push('phone = ?')
    updateValues.push(phone)
  }
  if (city) {
    updateFields.push('city = ?')
    updateValues.push(city)
  }
  if (district) {
    updateFields.push('district = ?')
    updateValues.push(district)
  }
  if (address) {
    updateFields.push('address = ?')
    updateValues.push(address)
  }
  if (email) {
    updateFields.push('email = ?')
    updateValues.push(email)
  }
  if (postcode) {
    updateFields.push('postcode = ?')
    updateValues.push(postcode)
  }
  if (sex) {
    updateFields.push('sex = ?')
    updateValues.push(sex)
  }

  // 如果沒有提供任何欄位，返回錯誤
  if (updateFields.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: '請提供至少一個要更新的欄位',
    })
  }

  // 添加 userId 到參數數組的最後
  updateValues.push(userId)

  try {
    const result = await db.query(
      `UPDATE user SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: '找不到該會員',
      })
    }

    res.status(200).json({
      status: 'success',
      message: '會員資料更新成功',
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message || '更新會員資料失敗',
    })
  }
})
// #endregion ------------

// 更新會員密碼
router.put('/:id/password', async (req, res) => {
  const userId = req.params.id
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      status: 'error',
      message: '請提供舊密碼和新密碼',
    })
  }

  try {
    // 獲取用戶資料
    const [user] = await db.query('SELECT * FROM user WHERE id = ?', [userId])

    if (!user || user.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '找不到該會員',
      })
    }

    // 檢查當前密碼是否正確
    const isMatch = await bcrypt.compare(currentPassword, user[0].password)
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: '當前密碼不正確',
      })
    }

    // 加密新密碼
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // 更新密碼
    const result = await db.query('UPDATE user SET password = ? WHERE id = ?', [
      hashedPassword,
      userId,
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: '找不到該會員',
      })
    }

    res.status(200).json({
      status: 'success',
      message: '會員密碼更新成功',
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message || '更新會員密碼失敗',
    })
  }
})
// #endregion ------------

export default router
