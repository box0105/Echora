import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import { useFetch } from './use-fetch'

// 1. 建立 Context 物件
const ActivityContext = createContext()

export const ActivityProvider = ({
  children,
  url = 'http://localhost:3005/api/activities',
}) => {
  const [acts, setActs] = useState(null)

  const [queryParams, setQueryParams] = useState({})
  const [apiUrl, setApiUrl] = useState(url)
  // 預設圖片
  const [randomImages, setRandomImages] = useState(['/浮現祭/main-1.jpg'])
  const [randomIds, setRandomIds] = useState([0])
  // 封面照數量
  const coverNum = 5

  // 更新 Query 物件
  const updateQueryParams = (newParams) => {
    setQueryParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  // 透過 QueryParams 改變，重新抓取資料
  const reFetch = () => {
    updateQueryParams({ reFetch: true })
  }

  // 清空 Query 物件
  const deleteQueryParams = () => {
    setQueryParams({})
  }

  // 將 Query 物件轉為後端網址
  const getFilteredUrl = () => {
    const urlParams = new URLSearchParams()

    // 強制重整
    if (queryParams.reFetch) {
      deleteQueryParams()
      return url
    }

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
  const { data, isLoading } = useFetch(apiUrl)

  useEffect(() => {
    // 每次 API 取得新資料時更新 acts
    if (data) {
      setActs(data)
    }
  }, [data])

  useEffect(() => {
    // Query 變更時重新產生後端網址
    if (queryParams) {
      setApiUrl(getFilteredUrl())
    }
  }, [queryParams])

  // 初次渲染封面 (用一個 flag 判斷是否初次)
  const hasInitCover = useRef(false)
  useEffect(() => {
    if (!hasInitCover.current && acts?.length >= coverNum) {
      const cover = updateRandomPhotos(coverNum)
      setRandomImages(cover.randomImages)
      setRandomIds(cover.randomIndicesArray)
      hasInitCover.current = true
    }
  }, [acts])

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

  // 2. 將資料放入 ActivityContext.Provider
  return (
    <ActivityContext.Provider
      value={{
        acts,
        isLoading,
        queryParams,
        updateQueryParams,
        deleteQueryParams,
        reFetch,
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
