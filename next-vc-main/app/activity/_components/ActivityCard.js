import Image from 'next/image'

import { dateFormat } from '../_utils/dateFormat';

export default function ActivityCard({ data }) {
  const src = '/images/activity/';
  
  return (
    <div className="col">
      <div className="card h-100">
        <div className="row g-0 h-100">
          {/* card-image */}
          <div className="col-4 col-lg-6">
            <Image
              className="object-fit-cover w-100 h-100"
              src={`${src}${data?.media?.split(',')[0]}`}
              alt={data?.name || '照片載入失敗'}
              width={500}
              height={300}
            />
          </div>
          {/* card-body */}
          <div className="col-8 col-lg-6">
            <div className="card-body d-flex flex-column">
              <div className="b-text d-flex flex-column">
                <h4 className="b-sm-none">{data?.category.name}</h4>
                <h2 className="card-title">
                  <a href={`data/detail?id=${data?.id}`}>{data?.name}</a>
                </h2>
                <h5>日期 : {`${dateFormat(data.date_start)}${data.date_end ? ` ~ ${dateFormat(data.date_end)}` : ''}`}</h5>
                <h6 className="card-text b-tag">{data?.genre.name}</h6>
                <h6 className="card-text ">票價 : NT$ {data?.type?.[0]?.price.toLocaleString()}</h6>
                <h6 className="b-sm-none">地點 : {data?.city}{data?.dist}{data?.address}</h6>
              </div>
              <a
                className="b-btn b-sm-none"
                href={`https://www.google.com/maps?q=${data?.address}`}
                target="_blank"
              >
                查看地圖 <i className="ms-2 fa-solid fa-location-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
