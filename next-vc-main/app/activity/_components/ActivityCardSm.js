import Image from 'next/image'

export default function ActivityCardSm({ data }) {
  return (
    <div className="col">
      <div className="card">
        <div className="row g-0">
          <div className="col-4 col-xl-3">
            <Image
              className="object-fit-cover w-100 h-100"
              src={data.image}
              alt={data.name}
              width={500}
              height={300}
            />
          </div>
          <div className="col-8 col-xl-9">
            <div className="card-body d-flex flex-column">
              <div className="b-text d-flex flex-column">
                <h2 className="card-title">
                  <a href="true">{data.name}</a>
                </h2>
                <div className="h5">{`活動日期 : ${data.date_start} ~ ${data.date_end}`}</div>
                <h6 className="card-text b-tag">{data.genre.name}</h6>
                <h6 className="card-text ">票價 : {data.type?.[0]?.price}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
