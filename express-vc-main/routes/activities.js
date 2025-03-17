import express from 'express'
import multer from 'multer'
import { resolve } from 'node:path'

import { PrismaClient } from '@prisma/client'
import { successResponse, errorResponse } from '../lib/utils.js'

const router = express.Router()
const prisma = new PrismaClient()

/* multer */
const storage = multer.diskStorage({
  // 設定檔案搬移至前端
  destination: (req, file, cb) => {
    cb(null, resolve('../', 'next-vc-main', 'public', 'images', 'activity'))
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + '_' + file.originalname
    console.log(newFileName)
    cb(null, newFileName)
  },
})

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (
      !file.originalname.toLocaleLowerCase().match(/\.(jpg|jpeg|png|webp)$/)
    ) {
      return cb(new Error('上傳檔案僅接收 .jpg/jpeg/png/webp'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
})
/* multer */

// Read All datas
router.get('/', async (req, res) => {
  try {
    const search = req.query.search
    const orderType = req.query.orderBy
    const order = req.query.order
    const categoryIds = req.query.categoryIds
      ? req.query.categoryIds.split(',').map(Number)
      : [] // 支援多個 ID
    const genreIds = req.query.genreIds
      ? req.query.genreIds.split(',').map(Number)
      : [] // 支援多個 ID
    const city = req.query.city
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null
    const price = req.query.price ? Number(req.query.price) : null

    // 初始條件
    const whereCondition = {}
    const orderCondition = {}

    // Filter : 活動種類 & 音樂類型 & 城市 & 日期 & 價錢
    if (categoryIds.length > 0) {
      whereCondition.category_id = { in: categoryIds } // 使用 in 過濾多選
    }
    if (genreIds.length > 0) {
      whereCondition.music_genre_id = { in: genreIds } // 使用 in 過濾多選
    }
    if (city) {
      whereCondition.city = city
    }

    if (startDate || endDate) {
      whereCondition.date_start = {
        ...(startDate && { gte: startDate }),
        ...(endDate && { lte: endDate }),
      }
    }

    if (price !== null && price >= 0) {
      whereCondition.type = {
        some: { price: { lte: price } },
      }
    }

    // Sort : id, date, price
    if (orderType && order) {
      orderCondition[orderType] = order
    }

    // Search : name, bands
    if (search) {
      whereCondition.OR = [
        {
          lineup: {
            some: {
              bands: {
                contains: search,
              },
            },
          },
        },
        { name: { contains: search } },
      ]
    }

    const data = await prisma.activity.findMany({
      where: whereCondition,

      include: {
        // 關聯資料表
        category: true,
        genre: true,
        article: true,
        lineup: true,
        type: true,
      },

      // Sort
      // orderBy: orderCondition,
      // orderBy: {
      //   type: {
      //     orderBy: {
      //       price: 'desc', // 按票價降序排列
      //     },
      //   },
      // },
    })

    // Sort
    const sorted = [...data].sort((x, y) => {
      if (orderType === 'price') {
        x = x.type[0].price
        y = y.type[0].price
      } else if (orderType === 'date_start') {
        x = new Date(x.date_start).getTime()
        y = new Date(y.date_start).getTime()
      } else {
        x = x.id
        y = y.id
      }

      return order === 'desc' ? y - x : x - y
    })

    successResponse(res, { data: sorted })
  } catch (error) {
    errorResponse(res, error)
  }
})

// Read 所有選項
router.get('/options', async (req, res) => {
  try {
    const categories = await prisma.activityCategory.findMany()
    const genres = await prisma.activityGenre.findMany()

    successResponse(res, { data: { categories, genres } })
  } catch (error) {
    errorResponse(res, error)
  }
})

// Read One data
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res
        .status(404)
        .json({ status: 'fail', error: '請提供查詢活動 ID' })
    }

    const data = await prisma.activity.findUnique({
      where: { id: Number(id) },
      // 關聯資料表
      include: {
        category: true,
        genre: true,
        article: true,
        lineup: true,
        type: true,
      },
    })
    if (!data) {
      return res.status(404).json({ status: 'fail', error: '活動不存在' })
    }
    successResponse(res, { data })
  } catch (error) {
    errorResponse(res, error)
  }
})

