import React from 'react'
import FilterTitle from './FilterTitle/FilterTitle.js'
import RentCards from './Rentcard/card.js'
export default function RentList() {
  return (
    <div className="c-section2-body d-none d-md-block">
      <div className="container-fluid ">
        <div className="row">
          <FilterTitle />
          <div className="col-6 col-sm-6 col-md-9 col-lg-9 clo-2 ">
            <div className="caa info">
              <div className="c-section3">
                <div className="card-group gap-3">
                  <RentCards />
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
