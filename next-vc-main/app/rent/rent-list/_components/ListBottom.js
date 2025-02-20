'use client'

import React, { useState, useEffect } from 'react'

export default function ListBottom(props) {
  return (
    <>
      <div className=" card-group d-none d-sm-flex">
        <div className="icon ">
          <i className="fa-solid fa-circle-chevron-left ic-1" />
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/images/Rent/card3-img.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h3 className="card-title">Product Name</h3>
            <h4 className="card-text">Product</h4>
            <div className="d-flex">
              <h5 className="card-text">$1000</h5>
            </div>
            <p>2 COLORS</p>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/images/Rent/card2-img.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h3 className="card-title">Product Name</h3>
            <h4 className="card-text">Product</h4>
            <div className="d-flex">
              <h5 className="card-text">$1000</h5>
            </div>
            <p>2 COLORS</p>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/images/Rent/card4-img.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h3 className="card-title">Product Name</h3>
            <h4 className="card-text">Product</h4>
            <div className="d-flex">
              <h5 className="card-text">$1200</h5>
            </div>
            <p>2 COLORS</p>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/images/Rent/card5-img.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h3 className="card-title">Product Name</h3>
            <h4 className="card-text">Product</h4>
            <div className="d-flex">
              <h5 className="card-text">$1500</h5>
            </div>
            <p>2 COLORS</p>
          </div>
        </div>
        <div className="icon d-none d-md-block">
          <i className="fa-solid fa-circle-chevron-right ic-1" />
        </div>
      </div>
      <div
        id="productCarousel"
        className="carousel slide d-block d-md-none"
        data-bs-ride="carousel"
      >
        {/* Carousel indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
          <button
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide-to={3}
            aria-label="Slide 4"
          />
        </div>
        {/* Carousel items (cards) */}
        <div className="carousel-inner">
          {/* Card 1 */}
          <div className="carousel-item active">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/Rent/card3-img.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h4 className="card-text">Product</h4>
                <div className="d-flex">
                  <h5 className="card-text">$1000</h5>
                </div>
                <p>2 COLORS</p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="carousel-item">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/Rent/card2-img.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h4 className="card-text">Product</h4>
                <div className="d-flex">
                  <h5 className="card-text">$1000</h5>
                </div>
                <p>2 COLORS</p>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="carousel-item">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/Rent/card4-img.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h4 className="card-text">Product</h4>
                <div className="d-flex">
                  <h5 className="card-text">$1200</h5>
                </div>
                <p>2 COLORS</p>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="carousel-item">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/Rent/card5-img.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h3 className="card-title">Product Name</h3>
                <h4 className="card-text">Product</h4>
                <div className="d-flex">
                  <h5 className="card-text">$1500</h5>
                </div>
                <p>2 COLORS</p>
              </div>
            </div>
          </div>
        </div>
        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}
