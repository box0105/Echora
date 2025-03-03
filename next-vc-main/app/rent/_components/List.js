'use client';
import React, { useState, useEffect } from 'react';
import RentFilter from './Filter/RentFilter';
import RentCards from './Rentcard/card.js';

export default function RentList() {
  const [data, setData] = useState([]); // 存放API数据
  const [filteredData, setFilteredData] = useState([]); // 存放过滤后的数据
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [sortOrder, setSortOrder] = useState({ field: 'price', direction: 'asc' });
  const [filters, setFilters] = useState({
    brands: [],
    addresses: [],
    levels: [],
    colors: [],
  });

  // 加载数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/rent');
        const jsonData = await res.json();
        setData(jsonData.data); // 设置原始数据
      } catch (err) {
        console.error('错误:', err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const storeMapping = {
    '台北店': 1,
    '台中店': 2,
    '高雄店': 3
  };
  const levelMap = {
    '初級': 1,
    '中級': 2,
    '高級': 3,
  };

  // 筛选和排序
  useEffect(() => {
    let filtered = [...data];

    // 筛选
    if (filters?.brands?.length) {
      filtered = filtered.filter(item => filters.brands.includes(item.brand_name));
    }
    if (filters?.addresses?.length) {
      const selectedStoreIds = filters.addresses.map(name => storeMapping[name]); // 把店名转换成 store_id
      filtered = filtered.filter(item => selectedStoreIds.includes(item.stores_id));
    }    
    if (filters?.levels?.length) {
      filtered = filtered.filter(item => filters.levels.map(lvl => levelMap[lvl]).includes(item.level));
    }
    if (filters?.colors?.length) {
      filtered = filtered.filter(item => 
        item.rentitemColors.some(color => filters.colors.includes(color.color_name))
      );
    }

    // 排序
    const sorted = filtered.sort((a, b) => {
      if (sortOrder.field === 'price') {
        return sortOrder.direction === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortOrder.field === 'name') {
        return sortOrder.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    setFilteredData(sorted);  // 更新过滤后的数据
  }, [data, filters, sortOrder]);  // 依赖项：数据、筛选条件和排序条件

  // 处理筛选变化
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // 更新筛选条件
  };

  // 处理排序变化
  const handleSortChange = (option) => {
    setSortOrder({
      id: option.id,
      field: option.field,
      direction: option.direction,
    });
  };
  

  if (isLoading) return <p>加载中...</p>;
  if (isError) return <p>加载失败，请稍后再试。</p>;

  return (
    <div className="c-section2-body d-none d-md-block">
      <div className="container-fluid">
        <div className="row">
          {/* 将 onSortChange 和 onFilterChange 传递到 RentFilter */}
          <RentFilter 
            onFilterChange={handleFilterChange} 
            onSortChange={handleSortChange} 
            selectedSorts={sortOrder}
          />
          <div className="col-6 col-sm-6 col-md-9 col-lg-9 clo-2">
            <div className="caa info">
              <div className="c-section3">
                <div className="card-group gap-3">
                  <div className="row row-cols-xl-4 row-cols-2">
                    <RentCards data={filteredData.slice(0, visibleCount)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="btn1 d-flex justify-content-center">
          <LoadMoreButton
            visibleCount={visibleCount}
            setVisibleCount={setVisibleCount}
            dataLength={filteredData.length}
          />
        </div>
      </div>
    </div>
  );
}

// LoadMoreButton 组件
const LoadMoreButton = ({ visibleCount, setVisibleCount, dataLength }) => (
  <button
    className="btn btn-outline-dark text-dark"
    style={{
      padding: '0.75rem 1.5rem',
      borderRadius: '3.125rem',
      width: '15rem',
      height: '3rem',
    }}
    onClick={() => setVisibleCount(prev => Math.min(prev + 10, dataLength))}
    disabled={visibleCount >= dataLength}
  >
    <div className="h5">
      {visibleCount >= dataLength ? '已经到底了' : '浏览更多'}
    </div>
  </button>
);
