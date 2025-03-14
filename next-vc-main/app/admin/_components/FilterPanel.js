'use client'

import React from 'react'
import { useState } from 'react'
// import FormDate from '@/app/activity/_components/FormDate'
// import PriceSlider from '@/app/activity/_components/PriceSlider'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function FilterPanel() {
  const [activeOption, setActiveOption] = useState(null)
  const [activeOption2, setActiveOption2] = useState(null)
  return (
    <form className="row gx-4 gy-4">
      <div className="d-flex justify-content-between align-items-center w-100">
        <h4>
          <button className="b-btn-unstyled" type="button">
            清除篩選條件
          </button>
        </h4>
        {/* <button className="b-btn-unstyled">
          <i className="fa-solid fa-xmark" />
        </button> */}
      </div>

      {/* 選項 */}
      <div className="row gy-3 gx-4 d-flex align-items-center">
        <div className="col-auto col-sm-1">
          <h5>選項</h5>
        </div>
        <div className="col-12 col-sm-auto">
          <label
            // 雖然這頁挺紅的，但不會影響運作
            className={`form-label ${
              activeOption === 'activity' ? 'active' : ''
            }`}
            onClick={() => setActiveOption('activity')}
            data-bs-toggle="collapse"
            data-bs-target="#activityOptions"
          >
            活動類型
          </label>
        </div>
        <div className="col-12 col-sm-auto">
          <label
            className={`form-label ${activeOption === 'music' ? 'active' : ''}`}
            onClick={() => setActiveOption('music')}
            data-bs-toggle="collapse"
            data-bs-target="#musicOptions"
          >
            音樂類型
          </label>
        </div>
        <div className="col-12 col-sm-auto">
          <label
            className={`form-label ${activeOption === 'city' ? 'active' : ''}`}
            onClick={() => setActiveOption('city')}
            data-bs-toggle="collapse"
            data-bs-target="#cityOptions"
          >
            城市
          </label>
        </div>
      </div>
      {/* collapse */}
      <div className="row gy-0 gx-4 d-flex align-items-center">
        <div className="col-12">
          <div className="accordion" id="filterOptions">
            <div
              id="activityOptions"
              className="collapse"
              data-bs-parent="#filterOptions"
            >
              <div className="b-option-container">
                <input
                  type="checkbox"
                  id="activity-festival"
                  name="activity"
                  className="d-none"
                />
                <label
                  htmlFor="activity-festival"
                  className="btn btn-outline-secondary"
                >
                  音樂祭
                </label>
                <input
                  type="checkbox"
                  id="activity-event"
                  name="activity"
                  className="d-none"
                />
                <label
                  htmlFor="activity-event"
                  className="btn btn-outline-secondary"
                >
                  音樂活動
                </label>
                <input
                  type="checkbox"
                  id="activity-concert"
                  name="activity"
                  className="d-none"
                />
                <label
                  htmlFor="activity-concert"
                  className="btn btn-outline-secondary"
                >
                  演唱會
                </label>
                <input
                  type="checkbox"
                  id="activity-party"
                  name="activity"
                  className="d-none"
                />
                <label
                  htmlFor="activity-party"
                  className="btn btn-outline-secondary"
                >
                  電音派對
                </label>
              </div>
            </div>
            <div
              id="musicOptions"
              className="collapse"
              data-bs-parent="#filterOptions"
            >
              <div className="b-option-container">
                <input
                  type="checkbox"
                  id="music-pop"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-pop"
                  className="btn btn-outline-secondary"
                >
                  流行音樂
                </label>

                <input
                  type="checkbox"
                  id="music-classical"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-classical"
                  className="btn btn-outline-secondary"
                >
                  古典音樂
                </label>

                <input
                  type="checkbox"
                  id="music-symphony"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-symphony"
                  className="btn btn-outline-secondary"
                >
                  交響樂
                </label>

                <input
                  type="checkbox"
                  id="music-rock"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-rock"
                  className="btn btn-outline-secondary"
                >
                  搖滾樂
                </label>

                <input
                  type="checkbox"
                  id="music-hiphop"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-hiphop"
                  className="btn btn-outline-secondary"
                >
                  嘻哈
                </label>

                <input
                  type="checkbox"
                  id="music-anime"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-anime"
                  className="btn btn-outline-secondary"
                >
                  動漫
                </label>

                <input
                  type="checkbox"
                  id="music-rnb"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-rnb"
                  className="btn btn-outline-secondary"
                >
                  R&B
                </label>

                <input
                  type="checkbox"
                  id="music-kpop"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-kpop"
                  className="btn btn-outline-secondary"
                >
                  K-POP
                </label>

                <input
                  type="checkbox"
                  id="music-jpop"
                  name="music"
                  className="d-none"
                />
                <label
                  htmlFor="music-jpop"
                  className="btn btn-outline-secondary"
                >
                  J-POP
                </label>
              </div>
            </div>
            <div
              id="cityOptions"
              className="collapse"
              data-bs-parent="#filterOptions"
            >
              <div className="b-option-container">
                <input
                  type="radio"
                  id="city-taipei"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-taipei"
                  className="btn btn-outline-secondary"
                >
                  台北市
                </label>
                <input
                  type="radio"
                  id="city-newtaipei"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-newtaipei"
                  className="btn btn-outline-secondary"
                >
                  新北市
                </label>
                <input
                  type="radio"
                  id="city-keelung"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-keelung"
                  className="btn btn-outline-secondary"
                >
                  基隆市
                </label>
                <input
                  type="radio"
                  id="city-taoyuan"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-taoyuan"
                  className="btn btn-outline-secondary"
                >
                  桃園市
                </label>
                <input
                  type="radio"
                  id="city-hsinchu"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-hsinchu"
                  className="btn btn-outline-secondary"
                >
                  新竹市
                </label>
                <input
                  type="radio"
                  id="city-hsinchu-county"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-hsinchu-county"
                  className="btn btn-outline-secondary"
                >
                  新竹縣
                </label>
                <input
                  type="radio"
                  id="city-miaoli"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-miaoli"
                  className="btn btn-outline-secondary"
                >
                  苗栗縣
                </label>
                <input
                  type="radio"
                  id="city-taichung"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-taichung"
                  className="btn btn-outline-secondary"
                >
                  台中市
                </label>
                <input
                  type="radio"
                  id="city-changhua"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-changhua"
                  className="btn btn-outline-secondary"
                >
                  彰化縣
                </label>
                <input
                  type="radio"
                  id="city-nantou"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-nantou"
                  className="btn btn-outline-secondary"
                >
                  南投縣
                </label>
                <input
                  type="radio"
                  id="city-yunlin"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-yunlin"
                  className="btn btn-outline-secondary"
                >
                  雲林縣
                </label>
                <input
                  type="radio"
                  id="city-chiayi"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-chiayi"
                  className="btn btn-outline-secondary"
                >
                  嘉義市
                </label>
                <input
                  type="radio"
                  id="city-chiayi-county"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-chiayi-county"
                  className="btn btn-outline-secondary"
                >
                  嘉義縣
                </label>
                <input
                  type="radio"
                  id="city-tainan"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-tainan"
                  className="btn btn-outline-secondary"
                >
                  台南市
                </label>
                <input
                  type="radio"
                  id="city-kaohsiung"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-kaohsiung"
                  className="btn btn-outline-secondary"
                >
                  高雄市
                </label>
                <input
                  type="radio"
                  id="city-pingtung"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-pingtung"
                  className="btn btn-outline-secondary"
                >
                  屏東縣
                </label>
                <input
                  type="radio"
                  id="city-yilan"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-yilan"
                  className="btn btn-outline-secondary"
                >
                  宜蘭縣
                </label>
                <input
                  type="radio"
                  id="city-hualien"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-hualien"
                  className="btn btn-outline-secondary"
                >
                  花蓮縣
                </label>
                <input
                  type="radio"
                  id="city-taitung"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-taitung"
                  className="btn btn-outline-secondary"
                >
                  台東縣
                </label>
                <input
                  type="radio"
                  id="city-penghu"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-penghu"
                  className="btn btn-outline-secondary"
                >
                  澎湖縣
                </label>
                <input
                  type="radio"
                  id="city-kinmen"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-kinmen"
                  className="btn btn-outline-secondary"
                >
                  金門縣
                </label>
                <input
                  type="radio"
                  id="city-matsu"
                  name="city"
                  className="d-none"
                />
                <label
                  htmlFor="city-matsu"
                  className="btn btn-outline-secondary"
                >
                  連江縣
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 日期 */}
      <div className="row gy-3 gx-4 d-flex align-items-center">
        <div className="col-auto col-sm-1">
          <h5 className="mb-0">日期</h5>
        </div>
        <div className="col-12 col-sm-auto">
          <label
            className={`form-label mb-0 ${
              activeOption2 === 'day7' ? 'active' : ''
            }`}
            onClick={() => setActiveOption2('day7')}
          >
            7天內
          </label>
        </div>
        <div className="col-12 col-sm-auto">
          <label
            className={`form-label mb-0 ${
              activeOption2 === 'day30' ? 'active' : ''
            }`}
            onClick={() => setActiveOption2('day30')}
          >
            30天內
          </label>
        </div>
        <div className="col-12 col-sm-auto">
          {/* <FormDate /> */}
          {/* <input className="px-3" type="text" name="datetimes" /> */}
        </div>
      </div>
      {/* 價錢 */}
      {/* <div className="row gy-3 gx-4 d-flex align-items-center">
        <div className="col-auto col-sm-1">
          <h5 className="mb-0">價錢</h5>
        </div>
        <div className="col-12 col-sm-auto">
          <PriceSlider />
        </div>
      </div> */}

      {/* <button className="b-btn b-load-btn mb-1">顯示活動</button> */}
    </form>
  )
}
