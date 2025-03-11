import express from 'express'
import db from '../db3.js'

const router = express.Router()

import { successResponse, errorResponse } from '../lib/utils.js'

router.get('/', async (req, res) => {
  const nameLike = req.query.name_like || ''
  const brandIds = req.query.brand_ids
    ? req.query.brand_ids.split(',').map(Number)
    : []
  const color_ids = req.query.color_ids
    ? req.query.color_ids.split(',').map(Number)
    : []

  const priceGte = Number(req.query.price_gte) || 1
  const priceLte = Number(req.query.price_lte) || 700000

  // **加入排序參數**
  const sort = req.query.sort || 'price_asc'
  const sortOptions = {
    name_asc: 'Rent.name ASC',
    name_desc: 'Rent.name DESC',
    price_asc: 'Rent.price ASC',
    price_desc: 'Rent.price DESC',
  }
  const orderBy = sortOptions[sort] || 'Rent.price ASC' // 預設價格低到高

  try {
    let sql = `
      SELECT
        Rent.*,
        RentBrand.name AS brand_name,
        RentItemColor.id AS rent_item_color_id,
        RentItemColor.stock,
        RentColor.name AS color_name,
        RentColor.rentColor_image AS color_image,
        RentImges.image,
        RentImges.sort_order
      FROM Rent
      LEFT JOIN RentBrand ON Rent.rentBrandId = RentBrand.id
      LEFT JOIN RentItemColor ON Rent.id = RentItemColor.rentId
      LEFT JOIN RentColor ON RentItemColor.RentColor_id = RentColor.id
      LEFT JOIN RentImges ON RentItemColor.id = RentImges.RentItemColorId
      WHERE 1=1
    `

    if (nameLike) sql += ` AND Rent.name LIKE '%${nameLike}%'`
    if (brandIds.length > 0)
      sql += ` AND RentBrand.id IN (${brandIds.join(',')})`
    if (priceGte && priceLte)
      sql += ` AND Rent.price BETWEEN ${priceGte} AND ${priceLte}`
    if (color_ids.length > 0)
      sql += ` AND RentItemColor.RentColor_id IN (${color_ids.join(',')})`

    // **加入排序條件**
    sql += ` ORDER BY ${orderBy}, RentImges.sort_order ASC`

    const [rows] = await db.query(sql)

    // 格式化數據
    const formattedData = rows.reduce((acc, row) => {
      let existingRent = acc.find((item) => item.id === row.id)

      if (existingRent) {
        const existingColor = existingRent.rentitemColors.find(
          (color) => color.rent_item_color_id === row.rent_item_color_id
        )

        if (existingColor) {
          if (row.image) {
            existingColor.images.push(row.image)
          }
        } else {
          existingRent.rentitemColors.push({
            rent_item_color_id: row.rent_item_color_id,
            stock: row.stock,
            color_name: row.color_name,
            color_image: row.color_image,
            images: row.image ? [row.image] : [],
          })
        }
      } else {
        acc.push({
          ...row,
          brand_name: row.brand_name,
          color_name: row.color_name,
          rentitemColors: row.rent_item_color_id
            ? [
                {
                  rent_item_color_id: row.rent_item_color_id,
                  stock: row.stock,
                  color_name: row.color_name,
                  color_image: row.color_image,
                  images: row.image ? [row.image] : [],
                },
              ]
            : [],
        })
      }
      return acc
    }, [])

    res.status(200).json({
      status: 'success',
      data: formattedData,
      message: '取得資料成功',
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      message: err.message || '取得資料失敗',
    })
  }
})


