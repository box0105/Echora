import React from 'react'
import FilterTitle from './FilterTitle/FilterTitle.js'
import RentCards from './Rentcard/card.js'
import { useState, useEffect } from 'react'

export default function RentList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/rent')
        const jsonData = await res.json()
        console.log('API 回傳的資料:', JSON.stringify(jsonData.data, null, 2))
        setData(jsonData.data)
      } catch (err) {
        console.error('錯誤:', err)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <p>載入中...</p>
  if (isError) return <p>載入失敗，請稍後再試。</p>

  return (
    <div className="c-section2-body d-none d-md-block">
      <div className="container-fluid ">
        <div className="row">
          <FilterTitle />
          <div className="col-6 col-sm-6 col-md-9 col-lg-9 clo-2 ">
            <div className="caa info">
              <div className="c-section3">
                <div className="card-group gap-3">
                  {/* {console.log(
                    'RentList data state:',
                    JSON.stringify(data, null, 2)
                  )} */}
                  <RentCards data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn1 d-flex justify-content-center ">
          <LoadMoreButton />
        </div>
      </div>
    </div>
  )
}

const LoadMoreButton = () => (
  <button
    className=" btn btn-outline-dark text-dark "
    style={{
      padding: '0.75rem 1.5rem',
      borderRadius: '3.125rem',
      width: '15rem',
      height: '3rem',
    }}
  >
    <div className="h5">瀏覽更多</div>
  </button>
)
