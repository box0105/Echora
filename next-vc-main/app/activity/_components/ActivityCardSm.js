"use client";

import ActivityCardBase from './ActivityCardBase';

export default function ActivityCardSm({ data, mapIndex }) {
  return (
    <ActivityCardBase
    mapIndex={mapIndex}
      data={data}
      imageSize={{ col: 4, lg: 3 }}
      showCategory={false}
      showLocation={false}
    />
  );
}
