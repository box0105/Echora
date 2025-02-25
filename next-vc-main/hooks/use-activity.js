import { useEffect, useState } from 'react'
import { useFetch } from './use-fetch'

// Fetch Data, sort & filter & search
export const useActivity = (url) => {
  const { data: acts, isLoading } = useFetch(url)
  const [displayActs, setDisplayActs] = useState([])

  useEffect(() => {
    if (acts) {
      setDisplayActs(acts)
    }
  }, [acts])

  // sort 通用
  const sortByKey = (key='id', order='asc') => {
    const sorted = [...displayActs].sort((a, b) => {
      let x
      let y

      if (key === 'price') {
        x = a.type[0].price
        y = b.type[0].price
      } else if (key === 'date') {
        x = new Date(a.date_start).getTime()
        y = new Date(b.date_start).getTime()
      } else {
        x = a.id
        y = b.id
      }

      return order === 'desc' ? y - x : x - y
    })
    setDisplayActs(sorted)
  }

  // 隨機產生照片
  const getRandomPhotos = (num) => {
    const randomIndices = new Set()
    while (randomIndices.size < num) {
      const randomIndex = Math.floor(Math.random() * acts.length)
      randomIndices.add(randomIndex)
    }

    const photos = Array.from(randomIndices).map(
      (index) => acts[index].media.split(',')[0]
    )

    return photos
  }

  return {
    displayActs,
    isLoading,
    sortByKey,
    getRandomPhotos,
  }
}
