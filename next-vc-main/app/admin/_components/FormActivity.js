'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FormDate from '@/app/activity/_components/FormDate'
import FormTitleWithBtn from './FormTitleWithBtn'

const FormActivity = ({
  isUpdate,
  formData,
  setFormData,
  selectedCategories,
  selectedGenres,
  selectedDate,
  dateError,
  signupError,
  totalError,
  ticketNum,
  setTicketNum,
  bandNum,
  setBandNum,
  articleNum,
  setArticleNum,
  imageItems,
  handleFileChange,
  handleDateChange,
  handleImageDelete,
  handleTicketChange,
  handleLineupChange,
  handleArticleChange,
  handleSubmit,
  numberToZh,
}) => {
  return (
    <form className="b-admin-form d-flex flex-column">
      <div className="col-6">
        <h4 className="b-cond-title">名稱</h4>
        <input
          type="text"
          className="form-control"
          value={formData?.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="col-12">
        <h4 className="b-cond-title">活動類型</h4>
        <div className="b-option-container">
          {selectedCategories
            .map((item) => item.name)
            .map((v, i) => {
              const id = i + 1
              return (
                <div className="col-auto" key={`cate-${id}`}>
                  <label
                    className={`btn btn-outline-secondary mb-0 ${
                      formData?.category_id == id ? 'active' : ''
                    }`}
                    htmlFor={`cate-${id}`}
                  >
                    {v}
                  </label>
                  <input
                    id={`cate-${id}`}
                    type="radio"
                    name="genre"
                    className="d-none"
                    value={i + 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category_id: e.target.value,
                      })
                    }
                  />
                </div>
              )
            })}
        </div>
      </div>

      <div className="col-12">
        <h4 className="b-cond-title">音樂類型</h4>
        <div className="b-option-container">
          {selectedGenres
            .map((item) => item.name)
            .map((v, i) => {
              const id = i + 1
              return (
                <div className="col-auto" key={`genre-${id}`}>
                  <label
                    className={`btn btn-outline-secondary mb-0 ${
                      formData?.music_genre_id == id ? 'active' : ''
                    }`}
                    htmlFor={`genre-${id}`}
                  >
                    {v}
                  </label>
                  <input
                    id={`genre-${id}`}
                    type="radio"
                    name="genre"
                    className="d-none"
                    value={i + 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music_genre_id: e.target.value,
                      })
                    }
                  />
                </div>
              )
            })}
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <FormDate
            title="活動時間"
            error={dateError}
            selected={[formData?.date_start, formData?.date_end]}
            onChange1={(e) => {
              handleDateChange([e.target.value, selectedDate[1]])
              setFormData({
                ...formData,
                date_start: e.target.value,
              })
            }}
            onChange2={(e) => {
              handleDateChange([selectedDate[0], e.target.value])
              setFormData({
                ...formData,
                date_end: e.target.value,
              })
            }}
          />
        </div>
        <div className="col-6">
          <FormDate
            title="報名時間"
            error={signupError}
            selected={[formData?.signup_start, formData?.signup_end]}
            onChange1={(e) => {
              setFormData({
                ...formData,
                signup_start: e.target.value,
              })
            }}
            onChange2={(e) => {
              setFormData({
                ...formData,
                signup_end: e.target.value,
              })
            }}
          />
        </div>
        {totalError && (
          <div className="col-12 text-center text-danger mt-3">
            {totalError}
          </div>
        )}
      </div>

      <div className="col-12">
        <h4 className="b-cond-title">地址</h4>
        <input
          className="js-demeter-tw-zipcode-selector d-none"
          data-city="#city"
          data-dist="#dist"
          // 設定 city, dist
          value={formData.zipcode}
          readOnly
        />

        <div className="row align-items-end">
          <div className="col-6">
            <div className="d-flex align-self-stretch">
              <div className="col">
                <select
                  id="city"
                  placeholder="請選擇縣市"
                  className="w-100"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.currentTarget.value,
                      // 城市選完，地區要等使用者重選
                      dist: '',
                    })
                  }
                ></select>
              </div>
              <div className="col-1"></div>
              <div className="col">
                <select
                  id="dist"
                  placeholder="請選擇鄉鎮區"
                  className="w-100"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dist: e.currentTarget.value,
                      zipcode: document.querySelector(
                        '.js-demeter-tw-zipcode-selector'
                      ).value,
                    })
                  }
                ></select>
              </div>
            </div>
          </div>

          <div className="col-6 ms-auto">
            <label className="form-label">地點</label>
            <input
              type="text"
              className="form-control"
              value={formData?.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="col-12">
        <h4 className="b-cond-title">描述</h4>
        <textarea
          className="form-control"
          rows={16}
          required
          value={formData?.intro}
          onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
        />
      </div>

      <div className="col-12">
        <FormTitleWithBtn
          title="門票"
          num={ticketNum}
          onAdd={setTicketNum}
          handleForm={() =>
            setFormData((prev) => ({
              // formData 儲存的也要刪除
              ...prev,
              type: prev.type.slice(0, ticketNum - 1),
            }))
          }
        />

        {[...Array(ticketNum)].map((_, index) => (
          <div key={index} className="row mb-3 gy-4">
            <div className="col-6">
              <label className="form-label">名稱{numberToZh(index + 1)}</label>
              <input
                type="text"
                className="form-control"
                value={formData.type?.[index]?.name}
                onChange={(e) =>
                  handleTicketChange(index, 'name', e.target.value)
                }
                required
              />
            </div>
            <div className="col-3">
              <label className="form-label">價格{numberToZh(index + 1)}</label>
              <input
                type="number"
                className={`form-control b-ticket-${index + 1}`}
                value={formData.type?.[index]?.price}
                min={0}
                onChange={(e) => {
                  handleTicketChange(index, 'price', parseInt(e.target.value))
                }}
                required
              />
            </div>
            <div className="col-3">
              <label className="form-label">數量{numberToZh(index + 1)}</label>
              <input
                type="number"
                className="form-control"
                value={formData.type?.[index]?.stock}
                min={0}
                onChange={(e) => {
                  handleTicketChange(index, 'stock', parseInt(e.target.value))
                }}
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className="col-12">
        <FormTitleWithBtn
          title="陣容"
          num={bandNum}
          onAdd={setBandNum}
          handleForm={() =>
            setFormData((prev) => ({
              // formData 儲存的也要刪除
              ...prev,
              lineup: prev.lineup.slice(0, bandNum - 1),
            }))
          }
        />

        <div className="row row-cols-2 mb-3 gy-4">
          {[...Array(bandNum)].map((_, index) => (
            <div className="col" key={index}>
              <label className="form-label">陣容{numberToZh(index + 1)}</label>
              <textarea
                className="form-control"
                rows={3}
                onChange={(e) => handleLineupChange(index, e.target.value)}
                value={formData.lineup?.[index]?.bands || ''}
                required
              />
            </div>
          ))}
        </div>
      </div>

      <div className="col-12">
        <FormTitleWithBtn
          title="文章"
          num={articleNum}
          onAdd={setArticleNum}
          handleForm={() =>
            setFormData((prev) => ({
              // formData 儲存的也要刪除
              ...prev,
              article: prev.article.slice(0, articleNum - 1),
            }))
          }
        />

        <div className="row gy-4">
          {[...Array(articleNum)].map((_, index) => (
            <React.Fragment key={index}>
              <div className="col-6">
                <div className="row gy-4">
                  <div className="col-12">
                    <label className="form-label">
                      標題{numberToZh(index + 1)}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.article?.[index]?.title || ''}
                      required
                      onChange={(e) =>
                        handleArticleChange(index, 'title', e.target.value)
                      }
                    />
                  </div>

                  {/* 檔案上傳區 (捨棄) 
                  <div className="col-12">
                    <input type="file" multiple className="form-control" />
                  </div> */}
                </div>
                {/* 檔案預覽區 (捨棄) 
                <div className="col-12 mt-3">
                  <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-1 g-3"></div>
                </div> */}
              </div>

              <div className="col-6">
                <label className="form-label">
                  內容{numberToZh(index + 1)}
                </label>
                <textarea
                  className="form-control"
                  value={formData.article?.[index]?.content || ''}
                  rows={20}
                  onChange={(e) =>
                    handleArticleChange(index, 'content', e.target.value)
                  }
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="col-12">
        <h4 className="b-cond-title">活動圖片</h4>
        <div className="b-img-upload row row-cols-xl-3 row-cols-lg-2 row-cols-1 g-3">
          {imageItems.map((item, i) => (
            <div className="col position-relative" key={i}>
              <div className="ratio ratio-16x9 border rounded">
                <Image
                  className="object-fit-cover"
                  alt={item.url}
                  src={item.url}
                  fill
                />
              </div>
              <button
                type="button"
                className="b-delete-btn btn btn-light position-absolute top-0 end-0"
                onClick={() => handleImageDelete(item.id, item.type)}
              >
                x
              </button>
              <div
                style={{
                  color: item.type === 'uploading' ? 'var(--grey600)' : '',
                }}
                className={`p text-center fst-italic fw-medium mt-2 ${
                  item.type === 'uploading'
                    ? 'text-decoration-underline'
                    : 'text-secondary-emphasis'
                }`}
              >
                {item.type == 'uploading' && item.type}
              </div>
            </div>
          ))}
        </div>

        <div className="col-6">
          <input
            type="file"
            id="addImage"
            className="form-control mt-4"
            name="files"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* <pre>
        {'formData.media (已存入活動照片)\n'}
        {JSON.stringify(formData.media, null, 2)}
      </pre>
      <pre>
        {'新上傳照片\n'}
        {JSON.stringify(
          imageItems
            .filter((file) => file.type == 'uploading')
            .map((file) => ({
              id: file.id,
            })),
          null,
          2
        )}
      </pre> */}

      <div className="d-flex justify-content-end gap-3">
        <button
          className="btn btn-dark mb-0"
          type="button"
          onClick={handleSubmit}
        >
          完成
        </button>
        <Link
          href="/admin/activity"
          className="btn btn-outline-secondary ms-2 mb-0"
        >
          {isUpdate ? '返回' : '取消'}
        </Link>
      </div>
    </form>
  )
}

export default FormActivity
