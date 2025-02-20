'use client'

import ReactHtmlParser from 'html-react-parser'
import { NumberZh } from 'number-zh'

export default function IntroCard({ isOpen, onClose, intro, info, lineup }) {
  const numberZh = new NumberZh()

  return (
    <div className="b-intro b-card">
      <div className="row g-0">
        {/* intro */}
        <div className="col-12">
          <h3 className="b-card-title mb-4">
            <i className="fa-solid fa-star me-3" />
            活動介紹
          </h3>
          <div className="b-card-text">{ReactHtmlParser(intro)}</div>
        </div>
        {/* info */}
        {isOpen && (
          <div className="col-12 col-xl-4 b-card-info">
            <h3 className="b-card-title mb-4">
              <i className="fa-solid fa-circle-info me-3" />
              活動資訊
            </h3>
            <div className="b-card-text d-flex flex-column gap-2">
              <h5 className="b-date">{`活動日期 : ${info.dateStart} ~ ${info.dateEnd}`}</h5>
              <h5 className="b-enroll-date">{`報名日期 : ${info.signupStart} ~ ${info.signupEnd}`}</h5>
              <h5 className="b-address">{`地址 : ${info.city}${info.dist}${info.address}`}</h5>
              <a
                className="b-btn b-sm-none mt-2"
                href={`https://www.google.com/maps?q=${info.address}`}
                target="_blank"
              >
                查看地圖
                <i className="ms-2 fa-solid fa-location-arrow" />
              </a>
            </div>
          </div>
        )}

        {/* lineup */}
        {isOpen && (
          <div className="col-12 col-xl-8 b-card-band">
            <h3 className="b-card-title mb-4">
              <i className="fa-solid fa-music me-3" />
              表演樂團
            </h3>
            <table className="table table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '20%' }}>釋出時間</th>
                  <th>演出陣容</th>
                </tr>
              </thead>
              <tbody>
                {lineup.map((bands, i) => {
                  return (
                    <tr key={i}>
                      <td>{`第${numberZh.numberToZh(i + 1)}波`}</td>
                      <td>{bands}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="col-auto mx-auto">
          <button className="flattenBtn b-btn-unstyled" onClick={onClose}>
            <i
              className={`fa-solid ${
                isOpen ? 'fa-chevron-up' : 'fa-chevron-down'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
