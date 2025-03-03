'use client'
import styles from './footer.module.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useState, useEffect } from 'react'

export default function Footer(props) {
  return (
    <footer className={styles.footer}>
      <hr />
      <div>
        <ul className="nav justify-content-center row">
          <li className="col-12 col-lg-4">
            <h6 className="h7">NEWSLETTER</h6>
            <div className={styles.email}>
              <div className={styles.group}>
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
          <li className="h7 col-6 col-lg-2">
            INFO
            <div>
              <p className="m-0">常見問題</p>
            </div>
            <div>
              <p className="m-0">購物說明</p>
            </div>
            <div>
              <p className="m-0">物流配送</p>
            </div>
            <div>
              <p className="m-0">退貨流程</p>
            </div>
          </li>
          <li className="h7 col-6 col-lg-2">
            COMPANY
            <div>
              <p className="m-0">關於我們</p>
            </div>
            <div>
              <p className="m-0">品牌合作</p>
            </div>
            <div>
              <p className="m-0">最新消息</p>
            </div>
            <div>
              <p className="m-0">服務條款</p>
            </div>
          </li>
          <li className="h7 col-6 col-lg-2">
            GET IN TOUCH
            <div>
              <p className="m-0">service@echora.com</p>
            </div>
            <div>
              <p className="m-0">聯絡客戶服務</p>
            </div>
            <div>
              <p className="m-0">165反詐騙諮詢專線</p>
            </div>
          </li>
          <li className="h7 col-6 col-lg-2">
            ACCOUNT
            <div>
              <p className="m-0">我的帳戶</p>
            </div>
            <div>
              <p className="m-0">訂單狀態</p>
            </div>
            <div>
              <p className="m-0">退貨與換貨</p>
            </div>
          </li>
        </ul>
      </div>
      <hr />
      <div className={styles.mise}>
        <p>Copyright © 2025 Echora Company</p>
        <button className={`btn btn-outline-dark ${styles['k-btn']}`}>
          <i className="fa-solid fa-location-dot " /> 查找專門店
        </button>
      </div>
    </footer>
  )
}
