const LevelMod = ({ selectedLevels = [], onChange }) => {
    const levels = [
      { id: 'Beginner', label: '初級' },
      { id: 'Intermediate', label: '中級' },
      { id: 'Advanced', label: '高級' },
    ];
  
    return (
      <div className="level title">
        <div className="h5 c-lenav">吉他級別</div>
        {levels.map((level) => (
          <div key={level.id} className="level-check d-flex pt-3 g-3">
            <div className="form-check mb-0">
              <input
                className="form-check-input focus-ring"
                style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
                type="checkbox"
                id={level.id}
                checked={selectedLevels.includes(level.label)}
                onChange={() => onChange(level.label)}
              />
              <label className="form-check-label" htmlFor={level.id}>
                <h6 className="h6">{level.label}</h6>
              </label>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default LevelMod;
  