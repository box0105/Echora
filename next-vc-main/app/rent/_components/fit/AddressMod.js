const AddressMod = () => (
    <div className="rent title">
      <div className="h5 c-lenav">租借地址</div>
      <div className="address-check pt-3">
        <div className="ch-1 d-flex pb-4">
          <div className="form-check mb-0">
            <input
              className="form-check-input focus-ring"
              style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
              type="checkbox"
              id="Taipei"
            />
            <label className="form-check-label" htmlFor="Taipei">
              <h6 className="h6">台北店</h6>
            </label>
          </div>
        </div>
        <div className="address-check d-flex pb-4">
          <div className="form-check mb-0">
            <input
              className="form-check-input focus-ring"
              style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
              type="checkbox"
              id="Taichung"
            />
            <label className="form-check-label" htmlFor="Taichung">
              <h6 className="h6">台中店</h6>
            </label>
          </div>
        </div>
        <div className="address-check d-flex pb-4">
          <div className="form-check mb-0">
            <input
              className="form-check-input focus-ring"
              style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
              type="checkbox"
              id="Kaohsiung"
            />
            <label className="form-check-label" htmlFor="Kaohsiung">
              <h6 className="h6">高雄店</h6>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default AddressMod;
  