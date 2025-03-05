import { createContext, useContext, useEffect, useState } from 'react'
import { useFetch } from './use-fetch'

// 1. 建立 Context 物件
const ActivityContext = createContext()

export const ActivityProvider = ({
  children,
  url = 'http://localhost:3005/api/activities',
}) => {
  const [queryParams, setQueryParams] = useState({})
  const [apiUrl, setApiUrl] = useState(url)
  // 預設圖片
  const [randomImages, setRandomImages] = useState(['/浮現祭/main-1.jpg'])
  const [randomIds, setRandomIds] = useState([0])

  // 更新 Query 物件
  const updateQueryParams = (newParams) => {
    setQueryParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  // 清空 Query 物件
  const deleteQueryParams = () => {
    setQueryParams({})
  }

  // 將 Query 物件轉為後端網址
  const getFilteredUrl = () => {
    const urlParams = new URLSearchParams()
    // Search
    if (queryParams.search) urlParams.set('search', queryParams.search)

    // Filter
    if (queryParams.categoryIds && queryParams.categoryIds.length > 0) {
      // array -> string
      const categoryIdsString = queryParams.categoryIds.join(',')
      urlParams.set('categoryIds', categoryIdsString)
    }
    if (queryParams.genreIds && queryParams.genreIds.length > 0) {
      // array -> string
      const genreIdsString = queryParams.genreIds.join(',')
      urlParams.set('genreIds', genreIdsString)
    }
    if (queryParams.date) {
      urlParams.set('startDate', queryParams.date[0])
      urlParams.set('endDate', queryParams.date[1])
    }
    if (queryParams.city) urlParams.set('city', queryParams.city)
    if (queryParams.price && queryParams.price >= 0)
      urlParams.set('price', queryParams.price)

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
      const cover = updateRandomPhotos(6)
      setRandomImages(cover.randomImages)
      setRandomIds(cover.randomIndicesArray)
    }
  }, [isLoading])

  // 隨機產生照片
  function updateRandomPhotos(num) {
    if (!acts || acts.length < num) return

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

  // 2. 將資料放入 ActivityContext.Provider
  return (
    <ActivityContext.Provider
      value={{
        acts,
        isLoading,
        queryParams,
        updateQueryParams,
        deleteQueryParams,
        randomImages,
        randomIds,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

// 3. 封裝為 Hook useActivity
export const useActivity = () => useContext(ActivityContext)
