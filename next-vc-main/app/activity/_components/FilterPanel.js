import React from 'react';

import FormCheckbox from './FormCheckbox';
import FormDate from './FormDate';
import FormSelect from './FormSelect';

export default function FilterPanel({ isOpen, onClose }) {
    // 控制 FilterPanel 開啟關閉
    if (!isOpen) return <></>

    const categories = ['音樂祭', '音樂活動'];
    const genres = ['流行音樂', '古典音樂', '交響樂', '搖滾樂', '嘻哈', '動漫', 'R&B', 'K-POP', 'J-POP'];
    const city = ['基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣'];

    return (
        <div className="b-filter-slide d-flex flex-column align-items-center">
            <div className="b-filter-title d-flex justify-content-between align-items-center w-100">
                <h4><button className="b-btn-unstyled">清除篩選條件</button></h4>
                <button className="b-filter-close-btn b-btn-unstyled" onClick={onClose}>
                    <i className="fa-solid fa-xmark" />
                </button>
            </div>

            <form className="w-100 b-filter-conds d-flex flex-column align-items-start align-self-stretch">
                <FormCheckbox
                    title="活動類型"
                    options={categories}
                />

                <FormCheckbox
                    title="音樂類型"
                    options={genres}
                />

                <FormDate title="活動時間"/>
                
                <FormSelect title="城市" options={city} />

                {/* 價錢 ticket_price */}
                <div className="d-flex flex-column align-self-stretch">
                    <h4>價錢</h4>
                    <div className="d-flex flex-column align-items-center gap-4">
                        <input type="range" className="form-range" min={0} max={100} step={10} />
                        <div className="h6">低於 NT$ 79,000</div>
                    </div>
                    <button className="b-btn b-load-btn">顯示商品</button>
                </div>
            </form>
        </div>
    )
}