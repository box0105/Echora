'use client'

export default function PriceSlider({
  selected,
  max = 10000,
  step = 0.05,
  onChange,
}) {

  return (
    <div className="d-flex flex-column align-self-stretch">
      <h4 className='b-cond-title'>價錢</h4>
      <div className="d-flex flex-column align-items-center gap-4">
        <input
          type="range"
          className="form-range"
          min={0}
          max={max}
          step={max * step}
          value={selected}
          onChange={(e) => {
            onChange(Number(e.target.value))
          }}
        />
        <div className="h6">
          {selected ? `低於 NT$ ${selected.toLocaleString()}` : '免費參加'}
        </div>
      </div>
      {/* <button className="b-btn b-load-btn">顯示商品</button> */}
    </div>
  )
}
