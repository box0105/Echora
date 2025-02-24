import prisma from '../lib/prisma.js'
import { z } from 'zod'

import { validatedParamId, safeParseBindSchema } from '../lib/utils.js'

const rentSchema = {}

rentSchema.conditions = z.object({
  // Rent 表的篩選條件
  rentName: z.string().optional(),
  rentPriceGte: z.number().optional(),
  rentPriceLte: z.number().optional(),
  rentTimeStart: z.string().optional(), // 可以是日期字串
  rentTimeEnd: z.string().optional(),   // 可以是日期字串
  // ... 其他 Rent 表的篩選條件

  // Stores 表的篩選條件
  storesName: z.string().optional(),
  storesAddress: z.string().optional(),
  // ... 其他 Stores 表的篩選條件


  // RentBrand 表的篩選條件
  rentBrandName: z.string().optional(),

  // RentColor 表的篩選條件
  rentColorName: z.string().optional(),

  // RentList 表的篩選條件
  rentListName: z.string().optional(), // 假設 RentList 有 name 欄位

  // RentImges 表的篩選條件
  rentImgesName: z.string().optional(), // 假設 RentImges 有 name 欄位

  // 其他篩選條件 (例如 categoryIds)
  categoryIds: z.array(z.number()).optional(),
});

rentSchema.sortBy = z.object({
  sort: z.enum(['id', 'name', 'price']),
  order: z.enum(['asc', 'desc']),
})

const rentSchemaValidator = safeParseBindSchema(rentSchema)

// #endregion

const generateWhere = (conditions) => {
  rentSchemaValidator({ conditions });

  const where = {};

  // Rent 表的篩選條件
  if (conditions.rentName) {
    where.name = { contains: conditions.rentName };
  }
  if (conditions.rentPriceGte) {
    where.price = { gte: conditions.rentPriceGte };
  }
  if (conditions.rentPriceLte) {
    where.price = { ...where.price, lte: conditions.rentPriceLte };
  }
  if (conditions.rentTimeStart) {
    where.time_start = { gte: conditions.rentTimeStart }; // 假設 time_start 是 DateTime
  }
  if (conditions.rentTimeEnd) {
    where.time_end = { lte: conditions.rentTimeEnd };     // 假設 time_end 是 DateTime
  }
  // ... 其他 Rent 表的篩選條件

  // Stores 表的篩選條件
  if (conditions.storesName) {
    where.stores = { name: { contains: conditions.storesName } };
  }
  if (conditions.storesAddress) {
    where.stores = { address: { contains: conditions.storesAddress } };
  }
  // ... 其他 Stores 表的篩選條件

  // Inventory 表的篩選條件
  if (conditions.inventoryStockGte) {
    where.inventory = { stock: { gte: conditions.inventoryStockGte } };
  }
  if (conditions.inventoryStockLte) {
    where.inventory = { stock: { lte: conditions.inventoryStockLte } };
  }
  // ... 其他 Inventory 表的篩選條件

  // RentBrand 表的篩選條件
  if (conditions.rentBrandName) {
    where.rentBrand = { name: { contains: conditions.rentBrandName } };
  }

  // RentColor 表的篩選條件
  if (conditions.rentColorName) {
    where.rentColor = { name: { contains: conditions.rentColorName } };
  }
  if (conditions.RentItemColorName) {
    where.RentItemColor = { name: { contains: conditions.RentItemColorName } };
  }

  // RentList 表的篩選條件
  if (conditions.rentListName) {
    where.rentList = { /* 假設 RentList 有 name 欄位 */ name: { contains: conditions.rentListName } };
  }

  // RentImges 表的篩選條件
  if (conditions.rentImgesName) {
    where.rentImges = { /* 假設 RentImges 有 name 欄位 */ name: { contains: conditions.rentImgesName } };
  }

  // 其他篩選條件 (例如 categoryIds)
  if (conditions.categoryIds && conditions.categoryIds.length > 0) {
    where.categoryId = { in: conditions.categoryIds };
  }

  return where;
};
  

// 取得商品總筆數
export const getRentsCount = async (conditions = {}) => {
    const where = generateWhere(conditions)
    return await prisma.rent.count({ where }) // 這裡改為 rent 資料表
  }
  
  export const getRents = async (page = 1, perPage = 10, conditions = {}, sortBy) => {
    // ... 其他程式碼
  
    const where = generateWhere(conditions);
    rentSchemaValidator({ sortBy });
  
    const orderBy = {
      [sortBy.sort]: sortBy.order,
    };
  
    return await prisma.rent.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        category: true,
        stores: true,
        rentBrand: true, // 包含 RentBrand 資料
        rentColor: true, // 包含 RentColor 資料
        rentItemColor: true, // 包含 rentItemColor 資料
        rentList: true,  // 包含 RentList 資料
        rentImges: true, // 包含 RentImges 資料
      },
    });
  };
  
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
