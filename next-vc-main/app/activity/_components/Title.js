'use client'

export default function Title({ _title = '主標題' }) {
  let title = _title;
  let subTitle = '';
  let divider = '';

  // 依據分隔符號拆分 title 和 subTitle
  const delimiters = [', ', '/ '];
  for (const d of delimiters) {
    if (_title.includes(d)) {
      [title, subTitle] = _title.split(d);
      divider = d;
      break;
    }
  }

  // 判斷是否包含中文
  const isChinese = (text) => /[\u4e00-\u9fff]/.test(text);
  const isTitleCh = isChinese(title);
  const isSubTitleCh = subTitle && isChinese(subTitle);

  return (
    <div className="b-title d-flex align-items-baseline">
      {isTitleCh ? <h1 className="mb-0">{title}</h1> : <div className="h1">{title}</div>}
      {subTitle && (
        <>
          {isSubTitleCh ? (
            <h4 className="mb-0">{divider}{subTitle}</h4>
          ) : (
            <div className="h4">{divider}{subTitle}</div>
          )}
        </>
      )}
    </div>
  );
}
