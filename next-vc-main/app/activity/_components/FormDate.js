'use client';

import { useState, useEffect } from 'react';

export default function FormDate({ title }) {
  const initState = () => {
    const start = new Date();
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    return [start.toISOString().split('T')[0], end.toISOString().split('T')[0]];
  };

  const [date, setDate] = useState(() => initState());
  const [error, setError] = useState("");

  useEffect(() => {
    const message = (date[0] > date[1]) ? "活動開始日期應該早於結束日期" : "";
    setError(message);
  }, [date]);


  return (
    <div className="d-flex flex-column align-self-stretch">
      <h4>{title}</h4>

      <div className="b-form-date">
        <div className="d-flex justify-content-between align-items-center">
          <div className="col">
            <input type="date" className="w-100" value={date[0]} onChange={e => setDate([e.target.value, date[1]])} />
          </div>
          <div className="col-1 text-center fs-5">~</div>
          <div className="col">
            <input type="date" className="w-100" value={date[1]} onChange={e => setDate([date[0], e.target.value])} />
          </div>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
  );
}
