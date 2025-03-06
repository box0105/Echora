'use client'

import DataTable from '../_components/DataTable'

export default function AdminActivity() {
  return (
    <div className="container-fluid">
      {/* Title & Search */}
      <div className="heading row justify-content-between align-items-center mb-4">
        <div className="col-auto">
          <h2 className="mb-0">活動後台管理</h2>
        </div>
        <div className="col-auto my-2">
          <div className="input-group mx-auto">
            <input
              type="text"
              className="form-control"
              name="search"
              placeholder="搜尋活動名稱、演出陣容"
            />
            <span className="input-group-text">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="b-filter-card card p-4 shadow-sm">
        <form className="row gx-4 gy-4">
          <div className="b-filter-title d-flex justify-content-between align-items-center w-100">
            <h4>
              <button className="b-btn-unstyled">清除篩選條件</button>
            </h4>
            <button className="b-btn-unstyled">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          {/* 選項 */}
          <div className="row gy-3 gx-4 d-flex align-items-center">
            <div className="col-auto col-sm-1">
              <h5>選項</h5>
            </div>
            <div className="col-12 col-sm-auto">
              <label
                className="form-label active"
                data-bs-toggle="collapse"
                data-bs-target="#activityOptions"
              >
                活動類型
              </label>
            </div>
            <div className="col-12 col-sm-auto">
              <label
                className="form-label"
                data-bs-toggle="collapse"
                data-bs-target="#musicOptions"
              >
                音樂類型
              </label>
            </div>
            <div className="col-12 col-sm-auto">
              <label
                className="form-label"
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
                      defaultValue="音樂祭"
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
                      defaultValue="音樂活動"
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
                      id="activity-party"
                      name="activity"
                      defaultValue="電音派對"
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
                      defaultValue="流行音樂"
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
                      id="music-rock"
                      name="music"
                      defaultValue="古典音樂"
                      className="d-none"
                    />
                    <label
                      htmlFor="music-rock"
                      className="btn btn-outline-secondary"
                    >
                      古典音樂
                    </label>
                    <input
                      type="checkbox"
                      id="music-jazz"
                      name="music"
                      defaultValue="交響樂"
                      className="d-none"
                    />
                    <label
                      htmlFor="music-jazz"
                      className="btn btn-outline-secondary"
                    >
                      交響樂
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
                      defaultValue="台北市"
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
                      defaultValue="新北市"
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
                      defaultValue="基隆市"
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
                      defaultValue="桃園市"
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
                      defaultValue="新竹市"
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
                      defaultValue="新竹縣"
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
                      defaultValue="苗栗縣"
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
                      defaultValue="台中市"
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
                      defaultValue="彰化縣"
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
                      defaultValue="南投縣"
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
                      defaultValue="雲林縣"
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
                      defaultValue="嘉義市"
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
                      defaultValue="嘉義縣"
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
                      defaultValue="台南市"
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
                      defaultValue="高雄市"
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
                      defaultValue="屏東縣"
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
                      defaultValue="宜蘭縣"
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
                      defaultValue="花蓮縣"
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
                      defaultValue="台東縣"
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
                      defaultValue="澎湖縣"
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
                      defaultValue="金門縣"
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
                      defaultValue="連江縣"
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
              <label className="form-label mb-0">7天內</label>
            </div>
            <div className="col-12 col-sm-auto">
              <label className="form-label mb-0">30天內</label>
            </div>
            <div className="col-12 col-sm-auto">
              <input className="px-3" type="text" name="datetimes" />
            </div>
          </div>
          {/* 價錢 */}
          <div className="row gy-3 gx-4 d-flex align-items-center">
            <div className="col-auto col-sm-1">
              <h5 className="mb-0">價錢</h5>
            </div>
            <div className="col-12 col-sm-auto">
              <label className="form-label mb-0">價錢 bar</label>
            </div>
          </div>
          <button className="b-btn b-load-btn mb-1">顯示活動</button>
        </form>
      </div>

      <DataTable />
    </div>
  )
}
