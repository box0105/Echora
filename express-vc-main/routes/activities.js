import express from 'express'
// import db from '../config/mysql.js'
import { PrismaClient } from '@prisma/client'
import { successResponse, errorResponse } from '../lib/utils.js'

const router = express.Router()
const prisma = new PrismaClient()

/* router prefix: /api/activities */

// get All
router.get('/', async (req, res) => {
  try {
    const search = req.query.search
    const orderType = req.query.orderBy
    const order = req.query.order

    const data = await prisma.activity.findMany({
      // orderBy: {
      //   [orderType]: order,
      // },

      // orderBy: {
      //   type: {
      //     where: { id: 1},
      //     price: 'desc',
      //   },
      // },

      where: {
        // Search name or bands
        OR: [
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
        ],
      },

      include: {
        // 關聯資料表
        category: true,
        genre: true,
        article: true,
        lineup: true,
        type: true,
      },
    })

    // Sort
    const sorted = [...data].sort((x, y) => {
      if (orderType === 'price') {
        x = x.type[0].price
        y = y.type[0].price
      } else if (orderType === 'date') {
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

// get One
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
