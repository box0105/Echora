const BrandMod = ({ selectedBrands = [], onChange }) => {
    const brands = ['Gibson', 'Fender', 'ESP']; // 如需更多品牌，可在此陣列中添加
  
    return (
      <div className="brand">
        <div className="h5 c-lenav">品牌</div>
        <div className="brand-check pt-3">
          {brands.map((brand) => (
            <div key={brand} className="ch-1 d-flex pb-4">
              <div className="form-check mb-0">
                <input
                  className="form-check-input focus-ring"
                  style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
                  type="checkbox"
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onChange(brand)}
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
  };
  
  export default BrandMod;
  