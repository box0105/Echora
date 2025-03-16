'use client'

import React, { useEffect, useState } from 'react'
import { useActivity } from '@/hooks/use-activity'

import '@fortawesome/fontawesome-free/css/all.min.css'
import './_styles/act.scss'

import ActivityList from './_components/ActivityList'
import FilterBar from './_components/FilterBar'
import FilterPanel from './_components/FilterPanel'
import HeroSection from './_components/HeroSection'
import { toastInfo } from '@/hooks/use-toast'

export default function ActivityPage() {
  // 從 ActivityContext 取出 Data, sort & filter & search
  const { acts, isLoading, updateQueryParams, randomImages, randomIds } =
    useActivity()

  useEffect(() => {
    if (!isLoading && acts && acts.length === 0) toastInfo('無找到相關活動')
  }, [acts, isLoading])

  // Filter Aside Switch
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  if (isLoading) return <h3>網頁載入中，請稍後...</h3>
  return (
    <div className="b-header-padding">
      <div className="b-container b-table-page px-0 ">
        <HeroSection
          title="2025 全台音樂祭"
          subTitle="一同締造屬於你的冒險拾光"
          images={randomImages}
          ids={randomIds}
        />
      </div>

      <FilterBar
        actNum={acts?.length}
        onOpen={() => setIsFilterOpen(!isFilterOpen)}
        onChange={updateQueryParams}
      />

      <div className="b-container b-table-page">
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(!isFilterOpen)}
          onChange={updateQueryParams}
        />
        <ActivityList data={acts} numPerPage={6} bias={-140} />
      </div>
    </div>
  )
}
