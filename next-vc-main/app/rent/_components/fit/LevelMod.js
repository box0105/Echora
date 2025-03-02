const LevelMod = () => (
    <div className="level title">
      <div className="h5 c-lenav">吉他級別</div>
      <div className="level-check d-flex pt-3 g-3">
        <div className="form-check mb-0">
          <input
            className="form-check-input focus-ring"
            style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
            type="checkbox"
            id="Beginner"
          />
          <label className="form-check-label" htmlFor="Beginner">
            <h6 className="h6">初級</h6>
          </label>
        </div>
      </div>
      <div className="level-check d-flex pt-3 g-3">
        <div className="form-check mb-0">
          <input
            className="form-check-input focus-ring"
            style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
            type="checkbox"
            id="Intermediate"
          />
          <label className="form-check-label" htmlFor="Intermediate">
            <h6 className="h6">中級</h6>
          </label>
        </div>
      </div>
      <div className="level-check d-flex pt-3 g-3">
        <div className="form-check mb-0">
          <input
            className="form-check-input focus-ring"
            style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
            type="checkbox"
            id="Advanced"
          />
          <label className="form-check-label" htmlFor="Advanced">
            <h6 className="h6">高級</h6>
          </label>
        </div>
      </div>
    </div>
  );
  
  export default LevelMod;
  