'use client'

import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../_styles/first.scss'
export default function Page(props) {
  return (
    <>
      <div>
        <div className="c-backgrund">
          {/* section1 */}
          <div className="c-section1">
            <div className="card text-bg-dark c-section1">
              <img
                src="/images/Rent/C-main.jpg"
                className="card-img d-none d-md-block border-radius-0"
                alt="..."
              />
              <img
                src="/images/Rent/C-main.jpg"
                className="card-img d-block d-md-none border-radius-0"
                style={{ height: 400 }}
                alt="..."
              />
              <div className="card-img-overlay no-rounded-corners d-flex justify-content-satrt align-items-center">
                <div className="col-6 c-section1-text ">
                  <h1 className="home-title d-none d-md-block ">
                    ELECTRIC GUITAR RENTAL SERVICES
                  </h1>
                  <h1 className="home-title d-block d-md-none">
                    <div className="c-mod-text">
                      ELECTRIC <br />
                      GUITAR RENTAL <br />
                      SERVICES
                    </div>
                  </h1>
                  <div className=" h4 home-2-title d-none d-md-block">
                    電吉他租借服務
                  </div>
                  <h4 className="home-2-title d-block d-md-none">
                    <div className="mod-text-1">電吉他租借服務</div>
                  </h4>
                  <div className="c-ptext d-none d-md-block">
                    <div className=" h4 home-text">
                      電吉他租借服務說明電吉他租借服務電吉他租借服務
                      電吉他租借服務電吉他租借服務
                      <br />
                      全台共三間台北、台中、高雄三間門市可取貨
                    </div>
                    <div className="h4 c-bottom-text">歡迎來電洽詢</div>
                  </div>
                </div>
              </div>
              <div className="col-12 c-Process">
                <div className="d-none d-sm-flex bg-black">
                  <div className="col-1 d-flex justify-content-center align-items-center iconf">
                    <img
                      src="/images/Rent/light.png"
                      className="img-fluid  bolt"
                      alt
                    />
                  </div>
                  <div className="col-3 text-white">
                    <h2>Rental Process</h2>
                    <div className="h3">租借流程說明</div>
                  </div>
                  <div className="col-7 ">
                    <img src="/images/Rent/Process-1.png" alt />
                  </div>
                  <div className="col-1 d-flex justify-content-center align-items-center iconf">
                    <img
                      src="/images/Rent/light.png"
                      className="img-fluid  bolt"
                      alt
                    />
                  </div>
                </div>
                <div className="d-block d-sm-none bg-black">
                  <div className="col-12">
                    <img src="/images/Rent/Process-mod.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section2 */}
        <div className="c-section2-title d-none d-md-block ">
          <div className="container-fluid c-index">
            <div className="c-index-title ">
              <h1>
                ELECTRIC GUITAR RENTAL PRODUCTS{' '}
                <span className="h3"> / 電吉他租借商品</span>
              </h1>
            </div>
          </div>
        </div>
        {/* section-mod */}
        <div className="c-section2-title d-block d-md-none pt-5">
          <div className="container-fluid c-index-mod pb-0">
            <div className="col-12">
              <h6 className="c-tit">ELECTRIC GUITAR RENTAL PRODUCTS</h6>
            </div>
            <div className="col">
              <div className=" h6 c-bot p-0">電吉他租借商品</div>
            </div>
            <div className=" d-flex mod-sel  justify-content-end">
              <i className="fa-solid fa-filter pt-1" />
              <div className=" h6 m-0">條件篩選</div>
            </div>
          </div>
        </div>
        <div className="c-section2-body d-none d-md-block">
          <div className="container-fluid c-index-1 ;">
            <div className="row">
              <div className="col-12 col-md-3 d-none d-lg-block d-flex flex-column c-lerf">
                <div className="c-filter  d-flex ">
                  <i className="fa-solid fa-filter pe-3" />
                  <h4>條件篩選</h4>
                </div>
                <div className="sort ">
                  <div className=" h5 c-lenav">排序</div>
                  <div className="sor-check pt-3">
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h6 m-0 ps-2">精選</div>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h6 m-0 ps-2">產品名稱:A-Z</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h6 m-0 ps-2">產品名稱:Z-A</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h6 m-0 ps-2">價格:由低到高</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h6 m-0 ps-2">價格:由高到底</div>
                    </div>
                  </div>
                </div>
                <div className="brand">
                  <div className="h5 c-lenav">品牌</div>
                  <div className="brand-check pt-3">
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <h6 className="m-0 ps-2">Gibson</h6>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <h6 className="m-0 ps-2">Fender</h6>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <h6 className="m-0 ps-2">Yamaha</h6>
                    </div>
                  </div>
                </div>
                <div className="rent title">
                  <div className="h5 c-lenav">租借地址</div>
                  <div className="brand-check pt-3">
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h6 m-0 ps-2">台北店</div>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h6 m-0 ps-2">台中店</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h6 m-0 ps-2">高雄店</div>
                    </div>
                  </div>
                </div>
                <div className="rent title">
                  <div className="h5 c-lenav">吉他級別</div>
                  <div className="brand-check pt-3 g-3">
                    <div className="ch-1 d-flex pb-4 ">
                      <input className type="checkbox" />
                      <div className="h6 m-0 ps-2">初階</div>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <input className type="checkbox" />
                      <div className="h6 m-0 ps-2">中階</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className type="checkbox" />
                      <h6 className="h6 m-0 ps-2">高階</h6>
                    </div>
                  </div>
                </div>
                <div className="color ">
                  <div className="color-title pb-4">
                    <div className="h5 c-lenav">顏色</div>
                  </div>
                  <div className="c-rad d-flex flex-wrap">
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/cricleBroder.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                  </div>
                </div>
                <div
                  className="c-bot d-flex justify-content-center "
                  style={{ gap: 22 }}
                >
                  <button className="btn btn-dark text-white ">
                    <div className="h6 m-0">確定塞選</div>
                  </button>
                  <button className="btn btn-outline-dark text-dark">
                    <div className="h6 m-0">清除塞選</div>
                  </button>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-9 col-lg-9 clo-2 ">
                <div className="caa info">
                  <div className="c-section3">
                    <div className="card-group gap-3">
                      <div className="card-top">
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
                      <div className="card-top">
                        <img
                          src="/images/Rent/card24-img.png"
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
                      <div className="card-top">
                        <img
                          src="/images/Rent/card25-img.png"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h3 className="card-title">Product Name</h3>
                          <h4 className="card-text">Product</h4>
                          <div className="d-flex">
                            <h5 className="card-text">$1500</h5>
                          </div>
                          <p>4 COLORS</p>
                        </div>
                      </div>
                      <div className="card-top">
                        <img
                          src="/images/Rent/card25-img.png"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h3 className="card-title">Product Name</h3>
                          <h4 className="card-text">Product</h4>
                          <div className="d-flex">
                            <h5 className="card-text">$1500</h5>
                          </div>
                          <p>4 COLORS</p>
                        </div>
                      </div>
                      <div className="card-top">
                        <img
                          src="/images/Rent/card23-img.png"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h3 className="card-title">Product Name</h3>
                          <h4 className="card-text">Product</h4>
                          <div className="d-flex">
                            <h5 className="card-text">$1200</h5>
                          </div>
                          <p>3 COLORS</p>
                        </div>
                      </div>
                      <div className="card-top">
                        <img
                          src="/images/Rent/card24-img.png"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h3 className="card-title">Product Name</h3>
                          <h4 className="card-text">Product</h4>
                          <div className="d-flex">
                            <h5 className="card-text">$1000</h5>
                          </div>
                          <p>3 COLORS</p>
                        </div>
                      </div>
                      <div className="card-top">
                        <img
                          src="/images/Rent/card24-img.png"
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
                      <div className="card-top">
                        <img
                          src="/images/Rent/card25-img.png"
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
                      <div className="card-top">
                        <img
                          src="/images/Rent/card23-img.png"
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
                      <div className="card-top">
                        <img
                          src="/images/Rent/card23-img.png"
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
                      <div className="card-top">
                        <img
                          src="/images/Rent/card25-img.png"
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
                      <div className="card-top">
                        <img
                          src="/images/Rent/card25-img.png"
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
                </div>
              </div>
            </div>
            <div className="btn1 d-flex justify-content-center ">
              <button
                className=" btn btn-outline-dark text-dark "
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '3.125rem',
                  width: '15rem',
                  height: '3rem',
                }}
              >
                <div className="h5">瀏覽更多</div>
              </button>
            </div>
          </div>
        </div>
        {/* section-mod */}
        <div className="c-section2-body d-block d-md-none">
          <div className="container-fluid c-index-mod-1">
            <div className="row">
              <div className="col-12 col-md-3 d-none d-lg-block d-flex flex-column c-lerf">
                <div className="c-filter  d-flex ">
                  <i className="fa-solid fa-filter pe-3" />
                  <h4>條件篩選</h4>
                </div>
                <div className="sort ">
                  <div className="h4 c-lenav">排序</div>
                  <div className="sor-check pt-3">
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="m-0 ps-2">精選</div>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h5 m-0 ps-2">產品名稱:A-Z</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h5 m-0 ps-2">產品名稱:Z-A</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h5 m-0 ps-2">價格:由低到高</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h5 m-0 ps-2">價格:由高到底</div>
                    </div>
                  </div>
                </div>
                <div className="brand">
                  <div className="h4 c-lenav">品牌</div>
                  <div className="brand-check pt-3">
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <h6 className="m-0 ps-2">Gibson</h6>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <h6 className="m-0 ps-2">Fender</h6>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <h6 className="m-0 ps-2">Yamaha</h6>
                    </div>
                  </div>
                </div>
                <div className="rent title">
                  <div className="h4 c-lenav">租借地址</div>
                  <div className="brand-check pt-3">
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h5 m-0 ps-2">台北店</div>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h5 m-0 ps-2">台中店</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className="pe-2" type="checkbox" />
                      <div className="h5 m-0 ps-2">高雄店</div>
                    </div>
                  </div>
                </div>
                <div className="rent title">
                  <div className="h4 c-lenav">吉他級別</div>
                  <div className="brand-check pt-3 g-3">
                    <div className="ch-1 d-flex pb-4 ">
                      <input className type="checkbox" />
                      <div className="h5 m-0 ps-2">初階</div>
                    </div>
                    <div className="ch-1 d-flex pb-4 ">
                      <input className type="checkbox" />
                      <div className="h5 m-0 ps-2">中階</div>
                    </div>{' '}
                    <div className="ch-1 d-flex pb-4 ">
                      <input className type="checkbox" />
                      <div className="h5 m-0 ps-2">高階</div>
                    </div>
                  </div>
                </div>
                <div className="color ">
                  <div className="color-title pb-4">
                    <div className="h4 c-lenav">顏色</div>
                  </div>
                  <div className="c-rad d-flex flex-wrap">
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/cricleBroder.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                    <div className="rad p-2">
                      <img src="/images/Rent/circle.jpg" alt />
                    </div>
                  </div>
                </div>
                <div
                  className="c-bot d-flex justify-content-center "
                  style={{ gap: 22 }}
                >
                  <button className="btn btn-dark text-white ">
                    <div className="h6 m-0">確定塞選</div>
                  </button>
                  <button className="btn btn-outline-dark text-dark">
                    <div className="h6 m-0">清除塞選</div>
                  </button>
                </div>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 g-3 mt-0">
                {/* Card 1 */}
                <div className="col-6 col-sm-6 col-md-4">
                  <div className="card-top-1">
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
                {/* Card 2 */}
                <div className="col-6 col-sm-6 col-md-4">
                  <div className="card-top-1">
                    <img
                      src="/images/Rent/card24-img.png"
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
                <div className="col-6 col-sm-6 col-md-4">
                  <div className="card-top-1">
                    <img
                      src="/images/Rent/card24-img.png"
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
                <div className="col-6 col-sm-6 col-md-4">
                  <div className="card-top-1">
                    <img
                      src="/images/Rent/card25-img.png"
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
                <div className="col-6 col-sm-6 col-md-4">
                  <div className="card-top-1">
                    <img
                      src="/images/Rent/card24-img.png"
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
                <div className="col-6 col-sm-6 col-md-4">
                  <div className="card-top-1">
                    <img
                      src="/images/Rent/card25-img.png"
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
                <div className="col-6 col-sm-6 col-md-4">
                  <div className="card-top-1">
                    <img
                      src="/images/Rent/card23-img.png"
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
              </div>
            </div>
            <div className="btn1 d-flex justify-content-center ">
              <button
                className=" btn btn-outline-dark text-dark "
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '3.125rem',
                  width: '15rem',
                  height: '3rem',
                }}
              >
                <div className="h5">瀏覽更多</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
