'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { dateFormat } from '@/app/activity/_utils/dateFormat'
import { useActivity } from '@/hooks/use-activity'
import { toastSuccess, toastWarning } from '@/hooks/use-toast'

export default function DataTable() {
  const { acts, isLoading, reFetch } = useActivity()

  // API delete
  const deleteActivity = async (activityId, activityName) => {
    // 確保 window 存在（= 在瀏覽器端）
    if (typeof window !== 'undefined') {
      const confirm = window.confirm(`確定要刪除活動「${activityName}」嗎?`)
      if (!confirm) return
    } else {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3005/api/activities/${activityId}`,
        {
          method: 'DELETE',
        }
      )

      const result = await response.json()
      if (result.status === 'success') {
        toastSuccess('活動刪除成功')
        console.log('活動刪除成功', result)

        // 觸發重新 fetch 資料
        reFetch()
      } else {
        toastWarning('該活動已被刪除')
      }
    } catch (error) {
      toastWarning('活動刪除發生錯誤')
      console.error('活動刪除失敗!', error.message)
    }
  }

  if (isLoading) return <h3>網頁載入中，請稍後...</h3>
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
          <small>共計 {acts?.length} 項活動</small>
        </div>
      </div>
      {/* content */}
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-items-center text-center mb-0">
            {/*head*/}
            <thead>
              <tr>
                {/* <th>
                  <button className="b-btn-unstyled text-secondary opacity-4">
                    編號
                    <i className="ms-2 fa-solid fa-sort-up" />
                  </button>
                </th> */}
                <th className="text-secondary opacity-4">編號</th>
                <th className="text-secondary opacity-4">活動</th>
                <th className="text-secondary opacity-4">名稱</th>
                <th className="text-secondary opacity-4">活動類型</th>
                <th className="text-secondary opacity-4">音樂類型</th>
                {/* <th>
                  <button className="b-btn-unstyled text-secondary opacity-4">
                    活動日期
                    <i className="ms-2 fa-solid fa-sort-up" />
                  </button>
                </th> */}
                <th className="text-secondary opacity-4">活動日期</th>

                {/* <th>
                  <button className="b-btn-unstyled text-secondary opacity-4">
                    門票數量
                    <i className="ms-2 fa-solid fa-sort-up" />
                  </button>
                </th> */}
                <th className="text-secondary opacity-4">門票數量</th>
                {/* <th>
                  <button className="b-btn-unstyled text-secondary opacity-4">
                    門票價格
                    <i className="ms-2 fa-solid fa-sort-up" />
                  </button>
                </th> */}
                <th className="text-secondary opacity-4">門票價格</th>
                <th className="text-secondary opacity-4">城市</th>
                {/* update & delete */}
                <th className="text-secondary opacity-4">操作</th>
              </tr>
            </thead>
            {/* tbody */}
            <tbody>
              {acts?.map((act) => {
                return (
                  <tr key={act.id}>
                    <td>
                      <h6 className="mb-0">{act.id}</h6>
                    </td>
                    <td>
                      <div className="ratio ratio-16x9 border rounded">
                        <Image
                          src={`/images/activity/${act.media.split(',')[0]}`}
                          alt={act.name}
                          fill
                          className="object-fit-cover"
                        />
                      </div>
                    </td>
                    <td>
                      <h6 className="mb-0 text-truncate">{act.name}</h6>
                    </td>
                    <td>
                      <h6 className="mb-0">{act.category.name}</h6>
                    </td>
                    <td>
                      <h6 className="mb-0">{act.genre.name}</h6>
                    </td>
                    <td>
                      <h6 className="text-center mb-0">
                        {dateFormat(act.date_start)}
                      </h6>
                      {act.date_end && (
                        <h6 className="text-center mt-2 mb-0">
                          {dateFormat(act.date_end)}
                        </h6>
                      )}
                    </td>
                    <td>
                      <h6 className="mb-0">{act.type[0]?.stock}</h6>
                    </td>
                    <td>
                      <h6 className="mb-0">
                        {act.type[0]?.price == 0
                          ? 'Free'
                          : `$${act.type[0]?.price.toLocaleString()}`}
                      </h6>
                    </td>
                    <td>
                      <h6 className="mb-0">{act.city}</h6>
                    </td>
                    <td className="d-flex justify-content-center align-items-center gap-4">
                      <Link
                        className="text-secondary opacity-4"
                        href={`/admin/activity/update?id=${act.id}`}
                      >
                        <i className="fa-solid fa-pen-to-square" />
                      </Link>
                      <Link
                        className="text-secondary opacity-4"
                        href="#"
                        onClick={() => deleteActivity(act.id, act.name)}
                      >
                        <i className="fa-regular fa-trash-can" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
