'use client'

import React, { useState, useEffect } from 'react'
import './card.scss'
export default function RentcardCard(props) {
  return (
    <>
      {/* Card 1 */}
      <div className="col-6 col-sm-6 col-md-4">
        <div className="card-top">
          <div className="c-card-img d-flex justify-content-center align-items-center">
            <img
              src="/images/Rent/card23-img.png"
              className="card-img-top"
              alt="..."
            />
          </div>

          <div className="card-body">
            <h3 className="card-title">Product Name</h3>
            <div className="d-flex">
              <h5 className="card-text">$1000</h5>
            </div>
            <div className="c-card-color pt-2  d-flex gap-1">
              <img src="/images/Rent/circle-gray.png" alt="" />
              <img src="/images/Rent/circle-blue.png" alt="" />
            </div>
            <div className="stock pt-2">
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
    </>
  )
}
