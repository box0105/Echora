'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DataTable() {
  return (
    <>
      {/* heading */}
      <div className="card-heading bg-dark shadow-dark px-4 py-3">
        <div className="d-flex justify-content-between">
          <h3 className="text-white">活動列表</h3>
          <Link className="btn b-add-btn" href="/admin/activity/create">
            新增活動
          </Link>
        </div>
        <div style={{ color: 'var(--grey400)' }}>
          <small>共計 10 項活動</small>
        </div>
      </div>
      {/* content */}
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-items-center text-center mb-0">
            {/*head*/}
            <thead>
              <tr>
                <th>
                  <button className="b-btn-unstyled text-secondary opacity-4">
                    編號
                    <i className="ms-2 fa-solid fa-sort-up" />
                  </button>
                </th>
                <th className="text-secondary opacity-4">活動</th>
                <th className="text-secondary opacity-4">名稱</th>
                <th className="text-secondary opacity-4">活動類型</th>
                <th className="text-secondary opacity-4">音樂類型</th>
                {/* <th class="text-secondary opacity-4">
                    演出參與
                </th> */}
                <th>
                  <button className="b-btn-unstyled text-secondary opacity-4">
                    活動日期
                    <i className="ms-2 fa-solid fa-sort-up" />
                  </button>
                </th>
                {/* <th class="text-secondary opacity-4">
                    報名日期
                </th> */}
                <th>
                  <button className="b-btn-unstyled text-secondary opacity-4">
                    門票數量
                    <i className="ms-2 fa-solid fa-sort-up" />
                  </button>
                </th>
                <th>
                  <button className="b-btn-unstyled text-secondary opacity-4">
                    門票價格
                    <i className="ms-2 fa-solid fa-sort-up" />
                  </button>
                </th>
                <th className="text-secondary opacity-4">城市</th>
                {/* update & delete */}
                <th className="text-secondary opacity-4">操作</th>
              </tr>
            </thead>
            {/* tbody */}
            <tbody>
              <tr>
                <td>
                  <h6 className="mb-0">1</h6>
                </td>
                <td>
                  <div className="ratio ratio-16x9 border rounded">
                    <Image
                      src="/images/activity/浮現祭/main-1.jpg"
                      alt="浮現祭"
                      width={500}
                      height={300}
                      className="img-fluid"
                    />
                  </div>
                </td>
                <td>
                  <h6 className="mb-0 text-truncate">浮現祭</h6>
                </td>
                <td>
                  <h6 className="mb-0">音樂祭</h6>
                </td>
                <td>
                  <h6 className="mb-0">流行音樂</h6>
                </td>
                {/* <td>
                  <div class="row row-cols-1 gap-2 flex-wrap">
                      <div class="col">
                          <p class="text-center text-xs font-weight-bold mb-0 ">
                              123
                          </p>
                      </div>
                  </div>
                </td> */}
                <td>
                  <div className="h6 text-center mb-2">2024/3/12</div>
                  <div className="h6 text-center mb-0">2024/5/11</div>
                </td>
                {/* <td>
                    <div class="h6 text-center mb-2">
                        2024/3/12
                    </div>
                    <div class="h6 text-center mb-0">
                        2024/5/11
                    </div>
                </td> */}
                <td>
                  <div className="h6 mb-0">999</div>
                </td>
                <td>
                  <div className="h6 mb-0">NT$ 555</div>
                </td>
                <td>
                  <h6 className="mb-0">台中市</h6>
                </td>
                <td className="d-flex justify-content-center align-items-center gap-4">
                  <Link
                    className="text-secondary opacity-4"
                    href="/admin/activity/update"
                  >
                    <i className="fa-solid fa-pen-to-square" />
                  </Link>
                  <Link
                    className="text-secondary opacity-4"
                    href="/admin/activity/delete"
                  >
                    <i className="fa-regular fa-trash-can" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
