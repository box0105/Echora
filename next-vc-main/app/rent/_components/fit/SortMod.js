const SortMod = ({ setIsOpen, onKeyPressHandler, onChange, selectedSort }) => {
    if (typeof onChange !== 'function') {
      console.error("onChange 不是函数，請檢查父组件是否正确传递");
      return null;
    }
  
    const sortOptions = [
      { id: 'name-asc', label: '產品名稱:A-Z', field: 'name', direction: 'asc' },
      { id: 'name-desc', label: '產品名稱:Z-A', field: 'name', direction: 'desc' },
      { id: 'price-asc', label: '價格:由低到高', field: 'price', direction: 'asc' },
      { id: 'price-desc', label: '價格:由高到低', field: 'price', direction: 'desc' },
    ];
  
    return (
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
  
        <div className="sor-check pt-3">
          {sortOptions.map((option) => (
            <div key={option.id} className="ch-1 d-flex pb-4">
              <div className="form-check mb-0">
                <input
                  className="form-check-input"
                  type="radio"
                  id={option.id}
                  name="sortOption"
                  checked={selectedSort === option.id}
                  onChange={() => onChange(option)}
                />
                <label className="form-check-label" htmlFor={option.id}>
                  <h6 className="h6">{option.label}</h6>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SortMod;
  