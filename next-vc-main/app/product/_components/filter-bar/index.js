'use client'

import "./filter-bar.scss"
import {useGetBrands, useGetColors, useGetColorPaltte} from "@/services/rest-client/use-products"

export default function FilterBar({filterOpen, setFilterOpen}) {
  const brands = useGetBrands()

    return (
        <>
        <section className={`g-filter-sec ${filterOpen ? 'active' : ''}`}>
          <div className="container-fluid p-0">
            <div className="g-filter-bar">
              <div className="g-clear d-flex justify-content-between">
                <a href="">
                  <h6 className="g-clear-link mb-0">清除篩選條件</h6>
                </a>
                <img
                  width="16px"
                  src="/images/product/list/x.svg"
                  onClick={() => {
                    setFilterOpen(false)
                  }}
                />
              </div>
              <div className="g-filter-scroll">
                <div className="g-brand-sec">
                  <div className="g-filter-title py-4">
                    <h6 className="mb-0">品牌</h6>
                  </div>
                  <ul className="list-unstyled mt-4">
                  {brands.map((v)=>{})}
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
        </>
    )
}