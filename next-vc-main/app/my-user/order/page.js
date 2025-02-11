'use client'

import '../_styles/order.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ProfilePage() {
  return (
    <div>
      <header />
      <main className="main">
        <div className="container">
          <h1 className="page-title">我的訂單</h1>
          <hr />
          <div className="hamburger-member" id="hamburger-member">
            <div className="dropdown-content dropdown">
              <h5>
                關於我 <i className="fa-solid fa-caret-down" />
              </h5>
              <h5 className="tab-link active" data-tab="orders">
                我的訂單
              </h5>
              <h5 className="tab-link active" data-tab="favorites">
                我的收藏
              </h5>
              <h5>我的優惠券</h5>
            </div>
          </div>
          <div className="content">
            <aside className="sidebar">
              <div className="sidebar-section">
                <h2 className="sidebar-title">關於我</h2>
                <ul className="sidebar-menu">
                  <li className="sidebar-item active">個人資料</li>
                  <li className="sidebar-item">修改密碼</li>
                </ul>
              </div>
              <div className="sidebar-section">
                <h2 className="sidebar-title">我的訂單</h2>
              </div>
              <div className="sidebar-section">
                <h2 className="sidebar-title">我的收藏</h2>
              </div>
              <div className="sidebar-section">
                <h2 className="sidebar-title">我的優惠券</h2>
              </div>
            </aside>
            <div className="order-form">
              <div className="order-header">
                <div className="order-title h4">我的訂單</div>
              </div>
              <div className="row order-summary">
                <div className="col-6 col-md-4 col-sm-6 order-image mb-2 h-100">
                  <img
                    className="order-image"
                    src="../images/user/ibanez.jpg"
                    alt="Ibanez 電吉他"
                  />
                </div>
                <div className="col-6 col-md-8 col-sm-6">
                  <p>
                    <strong>Ibanez AZ2204NW 電吉他 MGR薄荷綠</strong>
                  </p>
                  <p>單單雙 小搖座 AZ Prestige</p>
                  <p>顏色: JSHINE</p>
                  <p>數量: 1</p>
                  <p className="fw-bold fs-4">NT$25,900</p>
                  <div className="p-3 mt-4 total col-sm-12">
                    <p className="d-flex justify-content-between">
                      <span>小計</span>{' '}
                      <span className="ms-auto">NT$25,900</span>
                    </p>
                    <p className="d-flex justify-content-between">
                      <span>運費</span> <span>NT$500</span>
                    </p>
                    <hr />
                    <p className="d-flex justify-content-between fw-bold">
                      <span>所有商品</span> <span>NT$26,400</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer" />
    </div>
  )
}
