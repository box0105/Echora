import React from 'react';
import Image from 'next/image';

export default function ActivityCard({ activity }) {
    return (
        <div className="col">
            <div className="card">
                <div className="row g-0">
                    {/* card-image */}
                    <div className="col-4 col-lg-6">
                        <Image
                            className="object-fit-cover w-100 h-100"
                            src={activity.image}
                            alt={activity.title}
                            width={500} height={300}
                            layout="responsive"
                        />
                    </div>
                    {/* card-body */}
                    <div className="col-8 col-lg-6">
                        <div className="card-body d-flex flex-column">
                            <div className="b-text d-flex flex-column">
                                <h4 className="b-sm-none">{activity.category}</h4>
                                <h2 className="card-title"><a href="act-detail.html">{activity.title}</a></h2>
                                <div className="h5">日期 : {activity.date}</div>
                                <h5 className="card-text b-tag">{activity.genre}</h5>
                                <h6 className="card-text ">票價 : {activity.price}</h6>
                                <h6 className="b-sm-none">地點 : {activity.location}</h6>
                            </div>
                            <a className="b-btn b-sm-none" href="https://www.google.com/maps" target="_blank">
                                查看地圖 <i className="ms-2 fa-solid fa-location-arrow" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
