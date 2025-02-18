'use client'
import React from 'react';

export default function ProductFilter() {
  return (
    <div className="c-section2-body d-none d-md-block">
      <div className="container-fluid c-index-1 ;">
        <div className="row">
          <div className="col-12 col-md-3 d-none d-lg-block d-flex flex-column c-lerf">
            <FilterTitle />
            <SortOptions />
            <BrandFilter />
            <RentAddressFilter />
            <GuitarLevelFilter />
            <ColorFilter />
            <FilterButtons />
          </div>
          {/* ... */}
        </div>
      </div>
    </div>
  );
}

const FilterTitle = () => (
  <div className="c-filter  d-flex ">
    <i className="fa-solid fa-filter pe-3" />
    <h4>條件篩選</h4>
  </div>
);

const SortOptions = () => (
  <div className="sort ">
    <div className=" h5 c-lenav">排序</div>
    <div className="sor-check pt-3">
      {/* ... (你的排序选项) */}
    </div>
  </div>
);

const BrandFilter = () => (
  <div className="brand">
    <div className="h5 c-lenav">品牌</div>
    <div className="brand-check pt-3">
      {/* ... (你的品牌选项) */}
    </div>
  </div>
);

const RentAddressFilter = () => (
  <div className="rent title">
    <div className="h5 c-lenav">租借地址</div>
    <div className="brand-check pt-3">
      {/* ... (你的租借地址选项) */}
    </div>
  </div>
);

const GuitarLevelFilter = () => (
  <div className="rent title">
    <div className="h5 c-lenav">吉他級別</div>
    <div className="brand-check pt-3 g-3">
      {/* ... (你的吉他级别选项) */}
    </div>
  </div>
);

const ColorFilter = () => (
  <div className="color ">
    <div className="color-title pb-4">
      <div className="h5 c-lenav">顏色</div>
    </div>
    <div className="c-rad d-flex flex-wrap">
      {/* ... (你的颜色选项) */}
    </div>
  </div>
);

const FilterButtons = () => (
  <div className="c-bot d-flex justify-content-center " style={{ gap: 22 }}>
    <button className="btn btn-dark text-white ">
      <div className="h6 m-0">確定塞選</div>
    </button>
    <button className="btn btn-outline-dark text-dark">
      <div className="h6 m-0">清除塞選</div>
    </button>
  </div>
);

