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

  const [visibleCount, setVisibleCount] = useState(12)
  const [sortOrder, setSortOrder] = useState({ field: 'price', direction: 'asc' })
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState({
    brands: [],
    addresses: [],
    levels: [],
    colors: [],
  })

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

  const storeMapping = {
    '台北店': 1,
    '台中店': 2,
    '高雄店': 3
  }
  const levelMap = {
    '初級': 1,
    '中級': 2,
    '高級': 3,
  }

  useEffect(() => {
    let filtered = [...data]

    if (filters?.brands?.length) {
      filtered = filtered.filter(item => filters.brands.includes(item.brand_name))
    }
    if (filters?.addresses?.length) {
      const selectedStoreIds = filters.addresses.map(name => storeMapping[name]) 
      filtered = filtered.filter(item => selectedStoreIds.includes(item.stores_id))
    }    
    if (filters?.levels?.length) {
      filtered = filtered.filter(item => filters.levels.map(lvl => levelMap[lvl]).includes(item.level))
    }
    if (filters?.colors?.length) {
      filtered = filtered.filter(item => 
        item.rentitemColors.some(color => filters.colors.includes(color.color_name))
      )
    }

    // 排序
    const sorted = filtered.sort((a, b) => {
      if (sortOrder.field === 'price') {
        return sortOrder.direction === 'asc' ? a.price - b.price : b.price - a.price
      } else if (sortOrder.field === 'name') {
        return sortOrder.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      return 0
    })

    setFilteredData(sorted)
  }, [data, filters, sortOrder])

  const handleFilterChange = (newFilters) => {
    console.log("接收到新篩選條件:", newFilters);
    setFilters(newFilters)
  }

  const handleSortChange = (field, direction) => {
    setSortOrder({ field, direction })
  }
  
  
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
                className=" d-flex mod-sel justify-content-end"
                onClick={() => setIsOpen(true)}
                onKeyUp={onKeyPressHandler}
                role="button"
                tabIndex="0"
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
            className={`c-section2-body Mod d-block d-md-none ${isOpen ? 'filter-open' : ''}`}
          >
            <div className="container-fluid c-index-mod-1">
              <div className="row">
              <Modfiter
                  data={filteredData}
                  setIsOpen={setIsOpen}
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                />
              </div>
              <div className="row row-cols-xl-4 row-cols-2">
                <Card data={filteredData.slice(0, visibleCount)} />
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
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 10, data.length))}
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
