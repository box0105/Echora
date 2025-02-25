'use client'

import React, { useEffect, useState } from 'react'
import { useFetch } from '@/hooks/use-fetch'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/bootstrap.scss'
import './_styles/act.scss'
import './_styles/act-font.scss'

import ActivityList from './_components/ActivityList'
import FilterPanel from './_components/FilterPanel'
import HeroSection from './_components/HeroSection'
import Title from './_components/Title'

export default function ActivityPage() {
  // Fetch Data
  const { data: acts, isLoading } = useFetch(
    `http://localhost:3005/api/activities/`
  )

  const [displayActs, setDisplayActs] = useState([])
  useEffect(() => {
    if (acts) {
      setDisplayActs(acts)
    }
  }, [acts])

  // Filter Switch
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  if (isLoading) return <h3>網頁載入中，請稍後...</h3>

  const sortPrice = (order) => {
    const sorted = [...acts].sort((a, b) => {
      const x = a.type[0].price
      const y = b.type[0].price
      return order === 'desc' ? y - x : x - y
    })
    setDisplayActs(sorted)
  }

  const sortId = (order) => {
    const sorted = [...acts].sort((a, b) => {
      const x = a.id
      const y = b.id
      return order === 'desc' ? y - x : x - y
    })
    setDisplayActs(sorted)
  }

  const sortDate = (order) => {
    const sorted = [...acts].sort((a, b) => {
      const x = new Date(a.date_start).getTime()
      const y = new Date(b.date_start).getTime()
      return order === 'desc' ? y - x : x - y
    })
    setDisplayActs(sorted)
  }

  // 隨機選取封面照
  // const getRandomPhotos = (acts, num) => {
  //   const randomIndices = new Set()

  //   // C(全部, num)
  //   while (randomIndices.size < num) {
  //     const randomIndex = Math.floor(Math.random() * acts.length)
  //     randomIndices.add(randomIndex)
  //   }

  //   const photos = Array.from(randomIndices).map(
  //     (index) => acts[index].media.split(',')[0]
  //   )

  //   return photos
  // }
  // const randomPhotos = getRandomPhotos(acts, 3)

  return (
    <div className="b-container px-0">
      <HeroSection
        title="2025 全台音樂祭"
        subTitle="一同締造屬於你的冒險拾光"
        // images={randomPhotos}
      />

      <div className="b-container">
        <Title _title="音樂祭/ 流行音樂" />
      </div>

      <div className="b-filter-bar">
        <div className="b-container d-flex justify-content-between">
          <h4>04 活動</h4>
          <div className="b-filters d-flex align-items-baseline">
            <button
              className="b-filter b-btn-unstyled d-flex align-items-baseline"
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <i className="fa-solid fa-filter" />
              <h4>篩選</h4>
            </button>
            <button
              className="b-order b-btn-unstyled d-flex align-items-baseline"
              type="button"
              onClick={() => sortDate('desc')}
            >
              <i className="fa-solid fa-arrow-up-wide-short" />
              <h4>排序</h4>
            </button>
          </div>
        </div>
      </div>

      <div className="b-container">
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(!isFilterOpen)}
        />
        <ActivityList data={displayActs} numPerPage={6} />
      </div>
    </div>
  )
}
