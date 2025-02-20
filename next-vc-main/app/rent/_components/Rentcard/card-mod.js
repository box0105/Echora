'use client'

import React from 'react'
import './cardmod.scss'

export default function RentcardCardMod(props) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 g-3 mt-0">
      {/* Card 1 */}
      <div className="col-6 col-sm-6 col-md-4">
        <div className="card-top-mod">
          <div className="c-card-img d-flex justify-content-center align-items-center">
            <img
              src="/images/Rent/card23-img.png"
              className="card-img-top img-fluid"
              alt="..."
            />
          </div>

          <div className="card-body">
            <h4 className="card-title">Product Name</h4>
            <div className="d-flex">
              <h5 className="card-text">$1000</h5>
            </div>
            <div className="c-card-color-mod pt-2">
              <img src="/images/Rent/circle-gray.png" alt="" />
              <img src="/images/Rent/circle-blue.png" alt="" />
            </div>
            <div className="in-stock">
              <img src="/images/Rent/instock-green.png" alt="" />
              <p className="m-0">有庫存</p>
            </div>
            <div className="out-stock">
              <img src="/images/Rent/instock-red.png" alt="" />
              <p className="m-0">無庫存</p>
            </div>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div className="col-6 col-sm-6 col-md-4">
        <div className="card-top-mod">
          <div className="c-card-img d-flex justify-content-center align-items-center">
            <img
              src="/images/Rent/card23-img.png"
              className="card-img-top img-fluid"
              alt="..."
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Product Name</h4>
            <div className="d-flex">
              <h5 className="card-text">$1000</h5>
            </div>
            <div className="c-card-color-mod pt-2">
              <img src="/images/Rent/circle-gray.png" alt="" />
              <img src="/images/Rent/circle-blue.png" alt="" />
            </div>
            <div className="in-stock">
              <img src="/images/Rent/instock-green.png" alt="" />
              <p className="m-0">有庫存</p>
            </div>
            <div className="out-stock">
              <img src="/images/Rent/instock-red.png" alt="" />
              <p className="m-0">無庫存</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
