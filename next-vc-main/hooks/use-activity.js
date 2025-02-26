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

  // filter
  const filterByCategoryAndGenre = (categoryIds = [], genreIds = []) => {
    if (!acts) return
    let filtered = acts

    // 篩選活動類別
    if (categoryIds.length > 0) {
      filtered = filtered.filter((act) => categoryIds.includes(act.category_id))
    }

    // 篩選音樂類型
    if (genreIds.length > 0) {
      filtered = filtered.filter((act) => genreIds.includes(act.music_genre_id))
    }
    setDisplayActs(filtered)
  }

  // sort 通用
  const sortByKey = (key = 'id', order = 'asc') => {
    const sorted = [...displayActs].sort((x, y) => {
      if (key === 'price') {
        x = x.type[0].price
        y = y.type[0].price
      } else if (key === 'date') {
        x = new Date(x.date_start).getTime()
        y = new Date(y.date_start).getTime()
      } else {
        x = x.id
        y = y.id
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

    const randomIndicesArray = Array.from(randomIndices);
    const randomImages = randomIndicesArray.map(
      (index) => acts[index].media.split(',')[0]
    )

    // console.log(randomIndices);
    return {randomImages, randomIds:randomIndicesArray}
  }

  return {
    displayActs,
    isLoading,
    filterByCategoryAndGenre,
    sortByKey,
    getRandomPhotos,
  }
}
