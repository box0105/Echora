'use client'

import React, { useState, useEffect } from 'react'

export default function IndexSection3(props) {
  return (
    <>
      <div className="container-fluid m-index">
        <div className="m-index-title m-anime">
          <h1 className="h3">
            TRENDING DEALS<span> / 熱門優惠商品</span>
          </h1>
        </div>
        <div className="row row-cols-lg-4 row-cols-1">
          <div className="col card-group">
            <div className="card w-100" style={{ width: '18rem' }}>
              <img
                src="/images/cart/card2-img.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h4 className="card-text">Productttt</h4>
                <div className="d-flex">
                  <h5 className="card-text">$77999</h5>
                  <span>$72900</span>
                </div>
                <p>2 COLORS</p>
              </div>
            </div>
          </div>
          <div className="col card-group d-none d-lg-block">
            <div className="card w-100" style={{ width: '18rem' }}>
              <img
                src="/images/cart/card2-img.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h4 className="card-text">Productttt</h4>
                <div className="d-flex">
                  <h5 className="card-text">$77999</h5>
                  <span>$72900</span>
                </div>
                <p>2 COLORS</p>
              </div>
            </div>
          </div>
          <div className="col card-group d-none d-lg-block">
            <div className="card w-100" style={{ width: '18rem' }}>
              <img
                src="/images/cart/card2-img.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h4 className="card-text">Productttt</h4>
                <div className="d-flex">
                  <h5 className="card-text">$77999</h5>
                  <span>$72900</span>
                </div>
                <p>2 COLORS</p>
              </div>
            </div>
          </div>
          <div className="col card-group d-none d-lg-block">
            <div className="card w-100" style={{ width: '18rem' }}>
              <img
                src="/images/cart/card2-img.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h4 className="card-text">Productttt</h4>
                <div className="d-flex">
                  <h5 className="card-text">$77999</h5>
                  <span>$72900</span>
                </div>
                <p>2 COLORS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
