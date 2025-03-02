const BrandFilter = ({ selectedBrands = [], onChange }) => (
    <div className="brand">
      <div className="h5 c-lenav">品牌</div>
      <div className="brand-check pt-3">
        {['Gibson', 'Fender', 'ESP'].map((brand) => (  // 你可以在这里添加更多品牌
          <div key={brand} className="ch-1 d-flex pb-4">
            <div className="form-check mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id={brand}
                checked={selectedBrands.includes(brand)}  // 根据当前筛选条件判断是否选中
                onChange={() => onChange(brand)}  // 更新品牌筛选
              />
              <label className="form-check-label" htmlFor={brand}>
                <h6 className="h6">{brand}</h6>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  

export default BrandFilter
