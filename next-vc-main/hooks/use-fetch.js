import { useEffect, useState } from 'react'

export function useFetch(url, options) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
    async function fetchData() {
      try {
        const res = await fetch(url, options)
        const json = await res.json()
        setData(json.data.data)
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    }
    
  }, [url, options])

  return { data, isLoading, error }
}
