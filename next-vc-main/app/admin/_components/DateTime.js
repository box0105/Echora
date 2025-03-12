import React, { useState, useEffect, useRef } from 'react';

export default function DateTimeInput({ name, placeholder, value,onChange}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [value]);



  return (

    <div className='w-100 p-0'>
      <input
        className='col-6'
        type="datetime-local"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </div>

  );
}