// 上傳照片 (最多10張)
router.post(
  '/uploads',
  upload.array('files', 10),
  (req, res) => {
    // 上傳成功時才執行
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const uploadedFiles = req.files.map((file) => ({
      filename: file.originalname,
      newFileName: file.filename,
      size: file.size,
    }))

    res.json({
      status: 'success',
      message: 'Files uploaded successfully',
      files: uploadedFiles,
    })
  },
  (error, req, res, next) => {
    // 上傳失敗，丟出錯誤訊息時執行
    res.status(400).send({ error: error.message })
  }
)

// Create
router.post('/', express.json(), async (req, res) => {
  const {
    name,
    category_id,
    music_genre_id,
    date_start,
    date_end,
    signup_start,
    signup_end,
    city,
    dist,
    address,
    zipcode,
    intro,
    media,
  } = req.body
  const mediaString = Array.isArray(media) ? media.join(',') : media

  const data = await prisma.activity.create({
    data: {
      name,
      category_id: parseInt(category_id),
      music_genre_id: parseInt(music_genre_id),
      date_start: new Date(date_start),
      date_end: date_end ? new Date(date_end) : null,
      signup_start: signup_start ? new Date(signup_start) : null,
      signup_end: signup_end ? new Date(signup_end) : null,
      city,
      dist,
      address,
      intro,
      media: mediaString, // 將轉換後的字串存入 media
      zipcode: parseInt(zipcode),
      // 關聯 1:n
      type: {
        create: req.body.type || [],
      },
      article: {
        create: req.body.article || [],
      },
      lineup: {
        create: req.body.lineup || [],
      },
      // type: {
      //   create: [
      //     { name: '門票一', stock: 10, price: 999 },
      //     { name: '門票二', stock: 15, price: 2999 },
      //   ],
      // },
      // article: {
      //   create: [
      //     {title: '文章一', content: '文章一', images: '浮現祭/1-1.jpg'},
      //     {title: '文章二', content: '文章二', images: '浮現祭/2-1.jpg'}
      //   ]
      // },
      // lineup: {
      //   create: [
      //     {bands: '123456789'}, {bands:'98765321'}
      //   ]
      // }
    },
  })

  try {
    successResponse(res, { data })
  } catch (error) {
    errorResponse(res, error)
  }
})

// Update
router.put('/:id', express.json(), async (req, res) => {
  const { id } = req.params
  console.log('Update ID:', req.params.id)

  const {
    name,
    category_id,
    music_genre_id,
    date_start,
    date_end,
    signup_start,
    signup_end,
    city,
    dist,
    address,
    zipcode,
    intro,
    media,
    type,
    article,
    lineup,
  } = req.body
  const mediaString = Array.isArray(media) ? media.join(',') : media

  try {
    const data = await prisma.activity.update({
      where: { id: Number(id) },
      data: {
        name,
        category_id: parseInt(category_id),
        music_genre_id: parseInt(music_genre_id),
        date_start: new Date(date_start),
        date_end: date_end ? new Date(date_end) : null,
        signup_start: signup_start ? new Date(signup_start) : null,
        signup_end: signup_end ? new Date(signup_end) : null,
        city,
        dist,
        address,
        intro,
        media: mediaString,
        zipcode: parseInt(zipcode),
        // 更新 1:n 關聯
        type: {
          deleteMany: {}, // 先刪除所有舊的關聯
          create: type || [], // 再新增新的資料
        },
        article: {
          deleteMany: {},
          create: article || [],
        },
        lineup: {
          deleteMany: {},
          create: lineup || [],
        },
      },
    })

    successResponse(res, { data })
  } catch (error) {
    errorResponse(res, error)
  }
})

// Delete
router.delete('/:activityId', async function (req, res) {
  try {
    const activityId = Number(req.params.activityId)

    // 先刪除關聯表的資料
    await prisma.activityLineup.deleteMany({
      where: { activity_id: activityId },
    })
    await prisma.activityArticle.deleteMany({
      where: { activity_id: activityId },
    })
    await prisma.activityTicketType.deleteMany({
      where: { activity_id: activityId },
    })

    // 再刪除 Activity
    const deletedActivity = await prisma.activity.delete({
      where: { id: activityId },
    })

    successResponse(res, deletedActivity)
  } catch (error) {
    errorResponse(res, error)
  }
})

export default router
