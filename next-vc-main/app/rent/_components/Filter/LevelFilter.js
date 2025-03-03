const GuitarLevelFilter = ({ onChange, selectedLevels }) => (
    <div className="rent title">
      <div className="h5 c-lenav">吉他級別</div>
      <div className="level-check pt-3">
        {['初級', '中級', '高級'].map((level) => (
          <div key={level} className="ch-1 d-flex align-items-center gap-2 pb-4">
            <input
              className="form-check-input focus-ring"
              type="checkbox"
              id={level}
              checked={selectedLevels.includes(level)}
              onChange={() => onChange(level)}
              style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
            />
            <label className="form-check-label pt-1" htmlFor={level}>
              <span className="h6">{level}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default GuitarLevelFilter;
  