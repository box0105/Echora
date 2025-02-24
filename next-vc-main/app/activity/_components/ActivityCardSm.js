import ActivityCardBase from './ActivityCardBase';

export default function ActivityCardSm({ data }) {
  return (
    <ActivityCardBase
      data={data}
      imageSize={{ col: 4, lg: 3 }}
      showCategory={false}
      showLocation={false}
    />
  );
}
