'use client'
import "../_styles/globals.scss";
import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useState, useEffect } from 'react'

export default function Footer(props) {
  return (
   
        <footer>
          <div>
            <ul className="nav justify-content-center d-flex row">
              <li className="col-xxl-4 col-lg-12 col-md-12 col-sm-12">
                NEWSLETTER
                <div className="email">
                  <div className="group">
                    <input placeholder="請輸入email訂閱電子報" type="text" />
                    <i className="fa-solid fa-arrow-right" />
                  </div>
                  <hr />
                </div>
                <p>
                  點擊&quot;訂閱&quot;即表示您確認您已閱讀和理解
                  <a href="#">隱私權政策</a>
                  ，並且同
                  <br />
                  意接收時事通訊及其他如政策中所述的行銷資訊。
                </p>
              </li>
              <li className="col-xxl-1 col-lg-5 col-md-5 col-sm-5">
                INFO
                <div>常見問題</div>
                <div>購物說明</div>
                <div>物流配送</div>
                <div>退貨流程</div>
              </li>
              <li className="col-xxl-1 col-lg-5 col-md-5 col-sm-5">
                COMPANY
                <div>關於我們</div>
                <div>品牌合作</div>
                <div>最新消息</div>
                <div>服務條款</div>
              </li>
              <li className="col-xxl-2 col-lg-5 col-md-5 col-sm-5">
                GET IN TOUCH
                <div>service@echora.com</div>
                <div>聯絡客戶服務</div>
                <div>165反詐騙諮詢專線</div>
              </li>
              <li className="col-xxl-2 col-lg-5 col-md-5 col-sm-5">
                ACCOUNT
                <div>我的帳戶</div>
                <div>訂單狀態</div>
                <div>退貨與換貨</div>
              </li>
            </ul>
          </div>
          <hr />
          <div className="mise">
            <p>Copyright © 2025 Echora Company</p>
            <button className="btn btn-outline-dark ">
              <i className="fa-solid fa-location-dot " /> 查找專門店
            </button>
          </div>
        </footer>
      
  )
}
