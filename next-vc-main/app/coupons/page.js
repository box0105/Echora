"use client"

import './style.scss';
import '../_styles/nav.scss'
import "../_styles/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';





export default function CouponPage(props){
    return(
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
      <h1 className='h1'  aria-current="page" href="#">COUPONS / <span className='span'>會員優惠券專區</span></h1>
    </div>
    <div className="row row-cols-lg-4 g-3 coupons">
      <div className="col">
        <img src="./images/Property 1=coupons,Property2=default.jpg"  />
      </div>
      <div className="col">
        <img src="./images/Property 1=coupon-b,Property2=default.jpg"  />
      </div>
      <div className="col">
        <img src="./images/Property 1=coupons,Property2=default.jpg"  />
      </div>
      <div className="col">
        <img src="./images/Property 1=coupon-b,Property2=default.jpg"  />
      </div>
      <div className="col">
        <img src="./images/Property 1=coupons,Property2=default.jpg"  />
      </div>
      <div className="col">
        <img src="./images/Property 1=coupon-b,Property2=default.jpg"  />
      </div>
      <div className="col">
        <img src="./images/Property 1=coupons,Property2=default.jpg"  />
      </div>
      <div className="col">
        <img src="./images/Property 1=coupon-b,Property2=default.jpg"  />
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