'use client'

export default function Title({ isCh = true, title = "主要標題", subTitle = "副標題" }) {
  return (
    <div className="b-container">
      <div className="b-title d-flex align-items-baseline">
        {isCh ? <h1 className="mb-0">{title}</h1> : <div class="h1">{title}</div>}
        <h4 className="mb-0">/ {subTitle}</h4>
      </div>
    </div>
  )
}