// 修改后的 /api/rent/search 路由
router.get('/search', async (req, res) => {
  const { query } = req.query;
  console.log(req.query);

  try {
    if (!query) throw new Error('請提供查詢字串');

    const searchQuery = `%${query}%`; // 忽略大小写

    const sql = `
      SELECT
        Rent.*,
        RentBrand.name AS brand_name,
        RentItemColor.id AS rent_item_color_id,
        RentItemColor.stock,
        RentColor.name AS color_name,
        RentColor.rentColor_image AS color_image,
        RentImges.image,
        RentImges.sort_order
      FROM Rent
      LEFT JOIN RentBrand ON Rent.rentBrandId = RentBrand.id
      LEFT JOIN RentItemColor ON Rent.id = RentItemColor.rentId
      LEFT JOIN RentColor ON RentItemColor.RentColor_id = RentColor.id
      LEFT JOIN RentImges ON RentItemColor.id = RentImges.RentItemColorId
      WHERE (LOWER(Rent.name) LIKE ? OR LOWER(RentBrand.name) LIKE ?)
    `;
    
    const params = [searchQuery, searchQuery];
    console.log('SQL:', sql);
    
    const [rows] = await db.query(sql, params);
    console.log('查詢結果:', rows);

    // 使用 formattedData 进行数据整理
    const formattedData = rows.reduce((acc, row) => {
      let existingRent = acc.find((item) => item.id === row.id);

      if (existingRent) {
        const existingColor = existingRent.rentitemColors.find(
          (color) => color.rent_item_color_id === row.rent_item_color_id
        );

        if (existingColor) {
          if (row.image) {
            existingColor.images.push({ image: row.image, sort_order: row.sort_order });
            // 按 sort_order 排序
            existingColor.images.sort((a, b) => a.sort_order - b.sort_order);
          }
        } else {
          existingRent.rentitemColors.push({
            rent_item_color_id: row.rent_item_color_id,
            stock: row.stock,
            color_name: row.color_name,
            color_image: row.color_image,
            images: row.image ? [{ image: row.image, sort_order: row.sort_order }] : [],
          });
        }
      } else {
        acc.push({
          ...row,
          brand_name: row.brand_name,
          rentitemColors: row.rent_item_color_id
            ? [
                {
                  rent_item_color_id: row.rent_item_color_id,
                  stock: row.stock,
                  color_name: row.color_name,
                  color_image: row.color_image,
                  images: row.image ? [{ image: row.image, sort_order: row.sort_order }] : [],
                },
              ]
            : [],
        });
      }
      return acc;
    }, []);

    // 去掉每个 rentitemColors 下 images 的 sort_order，只返回 image
    formattedData.forEach(rent => {
      rent.rentitemColors.forEach(color => {
        color.images = color.images.map(img => img.image); // 只保留 image
      });
    });

    res.status(200).json({
      status: 'success',
      data: formattedData, // 返回整理后的数据
      message: `搜尋成功, 條件: ${query}`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'error',
      message: err.message ? err.message : '搜尋失敗',
    });
  }
});





// 修改后的 /api/rent/search 路由
// router.get('/search', async (req, res) => {
//   try {
//     // SQL 查询语句
//     let sql = `
//       SELECT 
//         rent.id, 
//         rent.name AS rent_name, 
//         rent.price, 
//         stores.name AS store_name, 
//         stores.address,
//         rentBrand.name AS brand_name,
//         rentColor.name AS color_name,
//         rentItemColor.stock AS color_stock,
//         rentImges.image AS image_url
//       FROM rent
//       JOIN stores ON rent.stores_id = stores.id
//       JOIN rentBrand ON rent.rentBrandId = rentBrand.id
//       JOIN rentItemColor ON rent.id = rentItemColor.rentId
//       JOIN rentColor ON rentItemColor.rentcolor_id = rentColor.id
//       JOIN rentImges ON rent.id = rentImges.rentId
//       WHERE 1=1
//     `

//     const params = []

//     // 只在有值时才添加查询条件
//     if (req.query.rentName && req.query.rentName !== '') {
//       sql += ` AND rent.name LIKE ?`
//       params.push(`%${req.query.rentName}%`)
//     }

//     if (req.query.storeName && req.query.storeName !== '') {
//       sql += ` AND stores.name LIKE ?`
//       params.push(`%${req.query.storeName}%`)
//     }

//     if (req.query.brandName && req.query.brandName !== '') {
//       sql += ` AND rentBrand.name LIKE ?`
//       params.push(`%${req.query.brandName}%`)
//     }

//     if (req.query.colorName && req.query.colorName !== '') {
//       sql += ` AND rentColor.name LIKE ?`
//       params.push(`%${req.query.colorName}%`)
//     }

//     if (req.query.storeAddress && req.query.storeAddress !== '') {
//       sql += ` AND stores.address LIKE ?`
//       params.push(`%${req.query.storeAddress}%`)
//     }

//     // 只在价格范围有输入时才添加条件
//     if (req.query.priceMin && req.query.priceMax) {
//       sql += ` AND rent.price BETWEEN ? AND ?`
//       params.push(req.query.priceMin, req.query.priceMax)
//     }

//     // 调试输出
//     console.log('SQL:', sql)
//     console.log('Params:', params)

//     // 执行查询
//     const [rows] = await db.execute(sql, params)

//     // 格式化查询结果
//     const formattedRows = rows.reduce((acc, row) => {
//       const existingRent = acc.find((rent) => rent.id === row.id)

