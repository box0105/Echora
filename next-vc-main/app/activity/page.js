'use client'

import React, { useState } from 'react'
import { useActivity } from '@/hooks/use-activity'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/bootstrap.scss'
import './_styles/act.scss'
import './_styles/act-font.scss'

import ActivityList from './_components/ActivityList'
import FilterPanel from './_components/FilterPanel'
import HeroSection from './_components/HeroSection'
import Title from './_components/Title'

export default function ActivityPage() {
  // Fetch Data, sort & filter & search
  const {
    displayActs,
    isLoading,
    sortByKey,
    getRandomPhotos,
  } = useActivity(`http://localhost:3005/api/activities/`);


  // Filter Switch
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  if (isLoading) return <h3>網頁載入中，請稍後...</h3>

   // Get random photos
   const randomPhotos = getRandomPhotos(3);

  return (
    <div className="b-container px-0">
      <HeroSection
        title="2025 全台音樂祭"
        subTitle="一同締造屬於你的冒險拾光"
        images={randomPhotos}
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
              onClick={() => sortByKey('price', 'desc')}
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
