'use client';
import React, { useState, useEffect } from 'react';
import './filter.scss';
import FilterTitle from './FilterTitle';
import SortOptions from './SortOptions';
import BrandFilter from './BrandFilter';
import RentAddressFilter from './RentAddressFilter';
import LevelFilter from './LevelFilter';
import ColorFilter from './ColorFilter';
import FilterButtons from './FilterButtons';

export default function RentFilter({ onFilterChange, onSortChange }) {
  const [filters, setFilters] = useState({
    sort: { field: 'price', direction: 'asc' },
    brands: [],
    addresses: [],
    levels: [],
    colors: [],
  });

  // 更新排序选项
  const handleSortChange = (sortOption) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        sort: sortOption,
      };
      onSortChange(sortOption.field, sortOption.direction);
      return newFilters;
    });
  };

  // 更新筛选条件
  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const isSelected = prev[category].includes(value);
      const newFilters = {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
      onFilterChange(newFilters);  // 直接传递到父组件
      return newFilters;
    });
  };

  // 清空所有筛选条件
  const handleClearFilters = () => {
    setFilters({
      sort: { field: 'price', direction: 'asc' },
      brands: [],
      addresses: [],
      levels: [],
      colors: [],
    });
    onFilterChange({  // 清空后调用父组件清除筛选
      sort: { field: 'price', direction: 'asc' },
      brands: [],
      addresses: [],
      levels: [],
      colors: [],
    });
  };

  return (
    <div className="col-12 col-md-3 d-none d-lg-block d-flex flex-column c-lerf">
      <FilterTitle />
      <SortOptions onChange={handleSortChange} selectedSort={filters.sort} />
      <BrandFilter onChange={(value) => handleCheckboxChange('brands', value)} selectedBrands={filters.brands} />
      <RentAddressFilter onChange={(value) => handleCheckboxChange('addresses', value)} selectedAddresses={filters.addresses} />
      <LevelFilter onChange={(value) => handleCheckboxChange('levels', value)} selectedLevels={filters.levels} />
      <ColorFilter onChange={(value) => handleCheckboxChange('colors', value)} selectedColors={filters.colors} />
      <FilterButtons onSubmit={() => onFilterChange(filters)} onClear={handleClearFilters} />
    </div>
  );
}
