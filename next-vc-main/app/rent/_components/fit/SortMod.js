const SortMod = ({ setIsOpen, onKeyPressHandler }) => (
    <div className="sort">
      <div className="row">
        <div className="col-11 h5 c-lenav">排序</div>
        <div
          className="col-1 h5 c-lenav"
          onClick={() => setIsOpen(false)}
          onKeyUp={onKeyPressHandler}
          role="button"
          tabIndex="0"
        >
          X
        </div>
      </div>
      <ul className=""></ul>
      <div className="sor-check pt-3">
        <div className="ch-1 d-flex pb-4">
          <div className="form-check mb-0">
            <input
              className="form-check-input focus-ring pb-2"
              style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
              type="checkbox"
              id="a-z"
            />
            <label className="form-check-label" htmlFor="a-z">
              <h6 className="h6">產品名稱:A-Z</h6>
            </label>
          </div>
        </div>
        <div className="ch-1 d-flex pb-4">
          <div className="form-check mb-0">
            <input
              className="form-check-input focus-ring"
              style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
              type="checkbox"
              id="z-a"
            />
            <label className="form-check-label" htmlFor="z-a">
              <h6 className="h6">產品名稱:Z-A</h6>
            </label>
          </div>
        </div>
      </div>
      <div className="ch-1 d-flex pb-4">
        <div className="form-check mb-0">
          <input
            className="form-check-input focus-ring"
            style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
            type="checkbox"
            id="price-top"
          />
          <label className="form-check-label" htmlFor="price-top">
            <h6 className="h6">價格:由低到高</h6>
          </label>
        </div>
      </div>
      <div className="ch-1 d-flex pb-4">
        <div className="form-check mb-0">
          <input
            className="form-check-input focus-ring"
            style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
            type="checkbox"
            id="price-low"
          />
          <label className="form-check-label" htmlFor="price-low">
            <h6 className="h6">價格:由高到低</h6>
          </label>
        </div>
      </div>
    </div>
  );
  
  export default SortMod;
  