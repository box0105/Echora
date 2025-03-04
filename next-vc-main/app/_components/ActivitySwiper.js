'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import './../activity/_styles/act.scss'

export default function ActivitySwiper({
  imageArr = ['/images/cart/card3.png'],
  ids = [0],
}) {
  const src = '/images/activity/'

  return (
    // <Swiper
    //   className="b-swiper"
    // >
    //   {imageArr?.map((img, i) => (
    //     <SwiperSlide key={i}>
    //       <Link
    //         href={ids.length ? `/activity/${ids[i] + 1}` : '#'}
    //         style={{ cursor: ids.length ? 'pointer' : 'default' }}
    //       >
    //         <div className="position-relative w-100 h-100">
    //           <Image
    //             // src={`${src}${img}`}
    //             src={img}
    //             alt={img || '輪播圖片'}
    //             fill
    //             className="object-fit-cover"
    //           />
    //         </div>
    //       </Link>
    //     </SwiperSlide>
    //   ))}
    // </Swiper>

    <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col">
        <div className="card">
          <img
            src="/images/cart/card3.png"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title h5">
              Weiwuying International Music Festival
            </h5>
            <p className="card-text h6">衛武營國際音樂節</p>
          </div>
        </div>
      </div>
    </div>
  )
}
