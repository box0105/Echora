'use client'

import Link from 'next/link'
import { useActivity } from '@/hooks/use-activity'

export default function BreadCrumb({ breads }) {
  const { updateQueryParams, deleteQueryParams } = useActivity()

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {/* {breads?.map((bread, i) => {
          const breadText = bread?.split(',')[0]
          const isLast = i === breads?.length - 1
          return (
            <li key={i} className={`breadcrumb-item ${isLast ? 'breadsive' : ''}`}>
              <Link
                href={isLast ? '' : '/breadsivity'}
                onClick={() => updateQueryParams({ city: '新北市' })}
              >
                {breadText}
              </Link>
            </li>
          )
        })} */}

        <li className={`breadcrumb-item`}>
          <Link
            href={'/activity'}
            onClick={() => {
              deleteQueryParams()
              updateQueryParams({ categoryIds: [breads.category_id] })
            }}
          >
            {breads?.category?.name}
          </Link>
        </li>
        <li className={`breadcrumb-item`}>
          <Link
            href={'/activity'}
            onClick={() => {
              deleteQueryParams()
              updateQueryParams({ genreIds: [breads.music_genre_id] })
            }}
          >
            {breads?.genre?.name}
          </Link>
        </li>
        <li className={`breadcrumb-item`}>
          <Link
            href={'/activity'}
            onClick={() => {
              deleteQueryParams()
              updateQueryParams({ city: breads.city })
            }}
          >
            {breads?.city}
          </Link>
        </li>
        <li className={`breadcrumb-item active`}>
          <Link href={'#'}>{breads?.name.split(',')[0]}</Link>
        </li>
      </ol>
    </nav>
  )
}
