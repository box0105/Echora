"use client";

import ActivityCardBase from './ActivityCardBase';

export default function ActivityCard({ data }) {
  return (
    <ActivityCardBase
      data={data}
      imageSize={{ col: 4, lg: 6 }}
      showCategory={true}
      showLocation={true}
    >
      <a
        className="b-btn b-sm-none"
        href={`https://www.google.com/maps?q=${data?.address}`}
        target="_blank"
      >
        查看地圖 <i className="ms-2 fa-solid fa-location-arrow" />
      </a>
    </ActivityCardBase>
  );
}
