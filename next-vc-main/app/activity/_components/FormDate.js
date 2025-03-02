'use client';

export default function FormDate({ title, selected, error, onChange1, onChange2 }) {
  return (
    <div className="d-flex flex-column align-self-stretch">
      <h4>{title}</h4>

      <div className="b-form-date">
        <div className="d-flex justify-content-between align-items-center">
          <div className="col">
            <input type="date" className="w-100" value={selected[0]} onChange={e=>onChange1(e)} />
          </div>
          <div className="col-1 text-center fs-5">~</div>
          <div className="col">
            <input type="date" className="w-100" value={selected[1]} onChange={e => onChange2(e)} />
          </div>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
  );
}
