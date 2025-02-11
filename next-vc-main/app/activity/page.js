'use client'

export default function ActivityPage() {

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
                  <label htmlFor="check1">
                    <h6>音樂祭</h6>
                  </label>
                </div>
                <div className="b-form-checkbox d-flex align-items-center">
                  <input type="checkbox" defaultValue id="cate2" />
                  <label htmlFor="check2">
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
          {/* act list */}
          <div className="b-act-list d-flex flex-column">
            <div className="row row-cols-1 row-cols-xxl-2 gx-0 gy-5">
              {/* act */}
              <div className="col">
                <div className="card">
                  <div className="row g-0">
                    {/* card-image */}
                    <div className="col-4 col-lg-6">
                      <img className="object-fit-cover w-100 h-100" src="/images/activity/浮現祭/main-1.jpg" alt />
                    </div>
                    {/* card-body */}
                    <div className="col-8 col-lg-6">
                      <div className="card-body d-flex flex-column">
                        <div className="b-text d-flex flex-column">
                          <h4 className="b-sm-none">音樂祭</h4>
                          <h2 className="card-title"><a href="act-detail.html">裂變景觀 jonCates 與 Jason Cole
                            Mager雙人展 Two-person
                            show</a></h2>
                          <div className="h5">日期 : 114/01/05 ~ 114/03/02</div>
                          <h5 className="card-text b-tag">流行音樂</h5>
                          <h6 className="card-text ">票價 : 免費入場</h6>
                          <h6 className="b-sm-none">地點 : Project Space 110 新店藝術空間</h6>
                        </div>
                        <a className="b-btn b-sm-none" href="https://www.google.com/maps" target="_blank">查看地圖
                          {/* <i class="ms-3 fa-solid fa-map"></i>
                              <i class="ms-3 fa-regular fa-map"></i> */}
                          <i className="ms-2 fa-solid fa-location-arrow" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* load more */}
            <button className="b-btn b-load-btn">瀏覽更多</button>
          </div>
        </div>
      </div>
    </>
  )
}