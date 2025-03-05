'use client';
import React, { useState } from 'react';
import './filter.scss';
import FilterTitle from './FilterTitle';
import SortOptions from './SortOptions';
import BrandFilter from './BrandFilter';
import RentAddressFilter from './RentAddressFilter';
import LevelFilter from './LevelFilter';
import ColorFilter from './ColorFilter';
import FilterButtons from './FilterButtons';

export default function RentFilter({ onFilterChange, onSortChange, selectedSorts }) {
  const [filters, setFilters] = useState({
    sort: { field: 'price', direction: 'asc' },
    brands: [],
    addresses: [],
    levels: [],
    colors: [],
  });

  // 更新排序选项并传递到父组件
  const handleSortChange = (sortOption) => {
    // 将排序变化传递给父组件
    onSortChange(sortOption);
  };

  // 更新筛选条件并传递到父组件
  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const isSelected = prev[category].includes(value);
      const newFilters = {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
      onFilterChange(newFilters);  // 传递更新后的筛选条件给父组件
      return newFilters;
    });
  };

  // 清空所有筛选条件并通知父组件
  const handleClearFilters = () => {
    setFilters({
      sort: { field: 'price', direction: 'asc' },
      brands: [],
      addresses: [],
      levels: [],
      colors: [],
    });
    onFilterChange({
      sort: { field: 'price', direction: 'asc' },
      brands: [],
      addresses: [],
      levels: [],
      colors: [],
    });
    onSortChange({ field: 'price', direction: 'asc' });
  };

  return (
    <div className="col-12 col-md-3 d-none d-lg-block d-flex flex-column c-lerf">
      <FilterTitle />
      {/* 把当前的排序传递给 SortOptions */}
      <SortOptions 
        onChange={handleSortChange}   // 传递排序变化的处理函数
        selectedSorts={selectedSorts}  // 传递当前排序状态
      />
      <BrandFilter onChange={(value) => handleCheckboxChange('brands', value)} selectedBrands={filters.brands} />
      <RentAddressFilter onChange={(value) => handleCheckboxChange('addresses', value)} selectedAddresses={filters.addresses} />
      <LevelFilter onChange={(value) => handleCheckboxChange('levels', value)} selectedLevels={filters.levels} />
      <ColorFilter onChange={(value) => handleCheckboxChange('colors', value)} selectedColors={filters.colors} />
      <FilterButtons onSubmit={() => onFilterChange(filters)} onClear={handleClearFilters} />
    </div>
  );
}
