'use client';

export default function FormSelect({ title='選擇縣市', options, selected, onChange }) {
  return (
    <div className="d-flex flex-column align-self-stretch">
      <h4 className='b-cond-title'>{title}</h4>
      <select className="b-form-select" value={selected} onChange={e => {
        onChange(e.target.value);
      }}>
        <option value="" disabled>請選擇城市</option>
        {options.map((v, i) => {
          return <option key={i} value={options[i]}>{options[i]}</option>
        })}
      </select>
    </div>
  );
}
