"use client";

import { useState } from "react";

export default function PriceSlider({ max = 10000, percent = 0.3, step = 0.05 }) {
    const [price, setPrice] = useState(max * percent);

    return (
        <div className="d-flex flex-column align-self-stretch">
            <h4>價錢</h4>
            <div className="d-flex flex-column align-items-center gap-4">
                <input
                    type="range"
                    className="form-range"
                    min={0}
                    max={max}
                    step={max * step}
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                />
                <div className="h6">
                    {price ? `低於 NT$ ${price.toLocaleString()}` : "免費參加"}
                </div>
            </div>
            {/* <button className="b-btn b-load-btn">顯示商品</button> */}
        </div>
    );
};
