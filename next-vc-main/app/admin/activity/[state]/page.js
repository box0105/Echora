'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function AdminActivityState() {
  const { state } = useParams()
  console.log(state)

  if (state === 'create')
    return (
      <div className="card b-card">
        {/* title */}
        <div className="heading row justify-content-between mb-4">
          <div className="col-auto">
            <h1>新增活動</h1>
          </div>
        </div>
        {/* form */}
        <form className="form">
          <input
            type="hidden"
            className="form-control"
            name="id"
            defaultValue="id"
          />
          <div className="mb-5">
            <div className="col-auto">
              <label className="form-label">名稱</label>
              <input
                type="text"
                className="form-control"
                name="name"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="form-label">活動類型</label>
            <div className="b-option-container">
              <input
                type="radio"
                id="activity-1"
                name="categrey"
                defaultValue="音樂祭"
                className="d-none"
              />
              <label htmlFor="activity-1" className="btn btn-outline-secondary">
                音樂祭
              </label>
              <input
                type="radio"
                id="activity-2"
                name="categrey"
                defaultValue="音樂活動"
                className="d-none"
              />
              <label htmlFor="activity-2" className="btn btn-outline-secondary">
                音樂活動
              </label>
              <input
                type="radio"
                id="activity-3"
                name="categrey"
                defaultValue="電音派對"
                className="d-none"
              />
              <label htmlFor="activity-3" className="btn btn-outline-secondary">
                電音派對
              </label>
            </div>
          </div>
          <div className="mb-5">
            <label className="form-label">音樂類型</label>
            <div className="b-option-container">
              <input
                type="radio"
                id="genre-1"
                name="genre"
                defaultValue="流行音樂"
                className="d-none"
              />
              <label htmlFor="genre-1" className="btn btn-outline-secondary">
                流行音樂
              </label>
              <input
                type="radio"
                id="genre-2"
                name="genre"
                defaultValue="古典音樂"
                className="d-none"
              />
              <label htmlFor="genre-2" className="btn btn-outline-secondary">
                古典音樂
              </label>
              <input
                type="radio"
                id="genre-3"
                name="genre"
                defaultValue="交響樂"
                className="d-none"
              />
              <label htmlFor="genre-3" className="btn btn-outline-secondary">
                交響樂
              </label>
            </div>
          </div>
          <div className="mb-5">
            <div className="row">
              <div className="col-3">
                <label className="form-label">活動開始日期</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="date_start"
                  required
                />
              </div>
              <div className="col-3">
                <label className="form-label">活動結束日期</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="date_end"
                  required
                />
              </div>
              <div className="col-3">
                <label className="form-label">報名開始日期</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="signup_start"
                  required
                />
              </div>
              <div className="col-3">
                <label className="form-label">報名結束日期</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="signup_end"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <div className="row gy-4">
              <div className="col-6">
                <label className="form-label">門票名稱 1</label>
                <input
                  type="select"
                  className="form-control"
                  name="ticket_name[]"
                  required
                />
              </div>
              <div className="col-3">
                <label className="form-label">門票價格 1</label>
                <input
                  type="number"
                  className="form-control"
                  name="ticket_price[]"
                  required
                />
              </div>
              <div className="col-3">
                <label className="form-label">門票數量 1</label>
                <input
                  type="number"
                  className="form-control"
                  name="ticket_num[]"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-5 row">
            {/* 城鄉縣市選擇器 */}
            <div className="col-3">
              <label className="form-label">城市</label>
              <select className="form-select" name="city">
                <option selected>請選擇縣市</option>
                <option value="新北市">新北市</option>
              </select>
            </div>
            <div className="col-3">
              <label className="form-label">區鄉鎮</label>
              <select className="form-select" name="disc">
                <option selected>請選擇區域</option>
                <option value="板橋區">板橋區</option>
                <option value="板橋區">板橋區</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label">地點</label>
              <input
                type="text"
                className="form-control"
                name="address"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="form-label">活動描述</label>
            <textarea
              className="form-control"
              name="intro"
              rows={12}
              required
              defaultValue={''}
            />
          </div>
          <div className="mb-5">
            <label className="form-label">演出陣容</label>
            <textarea
              className="form-control"
              name="lineup"
              rows={6}
              required
              defaultValue={''}
            />
          </div>
          <div className="mb-5">
            <div className="row gy-4">
              {/* 左側區域 */}
              <div className="col-6">
                <div className="row gy-4">
                  {/* 文章標題欄位 */}
                  <div className="col-12">
                    <label className="form-label">文章標題 1</label>
                    <input
                      type="text"
                      className="form-control"
                      name="article_title[]"
                      required
                    />
                  </div>
                  {/* 上傳文件欄位 */}
                  <div className="col-12">
                    <input
                      type="file"
                      id="addImage"
                      name="file[]"
                      multiple
                      className="form-control"
                    />
                  </div>
                </div>
                {/* 上傳圖片區域 */}
                <div className="col-12 mt-3">
                  <div
                    className="row row-cols-xl-3 row-cols-lg-2 row-cols-1 g-3"
                    id="add-article-img-area"
                  ></div>
                </div>
              </div>
              {/* 右側區域 */}
              <div className="col-6">
                <label className="form-label">文章內容 1</label>
                <textarea
                  className="form-control"
                  name="article_content[]"
                  rows={8}
                  required
                  defaultValue={''}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="form-label">活動照片</label>
            <div
              className="row row-cols-xl-3 row-cols-lg-2 row-cols-1 g-3"
              id="add-img-area"
            />
            <div className="col-auto">
              <input
                type="file"
                id="addImage"
                name="file[]"
                className="mt-4 form-control"
                multiple
              />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-outline-secondary" type="submit">
              完成
            </button>
            <Link href="/admin/activity" className="btn btn-secondary ms-2">
              取消
            </Link>
          </div>
        </form>
      </div>
    )
  else if (state === 'update') return <></>
  else return <>state invalid</>
}
