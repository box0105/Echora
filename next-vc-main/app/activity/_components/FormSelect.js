'use client';

import { useState } from 'react';

export default function FormSelect({ title, options }) {
  const [city, setCity] = useState('');

  return (
    <div className="d-flex flex-column align-self-stretch">
      <h4>{title}</h4>
      <select className="b-form-select" value={city} onChange={e => {
        setCity(e.target.value);
      }}>
        <option value="" disabled>請選擇城市</option>
        {options.map((v, i) => {
          return <option key={i} value={options[i]}>{options[i]}</option>
        })}
      </select>
    </div>
  );
}
