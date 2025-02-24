export const dateFormat = (isoDate) => {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('zh-TW', options)
}
