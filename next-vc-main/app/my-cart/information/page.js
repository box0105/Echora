'use client'
import './_styles/bootstrap.scss'
import './_styles/cart-checkkist.scss'
import './_styles/index.scss'
import './_styles/cart-information.scss'
import React from 'react'
import CartList from '../checklist/_components/cart-list'
import { useMyCart } from '@/hooks/use-cart'
import Link from 'next/link';

export default function InformationPage() {
  const { 
    totalAmount,
  } = useMyCart()

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
          <form>
            <div className="container-fluid m-index1 row">
              <div className="m-sec2-col8 col-lg-8 col-12">
                <div className="d-flex justify-content-between align-items-end pt-4 pb-2">
                  <h2 className="h4">基本資料</h2>
                  <div>
                    <input
                      type="checkbox"
                      name="user-information"
                      id="user-information"
                    />
                    <label className="ps-1" htmlFor="user-information">
                      <h4>填入使用者資料</h4>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 pe-1">
                    <input className="w-100 p-3" type="text" placeholder="姓名" />
                  </div>
                  <div className="col-6 ps-1">
                    <input className="w-100 p-3" type="text" placeholder="手機" />
                  </div>
                  <div className="col12">
                    <input
                      className="w-100 p-3 mt-2"
                      type="email"
                      placeholder="E-mail"
                    />
                  </div>
                </div>
                <div className="d-flex align-items-end pt-4 pb-2">
                  <h2 className="h4">地址</h2>
                </div>
                <div className="row">
                  <div className="col-6 pe-1">
                    <input className="w-100 p-3" type="text" placeholder="縣市" />
                  </div>
                  <div className="col-6 ps-1">
                    <input
                      className="w-100 p-3"
                      type="text"
                      placeholder="鄉鎮 / 市區"
                    />
                  </div>
                  <div className="col12">
                    <input
                      className="w-100 p-3 mt-2"
                      type="email"
                      placeholder="地址"
                    />
                  </div>
                </div>
                <div className="d-flex align-items-end pt-4 pb-2">
                  <h2 className="h4">取貨方式</h2>
                </div>
                <div className="form-check py-3 mb-2">
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
                  <h2 className="h4">付款方式</h2>
                </div>
                <div className="form-check py-3 mb-2">
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
                <div className="form-check py-3 mb-2">
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
                  <h5>NT$ {totalAmount}</h5>
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
                  <h4 className="h4">NT$ {totalAmount}</h4>
                </div>
                {/* <div className="row row-cols-1 pt-4 d-md-block d-none">
                <CartList cartItems={cartItems} />
              </div> */}
                <button type="button" className="btn btn-dark w-100 mt-5">
                  下訂單
                </button>
                <Link href="/my-cart/checklist">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-3"
                  >
                    返回確認商品
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
