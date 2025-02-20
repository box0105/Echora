import Image from 'next/image'

export default function ActivityCard({ activity }) {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="row g-0 h-100">
          {/* card-image */}
          <div className="col-4 col-lg-6">
            <Image
              className="object-fit-cover w-100 h-100"
              src={activity.image}
              alt={activity.title}
              width={500}
              height={300}
            />
          </div>
          {/* card-body */}
          <div className="col-8 col-lg-6">
            <div className="card-body d-flex flex-column">
              <div className="b-text d-flex flex-column">
                <h4 className="b-sm-none">{activity.category}</h4>
                <h2 className="card-title">
                  <a href={`activity/detail?id=${activity.id}`}>{activity.title}</a>
                </h2>
                <div className="h5">日期 : {activity.date}</div>
                <h6 className="card-text b-tag">{activity.genre}</h6>
                <h6 className="card-text ">票價 : {activity.price}</h6>
                <h6 className="b-sm-none">地點 : {activity.address}</h6>
              </div>
              <a
                className="b-btn b-sm-none"
                href={`https://www.google.com/maps?q=${activity.address}`}
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
