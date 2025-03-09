import express from 'express'
import multer from 'multer'

import { PrismaClient } from '@prisma/client'
import { successResponse, errorResponse } from '../lib/utils.js'

const router = express.Router()
const prisma = new PrismaClient()

const storage = multer.diskStorage({
  // 設定檔案搬移目的地
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + '_' + file.originalname
    cb(null, newFileName)
  },
})

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload jpg/jpeg/png files'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 10000000, // 10MB
  },
})

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
    if (startDate && endDate) {
      whereCondition.date_start = { gte: startDate, lte: endDate }
    }
    if (price) {
      whereCondition.type = {
        some: { price: { lte: price } },
      }
    }

    // Sort : id, date, price(有bug)
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
  const { id } = req.params

  try {
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

    successResponse(res, { data })
  } catch (error) {
    errorResponse(res, error)
  }
})

// 上傳照片
router.post('/uploads', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  const uploadedFiles = req.files.map((file) => ({
    filename: file.originalname,
    newFileName: file.filename,
    size: file.size,
  }))

  res.json({
    message: 'Files uploaded successfully',
    files: uploadedFiles,
  })
})

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
      date_end:date_end ? new Date(date_end) : null,
      signup_start: signup_start ? new Date(signup_start) : null,
      signup_end: signup_end ? new Date(signup_end) : null,
      city,
      dist,
      address,
      intro,
      media: mediaString, // 將轉換後的字串存入 media
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

export default router
