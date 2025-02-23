import express from 'express'
// import db from '../config/mysql.js'
import { PrismaClient } from '@prisma/client'
import { successResponse, errorResponse } from '../lib/utils.js'

const router = express.Router()
const prisma = new PrismaClient()
// 要關聯的資料表
const includeType = {
  category: true,
  genre: true,
  article: true,
  lineup: true,
  type: true
}


/* router prefix: /api/activities */

// get All
router.get('/', async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      include: includeType
    })
    
    successResponse(res, { activities })
  } catch (error) {
    errorResponse(res, error)
  }
})

// get One
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const activity = await prisma.activity.findUnique({
      where: { id: Number(id) },
      include: includeType
    })

    successResponse(res, { activity })
  } catch (error) {
    errorResponse(res, error)
  }
})

export default router
