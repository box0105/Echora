'use client'
import "./list.scss"
import ProductCard from "../_components/product-card"

export default function ProductListPage() {
  return (
    <>
      <div>
        <div className="g-pdlist-title px-modified">
          <div className="container-fluid p-0">
            <div className="d-flex align-items-center">
              <h4 className="h4 mb-0">ELECTRIC GUITARS</h4>
              <h4 className="mb-0">電吉他商品</h4>
            </div>
          </div>
        </div>
        <div className="g-pdlist-topbar px-modified">
          <div className="container-fluid d-flex justify-content-between p-0">
            <div className="g-left d-flex align-items-center">
              <h6 className="g-amount mb-0">00 商品</h6>
              <div className="g-fliter d-sm-flex d-none">
                <img src="/images/product/list/filter.svg" />
                <h6 className="mb-0">篩選</h6>
              </div>
            </div>
            <div className="g-right d-flex align-items-center">
              <div className="g-compare d-sm-flex d-none">
                <img src="/images/product/list/check-circle-fill.svg" />
                <h6 className="mb-0">比較</h6>
              </div>
              <div className="g-fliter d-sm-none d-flex">
                <img src="/images/product/list/filter.svg" />
                <h6 className="mb-0">篩選</h6>
              </div>
              <div className="g-order d-flex">
                <img src="/images/product/list/order.svg" />
                <h6 className="mb-0">排序</h6>
              </div>
            </div>
          </div>
        </div>
        <section className="g-pdlist px-modified">
          <div className="container-fluid p-1">
            <div className="row row-cols-xl-4 row-cols-2">
            <ProductCard />
              {/* product-card-start */}
              {/* <div className="col p-2"> 這句應該跑迴圈?*/}
              {/* <div className="col p-2">
                <div className="g-product-card">
                  <div className="g-pd-img d-flex justify-content-center align-items-center">
                    <img
                      className="h-100"
                      src="/images/product/list/0119151776_fen_ins_frt_1_rr-Photoroom.png"
                    />
                  </div>
                  <div className="g-pd-text">
                    <h6 className="h6">
                      Product Name Product Name Product Name
                    </h6>
                    <div className="d-flex gap-3">
                      <h6 className="h6">$79000</h6>
                    </div>
                    <div className="g-color-row">
                      <img
                        width="22px"
                        src="/images/product/list/lightblue.svg"
                      />
                      <img
                        width="22px"
                        src="/images/product/list/darkblue.svg"
                      />
                      <img width="22px" src="/images/product/list/purple.svg" />
                    </div>
                    <p className="p g-color-text">2 colors</p>
                  </div>
                </div>
              </div> */}
              {/* product-card-end */}
            </div>
          </div>
        </section>
        <div className="g-more-sec d-flex justify-content-center align-items-center">
          <button className="g-more-btn">
            <h6 className="mb-0">瀏覽更多</h6>
          </button>
        </div>
        <section className="g-filter-sec">
          <div className="container-fluid p-0">
            <div className="g-filter-bar">
              <div className="g-clear d-flex justify-content-between">
                <a href>
                  <h6 className="g-clear-link mb-0">清除篩選條件</h6>
                </a>
                <img width="16px" src="/images/product/list/x.svg" alt />
              </div>
              <div className="g-filter-scroll">
                <div className="g-brand-sec">
                  <div className="g-filter-title py-4">
                    <h6 className="mb-0">品牌</h6>
                  </div>
                  <ul className="list-unstyled mt-4">
                    <li className="pb-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="gibson"
                        />
                        <label className="form-check-label" htmlFor="gibson">
                          <h6 className="h7">Gibson</h6>
                        </label>
                      </div>
                    </li>
                    <li className="pb-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="fender"
                        />
                        <label className="form-check-label" htmlFor="fender">
                          <h6 className="h7">Fender</h6>
                        </label>
                      </div>
                    </li>
                    <li className="pb-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="yamaha"
                        />
                        <label className="form-check-label" htmlFor="yamaha">
                          <h6 className="h7">Yamaha</h6>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="g-palette-sec">
                  <div className="g-filter-title py-4">
                    <h6 className="mb-0">色系類別</h6>
                  </div>
                  <div className="g-series-sec d-flex flex-wrap gap-1 pt-4 pb-3">
                    <div className="g-series g-series1">
                      <h6 className="h7 mb-0">JSHINE</h6>
                      <p className="mb-0" style={{ fontWeight: 500 }}>
                        曜彩系列
                      </p>
                    </div>
                    <div className="g-series g-series2">
                      <h6 className="h7 mb-0">SUNRISE WOOD</h6>
                      <p className="mb-0" style={{ fontWeight: 500 }}>
                        晨曦木韻系列
                      </p>
                    </div>
                    <div className="g-series g-series3">
                      <h6 className="h7 mb-0">GREY &amp; WHITE</h6>
                      <p className="mb-0" style={{ fontWeight: 500 }}>
                        石韻白系列
                      </p>
                    </div>
                    <div className="g-series g-series4">
                      <h6 className="h7 mb-0">MIDNIGHT CITY</h6>
                      <p className="mb-0" style={{ fontWeight: 500 }}>
                        夜晚城市系列
                      </p>
                    </div>
                  </div>
                </div>
                <div className="g-color-sec">
                  <div className="g-filter-title py-4">
                    <h6 className="mb-0">顏色</h6>
                  </div>
                  <div className="g-color-filter pt-4 pb-3">
                    <img src="/images/product/list/lightblue.svg" />
                    <img src="/images/product/list/darkblue.svg" />
                    <img src="/images/product/list/purple.svg" />
                    <img src="/images/product/list/green.svg" />
                    <img src="/images/product/list/red.svg" />
                    <img src="/images/product/list/yellow.svg" />
                    <img src="/images/product/list/orange.svg" />
                    <img src="/images/product/list/brown.svg" />
                    <img src="/images/product/list/dark-brown.svg" />
                    <img src="/images/product/list/white.svg" />
                    <img src="/images/product/list/grey.svg" />
                    <img src="/images/product/list/black.svg" />
                  </div>
                </div>
                <div className="g-price-sec">
                  <div className="g-filter-title py-4">
                    <h6 className="mb-0">價錢</h6>
                  </div>
                  <ul className="list-unstyled mt-4">
                    <li className="pb-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="price1"
                        />
                        <label className="form-check-label" htmlFor="price1">
                          <h6>
                            NT$50,000以下{' '}
                            <span style={{ color: 'var(--grey500)' }}>
                              (171)
                            </span>
                          </h6>
                        </label>
                      </div>
                    </li>
                    <li className="pb-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="price2"
                        />
                        <label className="form-check-label" htmlFor="price2">
                          <h6>
                            NT$50,000 - NT$100,000{' '}
                            <span style={{ color: 'var(--grey500)' }}>
                              (171)
                            </span>
                          </h6>
                        </label>
                      </div>
                    </li>
                    <li className="pb-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="price3"
                        />
                        <label className="form-check-label" htmlFor="price3">
                          <h6>
                            NT$100,000 - NT$150,000{' '}
                            <span style={{ color: 'var(--grey500)' }}>
                              (171)
                            </span>
                          </h6>
                        </label>
                      </div>
                    </li>
                    <li className="pb-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="price4"
                        />
                        <label className="form-check-label" htmlFor="price4">
                          <h6>
                            NT$200,000以上{' '}
                            <span style={{ color: 'var(--grey500)' }}>
                              (171)
                            </span>
                          </h6>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="g-action pt-4 text-center">
                <button className="g-action-btn">
                  <h6 className="mb-0">顯示產品</h6>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="g-compare-sec px-modified">
          <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className>
                <h6 className="h6">Electric Guitar Comparision</h6>
                <h6 className="mb-0">電吉他商品比較</h6>
              </div>
              <div className="d-flex align-items-center">
                <img src="/images/product/list/drag.svg"/>
                <p className="mb-0">
                  將商品拖曳至方框中
                  <br />
                  最多可比較4款商品
                </p>
                <div className="g-compare-boxes d-flex gap-3">
                  <div className="g-compare-box d-flex justify-content-center align-items-center">
                    <img src="/images/product/list/electric.svg"/>
                  </div>
                  <div className="g-compare-box d-flex justify-content-center align-items-center">
                    <img src="/images/product/list/electric.svg"/>
                  </div>
                  <div className="g-compare-box d-flex justify-content-center align-items-center">
                    <img src="/images/product/list/electric.svg"/>
                  </div>
                  <div className="g-compare-box d-flex justify-content-center align-items-center">
                    <img src="/images/product/list/electric.svg"/>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <button className="g-compare-btn text-center">
                  <h6 className="mb-0">比較O款電吉他</h6>
                </button>
                <button className="g-clear-btn text-center">
                  <h6 className="mb-0">清除全部</h6>
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="g-order-sec">
          <a href>
            <h6>價格由高至低</h6>
          </a>
          <a href>
            <h6>價格由低至高</h6>
          </a>
          <a href>
            <h6>商品名稱 A - Z</h6>
          </a>
          <a href>
            <h6>商品名稱 Z - A</h6>
          </a>
        </div>
      </div>
    </>
  )
}
