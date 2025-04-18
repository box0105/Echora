'use client'

import Slider from '@mui/material/Slider'
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
  setCriteria,
  defaultCriteria,
  queryString,
  setQueryString,
  brandIds,
  setBrandIds,
  colorPids,
  setColorPids,
  colorIds,
  setColorIds,
  getPdData,
  priceGte,
  setPriceGte,
  priceLte,
  setPriceLte,
  setSelectedSort,
}) {
  // fetch brands, colors, colorpalette
  const { brands } = useGetBrands()
  const { colors } = useGetColors()
  const { colorpalette } = useGetColorPalette()

  // 執行篩選查詢
  const handleSearch = () => {
    //更新查詢字串queryString
    // setQueryString(generateQueryString(criteria))
    console.log('查詢字串:', queryString)
    console.log(criteria)
    //fetch取得產品資訊
    getPdData(queryString)
    setFilterOpen(false)
  }

  //設定color palette狀態
  const [colorSeries, setColorSeries] = useState({})
  //設定color狀態
  const [colorActive, setColorActive] = useState({})

  //price slider
  const [value, setValue] = useState([priceGte, priceLte])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setPriceGte(value[0])
    setPriceLte(value[1])
  }, [value])

  return (
    <>
      <button
        className={`g-filter-sec ${filterOpen ? 'active' : ''}`}
        onClick={() => setFilterOpen(false)}
      >
        <div className="container-fluid p-0">
          <button
            className="g-filter-bar"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="g-clear d-flex justify-content-between">
              <button
                className="g-clear-link mb-0"
                onClick={() => {
                  setCriteria(defaultCriteria)
                  setColorSeries({})
                  setColorActive({})
                  setValue([1, 700000])
                  setSelectedSort({ sort: 'price', order: 'ASC' })
                }}
              >
                清除篩選條件
              </button>
              <button
                className="close-button"
                style={{ background: 'none', border: 'none', padding: 0 }}
                onClick={() => setFilterOpen(false)}
                aria-label="Close filter"
                tabIndex={0} // 使其可以通過鍵盤操作
              >
                <img
                  width="16px"
                  src="/images/product/list/x.svg"
                  alt="Close filter"
                />
              </button>
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
                    <button
                      className={`g-series g-series${colorseries.id} ${
                        colorPids.includes(colorseries.id) ? 'active' : ''
                      }`}
                      key={colorseries.id}
                      onClick={() => {
                        if (colorPids.includes(colorseries.id)) {
                          setColorSeries((prev) => ({
                            ...prev,
                            [colorseries.id]: true,
                          }))
                        }
                        setColorSeries((prev) => {
                          const updatedColorSeries = {
                            ...prev,
                            [colorseries.id]: !prev[colorseries.id],
                          }
                          if (!prev[colorseries.id]) {
                            setColorPids([...colorPids, colorseries.id])
                          } else {
                            setColorPids(
                              colorPids.filter((id) => id !== colorseries.id)
                            )
                          }
                          return updatedColorSeries
                        })
                      }}
                    >
                      <h6 className="h7 mb-0">{colorseries.name}</h6>
                      <p className="mb-0" style={{ fontWeight: 500 }}>
                        {colorseries.cname}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="g-color-sec">
                <div className="g-filter-title py-4">
                  <h6 className="mb-0">顏色</h6>
                </div>
                <div className="g-color-filter pt-4 pb-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => {
                        if (colorIds.includes(color.id)) {
                          setColorActive((prev) => ({
                            ...prev,
                            [color.id]: true,
                          }))
                        }
                        setColorActive((prev) => {
                          const updatedColor = {
                            ...prev,
                            [color.id]: !prev[color.id],
                          }
                          if (!prev[color.id]) {
                            setColorIds([...colorIds, color.id])
                          } else {
                            setColorIds(
                              colorIds.filter((id) => id !== color.id)
                            )
                          }
                          return updatedColor
                        })
                      }}
                    >
                      <img
                        src={`/images/product/list/${color.color_image}`}
                        className={colorIds.includes(color.id) ? 'active' : ''}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="g-price-sec">
                <div className="g-filter-title py-4">
                  <h6 className="mb-0">價格</h6>
                </div>
                <div className="pt-4 pb-3">
                  <h6 className="h7 g-price-range mb-3">
                    價格區間 : NT${value[0].toLocaleString()} - $
                    {value[1].toLocaleString()}
                  </h6>
                  <div className="px-2">
                    <Slider
                      value={value}
                      onChange={handleChange}
                      min={1}
                      max={700000}
                      step={50000}
                      sx={{
                        color: 'black', // 滑塊和選中的軌道
                        '& .MuiSlider-thumb': {
                          backgroundColor: 'rgb(58, 58, 58)',
                          width: 16, // 調整滑塊大小
                          height: 16, // 調整滑塊大小
                          '&:focus, &:hover, &.Mui-active': {
                            outline: '6px solid rgba(166, 166, 166, 0.3)',
                            boxShadow: 'none',
                          },
                        },
                        '& .MuiSlider-thumb.Mui-focusVisible': {
                          boxShadow: 'none', // **固定 focus ring，移除漸層**
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: 'rgb(58, 58, 58)', // 選中的範圍
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: 'gray', // 未選中的範圍
                        },
                      }}
                      // valueLabelDisplay="auto"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="h7 g-price-range">1 min</h6>
                    <h6 className="h7 g-price-range">700,000 max</h6>
                  </div>
                </div>
                {/* <ul className="list-unstyled mt-4">
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
                </ul> */}
              </div>
            </div>
            <div className="g-action pt-4 text-center">
              <button className="g-action-btn" onClick={handleSearch}>
                <h6 className="mb-0">顯示產品</h6>
              </button>
            </div>
          </button>
        </div>
      </button>
    </>
  )
}
