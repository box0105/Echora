import React, { useState, useEffect } from 'react';
import RentFilter from './Filter/RentFilter';
import RentCards from './Rentcard/card.js';
import { useRent } from '@/hooks/use-rent';

export default function RentList() {
  // 从 hook 中获取数据、查询、加载状态与错误信息
  const { query, setQuery, results, isLoading, error } = useRent();
  
  // 筛选后的数据和可见条数
  const [filteredData, setFilteredData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  
  // 排序和筛选状态
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
  
  // 映射关系：将店名和等级转换为对应的数字
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

  // 筛选和排序逻辑
  useEffect(() => {
    // 以 hook 返回的数据为基础
    let filtered = [...results];
    
    // 处理 query 筛选
    if (query) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  

    // ① 根据 query 再次过滤（如果需要，注意：如果 API 已按 query 筛选，此步可省略）
    // if (query) {
    //   filtered = filtered.filter(item => {
    //     const name = item.name ? item.name.toLowerCase() : '';
    //     const q = query.toLowerCase().trim();
    //     const match = name.includes(q);
    //     if (!match) {
    //       console.log(`不匹配: ${name} 不包含 ${q}`);
    //     }
    //     return match;
    //   });
    //   console.log('query 过滤后的数据:', filtered);
    // }
    
    // ② 根据各个筛选条件过滤
    if (filters.brands.length) {
      filtered = filtered.filter(item =>
        filters.brands.includes(item.brand_name)
      );
    }
    if (filters.addresses.length) {
      const selectedStoreIds = filters.addresses.map(
        (name) => storeMapping[name]
      );
      filtered = filtered.filter(item =>
        selectedStoreIds.includes(item.stores_id)
      );
    }
    if (filters.levels.length) {
      filtered = filtered.filter(item =>
        filters.levels.map(lvl => levelMap[lvl]).includes(item.level)
      );
    }
    if (filters.colors.length) {
      filtered = filtered.filter(item =>
        item.rentitemColors.some(color =>
          filters.colors.includes(color.color_name)
        )
      );
    }
    
    // ③ 排序逻辑：若是 random，则随机打乱，否则根据 price 或 name 排序
    if (sortOrder.field === 'random') {
      filtered = filtered.sort(() => Math.random() - 0.5);
    } else if (sortOrder.field === 'price') {
      filtered = filtered.sort((a, b) =>
        sortOrder.direction === 'asc' ? a.price - b.price : b.price - a.price
      );
    } else if (sortOrder.field === 'name') {
      filtered = filtered.sort((a, b) =>
        sortOrder.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
    
    // 更新 state 使 UI 重新渲染
    setFilteredData(filtered);
  }, [results, query, filters, sortOrder]); // 依赖项：当数据、查询或筛选、排序条件发生变化时重新计算


  // 处理筛选条件变化
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // 处理排序条件变化
   const handleSortChange = (sortOption) => {
    setSortOrder(sortOption);
  };
  // const handleSortChange = (option) => {
  //   setSortOrder({
  //     field: option.field,
  //     direction: option.direction,
  //   });
  // };

  // 渲染 loading 或 error 状态
  if (isLoading) return <p>加载中...</p>;
  if (error) return <p>加载失败，请稍后再试。</p>;

  return (
    <div className="c-section2-body d-none d-md-block">
      <div className="container-fluid">
        <input
          type="text"
          placeholder="租借商品搜尋"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '380px' }}
          className='c-input  c-bot-l'
        />
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
                <div className="c-card-group gap-3">
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
    onClick={() => setVisibleCount((prev) => Math.min(prev + 10, dataLength))}
    disabled={visibleCount >= dataLength}
  >
    <div className="h5">
      {visibleCount >= dataLength ? '已经到底了' : '瀏覽更多'}
    </div>
  </button>
);
