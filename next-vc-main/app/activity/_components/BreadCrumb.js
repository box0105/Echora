'use client'

import Link from 'next/link'

export default function BreadCrumb({ breads }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breads?.map((bread, i) => {
          const breadText = bread?.split(',')[0];
          const isLast = (i === breads?.length - 1);
          return (
            <li
              key={i}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
            >
              <Link href={isLast ? '' : '/activity'}>{breadText}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
