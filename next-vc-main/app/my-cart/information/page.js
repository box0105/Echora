'use client'
import './_styles/bootstrap.scss'
import './_styles/cart-checkkist.scss'
import './_styles/style0.scss'
import './_styles/index.scss'
import './_styles/cart-information.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

export default function InformationPage() {
  return (
    <>
      <div className="m-background">
        <div className="m-checklist-section1">
          <div className="container-fluid d-flex justify-content-center m-index1">
            <div className="m-sec1-img w-75">
              <img className="img-fluid" src="/images/cart/流程圖2.svg" alt />
            </div>
            <div className="m-sec1-mobile w-75">
              <img
                className="img-fluid"
                src="/images/cart/流程圖2-手機.svg"
                alt
              />
            </div>
          </div>
        </div>
        <div className="m-checklist-section2 w-100">
          <div className="container-fluid m-index1 row">
            <div className="m-sec2-col8 col-lg-8 col-12">
              <div className="d-flex justify-content-between align-items-end pt-4 pb-2">
                <h2 className="h2">基本資料</h2>
                <div>
                  <input
                    type="checkbox"
                    name="user-information"
                    id="user-information"
                  />
                  <label className="ps-1" htmlFor="user-information">
                    <h3>填入使用者資料</h3>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input className="w-100 p-3" type="text" placeholder="姓名" />
                </div>
                <div className="col-6">
                  <input className="w-100 p-3" type="text" placeholder="手機" />
                </div>
                <div className="col12">
                  <input
                    className="w-100 p-3 mt-4"
                    type="email"
                    placeholder="E-mail"
                  />
                </div>
              </div>
              <div className="d-flex align-items-end pt-4 pb-2">
                <h2 className="h3">地址</h2>
              </div>
              <div className="row">
                <div className="col-6">
                  <input className="w-100 p-3" type="text" placeholder="縣市" />
                </div>
                <div className="col-6">
                  <input
                    className="w-100 p-3"
                    type="text"
                    placeholder="鄉鎮 / 市區"
                  />
                </div>
                <div className="col12">
                  <input
                    className="w-100 p-3 mt-4"
                    type="email"
                    placeholder="地址"
                  />
                </div>
              </div>
              <div className="d-flex align-items-end pt-4 pb-2">
                <h2 className="h3">取貨方式</h2>
              </div>
              <div className="form-check py-3">
                <input
                  type="radio"
                  name="flexRadioDefault1"
                  id="flexRadioDefault1"
                />
                <label
                  className="form-check-label ps-2"
                  htmlFor="flexRadioDefault1"
                >
                  宅配到府
                </label>
              </div>
              <div className="form-check py-3">
                <input
                  type="radio"
                  name="flexRadioDefault1"
                  id="flexRadioDefault2"
                  defaultChecked
                />
                <label
                  className="form-check-label ps-2"
                  htmlFor="flexRadioDefault2"
                >
                  來店自取
                </label>
              </div>
              <div className="d-flex align-items-end pt-4 pb-2">
                <h2 className="h3">付款方式</h2>
              </div>
              <div className="form-check py-3">
                <input
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label
                  className="form-check-label ps-2"
                  htmlFor="flexRadioDefault1"
                >
                  LINE Pay
                </label>
              </div>
              <div className="form-check py-3">
                <input
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  defaultChecked
                />
                <label
                  className="form-check-label ps-2"
                  htmlFor="flexRadioDefault2"
                >
                  綠界科技ECPay
                </label>
              </div>
              <div className="form-check py-3 pe-4">
                <input
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  defaultChecked
                />
                <label
                  className="form-check-label ps-2"
                  htmlFor="flexRadioDefault2"
                >
                  信用卡
                </label>
                <div className="row pt-2">
                  <div className="col-lg-6">
                    <div className="col-12">
                      <input
                        className="w-100 p-3"
                        type="email"
                        placeholder="卡號 1234 1234 1234 1234"
                      />
                    </div>
                    <div className="row">
                      <div className="col-6 mt-3">
                        <input
                          className="w-100 p-3"
                          type="text"
                          placeholder="到期日 MM / YY"
                        />
                      </div>
                      <div className="col-6">
                        <input
                          className="w-100 p-3 mt-3"
                          type="text"
                          placeholder="安全碼 CVC"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-sec2-col4 col-lg-4 col-12">
              <div className="h3 pt-4 pb-2">訂單摘要</div>
              <div className="d-flex justify-content-between py-2">
                <h5>小計 :</h5>
                <h5>NT$ 27,998</h5>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h5>運費 :</h5>
                <h5>Free</h5>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h5>折扣 :</h5>
                <h5>-20%</h5>
              </div>
              <hr />
              <div className="d-flex justify-content-between py-3">
                <h4 className="h4">總計 :</h4>
                <h4 className="h4">NT$ 22,398</h4>
              </div>
              <div className="row row-cols-1 pt-4 d-md-block d-none">
                <div className="col">
                  <div className="card card1 mb-3">
                    <div className="row g-0">
                      <div className="col-md-3 m-sec2-card">
                        <img
                          src="/images/cart/card2-img.png"
                          className="img-fluid"
                          alt
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body p-3">
                          <div className="d-flex flex-column justify-content-between">
                            <div>
                              <h3 className="h4 py-lg-2">
                                Limited Edition Paranormal Troublemaker
                                Telecaster® Deluxe
                              </h3>
                              <h5 className="py-lg-1">顏色 : white</h5>
                              <h5 className="p-lg-0">數量 : 1</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card card1 mb-3">
                    <div className="row g-0">
                      <div className="col-md-3 m-sec2-card">
                        <img
                          src="/images/cart/card2-img.png"
                          className="img-fluid"
                          alt
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body p-3">
                          <div className="d-flex flex-column justify-content-between">
                            <div>
                              <h3 className="h4 py-lg-2">
                                Limited Edition Paranormal Troublemaker
                                Telecaster® Deluxe
                              </h3>
                              <h5 className="py-lg-1">顏色 : white</h5>
                              <h5 className="p-lg-0">數量 : 1</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="btn btn-dark w-100 mt-5">
                下訂單
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3"
              >
                返回確認商品
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
