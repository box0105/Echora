'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Swiper 樣式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import "./SwiperSlide.scss"
export default function ListBottom() {
  // 模擬商品資料
  const Rent = [
    {
      img: '/images/Rent/card3-img.png',
      name: 'Rent A',
      price: '$1000',
      colors: '2 COLORS',
    },
    {
      img: '/images/Rent/card2-img.png',
      name: 'Rent B',
      price: '$1000',
      colors: '3 COLORS',
    },
    {
      img: '/images/Rent/card4-img.png',
      name: 'Rent C',
      price: '$1200',
      colors: '1 COLOR',
    },
    {
      img: '/images/Rent/card5-img.png',
      name: 'Rent D',
      price: '$1500',
      colors: '4 COLORS',
    },
    {
      img: '/images/Rent/card5-img.png',
      name: 'Rent D',
      price: '$1500',
      colors: '4 COLORS',
    },
    {
      img: '/images/Rent/card5-img.png',
      name: 'Rent D',
      price: '$1500',
      colors: '4 COLORS',
    },
  ]

  return (
    <div className="list-bottom-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation // 左右箭頭
        pagination={{ clickable: true }} // 分頁圓點
        breakpoints={{
          576: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {Rent.map((Rent, index) => (
          <SwiperSlide key={index}>
            <div className="card" style={{ width: '18rem' }}>
              <img src={Rent.img} className="card-img-top" alt={Rent.name} />
              <div className="card-body">
                <h3 className="card-title">{Rent.name}</h3>
                <h4 className="card-text">Rent</h4>
                <div className="d-flex">
                  <h5 className="card-text">{Rent.price}</h5>
                </div>
                <p>{Rent.colors}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
