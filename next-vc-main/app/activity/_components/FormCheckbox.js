'use client'

import React from 'react'

export default function FormCheckbox({ title, selected, onChange }) {

  // 處理點選切換
  const onToggleChecked = (checkId) => {
    const nextChecks = selected.map((v) => {
      // 在陣列中找到id為傳入的petId的物件，並修改checked布林值為反相值(!v.checked)
      if (v.id === checkId) return { ...v, checked: !v.checked }
      // 其它沒有影響的物件值直接返回
      else return v
    })
    onChange(nextChecks)
  }

  return (
    <div className="d-flex flex-column align-self-stretch">
      <h4 className='b-cond-title'>{title}</h4>
      {/* <pre>{JSON.stringify(selected, null, 2)}</pre> */}
      {selected.map((check) => (
        <div
          className="b-form-checkbox d-flex align-items-center"
          key={check.id}
        >
          <input
            type="checkbox"
            id={`${title}-${check.id}`}
            checked={check.checked}
            onChange={() => onToggleChecked(check.id)}
          />
          <label htmlFor={`${title}-${check.id}`}>
            <h6>{check.name}</h6>
          </label>
        </div>
      ))}
    </div>
  )
}
