'use client'
import React from 'react'
import './filter.scss'
import { useState } from 'react'
export default function RentFilter() {
  return (
    <div className="col-12 col-md-3 d-none d-lg-block d-flex flex-column c-lerf">
      <FilterTitle />
      <SortOptions />
      <BrandFilter />
      <RentAddressFilter />
      <GuitarLevelFilter />
      <ColorFilter />
      <FilterButtons />
    </div>
  )
}

const FilterTitle = () => (
  <div className="c-filter d-flex ">
    <img
      src="/images/Rent/Group 1.png"
      className="pt-1 pe-2"
      alt=""
      style={{ width: '23px', height: '16px' }}
    />
    <h4 className="c-filter-one">條件篩選</h4>
  </div>
)

const SortOptions = () => (
  <div className="sort ">
    <div className=" h5 c-lenav">排序</div>
    <div className="sor-check pt-3">
      <div className="ch-1 d-flex pb-4 ">
        <div className="form-check mb-0">
          <input
            className="form-check-input focus-ring"
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
)

const BrandFilter = () => (
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
            id="gibson"
          />
          <label className="form-check-label" htmlFor="gibson">
            <h6 className="h6">Fender</h6>
          </label>
        </div>
      </div>
    </div>
  </div>
)
const RentAddressFilter = () => (
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
          <label className="form-check-label" htmlFor="Taichung">
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
          <label className="form-check-label" htmlFor="Kaohsiung">
            <h6 className="h6">高雄店</h6>
          </label>
        </div>
      </div>
    </div>
  </div>
)

const GuitarLevelFilter = () => (
  <div className="rent title">
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
        <label className="form-check-label" htmlFor="Intermediate">
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
)

const ColorFilter = () => (
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
      <img src="/images/Rent/circle-Navy-Blue.png" alt="Navy-Blue" />
      <img src="/images/Rent/circle-black.png" alt="black" />
      <img src="/images/Rent/circle-gray.png" alt="gray" />
      <img src="/images/Rent/circle-brown.png" alt="brown" />
      <img src="/images/Rent/circle-purple.png" alt="purple" />
    </div>
  </div>
)

const FilterButtons = () => (
  <div className="c-bot d-flex justify-content-center " style={{ gap: 22 }}>
    <button className="btn btn-dark text-white c-filter-btn">
      <div className="h6 m-0">確定塞選</div>
    </button>
    <button className="btn btn-outline-dark text-dark c-filter-btn">
      <div className="h6 m-0">清除塞選</div>
    </button>
  </div>
)
