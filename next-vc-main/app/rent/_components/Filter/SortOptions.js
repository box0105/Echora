const SortOptions = ({ onChange, selectedSorts }) => {
    const sortOptions = [
      { id: 'name-asc', label: '產品名稱:A-Z', field: 'name', direction: 'asc' },
      { id: 'name-desc', label: '產品名稱:Z-A', field: 'name', direction: 'desc' },
      { id: 'price-asc', label: '價格:由低到高', field: 'price', direction: 'asc' },
      { id: 'price-desc', label: '價格:由高到低', field: 'price', direction: 'desc' },
    ];
  
    return (
      <div className="sort">
        <div className="h5 c-lenav">排序</div>
        <div className="sor-check pt-3">
          {sortOptions.map((option) => (
            <div key={option.id} className="ch-1 d-flex pb-4">
              <div className="form-check mb-0">
                <input
                  className="form-check-input"
                  type="radio"
                  id={option.id}
                  name="sortOption"
                  checked={selectedSorts === option.id}  
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
  export default SortOptions;
  