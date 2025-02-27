'use client'

import React, { useState } from 'react'
import { useActivity } from '@/hooks/use-activity'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/bootstrap.scss'
import './_styles/act.scss'
import './_styles/act-font.scss'

import ActivityList from './_components/ActivityList'
import FilterBar from './_components/FilterBar'
import FilterPanel from './_components/FilterPanel'
import HeroSection from './_components/HeroSection'

export default function ActivityPage() {
  // Fetch Data
  const { displayActs, isLoading, sortByKey, randomImages, randomIds } =
    useActivity(`http://localhost:3005/api/activities/`)

  // Filter Switch
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  if (isLoading) return <h3>網頁載入中，請稍後...</h3>
  return (
    <div className="b-container px-0">
      <HeroSection
        title="2025 全台音樂祭"
        subTitle="一同締造屬於你的冒險拾光"
        images={randomImages}
        ids={randomIds}
      />
      {/* <div className="b-container">
        <Title _title="音樂祭/ 流行音樂" />
      </div> */}

      <FilterBar
        actNum={displayActs.length}
        onOpen={() => setIsFilterOpen(!isFilterOpen)}
        sort={sortByKey}
      />

      <div className="b-container">
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(!isFilterOpen)}
        />
        <ActivityList data={displayActs} numPerPage={3} />
      </div>
    </div>
  )
}
