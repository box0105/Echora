'use client'

import React, { useState, useEffect } from 'react'

export default function IndexSection2(props) {
  return (
    <>
      <div className="container-fluid m-index">
        <div className="m-index-title m-anime">
          <h1 className="h3">
            SHOP BY PALETTE<span> / 商品風格分類</span>
          </h1>
        </div>
        <div className="row mb-2">
          <div className="col-lg-7 col-6 m-section2-col m-section2-col1 m-section2-col5 m-anime">
            <div className="m-section2-line d-flex flex-column justify-content-center">
              <h4>JSHINE</h4>
              <p>曜彩系列</p>
            </div>
          </div>
          <div className="col-lg-5 col-6 m-section2-col m-section2-col2 m-section2-col6 m-anime">
            <div className="m-section2-line d-flex flex-column justify-content-center">
              <h4>SUNRISE WOOD</h4>
              <p>晨曦木韻系列</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-6 m-section2-col m-section2-col3 m-section2-col5 m-anime">
            <div className="m-section2-line d-flex flex-column justify-content-center">
              <h4>GREY &amp; WHITE</h4>
              <p>石韻白系列</p>
            </div>
          </div>
          <div className="col-lg-7 col-6 m-section2-col m-section2-col4 m-section2-col6 m-anime">
            <div className="m-section2-line d-flex flex-column justify-content-center">
              <h4>MIDNIGHT CITY</h4>
              <p>夜晚城市系列</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
