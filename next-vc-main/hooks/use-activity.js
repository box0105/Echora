import { useEffect, useState } from 'react'
import { useFetch } from './use-fetch'

export const useActivity = (url = 'http://localhost:3005/api/activities') => {
  const [queryParams, setQueryParams] = useState({})
  const [apiUrl, setApiUrl] = useState(url)

  // 更新 Query 物件
  const updateQueryParams = (newParams) => {
    setQueryParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  // 將 Query 物件轉為後端網址
  const getFilteredUrl = () => {
    const urlParams = new URLSearchParams()
    if (queryParams.search) urlParams.set('search', queryParams.search)
    if (queryParams.orderBy) urlParams.set('orderBy', queryParams.orderBy)
    if (queryParams.order) urlParams.set('order', queryParams.order)

    const newUrl = `${url}?${urlParams}`
    setApiUrl(newUrl)
  }

  // Fetch data
  const { data: acts, isLoading } = useFetch(apiUrl)

  useEffect(() => {
    // Query 變更時重新產生後端網址
    getFilteredUrl()
    console.log(apiUrl);
  }, [acts, queryParams]) 

  
  // 預設圖片
  const [randomImages, setRandomImages] = useState(['/浮現祭/main-1.jpg'])
  const [randomIds, setRandomIds] = useState([0])

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
    // setRandomImages(randomImages)
    // setRandomIds(randomIndicesArray)
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
