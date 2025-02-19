'use client'

import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './list.scss'

export default function Page(props) {
  return (
    <>
      <div>
        {/* section1 */}
        <div className="c-section1">
          <div className="container-fluid c-index">
            <div className="row">
              <div className="col-7">
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
              </div>
              <div className="col-5 c-left">
                <div className="c-text">
                  <div className="c-title d-flex justify-content-start align-items-center">
                    <h2 className="title-text">Les Paul Mondern Lite</h2>
                    <div>
                      <div className="h5 icon text-success d-none d-md-block"><i className="bi bi-box-seam" />尚有庫存</div>
                      <div className="h6 icon text-success d-block d-md-none"><i className="bi bi-box-seam" />尚有庫存</div>
                    </div>
                  </div>
                  <div className="c-price">
                    <h3 className="c-price-1 m-0">NT$ 1,000</h3>
                  </div>
                  <div className="c-brand">
                    <div
                      className="bg-dark text-br d-flex justify-content-center"
                      style={{ paddingBottom: '1.5rem' }}
                    >
                      <h5 className="text-white p-1 m-0">Gibson</h5>
                    </div>
                  </div>
                  <div className="c-color">
                    <div className="c-co">
                      <div className="c-title-co d-flex justify-content-start">
                        <div className="h5 pe-3">顏色 :</div>
                        <h5>Sky Blue</h5>
                      </div>
                    <div className="math d-flex align-items-center pb-3">數量<input type="number" id="quantity" className="form-control text-center mx-2" style={{width: 60}} defaultValue={1} min={1} /></div>
                      <div className="c-body-co">
                        <div className="circle d-flex gap-3">
                          <img src="/images/Rent/circle.jpg" alt />
                          <img src="/images/Rent/cricleBroder.jpg" alt />
                          <img src="/images/Rent/circle list.png" alt />
                          <img src="/images/Rent/circle.jpg" alt />
                          <img src="/images/Rent/circle.jpg" alt />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="c-start gap-2 py-3">
                    <div className="c-sdata">
                      <div className="h4 title-start">租借起始日</div>
                    </div>
                    <input
                      type="date"
                      className="w-100 p-0 border border-0 bg-white"
                    />
                  </div>
                  <div className="c-end gap-2 py-3">
                    <div className="c-edata">
                      <div className="h4 title-start">租借起始日</div>
                    </div>
                    <input
                      type="date"
                      className="w-100 p-0 border border-0 bg-white"
                    />
                  </div>
                  <div className="c-addr gap-2 py-3">
                    <div className="c-add-title">
                      <div className=" h4 c-addtiele">自取地點</div>
                    </div>
                    <select name id className="c-addselect w-100">
                      <option value className="h5">
                        台北店
                      </option>
                      <option value className="h5">
                        台中店
                      </option>
                      <option value className="h5">
                        高雄店
                      </option>
                    </select>
                  </div>
                  <div className="btn1">
                    <button className="btn btn-dark btnbot">
                      <div className=" h4 text-white m-0">加入購物車</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-section2">
          <div className="container-fluid c-index1">
            <div className="row">
              <div className="col-7 c-prduct">
                <div className="product-top">
                  <div className="h3 pb-3 m-0">商品描述</div>
                  <div className="product-list-text">
                    <div className="h6">
                      它採用了桃花心木琴身搭配枫木面板，帶來飽滿且均衡的音色。琴頸為桃花心木材質，配有圓形半徑的烏木指板，擁有
                      24
                      顆中型加大品格及超級分裂區塊的珍珠母鑲嵌。琴頭裝飾有一個引人注目的全新珍珠母「吊燈鑲嵌」，靈感來自於
                      1940 年代的設計，該設計於 Gibson 檔案中被發現。配備
                      Burstbucker™ Pro（琴頸和中間位置）與 Burstbucker Pro
                      +（琴橋位置）拾音器，並搭載推/拉音量控制，可實現線圈分接，此外還有一個手工接線的主音控，搭配
                      Orange Drop® 電容器。
                    </div>
                  </div>
                </div>
                <div
                  className="product-title"
                  style={{ paddingTop: '1.75rem' }}
                >
                  <div className="h3 pb-3 m-0">電子裝置規格</div>
                </div>
                {/* 第一行 */}
                <div className="product-body d-flex">
                  <div className="product-list">
                    <div className="product-bo-1">
                      <div className="h5 pb-3 m-0">琴頸拾音器</div>
                    </div>
                    <div className="product-bo-2">
                      <h6 className="pb-3 m-0">Haymaker™ Humbucker</h6>
                    </div>
                  </div>
                  <div className="product-list">
                    <div className="product-bo-1">
                      <div className="h5 pb-3 m-0">中段拾音器</div>
                    </div>
                    <div className="product-bo-2">
                      <h6 className="pb-3 m-0">
                        Ultra II Noiseless™ Hot Strat®
                      </h6>
                    </div>
                  </div>
                  <div className="product-list">
                    <div className="product-bo-1">
                      <div className="h5 pb-3 m-0">琴橋拾音器</div>
                    </div>
                    <div className="product-bo-2">
                      <h6 className="pb-3 m-0">
                        Ultra II Noiseless™ Hot Strat®
                      </h6>
                    </div>
                  </div>
                </div>
                {/* 第二行 */}
                <div className="product-body-2 d-flex pt-3">
                  <div className="product-list">
                    <div className="product-bo-1">
                      <div className="h5 pb-3 m-0">控制器</div>
                    </div>
                    <div className="product-bo-2">
                      <div className="h6 m-0">
                        主音量控制（帶 S-1™ 開關），音調 1：頸拾音
                        <br />
                        器/中拾音器，音調 2：橋拾音器
                      </div>
                    </div>
                  </div>
                  <div className="product-list">
                    <div className="product-bo-1">
                      <div className="h5 pb-3 m-0">拾音器開關</div>
                    </div>
                    <div className="product-bo-2">
                      <div className="h6 pb-3 m-0">5段拉桿切換</div>
                    </div>
                  </div>
                  <div className="product-list empty-placeholder" />
                </div>
              </div>
              <div className="col-5 bo-gu">
                <div className="c-guide">
                  <div className="c-g pt-1">
                    <div className="c-gu-title">
                      <div className="h4">租借指南</div>
                    </div>
                    <div className="text-gu pt-1">
                      <div className="h6">
                        <span> 計費方式：</span>
                        <br />
                        以一日(24H)為單位。 <br />
                        如預期歸還以兩倍金額為預期租金。
                        <br />
                        <span>注意事項：</span>
                        <br />
                        租借與歸還須於租借門市營業時間內。
                        <br />
                        租借或歸還時皆需要當場確認吉他情況，如歸還時有損壞照價賠償。
                      </div>
                    </div>
                  </div>
                </div>
                <div className="c-readdr">
                  <div className="c-g pt-1">
                    <div className="c-gu-title">
                      <div className="h4">租借地點</div>
                    </div>
                    <div className="text-gu pt-1">
                      <div className="h6">
                        台北店：
                        <br />
                        台北市中正區羅斯福路三段140巷5號
                        <br />
                        電話號碼：&nbsp;02 2543 3319。
                        <br />
                        台中店：
                        <br />
                        台中市北區三民路三段270號
                        <br />
                        電話號碼：&nbsp;04 2238 5589。
                        <br />
                        高雄店：
                        <br />
                        高雄市三民區澄清路541號
                        <br />
                        話號碼：&nbsp;07 396 5555。
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-section3">
          <div className="container-fluid c-index">
            <div className="c-index-title d-none d-md-block">
              <div className="row align-items-center gap-0">
                <div className="col-3 ps-4 pe-0">
                  <h1 className="m-0">YOU MAY ALSO LIKE</h1>
                </div>
                <div className="col-6 pe-4 ps-0">
                  <h5 className=" h5 m-0"> / 您可能也會喜歡</h5>
                </div>
              </div>
            </div>
            <div className="c-index-title d-flex align-items-center d-block d-md-none mb-3">
              <h4 className>YOU MAY ALSO LIKE</h4>
              <div className=" h7"> / 您可能也會喜歡</div>
            </div>
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
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            {/* Bootstrap 5 JS */}
          </div>
        </div>
      </div>
    </>
  )
}