//       if (existingRent) {
//         // 檢查如果顏色已經存在，不要重複新增
//         if (
//           !existingRent.rentitemColors.some(
//             (color) => color.colorName === row.color_name
//           )
//         ) {
//           existingRent.rentitemColors.push({
//             colorName: row.color_name,
//             stock: row.color_stock,
//           })
//         }
//         // 檢查如果圖片已經存在，不要重複新增
//         if (
//           !existingRent.images.some(
//             (image) => image.image_url === row.image_url
//           )
//         ) {
//           existingRent.images.push({
//             image_url: row.image_url,
//           })
//         }
//       } else {
//         acc.push({
//           id: row.id,
//           name: row.rent_name, // 修改為前端使用的 name
//           price: row.price,
//           store_name: row.store_name,
//           address: row.address,
//           brand_name: row.brand_name,
//           rentitemColors: [
//             {
//               colorName: row.color_name,
//               stock: row.color_stock,
//             },
//           ],
//           images: [
//             {
//               image_url: row.image_url,
//             },
//           ],
//         })
//       }
//       return acc
//     }, [])
//     console.log('格式化後的資料:', JSON.stringify(formattedRows, null, 2))
//     res.status(200).json({
//       status: 'success',
//       data: formattedRows,
//       message: '搜尋成功',
//     })
//   } catch (err) {
//     console.error('錯誤:', err)
//     res.status(500).json({ status: 'error', message: '伺服器錯誤' })
//   }
// })

router.get('/:pid', async (req, res) => {
  const { pid } = req.params

  if (!pid) {
    return res.status(400).json({
      status: 'error',
      message: '缺少 pid 參數',
    })
  }

  try {
    // 使用參數化查詢
    const [rows] = await db.query(
      `
      SELECT
      r.*,
      rb.name AS rentBrandName,
      ric.id AS rentItemcolor_id,
      ric.stock AS rentItemColorStock,
      rc.name AS rentColorNames,
      rc.rentColor_image AS rentColorImages,
      ri.image AS rentImage,
      ri.sort_order AS rentImageSortOrder,
      rl.neck_pickup AS rentListNeckPickup,
      rl.middle_pickup AS rentListMiddlePickup,
      rl.bridge_pickup AS rentListBridgePickup,
      rl.controls AS rentListControls,
      rl.switching AS rentListSwitching,
      s.name AS storeName,
      r.time_start AS rentTimeStart,
      r.time_end AS rentTimeEnd
  FROM Rent r
  LEFT JOIN RentBrand rb ON r.rentBrandId = rb.id
  LEFT JOIN RentItemColor ric ON r.id = ric.rentId
  LEFT JOIN RentColor rc ON ric.RentColor_id = rc.id
  LEFT JOIN RentImges ri ON ric.id = ri.RentItemColorId
  LEFT JOIN RentList rl ON r.RentList_id = rl.id
  LEFT JOIN Stores s ON r.stores_id = s.id
  WHERE r.id = ?
  ORDER BY ri.sort_order;`,
      [pid]
    )

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '找不到資料',
      })
    }

    // 將多行資料聚合成一個物件
    const formattedData = rows.reduce((acc, row) => {
      if (!acc) {
        acc = {
          id: row.id,
          name: row.name,
          level: row.level,
          description: row.description,
          price: row.price,
          rentBrandName: row.rentBrandName,
          storeName: row.storeName,
          stock: row.rentItemColorStock,
          rentList: row.rentListNeckPickup
            ? {
                neckPickup: row.rentListNeckPickup,
                middlePickup: row.rentListMiddlePickup,
                bridgePickup: row.rentListBridgePickup,
                controls: row.rentListControls,
                switching: row.rentListSwitching,
              }
            : null,
          colors: [],
          images: [],
          rentItemColor: row.rentItemcolor_id,
          rentTimeStart: row.time_start,
          rentTimeEnd: row.time_end,
        }
      }

      // 處理顏色資訊
      if (row.rentColorNames && row.rentColorImages) {
        const colorExists = acc.colors.find(
          (color) => color.name === row.rentColorNames
        )
        if (!colorExists) {
          acc.colors.push({
            name: row.rentColorNames,
            image: row.rentColorImages,
            stock: row.rentItemColorStock,
            images: [], // 每個顏色對應的圖片
          })
        }
      }

      // 處理圖片資訊，根據顏色進行分配
      if (row.rentImage) {
        const colorIndex = acc.colors.findIndex(
          (color) => color.name === row.rentColorNames
        )
        if (colorIndex !== -1) {
          acc.colors[colorIndex].images.push({
            url: row.rentImage,
            sortOrder: row.rentImageSortOrder,
          })
        } else {
          acc.images.push({
            url: row.rentImage,
            sortOrder: row.rentImageSortOrder,
          })
        }
      }

      return acc
    }, null)

    // 排序圖片
    formattedData.colors.forEach((color) => {
      color.images.sort((a, b) => a.sortOrder - b.sortOrder)
    })

    formattedData.images.sort((a, b) => a.sortOrder - b.sortOrder)
    res.status(200).json({
      status: 'success',
      data: formattedData,
      message: '取得資料成功',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: err.message || '取得資料失敗',
    })
  }
})

export default router
