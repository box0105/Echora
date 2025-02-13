import express from 'express'
import db from '../db3.js'

const router = express.Router()

import {} from '../lib/utils.js'

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

// * router prefix: /api/users/:id
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
router.post('/', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: '請提供 username, email 和 password',
    })
  }

  try {
    // 新增會員資料
    const result = await db.query(
      'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
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

// #endregion ------------

// #region ------ PUT ------
// 更新使用者名稱
// put還沒弄好(先測試修改username及password有成功)
router.put('/:id', async (req, res) => {
  const userId = req.params.id
  const { username } = req.body

  if (!username) {
    return res.status(400).json({
      status: 'error',
      message: '請提供新的 username',
    })
  }

  try {
    // 更新會員的 username
    const result = await db.query('UPDATE user SET username = ? WHERE id = ?', [
      username,
      userId,
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: '找不到該會員',
      })
    }

    // 回傳成功訊息
    res.status(200).json({
      status: 'success',
      message: '會員資料更新成功',
    })
  } catch (err) {
    // 若發生錯誤，回傳錯誤訊息
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message || '更新會員資料失敗',
    })
  }
})

// 更新會員密碼
router.put('/:id/password', async (req, res) => {
  const userId = req.params.id
  const { password } = req.body

  if (!password) {
    return res.status(400).json({
      status: 'error',
      message: '請提供新的 password',
    })
  }

  try {
    const result = await db.query('UPDATE user SET password = ? WHERE id = ?', [
      password,
      userId,
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: '找不到該會員',
      })
    }

    // 回傳成功訊息
    res.status(200).json({
      status: 'success',
      message: '會員密碼更新成功',
    })
  } catch (err) {
    // 若發生錯誤，回傳錯誤訊息
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message || '更新會員密碼失敗',
    })
  }
})
export default router
