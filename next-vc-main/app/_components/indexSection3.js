'use client'

import React, { useState, useEffect } from 'react'
import IndexCardCarousel from './index-card-carousel'

export default function IndexSection3(props) {
  const [trendingData, setTrendingData] = useState([])

    // 整理資料用的函式
    function group(arr, key) {
      return [
        ...arr
          .reduce(
            (acc, o) => acc.set(o[key], (acc.get(o[key]) || []).concat(o)),
            new Map()
          )
          .values(),
      ]
    }
    const convertData = async (data) => {
      // 擴充原始資料的索引值(不一定需要)，方便後續操作例如排序…
      const arr = data.map((v, i) => ({ ...v, originalIndex: i }))
  
      // 進行資料分組
      const groupedArr = group(arr, 'id')
      // console.log('groupedArr', groupedArr)
  
      let tmpData = []
  
      for (let i = 0; i < groupedArr.length; i++) {
        // grouped values
        if (groupedArr[i].length > 1) {
          const newObj = { ...groupedArr[i][0] }
          newObj.colors = []
          newObj.images = {}
          newObj.defaultImage = ''
          for (let j = 0; j < groupedArr[i].length; j++) {
            newObj.colors.push({
              name: groupedArr[i][j].color_name,
              image: groupedArr[i][j].color_image,
              skuId: groupedArr[i][j].product_sku_id,
            })
  
            newObj.images[groupedArr[i][j].product_sku_id] =
              groupedArr[i][j].image
            newObj.defaultImage = groupedArr[i][j].image
          }
          tmpData.push(newObj)
        } else {
          const newObj = { ...groupedArr[i][0] }
          newObj.colors = []
          newObj.images = {}
          newObj.defaultImage = ''
  
          newObj.colors.push({
            name: groupedArr[i][0].color_name,
            image: groupedArr[i][0].color_image,
            skuId: groupedArr[i][0].product_sku_id,
          })
          newObj.images[groupedArr[i][0].product_sku_id] = groupedArr[i][0].image
          newObj.defaultImage = groupedArr[i][0].image
  
          tmpData.push(newObj)
        }
      }
      // console.log('tmpData', tmpData)
      // 平坦化陣列
      const finalData = tmpData.flat()
  
      // console.log('finalData', finalData)
  
      return finalData
    }

  const getTrendingData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/products/trending`
      )
      const data = await res.json()
      const finalData = await convertData(data.data)
      setTrendingData(finalData)
      // console.log(finalData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTrendingData()
  },[])

  return (
    <>
      <div className="container-fluid m-index overflow-hidden">
        <div className="m-index-title m-anime">
          <h1 className="h3">
            TRENDING DEALS<span> / 熱門優惠商品</span>
          </h1>
        </div>
        <IndexCardCarousel data={trendingData}/>
      </div>
    </>
  )
}
