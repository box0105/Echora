'use client'

export default function BreadCrumb({ breads }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breads.map((bread, i) => {
          return (
            <li key={i} className={`breadcrumb-item ${i == breads.length - 1 ? 'active' : ''}`}>
              <a href="act-list.html">{bread}</a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}