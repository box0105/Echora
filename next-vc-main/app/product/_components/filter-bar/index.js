'use client'

import { useEffect, useState } from 'react'
import './filter-bar.scss'
import {
  useGetBrands,
  useGetColors,
  useGetColorPalette,
} from '@/services/rest-client/use-products'

export default function FilterBar({
  filterOpen,
  setFilterOpen,
  generateQueryString,
  criteria,
  // setCriteria,
  queryString,
  setQueryString,
  brandIds,
  setBrandIds,
  colorPids,
  setColorPids,
  colorIds,
  setColorIds,
  getPdData,
  // handleSearch,
}) {
  // fetch brands, colors, colorpalette
  const { brands } = useGetBrands()
  const { colors } = useGetColors()
  const { colorpalette } = useGetColorPalette()

  // 執行篩選查詢 問題-queryString沒同步
  const handleSearch = () => {
    //更新查詢字串queryString
    // setQueryString(generateQueryString(criteria))
    console.log('查詢字串:', queryString)
    console.log(criteria)
    //fetch取得產品資訊
    getPdData(queryString)

    setFilterOpen(false)
  }

  //criteria改變時即時更新查詢字串queryString
  useEffect(() => {
    setQueryString(generateQueryString(criteria))
  }, [criteria])

  //設定color palette狀態
  const [colorSeries, setColorSeries] = useState({})

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
                  {brands.map((brand) => (
                    <li className="pb-3" key={brand.id}>
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          value={brand.id}
                          id={`${brand.id}`}
                          checked={brandIds.includes(brand.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBrandIds([...brandIds, brand.id])
                            } else {
                              setBrandIds(
                                brandIds.filter((id) => id !== brand.id)
                              )
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`${brand.id}`}
                        >
                          <h6 className="h7">{brand.name}</h6>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="g-palette-sec">
                <div className="g-filter-title py-4">
                  <h6 className="mb-0">色系類別</h6>
                </div>
                <div className="g-series-sec d-flex flex-wrap gap-1 pt-4 pb-3">
                  {colorpalette.map((colorseries) => (
                    <div
                      className={`g-series g-series${colorseries.id} ${
                        colorSeries[colorseries.id] ? 'active' : ''
                      }`}
                      key={colorseries.id}
                      onClick={() => {
                        setColorSeries((prev)=>{
                          const updatedColorSeries = { ...prev, [colorseries.id]: !prev[colorseries.id] }
                          if (!prev[colorseries.id]) {
                          setColorPids([...colorPids, colorseries.id])
                        } else {
                          setColorPids(colorPids.filter((id) => id !== colorseries.id))
                        }
                          return updatedColorSeries
                        })
                      }}
                    >
                      <h6 className="h7 mb-0">{colorseries.name}</h6>
                      <p className="mb-0" style={{ fontWeight: 500 }}>
                        {colorseries.cname}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="g-color-sec">
                <div className="g-filter-title py-4">
                  <h6 className="mb-0">顏色</h6>
                </div>
                <div className="g-color-filter pt-4 pb-3">
                  {colors.map((color) => (
                    <img src={`/images/product/list/${color.color_image}`} />
                  ))}
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
                          <span style={{ color: 'var(--grey500)' }}>(171)</span>
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
                          <span style={{ color: 'var(--grey500)' }}>(171)</span>
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
                          <span style={{ color: 'var(--grey500)' }}>(171)</span>
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
                          <span style={{ color: 'var(--grey500)' }}>(171)</span>
                        </h6>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="g-action pt-4 text-center">
              <button className="g-action-btn" onClick={handleSearch}>
                <h6 className="mb-0">顯示產品</h6>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
