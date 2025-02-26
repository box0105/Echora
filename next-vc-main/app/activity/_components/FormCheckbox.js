"use client";

import React, { useState } from 'react';

export default function FormCheckbox({ title, options, onChange }) {
    const initState = options.map((v, i) => {
        return { id: i + 1, name: v, checked: false };
    });

    const [checks, setChecks] = useState(initState);

    // 處理點選切換
    const onToggleChecked = (checkId) => {
        const nextChecks = checks.map((v) => {
            // 在陣列中找到id為傳入的petId的物件，並修改checked布林值為反相值(!v.checked)
            if (v.id === checkId) return { ...v, checked: !v.checked };
            // 其它沒有影響的物件值直接返回
            else return v;
        });
        setChecks(nextChecks);

         // 回傳所有被選中的 category_id 陣列
         const selectedIds = nextChecks.filter(v => v.checked).map(v => v.id);
         onChange(selectedIds);
    };

    return (
        <div className="d-flex flex-column align-self-stretch">
            <h4>{title}</h4>
            {checks.map((check) => (
                <div className="b-form-checkbox d-flex align-items-center" key={check.id}>
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
    );
}
