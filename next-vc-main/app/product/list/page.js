'use client'
import './list.scss'
import ProductCard from '../_components/product-card'
import FilterBar from '../_components/filter-bar'

import { useState, useEffect } from 'react'
import { useProductState } from '@/services/rest-client/use-products'

export default function ProductListPage(props) {
  // 設定點擊事件
  const [filterOpen, setFilterOpen] = useState(false)
  const [comparisionOpen, setComparisionOpen] = useState(false)
  const comparisionToggle = () => setComparisionOpen(!comparisionOpen)

  // 搜尋條件
  const [queryString, setQueryString] = useState('')

  // 在不同頁面之間共享條件(列表頁、商品頁)
  const { criteria, setCriteria, defaultCriteria } = useProductState()
  // 從context中取得目前記錄的共享條件
  const {
    page,
    perpage,
    nameLike,
    brandIds,
    categoryIds,
    priceGte,
    priceLte,
    sort,
    order,
  } = criteria
  
  // 用於設定條件
  // (當 setCriteria 傳入函式時，React 會自動把「當前的 criteria 狀態」當成函式的參數（這裡是 prev）)
  const setCriteriaByName = (name, value) => {
    setCriteria((prev) => {
      return { ...prev, [name]: value }
    })
  }

  // fetch db
  const [pdData, setPdData] = useState([])

  const getPdData = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/products')
      const data = await res.json()

      // 資料整理(符合product card UI)
      const products = {}
      data?.data.forEach((item) => {
        const {
          id,
          name,
          price,
          brand_name,
          product_sku_id,
          color_id,
          color_name,
          color_image,
          color_palette_id,
          image,
        } = item

        if (!products[id]) {
          products[id] = {
            id,
            name,
            price,
            brand: brand_name,
            colors: [],
            images: {},
            defaultImage: image,
          }
        }
        products[id].colors.push({
          id: color_id,
          name: color_name,
          image: color_image,
          skuId: product_sku_id,
        })
        products[id].images[product_sku_id] = image
      })
      // console.log(Object.values(products))
      setPdData(Object.values(products))
    } catch (err) {
      console.log(err)
    }
  }
  //didmount後執行getPdData()
  useEffect(() => {
    getPdData()
  }, [])

  return (
    <>
      <div>
        <div className="g-pdlist-title px-modified">
          <div className="container-fluid p-0">
            <div className="d-flex align-items-center">
              <h4 className="h4 mb-0">ELECTRIC GUITARS</h4>
              <h4 className="mb-0">電吉他商品</h4>
            </div>
          </div>
        </div>
        <div className="g-pdlist-topbar px-modified">
          <div className="container-fluid d-flex justify-content-between p-0">
            <div className="g-left d-flex align-items-center">
              <h6 className="g-amount mb-0">00 商品</h6>
              <div
                className="g-fliter d-sm-flex d-none"
                onClick={() => {
                  setFilterOpen(true)
                }}
              >
                <img src="/images/product/list/filter.svg" />
                <h6 className="mb-0">篩選</h6>
              </div>
            </div>
            <div className="g-right d-flex align-items-center">
              <div
                className="g-compare d-sm-flex d-none"
                onClick={comparisionToggle}
              >
                <img src="/images/product/list/check-circle-fill.svg" />
                <h6 className="mb-0">比較</h6>
              </div>
              <div
                className="g-fliter d-sm-none d-flex"
                onClick={() => {
                  setFilterOpen(true)
                }}
              >
                <img src="/images/product/list/filter.svg" />
                <h6 className="mb-0">篩選</h6>
              </div>
              <div className="g-order d-flex">
                <img src="/images/product/list/order.svg" />
                <h6 className="mb-0">排序</h6>
                {/* order sec  要修改(參考mou)*/}
                <div className="g-order-sec">
                  <a href>
                    <h6>價格由高至低</h6>
                  </a>
                  <a href>
                    <h6>價格由低至高</h6>
                  </a>
                  <a href>
                    <h6>商品名稱 A - Z</h6>
                  </a>
                  <a href>
                    <h6>商品名稱 Z - A</h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="g-pdlist px-modified">
          <div className="container-fluid p-1">
            <div className="row row-cols-xl-4 row-cols-2">
              {pdData.map((product, i) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          </div>
        </section>
        <div className="g-more-sec d-flex justify-content-center align-items-center">
          <button className="g-more-btn">
            <h6 className="mb-0">瀏覽更多</h6>
          </button>
        </div>
        <FilterBar 
        filterOpen={filterOpen} 
        setFilterOpen={setFilterOpen} 
        brandIds= {brandIds}
        set
        />
        {/* comparision sec */}
        <section
          className={`g-compare-sec px-modified ${
            comparisionOpen ? 'active' : ''
          }`}
        >
          <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className>
                <h6 className="h6">Electric Guitar Comparision</h6>
                <h6 className="mb-0">電吉他商品比較</h6>
              </div>
              <div className="d-flex align-items-center">
                <img src="/images/product/list/drag.svg" />
                <p className="mb-0">
                  將商品拖曳至方框中
                  <br />
                  最多可比較4款商品
                </p>
                <div className="g-compare-boxes d-flex gap-3">
                  <div className="g-compare-box d-flex justify-content-center align-items-center">
                    <img src="/images/product/list/electric.svg" />
                  </div>
                  <div className="g-compare-box d-flex justify-content-center align-items-center">
                    <img src="/images/product/list/electric.svg" />
                  </div>
                  <div className="g-compare-box d-flex justify-content-center align-items-center">
                    <img src="/images/product/list/electric.svg" />
                  </div>
                  <div className="g-compare-box d-flex justify-content-center align-items-center">
                    <img src="/images/product/list/electric.svg" />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <button className="g-compare-btn text-center">
                  <h6 className="mb-0">比較O款電吉他</h6>
                </button>
                <button className="g-clear-btn text-center">
                  <h6 className="mb-0">清除全部</h6>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
