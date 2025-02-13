'use client'

import React, { useState, useEffect } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../_styles/bootstrap.scss'
import './_styles/act.scss'
import './_styles/act-font.scss'

import ActivityList from './_components/ActivityList';
import FilterPanel from './_components/FilterPanel';

export default function ActivityPage() {
  // 測試資料
  const activityData = [
    {
      id: 1,
      title: '裂變景觀 jonCates 與 Jason Cole Mager雙人展',
      category: '音樂祭',
      date: '114/01/05 ~ 114/03/02',
      genre: '流行音樂',
      price: '免費入場',
      location: 'Project Space 110 新店藝術空間',
      image: '/images/activity/浮現祭/main-1.jpg'
    },
    {
      id: 2,
      title: '裂變景觀 jonCates 與 Jason Cole Mager雙人展',
      category: '音樂活動',
      date: '114/02/10 ~ 114/02/12',
      genre: '搖滾樂',
      price: 'NT$ 1,500',
      location: '台北小巨蛋',
      image: '/images/activity/共生音樂節/main-2.jpg'
    }
  ];

  // 篩選視窗開關
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  return (
    <>
      <div className="container-fluid">
        {/* hero */}
        <div className="b-hero position-relative">
          <div className={`${['b-text']} position-absolute b-sm-none`}>
            <div className={`${['b-hero-title']}`}>2025 全台音樂祭</div>
            <div className="b-hero-subtitle">一同締造屬於你的冒險拾光</div>
          </div>
        </div>

        {/* title */}
        <div className="b-container">
          <div className="b-title d-flex align-items-baseline">
            <h1 className="mb-0">音樂祭</h1>
            <h4 className="mb-0">/ 流行音樂</h4>
          </div>
        </div>

        {/* filter & order */}
        <div className="b-filter-bar">
          <div className="b-container d-flex justify-content-between">
            <h4>04 活動</h4>
            <div className="b-filters d-flex align-items-baseline">
              <button className="b-filter b-btn-unstyled d-flex align-items-baseline">
                <i className="fa-solid fa-filter" />
                <h4>篩選</h4>
              </button>
              <button className="b-order b-btn-unstyled d-flex align-items-baseline">
                <i className="fa-solid fa-arrow-up-wide-short" />
                <h4>排序</h4>
              </button>
            </div>
          </div>
        </div>

        <div className="b-container">
          <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(!isFilterOpen)} />
          <ActivityList data={activityData} />
        </div>
      </div>
    </>
  )
}