import { useEffect, useState } from 'react'
import { useFetch } from './use-fetch'

// Fetch Data, sort & filter & search
export const useActivity = (url) => {
  const { data: acts, isLoading } = useFetch(url)
  const [displayActs, setDisplayActs] = useState([])
  const [randomImages, setRandomImages] = useState([])
  const [randomIds, setRandomIds] = useState([])

  useEffect(() => {
    if (acts) {
      setDisplayActs(acts)
      updateRandomPhotos(3)
    }
  }, [isLoading])

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
  const updateRandomPhotos = (num) => {
    const randomIndices = new Set()
    while (randomIndices.size < num) {
      const randomIndex = Math.floor(Math.random() * acts.length)
      randomIndices.add(randomIndex)
    }

    const randomIndicesArray = Array.from(randomIndices)
    const randomImages = randomIndicesArray.map(
      (index) => acts[index].media.split(',')[0]
    )

    console.log('封面照', randomImages);
    console.log('對應id', randomIndicesArray);
    setRandomImages(randomImages)
    setRandomIds(randomIndicesArray)
  }

  return {
    displayActs,
    isLoading,
    sortByKey,
    randomImages,
    randomIds,
  }
}
