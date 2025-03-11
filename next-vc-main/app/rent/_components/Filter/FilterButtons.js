'use client';
import './filter.scss';

const FilterButtons = ({ onSubmit, onClear }) => (
  <div className="c-bot-mod d-flex justify-content-center" style={{ gap: 22 }}>
    <button className="btn btn-outline-dark text-dark c-filter-btn w-100" onClick={onClear}>
      <div className="h6 m-0">清除篩選</div>
    </button>
  </div>
);

export default FilterButtons;
