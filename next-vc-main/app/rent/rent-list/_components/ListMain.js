'use client'

import React, { useState, useEffect } from 'react'

export default function ListMain(props) {
  return (
    <>
      <div className="c-pict d-flex justify-content-center c-card">
        <div
          className="c-pic  d-flex flex-column align-items-center d-none d-lg-flex"
          style={{ paddingTop: '4.5rem' }}
        >
          <i className="fa-solid fa-angle-up " />
          <img src="/images/Rent/small-img.png" alt="小圖" />
          <img src="/images/Rent/small-img-2.png" alt="小圖" />
          <img src="/images/Rent/small-img-3.png" alt="小圖" />
          <img src="/images/Rent/small-img4.png" alt="小圖" />
          <i className="fa-solid fa-angle-down" />
        </div>
        <div className="c-bpiv">
          <img
            className="main-pic img-fluid "
            src="/images/Rent/main-img.png"
            alt="主圖"
          />
        </div>
      </div>
    </>
  )
}
