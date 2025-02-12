'use client'

import React, { useState, useEffect } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../_styles/bootstrap.scss'
import './_styles/act.scss'
import './_styles/act-font.scss'

import ActivityList from './_components/ActivityList';

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
          
          {/* 篩選條件 */}
          <div className="b-filter-slide d-flex flex-column align-items-center d-none ">
            <div className="b-filter-title d-flex justify-content-between align-items-center w-100">
              <h4><button className="b-btn-unstyled">清除篩選條件</button></h4>
              <button className="b-filter-close-btn b-btn-unstyled">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <form className="w-100 b-filter-conds d-flex flex-column align-items-start align-self-stretch">
              {/* 活動類型 cate */}
              <div className=" d-flex flex-column align-self-stretch">
                <h4>活動類型</h4>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="cate1" />
                  <label htmlFor="cate1">
                    <h6>音樂祭</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="cate2" />
                  <label htmlFor="cate2">
                    <h6>音樂活動</h6>
                  </label>
                </div>
              </div>
              {/* 音樂類型 genre */}
              <div className=" d-flex flex-column align-self-stretch">
                <h4>音樂類型</h4>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre1" />
                  <label htmlFor="genre1">
                    <h6>流行音樂</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre2" />
                  <label htmlFor="genre2">
                    <h6>古典音樂</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre3" />
                  <label htmlFor="genre3">
                    <h6>交響樂</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre4" />
                  <label htmlFor="genre4">
                    <h6>搖滾樂</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre5" />
                  <label htmlFor="genre5">
                    <h6>嘻哈</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre6" />
                  <label htmlFor="genre6">
                    <h6>動漫</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre7" />
                  <label htmlFor="genre7">
                    <h6>R&B</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre8" />
                  <label htmlFor="genre8">
                    <h6>K-POP</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="genre9" />
                  <label htmlFor="genre9">
                    <h6>J-POP</h6>
                  </label>
                </div>
              </div>
              {/* 活動日期 date */}
              <div className=" d-flex flex-column align-self-stretch">
                <h4>日期</h4>
                <div className="b-form-date">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col">
                      <input type="date" name="date-start" defaultValue="2025-01-23" className="w-100" />
                    </div>
                    <div className="col-1 text-center">~</div>
                    <div className="col">
                      <input type="date" name="date-end" defaultValue="2025-02-23" className="w-100" />
                    </div>
                  </div>
                </div>
              </div>
              {/* 城市 city */}
              <div className=" d-flex flex-column align-self-stretch">
                <h4>城市</h4>
                <select className="b-form-select">
                  <option selected>請選擇城市</option>
                  <option value={1}>基隆市</option>
                  <option value={2}>台北市</option>
                  <option value={3}>新北市</option>
                  <option value={4}>桃園市</option>
                  <option value={5}>新竹市</option>
                  <option value={6}>新竹縣</option>
                  <option value={7}>苗栗縣</option>
                  <option value={8}>台中市</option>
                  <option value={9}>彰化縣</option>
                  <option value={10}>南投縣</option>
                  <option value={11}>雲林縣</option>
                  <option value={12}>嘉義市</option>
                  <option value={13}>嘉義縣</option>
                  <option value={14}>台南市</option>
                  <option value={15}>高雄市</option>
                  <option value={16}>屏東縣</option>
                  <option value={17}>宜蘭縣</option>
                  <option value={18}>花蓮縣</option>
                  <option value={19}>台東縣</option>
                  <option value={20}>澎湖縣</option>
                  <option value={21}>金門縣</option>
                  <option value={22}>連江縣</option>
                </select>
              </div>
              {/* 價錢 ticket_price */}
              <div className=" d-flex flex-column align-self-stretch">
                <h4>價錢</h4>
                <div className="d-flex flex-column align-items-center gap-4">
                  {/* <div class="b-slide-bar w-100 position-relative">
                  <div class="b-toggle position-absolute"></div>
              </div> */}
                  <input type="range" className="form-range" min={0} max={100} step={10} />
                  <div className="h6">低於 NT$ 79,000</div>
                </div>
                <button className="b-btn b-load-btn">顯示商品</button>
              </div>
            </form>
          </div>

          <ActivityList data = {activityData}/>
        </div>
      </div>
    </>
  )
}