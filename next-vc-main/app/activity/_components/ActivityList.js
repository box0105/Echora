'use client'

import React, { useState } from 'react';
import ActivityCard from './ActivityCard';
import ActivityCardSm from '../_components/ActivityCardSm';

export default function ActivityList({ data, id, numPerPage = 3, isSmall = false }) {
    const [displayNum, setDisplayNum] = useState(numPerPage);
    const filteredData = Array.isArray(data) ? (id ? data.filter(act => act.id !== id) : data) : [];
    const CardComponent = isSmall ? ActivityCardSm : ActivityCard;

    return (
        <div className="b-act-list d-flex flex-column">
            <div className={`row row-cols-1 ${isSmall ? 'row-cols-lg-2 row-cols-xl-3' : 'row-cols-xxl-2'} gx-4 gy-5`}>
                {filteredData.slice(0, displayNum).map(act => (
                    <CardComponent key={act.id} data={act} />
                ))}
            </div>
            {displayNum < filteredData.length && (
                <button
                    className="b-btn b-load-btn"
                    onClick={() => setDisplayNum(displayNum + numPerPage)}
                >
                    瀏覽更多
                </button>
            )}
        </div>
    );
}
