import { useEffect, useState, useCallback } from 'react'

export function useFetch(url, options) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if (url == null) return

    try {
      const res = await fetch(url, options)
      const result = await res.json()
      console.log({ url, result })

      if (result.status === 'fail') {
        setError(result.error)
        console.log(result.error);
        return
      }

      if (result.status === 'success') {
        setData(result.data.data)
        setIsLoading(false)
      }
    } catch (err) {
      setError(err)
      setIsLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData() // 頁面載入時第一次獲取資料
  }, [fetchData]) // 當 fetchData 改變時會重新執行

  // reFetch 用來重新抓取資料
  return { data, isLoading, error, reFetch: fetchData }
}
