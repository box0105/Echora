import React from 'react';
import SortMod from './SortMod';
import BrandMod from './BrandMod';
import AddressMod from './AddressMod';
import LevelMod from './LevelMod';
import ColorMod from './ColorMod';
import FilterButtonsMod from './FilterButtonsMod';

const FilterSidebar = ({ 
  setIsOpen, 
  onKeyPressHandler, 
  onSortChange,      
  onFilterChange,    
  selectedSort, // 这里新增 selectedSort 传入当前排序状态
  filters = { brands: [], addresses: [], levels: [], colors: [] }
}) => {
  const handleSortChange = (sortOption) => {
    if (typeof onSortChange === 'function') {
      onSortChange(sortOption); // 直接传递排序对象
    }
  };
  console.log("當前選中的排序:", selectedSort);

  // 定義通用的篩選條件切換函數
  const toggleFilterValue = (category, value) => {
    const current = filters[category] || [];
    const newValues = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: newValues });
  };
// 塞選
const handleSubmit = () => {
    console.log("提交篩選", filters);  // Debugging
  
    // 提交當前篩選條件
    if (typeof onFilterChange === 'function') {
      onFilterChange(filters);  // 提交當前篩選條件
    }
    // 點擊 "確定篩選" 
    setIsOpen(false);
  };

  // 清除篩選條件
  const handleClear = () => {
    console.log("清除篩選與排序");  // Debugging
  
    // 清空所有篩選條件
    if (typeof onFilterChange === 'function') {
      onFilterChange({ brands: [], addresses: [], levels: [], colors: [] });
    }

    // **重置排序為隨機**
    if (typeof onSortChange === 'function') {
      onSortChange({ field: 'random', direction: 'asc' });  // 這裡設置默認排序
    }

    setIsOpen(false);
};



  return (
    <div className="col-12 col-md-3 d-flex flex-column c-lerf-mod c-filter-scroll">
      <SortMod setIsOpen={setIsOpen} onChange={handleSortChange} selectedSort={selectedSort}/>
      <BrandMod 
        onChange={(value) => toggleFilterValue('brands', value)}
        selectedBrands={filters.brands}
        
      />
      <AddressMod 
        onChange={(value) => toggleFilterValue('addresses', value)}
        selectedAddresses={filters.addresses}
      />
      <LevelMod 
        onChange={(value) => toggleFilterValue('levels', value)}
        selectedLevels={filters.levels}
      />
     <ColorMod 
        onChange={(value) => onFilterChange({ ...filters, colors: value })}
        selectedColors={filters.colors}
      />
      <FilterButtonsMod 
        onSubmit={handleSubmit}
        onClear={handleClear} 
      />
    </div>
  );
};

export default FilterSidebar;
