'use client'

import React from 'react'

export default function FormTitleWithBtn({ title, num, onAdd, handleForm }) {
  return (
    <div className="b-cond-title d-flex justify-content-between align-items-center">
      <h4 className="mb-0">{title}</h4>
      <div>
        <button
          className="btn btn-outline-dark mb-0"
          type="button"
          onClick={() => onAdd(num + 1)}
        >
          新增{`${title}`}
        </button>
        <button
          className="btn btn-outline-danger mb-0 ms-4"
          type="button"
          onClick={() => {
            if (num > 1) {
              onAdd(num - 1)
              handleForm()
            }
          }}
        >
          減少{`${title}`}
        </button>
      </div>
    </div>
  )
}
