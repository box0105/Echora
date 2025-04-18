'use client'

import React, { useState, useEffect } from 'react'
import './_styles/first.scss'
import HeroSection from './_components/HeroSection'
import RentalProcess from './_components/RentalProcess'
import Card from './_components/Rentcard/card'
import List from './_components/List'
import Modfiter from './_components/fit/fiteerMod'
import { useRent } from '@/hooks/use-rent';


export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  //圖片
  const [backgroundImage, setBackgroundImage] = useState('/images/Rent/background.png');

  // 🟢 使用 `useRent` 直接取得數據
  const { query, setQuery, results, isLoading, error } = useRent();
  
  const [sortOrder, setSortOrder] = useState({
    field: 'random',
    direction: 'asc',
  });

  const [filters, setFilters] = useState({
    brands: [],
    addresses: [],
    levels: [],
    colors: [],
  });

  const storeMapping = {
    台北店: 1,
    台中店: 2,
    高雄店: 3,
  };
  const levelMap = {
    初級: 1,
    中級: 2,
    高級: 3,
  };

  const changeBackground = (newImage) => {
    setBackgroundImage(newImage);
  };

  // 🟢 過濾與排序邏輯
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!results) return;
  
    // console.log('useEffect triggered for results:', results);
    
    let filtered = [...results];
  
    // **篩選邏輯**
    if (filters?.brands?.length) {
      filtered = filtered.filter(item => filters.brands.includes(item.brand_name));
    }
    if (filters?.addresses?.length) {
      const selectedStoreIds = filters.addresses.map(name => storeMapping[name]);
      filtered = filtered.filter(item => selectedStoreIds.includes(item.stores_id));
    }
    if (filters?.levels?.length) {
      filtered = filtered.filter(item => filters.levels.map(lvl => levelMap[lvl]).includes(item.level));
    }
    if (filters?.colors?.length) {
      filtered = filtered.filter(item => item.rentitemColors.some(color => filters.colors.includes(color.color_name)));
    }
    if (query) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }
  
    // **排序邏輯**
    if (sortOrder.field === 'random') {
      // 確保隨機排序
      filtered = filtered.sort(() => Math.random() - 0.5);
    } else if (sortOrder.field === 'price') {
      filtered = filtered.sort((a, b) => sortOrder.direction === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (sortOrder.field === 'name') {
      filtered = filtered.sort((a, b) => sortOrder.direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    }
  
    setFilteredData(filtered); // 更新篩選過後的數據
  
  }, [results, filters, sortOrder, query]);  // 確保依賴項正確觸發 useEffect
  

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // const handleSortChange = (sortOption) => {
  //   setSortOrder(sortOption);
  // };
  const handleSortChange = (option) => {
    setSortOrder({
      field: option.field,
      direction: option.direction,
    });
  };

  if (error) return <div>發生錯誤: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <div>載入中...</div>
        </div>
      ) : (
        <div>
          <div className="c-backgrund"
          >
            {/* section1 */}
            <div className="c-section1-out">
              <div className="card text-bg-dark c-section1">
                <HeroSection />
                <RentalProcess />
              </div>
            </div>
          </div>

          {/* section2 */}
          <div className="c-section2-title d-none d-md-block ">
            <div className="container-fluid c-index p-0">
              <div className="c-index-title c-text-p ">
                <h1>
                  <h3 className="h3">ELECTRIC GUITAR RENTAL PRODUCTS/ 電吉他租借商品</h3>
                </h1>
              </div>
            </div>
          </div>

          {/* section-mod */}
          <div className="c-section2-title d-block d-md-none pt-5">
            <div className="container-fluid c-index-mod ">
              <div className="col-12">
                <h6 className="c-tit">ELECTRIC GUITAR RENTAL PRODUCTS</h6>
              </div>
              <div className="col c-col">
                <div className=" h6 c-bot p-0">電吉他租借商品</div>
              </div>
              <button
                className=" d-flex mod-sel justify-content-end"
                onClick={() => setIsOpen(true)}
                role="button"
                tabIndex="0"
              >
                <img
                  src="/images/Rent/select.png"
                  className="pe-1 pt-1 c-icons-img"
                  alt=""
                  style={{ width: '20px', height: '14px' }}
                />
                <div className=" p m-0">條件篩選</div>
              </button>
            </div>
          </div>

          {/* section2-body */}
          <div className="c-section2-body d-none d-md-block">
            <div className="container-fluid c-index-1">
              <List data={filteredData.slice(0, visibleCount)} />
            </div>
          </div>

          {/* section-mod */}
          <div className={`c-section2-body Mod d-block d-md-none ${isOpen ? 'filter-open' : ''}`}>
            <div className="container-fluid c-index-mod-1">
                <Modfiter
                  data={filteredData}
                  setIsOpen={setIsOpen}
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  selectedSort={sortOrder}
                  filters={filters}
                />

              <div className="row row-cols-xl-4 row-cols-2">
                <Card data={filteredData.slice(0, visibleCount)} />
              </div>
              <div className="btn1 d-flex justify-content-center">
                <button
                  className="btn btn-outline-dark text-dark btn-text"
                  onClick={() => setVisibleCount(prev => Math.min(prev + 10, filteredData.length))}
                >
                  <div className="h5">瀏覽更多</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
