'use client'

import React, { useState } from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../_styles/bootstrap.scss'
import './_styles/act.scss'
import './_styles/act-font.scss'

import ActivityList from './_components/ActivityList';
import FilterPanel from './_components/FilterPanel';
import HeroSection from './_components/HeroSection';
import Title from './_components/Title';

export default function ActivityPage() {
  // test data
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
      title: '新北耶誕城',
      category: '音樂活動',
      date: '114/02/10 ~ 114/02/12',
      genre: '搖滾樂',
      price: 'NT$ 1,500',
      location: '台北小巨蛋',
      image: '/images/activity/共生音樂節/main-2.jpg'
    }
  ];
  const images = ["cover.jpeg", "main-1.jpg", "main-2.jpg"];

  // Filter Switch
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className="container-fluid">
        <HeroSection title="2025 全台音樂祭" subTitle="一同締造屬於你的冒險拾光" images={images} />
        
        <Title title="音樂祭" subTitle="流行音樂"/>

        {/* filter & order 之後套關關的 */}
        <div className="b-filter-bar">
          <div className="b-container d-flex justify-content-between">
            <h4>04 活動</h4>
            <div className="b-filters d-flex align-items-baseline">
              <button className="b-filter b-btn-unstyled d-flex align-items-baseline" onClick={() => setIsFilterOpen(!isFilterOpen)}>
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