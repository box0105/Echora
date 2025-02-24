'use client'

import { useState } from 'react'
import ActivityCardSm from '../_components/ActivityCardSm'

export default function ActivityListSm({ data, id, numPerPage = 3 }) {
  const [displayNum, setDisplayNum] = useState(numPerPage)
  const filteredData = Array.isArray(data)
    ? data.filter((act) => act.id !== id)
    : []

  return (
    <div className="b-act-list d-flex flex-column">
      <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 gx-4 gy-5">
        {filteredData.slice(0, displayNum).map((act) => (
          <ActivityCardSm key={act.id} data={act} />
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
  )
}
