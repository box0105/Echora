import { useEffect, useState } from 'react'
import { useFetch } from './use-fetch'

export const useActivity = (url = 'http://localhost:3005/api/activities') => {
  const [queryParams, setQueryParams] = useState({})
  const [apiUrl, setApiUrl] = useState(url)
  // 預設圖片
  const [randomImages, setRandomImages] = useState(['/浮現祭/main-1.jpg'])
  const [randomIds, setRandomIds] = useState([0])

  // 更新 Query 物件
  const updateQueryParams = (newParams) => {
    setQueryParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  // 將 Query 物件轉為後端網址
  const getFilteredUrl = () => {
    const urlParams = new URLSearchParams()
    // Search
    if (queryParams.search) urlParams.set('search', queryParams.search)
    // Filter
    // array -> string
    if (queryParams.categoryIds && queryParams.categoryIds.length > 0) {
      const categoryIdsString = queryParams.categoryIds.join(',')
      urlParams.set('categoryIds', categoryIdsString)
    }
    if (queryParams.genreIds && queryParams.genreIds.length > 0) {
      const genreIdsString = queryParams.genreIds.join(',')
      urlParams.set('genreIds', genreIdsString)
    }
    if(queryParams.date) {
      urlParams.set('startDate', queryParams.date[0])
      urlParams.set('endDate', queryParams.date[1])
    }
    if (queryParams.city) urlParams.set('city', queryParams.city)
    if (queryParams.price && queryParams.price>=0) urlParams.set('price', queryParams.price)

      // Sort
    if (queryParams.orderBy) urlParams.set('orderBy', queryParams.orderBy)
    if (queryParams.order) urlParams.set('order', queryParams.order)

    const newUrl = `${url}?${urlParams}`
    console.log(newUrl)
    return newUrl
  }

  // Fetch data
  const { data: acts, isLoading } = useFetch(apiUrl)

  useEffect(() => {
    // Query 變更時重新產生後端網址
    if (queryParams) {
      setApiUrl(getFilteredUrl())
    }
  }, [queryParams])

  useEffect(() => {
    // 初次渲染封面
    if (acts && acts.length > 0) {
      const cover = updateRandomPhotos(3)
      setRandomImages(cover.randomImages)
      setRandomIds(cover.randomIndicesArray)
    }
  }, [isLoading])

  // 隨機產生照片
  function updateRandomPhotos(num) {
    const randomIndices = new Set()
    while (randomIndices.size < num) {
      const randomIndex = Math.floor(Math.random() * acts.length)
      randomIndices.add(randomIndex)
    }

    const randomIndicesArray = Array.from(randomIndices)
    const randomImages = randomIndicesArray.map(
      (index) => acts[index].media.split(',')[0]
    )

    console.log('封面圖片', randomImages)
    return { randomImages, randomIndicesArray }
  }

  return {
    acts,
    isLoading,
    queryParams,
    updateQueryParams,
    randomImages,
    randomIds,
  }
}

useActivity.displayName = 'useActivity'
