const ColorMod = ({ selectedColors = [], onChange }) => {
  const handleColorChange = (color) => {
    // 更新顏色篩選條件
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color) // 如果顏色已選擇，則取消選擇
      : [...selectedColors, color] // 否則選擇該顏色
    onChange(updatedColors) // 調用 onChange 更新顏色篩選條件
  }

  const colors = [
    { name: 'Ebony', src: '/images/Rent/color-images/black.svg' },
    { name: 'Sky Blue', src: '/images/Rent/color-images/lightblue.svg' },
    { name: 'Dark Blue', src: '/images/Rent/color-images/darkblue.svg' },
    { name: 'Modern Purple', src: '/images/Rent/color-images/purple.svg' },
    { name: 'Fire Red', src: '/images/Rent/color-images/red.svg' },
    { name: 'Golden Yellow', src: '/images/Rent/color-images/yellow.svg' },
    { name: 'Tangerine', src: '/images/Rent/color-images/orange.svg' },
    { name: 'Brown', src: '/images/Rent/color-images/brown.svg' },
    { name: 'Dark Brown', src: '/images/Rent/color-images/dark-brown.svg' },
    { name: 'Marble White', src: '/images/Rent/color-images/white.svg' },
    { name: 'Slate Gray', src: '/images/Rent/color-images/grey.svg' },
    { name: 'Forest Green', src: '/images/Rent/color-images/green.svg' },
  ]

  return (
    <div className="color">
      <div className="color-title pb-4">
        <div className="h5 c-lenav">顏色</div>
      </div>
      <div className="c-filter-color d-flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            className="color-option"
            onClick={() => handleColorChange(color.name)} // 點擊顏色更新篩選條件
            aria-label={`Select color ${color.name}`} // 讓輔助技術用戶知道選擇的顏色
          >
            <img src={color.src} alt={color.name} className="color-img" />
            <input
              type="checkbox"
              checked={selectedColors.includes(color.name)}
              onChange={() => handleColorChange(color.name)} // 改變時更新篩選條件
              hidden // 隱藏原始的 checkbox
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorMod
