const FilterButtonsMod = ({ onSubmit, onClear }) => (
    <div className="c-bot-mod d-flex justify-content-center" style={{ gap: 22 }}>
      <button 
        className="btn btn-dark text-white c-filter-btn"
        onClick={onSubmit} 
      >
        <div className="h6 m-0">確定篩選</div>
      </button>
      <button 
        className="btn btn-outline-dark text-dark c-filter-btn"
        onClick={onClear} 
      >
        <div className="h6 m-0">清除篩選</div>
      </button>
    </div>
  );
  
  export default FilterButtonsMod;
  