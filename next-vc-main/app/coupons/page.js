"use client"

import './style.scss';
import '../_styles/nav.scss'
import "../_styles/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';





export default async function CouponPage(props) {
  const [coupon, setCoupon] = useState({

    id: 1,
    name: "夏日特惠",
    code: "matsu",
    typeId: 1,
    discount: 50,
    discountTypeId: 1,
    startTime: "2024-07-27T12:34:56.789Z",
    endTime: "2024-07-27T12:34:56.789Z",
    isDelete: false

  })

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const url = '/api/coupon'
        const res = await fetch(url);
        if(!res.ok) throw new Error('狀態錯誤') 
      }catch(err){
        console.log('發生錯誤',err);
      }
    }
  })


  // 轉換時間格式
  const time = (time) => {
    const isoDateString = time;
    const date = new Date(isoDateString);

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const readableDate = date.toLocaleDateString('zh-TW', options); // 繁體中文

    // console.log(readableDate); 輸出：2024/7/27 （或 2024年7月27日，取決於地區設定）
    return readableDate;
  }


  return (
    <>
      <div className="container-fluid">
        <main className="k-main">
          <div className="content ">
            <div className="title flex-column">
              <div>SPECIAL OFFER</div>
              <span>聖誕季優惠活動 LES系列9折優惠</span>
            </div>
            <div className="title flex-column">
              <h1 className="btn btn-outline-light">立即加入會員</h1>
              <h6>活動期間:2024/12/01 - 2025/01/31</h6>
            </div>
          </div>
        </main>

        <article className='k-article'>
          <div className="k-title">
            <h1 className='h1' aria-current="page" href="#">COUPONS / <span className='span'>會員優惠券專區</span></h1>
          </div>
          <div className="row row-cols-lg-4 row-cols-md-4 row-cols-sm-1 row-cols-xm-1 row-cols-xxm-1  ">

            <div className="col image-col">
              <div className=''></div>
              <button className='btn btn-dark' >領取</button>
            </div>
            <div className="col image-col">

              <div className=''></div>
              <button className='btn btn-dark'>領取</button>
            </div>
            <div className="col image-col">

              <div className=''></div>
              <button className='btn btn-dark'>領取</button>
            </div>

            <div className="col image-col">
              <div className=''>{coupon.name},
                優惠代碼:{coupon.code},
                折抵${coupon.discount} | 使用期間:{time(coupon.startTime)}~{time(coupon.endTime)}.
              </div>
              <button className='btn btn-dark' onClick={() => {
                alert('已領取')
              }}>領取</button>
            </div>
            {/* test */}
            <div>
              <h1>項目列表</h1>
              <ul>
                {items.map(item => (
                  <li key={item._id}> {/*  假設你的 MongoDB 文件有 _id 欄位 */}
                    <strong>{item.name}</strong>: {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="k-btn">
            <button className="btn btn-outline-dark">全部領取</button>
          </div>
        </article>
        <hr />

      </div>

    </>
  )
}