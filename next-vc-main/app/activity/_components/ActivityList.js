import React from 'react';
import ActivityCard from './ActivityCard';

export default function ActivityList({ data }) {
    return (
        <div className="b-act-list d-flex flex-column">
            <div className="row row-cols-1 row-cols-xxl-2 gx-5 gy-5">
                {data.map(act => (
                    <ActivityCard key={act.id} activity={act} />
                ))}
            </div>

            <button className="b-btn b-load-btn">瀏覽更多</button>
        </div>
    );
}