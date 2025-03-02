const BrandMod = () => (
    <div className="brand">
      <div className="h5 c-lenav">品牌</div>
      <div className="brand-check pt-3">
        <div className="ch-1 d-flex pb-4">
          <div className="form-check mb-0">
            <input
              className="form-check-input focus-ring"
              style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
              type="checkbox"
              id="gibson"
            />
            <label className="form-check-label" htmlFor="gibson">
              <h6 className="h6">Gibson</h6>
            </label>
          </div>
        </div>
        <div className="ch-1 d-flex pb-4">
          <div className="form-check mb-0">
            <input
              className="form-check-input focus-ring"
              style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
              type="checkbox"
              id="Fender"
            />
            <label className="form-check-label" htmlFor="Fender">
              <h6 className="h6">Fender</h6>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default BrandMod;
  