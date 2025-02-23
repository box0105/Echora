'use client'

export default function Title({ _title='主標題' }) {
  const [title, subTitle] = _title.split(', ')

  // 只要有包含任意中文字符
  const isTitleCh = /[\u4e00-\u9fff]/.test(title)
  const isSubTitleCh = /[\u4e00-\u9fff]/.test(subTitle)

  return (
    <div className="b-title d-flex align-items-baseline">
      {isTitleCh ? (
        <h1 className="mb-0">{title}</h1>
      ) : (
        <div className="h1">{title}</div>
      )}
      {subTitle && (
        <>
          {isSubTitleCh ? (
            <h4 className="mb-0">, {subTitle}</h4>
          ) : (
            <div className="h4">, {subTitle}</div>
          )}
        </>
      )}
    </div>
  )
}
