'use client'

import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './_styles/first.scss'
import HeroSection from './_components/HeroSection'
import RentalProcess from './_components/RentalProcess'
import Card from './_components/Rentcard/card'
import List from './_components/List'
import Modfiter from "./_components/fit/fiteerMod"

export default function Page(props) {
  const [isOpen, setIsOpen] = useState(false)
  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(true)
    }
  }
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)


  //
  const [visibleCount, setVisibleCount] = useState(12)

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/rent')
      const data = await res.json()
      console.log(data)
      setData(data.data)
    } catch (err) {
      console.log(err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  console.log(data)




  
  if (isError) return <div>發生錯誤</div>

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div>載入中...</div>
        </div>
      ) : (
        <div>
          <div className="c-backgrund">
            {/* section1 */}
            <div className="c-section1">
              <div className="card text-bg-dark c-section1">
                <HeroSection />
                <RentalProcess />
              </div>
            </div>
          </div>

          {/* section2 */}
          <div className="c-section2-title d-none d-md-block ">
            <div className="container-fluid c-index">
              <div className="c-index-title ">
                <h1>
                  ELECTRIC GUITAR RENTAL PRODUCTS{' '}
                  <span className="h3"> / 電吉他租借商品</span>
                </h1>
              </div>
            </div>
          </div>
          {/* section-mod */}
          <div className="c-section2-title d-block d-md-none pt-5">
            <div className="container-fluid c-index-mod pb-0">
              <div className="col-12">
                <h6 className="c-tit">ELECTRIC GUITAR RENTAL PRODUCTS</h6>
              </div>
              <div className="col">
                <div className=" h6 c-bot p-0">電吉他租借商品</div>
              </div>
              <div
                className=" d-flex mod-sel  justify-content-end"
                onClick={() => setIsOpen(true)}
                onKeyUp={onKeyPressHandler}
                role="button"
                tabindex="0"
              >
                <img
                  src="/images/Rent/select.png"
                  className="pe-1 pt-1 c-icons-img"
                  alt=""
                  style={{ width: '20px', height: '14px' }}
                />
                <div className=" h5 m-0">條件篩選</div>
              </div>
            </div>
          </div>
          {/* section2-body */}
          <div className="c-section2-body d-none d-md-block">
            <div className="container-fluid c-index-1 ;">
              <List data={data} />
            </div>
          </div>
          {/* section-mod */}
          <div
            className={`c-section2-body Mod d-block d-md-none ${
              isOpen ? 'filter-open' : ''
            }`}
          >
            <div className="container-fluid c-index-mod-1">
              <div className="row">
              <Modfiter/>
                {/* <div className="col-12 col-md-3 d-flex flex-column c-lerf-mod c-filter-scroll">
                  <div className="sort ">
                    <div className="row">
                      <div className=" col-11 h5 c-lenav">排序</div>
                      <div
                        className=" col-1 h5 c-lenav"
                        onClick={() => setIsOpen(false)}
                        onKeyUp={onKeyPressHandler}
                        role="button"
                        tabindex="0"
                      >
                        X
                      </div>
                    </div>
                    <ul className=""></ul>
                    <div className="sor-check pt-3">
                      <div className="ch-1 d-flex pb-4 ">
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input focus-ring pb-2"
                            style={{
                              '--bsFocusRingColor': 'rgba(var(--white), 0)',
                            }}
                            type="checkbox"
                            defaultValue
                            id="a-z"
                          />
                          <label className="form-check-label" htmlFor="a-z">
                            <h6 className="h6">產品名稱:A-Z</h6>
                          </label>
                        </div>
                      </div>
                      <div className="ch-1 d-flex pb-4 ">
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input focus-ring"
                            style={{
                              '--bsFocusRingColor': 'rgba(var(--white), 0)',
                            }}
                            type="checkbox"
                            defaultValue
                            id="z-a"
                          />
                          <label className="form-check-label" htmlFor="z-a">
                            <h6 className="h6">產品名稱:Z-A</h6>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="price-top"
                        />
                        <label className="form-check-label" htmlFor="price-top">
                          <h6 className="h6">價格:由低到高</h6>
                        </label>
                      </div>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="price-low"
                        />
                        <label className="form-check-label" htmlFor="price-low">
                          <h6 className="h6">價格:由高到低</h6>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="brand">
                    <div className="h5 c-lenav">品牌</div>
                    <div className="brand-check pt-3">
                      <div className="ch-1 d-flex pb-4 ">
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
                            <h6 className="h6">Gibson</h6>
                          </label>
                        </div>
                      </div>
                      <div className="ch-1 d-flex pb-4 ">
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input focus-ring"
                            style={{
                              '--bsFocusRingColor': 'rgba(var(--white), 0)',
                            }}
                            type="checkbox"
                            defaultValue
                            id="Fender"
                          />
                          <label className="form-check-label" htmlFor="Fender">
                            <h6 className="h6">Fender</h6>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rent title">
                    <div className="h5 c-lenav">租借地址</div>
                    <div className="address-check pt-3">
                      <div className="ch-1 d-flex pb-4 ">
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input focus-ring"
                            style={{
                              '--bsFocusRingColor': 'rgba(var(--white), 0)',
                            }}
                            type="checkbox"
                            defaultValue
                            id="Taipei"
                          />
                          <label className="form-check-label" htmlFor="Taipei">
                            <h6 className="h6">台北店</h6>
                          </label>
                        </div>
                      </div>
                      <div className="address-check d-flex pb-4 ">
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input focus-ring"
                            style={{
                              '--bsFocusRingColor': 'rgba(var(--white), 0)',
                            }}
                            type="checkbox"
                            defaultValue
                            id="Taichung"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Taichung"
                          >
                            <h6 className="h6">台中店</h6>
                          </label>
                        </div>
                      </div>{' '}
                      <div className="address-check d-flex pb-4 ">
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input focus-ring"
                            style={{
                              '--bsFocusRingColor': 'rgba(var(--white), 0)',
                            }}
                            type="checkbox"
                            defaultValue
                            id="Kaohsiung"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Kaohsiung"
                          >
                            <h6 className="h6">高雄店</h6>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="level title">
                    <div className="h5 c-lenav">吉他級別</div>
                    <div className="level-check d-flex pt-3 g-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="Beginner"
                        />
                        <label className="form-check-label" htmlFor="Beginner">
                          <h6 className="h6">初級</h6>
                        </label>
                      </div>
                    </div>
                    <div className="level-check d-flex pt-3 g-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="Intermediate"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="Intermediate"
                        >
                          <h6 className="h6">中級</h6>
                        </label>
                      </div>
                    </div>
                    <div className="level-check d-flex pt-3 g-3">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input focus-ring"
                          style={{
                            '--bsFocusRingColor': 'rgba(var(--white), 0)',
                          }}
                          type="checkbox"
                          defaultValue
                          id="Advanced"
                        />
                        <label className="form-check-label" htmlFor="Advanced">
                          <h6 className="h6">高級</h6>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="color ">
                    <div className="color-title pb-4">
                      <div className="h5 c-lenav">顏色</div>
                    </div>
                    <div className="c-filter-color d-flex flex-wrap gap-2">
                      <img src="/images/Rent/circle-red.png" alt="red" />
                      <img src="/images/Rent/circle-orange.png" alt="orange" />
                      <img src="/images/Rent/circle-yellow.png" alt="yellow" />
                      <img src="/images/Rent/circle-green.png" alt="green" />
                      <img src="/images/Rent/circle-blue.png" alt="blue" />
                      <img
                        src="/images/Rent/circle-Navy-Blue.png"
                        alt="Navy-Blue"
                      />
                      <img src="/images/Rent/circle-black.png" alt="black" />
                      <img src="/images/Rent/circle-gray.png" alt="gray" />
                      <img src="/images/Rent/circle-brown.png" alt="brown" />
                      <img src="/images/Rent/circle-purple.png" alt="purple" />
                    </div>
                  </div>
                  <div
                    className="c-bot-mod d-flex justify-content-center "
                    style={{ gap: 22 }}
                  >
                    <button className="btn btn-dark text-white c-filter-btn">
                      <div className="h6 m-0">確定塞選</div>
                    </button>
                    <button className="btn btn-outline-dark text-dark c-filter-btn">
                      <div className="h6 m-0">清除塞選</div>
                    </button>
                  </div>
                </div> */}
                <div className="row row-cols-xl-4 row-cols-2">
                <Card data={data.slice(0, visibleCount)} />
                </div>
              </div>
              <div className="btn1 d-flex justify-content-center ">
                <button
                  className=" btn btn-outline-dark text-dark "
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '3.125rem',
                    width: '15rem',
                    height: '3rem',
                  }}
                  onClick={() =>
                      setVisibleCount((prev) =>
                        Math.min(prev + 10, data.length)
                      )
                    }
                >
                  <div className="h5">瀏覽更多</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
