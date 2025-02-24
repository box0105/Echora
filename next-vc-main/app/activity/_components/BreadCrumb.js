'use client'

export default function BreadCrumb({ breads }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breads.map((bread, i) => {
          const breadText = bread?.split(',')[0];
          return (
            <li
              key={i}
              className={`breadcrumb-item ${
                i == breads.length - 1 ? 'active' : ''
              }`}
            >
              <a href="/activity">{breadText}</a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
