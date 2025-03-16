'use client'

import './indexSection2.scss'
import React, { useState, useEffect, useRef } from 'react'
import { useProductState } from '@/services/rest-client/use-products'
import { useRouter } from 'next/navigation'

export default function IndexSection2(props) {
  const { criteria, setCriteria, defaultCriteria } = useProductState()
  const router = useRouter()
  const isFirstRender = useRef(true); // 追蹤是否為初次渲染

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // 初次渲染時設定為 false，下一次才會觸發
      return;
    }
    
    if (criteria.colorPids.length > 0) {
      router.push('/product/list');
    }
  }, [criteria]);

  console.log(criteria)
  return (
    <>
      <div className="container-fluid m-index">
        <div className="m-index-title m-anime">
          <div className="h3 g-text-size">
            SHOP BY PALETTE<span> / 商品風格分類</span>
          </div>
        </div>
        <div className="row mb-2 w-100 ms-0">
          <div
            className="col-lg-7 col-6 m-section2-col m-section2-col1 m-section2-col5 m-anime g-btn"
            onClick={ () => {
              setCriteria(() => {
                return { ...defaultCriteria, colorPids: [1] }
              })
            }}
          >
            <div className="m-section2-line d-flex flex-column justify-content-center">
              <h4>JSHINE</h4>
              <p>曜彩系列</p>
            </div>
          </div>
          <div 
          className="col-lg-5 col-6 m-section2-col m-section2-col2 m-section2-col6 m-anime g-btn"
          onClick={ () => {
              setCriteria(() => {
                return { ...defaultCriteria, colorPids: [2] }
              })
            }}
          >
            <div className="m-section2-line d-flex flex-column justify-content-center">
              <h4>SUNRISE WOOD</h4>
              <p>晨曦木韻系列</p>
            </div>
          </div>
        </div>
        <div className="row w-100 ms-0">
          <div 
          className="col-lg-5 col-6 m-section2-col m-section2-col3 m-section2-col5 m-anime g-btn"
          onClick={ () => {
              setCriteria(() => {
                return { ...defaultCriteria, colorPids: [3] }
              })
            }}
          >
            <div className="m-section2-line d-flex flex-column justify-content-center">
              <h4>GREY &amp; WHITE</h4>
              <p>石韻白系列</p>
            </div>
          </div>
          <div 
          className="col-lg-7 col-6 m-section2-col m-section2-col4 m-section2-col6 m-anime g-btn"
          onClick={ () => {
              setCriteria(() => {
                return { ...defaultCriteria, colorPids: [4] }
              })
            }}
          >
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
