import prisma from '../lib/prisma.js'
import { z } from 'zod'

import { validatedParamId, safeParseBindSchema } from '../lib/utils.js'

const rentSchema = {}

rentSchema.conditions = z.object({
  nameLike: z.string().optional(),
  categoryIds: z.array(z.number()).optional(),
  priceGte: z.number().optional(),
  priceLte: z.number().optional(),
})

rentSchema.sortBy = z.object({
  sort: z.enum(['id', 'name', 'price']),
  order: z.enum(['asc', 'desc']),
})

const rentSchemaValidator = safeParseBindSchema(rentSchema)

// #endregion

const generateWhere = (conditions) => {
    rentSchemaValidator({ conditions })
  
    const where = {}
    if (conditions.nameLike) {
      where.name = { contains: conditions.nameLike }
    }
  
    if (conditions.categoryIds.length) {
      where.categoryId = { in: conditions.categoryIds }
    }
  
    if (conditions.priceGte) {
      where.price = { gte: conditions.priceGte }
    }
  
    if (conditions.priceLte) {
      where.price = where.price
        ? { ...where.price, lte: conditions.priceLte }
        : { lte: conditions.priceLte }
    }
  
    return where
  }
  

// 取得商品總筆數
export const getRentsCount = async (conditions = {}) => {
    const where = generateWhere(conditions)
    return await prisma.rent.count({ where }) // 這裡改為 rent 資料表
  }
  
  export const getRents = async (page = 1, perPage = 10, conditions = {}, sortBy) => {
    validatedParamId(page)
    validatedParamId(perPage)
  
    const where = generateWhere(conditions)
    rentSchemaValidator({ sortBy })
  
    const orderBy = {
      [sortBy.sort]: sortBy.order,
    }
  
    return await prisma.rent.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        category: true, // 如果還有關聯資料
      },
    })
  }
  
  export const getRentById = async (rentId) => {
    validatedParamId(rentId)
  
    const rent = await prisma.rent.findUnique({
      where: { id: rentId },
      include: {
        category: true,
      },
    })
  
    if (!rent) {
      throw new Error('資料不存在')
    }
  
    return rent
  }
  

// 取得所有品牌資料
export const getCategories = async () => {
  return await prisma.category.findMany() // 如果是分類資料的話
}


// 取得所有分類資料
export const getCatetories = async () => {
  return await prisma.category.findMany()
}
