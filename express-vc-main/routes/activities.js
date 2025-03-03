import express from 'express'
// import db from '../config/mysql.js'
import { PrismaClient } from '@prisma/client'
import { successResponse, errorResponse } from '../lib/utils.js'

const router = express.Router()
const prisma = new PrismaClient()

/* router prefix: /api/activities */

// get All datas
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
        some: { price: { lte: price } }
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

// get 所有選項
router.get('/options', async (req, res) => {
  try {
    const categories = await prisma.activityCategory.findMany()
    const genres = await prisma.activityGenre.findMany()

    successResponse(res, { data: { categories, genres } })
  } catch (error) {
    errorResponse(res, error)
  }
})

// get One data
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

export default router
