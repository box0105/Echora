"use client";

import Image from 'next/image';
import Link from 'next/link'
import { dateFormat } from '../_utils/dateFormat';

export default function ActivityCardBase({ data, imageSize, showCategory, showLocation, children }) {
  const src = '/images/activity/';

  return (
    <div className="col" id={`act-${data.id}`}>
      <div className="card h-100">
        <div className="row g-0 h-100">
          {/* card-image */}
          <div className={`col-${imageSize.col} col-lg-${imageSize.lg}`}>
          <Link href={`/activity/${data?.id}`}>
            <Image
              className="object-fit-cover w-100 h-100"
              src={`${src}${data?.media?.split(',')[0]}`}
              alt={data?.name || '照片載入失敗'}
              width={500}
              height={300}
             />
          </Link>
          
          </div>
          {/* card-body */}
          <div className={`col-${12 - imageSize.col} col-lg-${12 - imageSize.lg}`}>
            <div className="card-body d-flex flex-column">
              <div className="b-text d-flex flex-column">
                {showCategory && <h4 className="b-sm-none">{data?.category.name}</h4>}
                <h2 className="card-title">
                  <Link href={`/activity/${data?.id}`}>{data?.name}</Link>
                </h2>
                <h5>
                  {`日期 : ${dateFormat(data.date_start)} ${data.date_end ? ` ~ ${dateFormat(data.date_end)}` : ''}`}
                </h5>
                <h6 className="card-text b-tag">{data?.genre.name}</h6>
                <h6 className="card-text">票價 : NT$ {data?.type?.[0]?.price?.toLocaleString()}</h6>
                {showLocation && <h6 className="b-sm-none">地點 : {data?.city}{data?.dist}{data?.address}</h6>}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
