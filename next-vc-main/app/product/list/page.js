'use client'
import './list.scss'
import ProductCard from '../_components/product-card'
import FilterBar from '../_components/filter-bar'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useProductState } from '@/services/rest-client/use-products'
import { useHeaderHeight } from '@/hooks/use-header'

export default function ProductListPage(props) {
  // header 動態捲動
  const { headerHeight } = useHeaderHeight()
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > prevScrollY && currentScrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setPrevScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  // 設定點擊事件
  const [filterOpen, setFilterOpen] = useState(false)
  const [comparisionOpen, setComparisionOpen] = useState(false)
  const comparisionToggle = () => setComparisionOpen(!comparisionOpen)
  // 排序狀態
  const [selectedSort, setSelectedSort] = useState({
    sort: 'price',
    order: 'ASC',
  })
  // 瀏覽更多 狀態
  const [visibleCount, setVisibleCount] = useState(12)

  // 搜尋條件
  const [queryString, setQueryString] = useState('')

  // 在不同頁面之間共享條件(列表頁、商品頁)
  const { criteria, setCriteria, defaultCriteria } = useProductState()
  // 從context中取得目前記錄的共享條件的值
  const {
    // page,
    // perpage,
    nameLike,
    brandIds,
    colorPids,
    colorIds,
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

  // 產生查詢字串
  const generateQueryString = (criteria) => {
    const query = {}
    for (const key in criteria) {
      // 略過page
      // if (key === 'page' && exceptPage) continue

      // 這裡是將數字陣列轉為字串，轉換為snake_case名稱
      if (key === 'brandIds') {
        query['brand_ids'] = criteria[key].join(',')
        continue
      }
      if (key === 'colorPids') {
        query['color_pids'] = criteria[key].join(',')
        continue
      }
      if (key === 'colorIds') {
        query['color_ids'] = criteria[key].join(',')
        continue
      }
      // 轉換為snake_case
      if (key === 'nameLike') {
        query['name_like'] = criteria[key]
        continue
      }

      if (key === 'priceGte') {
        query['price_gte'] = criteria[key]
        continue
      }

      if (key === 'priceLte') {
        query['price_lte'] = criteria[key]
        continue
      }

      query[key] = criteria[key]
    }

    return new URLSearchParams(query).toString()
  }

  // 整理資料用的函式
  function group(arr, key) {
    return [
      ...arr
        .reduce(
          (acc, o) => acc.set(o[key], (acc.get(o[key]) || []).concat(o)),
          new Map()
        )
        .values(),
    ]
  }
  const convertData = async (data) => {
    // 擴充原始資料的索引值(不一定需要)，方便後續操作例如排序…
    const arr = data.map((v, i) => ({ ...v, originalIndex: i }))

    // 進行資料分組
    const groupedArr = group(arr, 'id')
    // console.log('groupedArr', groupedArr)

    let tmpData = []

    for (let i = 0; i < groupedArr.length; i++) {
      // grouped values
      if (groupedArr[i].length > 1) {
        const newObj = { ...groupedArr[i][0] }
        newObj.colors = []
        newObj.images = {}
        newObj.defaultImage = ''
        for (let j = 0; j < groupedArr[i].length; j++) {
          newObj.colors.push({
            name: groupedArr[i][j].color_name,
            image: groupedArr[i][j].color_image,
            skuId: groupedArr[i][j].product_sku_id,
          })

          newObj.images[groupedArr[i][j].product_sku_id] =
            groupedArr[i][j].image
          newObj.defaultImage = groupedArr[i][j].image
        }
        tmpData.push(newObj)
      } else {
        const newObj = { ...groupedArr[i][0] }
        newObj.colors = []
        newObj.images = {}
        newObj.defaultImage = ''

        newObj.colors.push({
          name: groupedArr[i][0].color_name,
          image: groupedArr[i][0].color_image,
          skuId: groupedArr[i][0].product_sku_id,
        })
        newObj.images[groupedArr[i][0].product_sku_id] = groupedArr[i][0].image
        newObj.defaultImage = groupedArr[i][0].image

        tmpData.push(newObj)
      }
    }
    // console.log('tmpData', tmpData)
    // 平坦化陣列
    const finalData = tmpData.flat()

    // console.log('finalData', finalData)

    return finalData
  }

  // fetch db
  const [pdData, setPdData] = useState([])

  const getPdData = async (queryString) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/products?${queryString}`
      )
      const data = await res.json()
      const finalData = await convertData(data.data)
      setPdData(finalData)
      console.log(finalData)
    } catch (err) {
      console.log(err)
    }
  }
  // fetch db
  // const [pdData, setPdData] = useState([])

  // const getPdData = async () => {
  //   try {
  //     const res = await fetch('http://localhost:3005/api/products')
  //     const data = await res.json()

  //     // 資料整理(符合product card UI)
  //     const products = {}
  //     data?.data.forEach((item) => {
  //       const {
  //         id,
  //         name,
  //         price,
  //         brand_name,
  //         product_sku_id,
  //         color_id,
  //         color_name,
  //         color_image,
  //         color_palette_id,
  //         image,
  //       } = item

  //       if (!products[id]) {
  //         products[id] = {
  //           id,
  //           name,
  //           price,
  //           brand: brand_name,
  //           colors: [],
  //           images: {},
  //           defaultImage: image,
  //         }
  //       }
  //       products[id].colors.push({
  //         id: color_id,
  //         name: color_name,
  //         image: color_image,
  //         skuId: product_sku_id,
  //       })
  //       products[id].images[product_sku_id] = image
  //     })
  //     // console.log(Object.values(products))
  //     setPdData(Object.values(products))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const isFirstRender = useRef(true) // 追蹤是否為初次渲染

  // didmount後的下一次(queryString改變時)執行getPdData()
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false // 初次渲染時設定為 false，下一次才會觸發
      return
    }
    getPdData(queryString)
  }, [queryString])

  useEffect(() => {
    setQueryString(generateQueryString(criteria))
    setVisibleCount(12)
  }, [criteria])

  // 比較功能需要的函式
  // 拖曳開始時，將產品資訊存入 dataTransfer
  const [selectedProducts, setSelectedProducts] = useState([
    null,
    null,
    null,
    null,
  ])

  const selectedAmount = selectedProducts.filter(
    (product) => product !== null
  ).length

  const handleDragStart = (e, product) => {
    e.dataTransfer.setData('product', JSON.stringify(product))
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    const productData = e.dataTransfer.getData('product')
    if (productData) {
      const product = JSON.parse(productData)
      const updatedProducts = [...selectedProducts]
      updatedProducts[index] = product // 放到指定的方框內
      setSelectedProducts(updatedProducts)
    }
  }

  const handleRemove = (index) => {
    const updatedProducts = [...selectedProducts]
    updatedProducts[index] = null
    setSelectedProducts(updatedProducts)
  }

  const router = useRouter()
  const toComparePage = () => {
    const selectedSkus = selectedProducts
      .filter((product) => product !== null)
      .map((product) => product.product_sku_id)
      .join(',')
    router.push(`/product/comparison?products=${selectedSkus}`)
  }

  console.log(criteria)

  return (
    <>
      <div className="g-pdlist-bar" style={{top: isVisible ? `${headerHeight}px` : '0px'}}>
        <div className="g-pdlist-title l-px-modified">
          <div className="container-fluid p-0">
            <div className="d-flex align-items-center">
              <h4 className="h4 mb-0">ELECTRIC GUITARS</h4>
              <h4 className="mb-0">電吉他商品</h4>
            </div>
          </div>
        </div>
        <div className="g-pdlist-topbar l-px-modified">
          <div className="container-fluid d-flex justify-content-between p-0">
            <div className="g-left d-flex align-items-center">
              <h6 className="g-amount mb-0">{pdData.length} 件商品</h6>
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
                {/* order sec */}
                <div className="g-order-sec">
                  <a href>
                    <h6
                      className={
                        selectedSort.sort === 'price' &&
                        selectedSort.order === 'DESC'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        const updatedCriteria = {
                          ...criteria,
                          sort: 'price',
                          order: 'DESC',
                        }
                        const newQueryString =
                          generateQueryString(updatedCriteria)
                        setCriteria(updatedCriteria)
                        setQueryString(newQueryString)
                        getPdData(newQueryString)
                        setSelectedSort({ sort: 'price', order: 'DESC' })
                      }}
                    >
                      價格由高至低
                    </h6>
                  </a>
                  <a href>
                    <h6
                      className={
                        selectedSort.sort === 'price' &&
                        selectedSort.order === 'ASC'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        const updatedCriteria = {
                          ...criteria,
                          sort: 'price',
                          order: 'ASC',
                        }
                        const newQueryString =
                          generateQueryString(updatedCriteria)
                        setCriteria(updatedCriteria)
                        setQueryString(newQueryString)
                        getPdData(newQueryString)
                        setSelectedSort({ sort: 'price', order: 'ASC' })
                      }}
                    >
                      價格由低至高
                    </h6>
                  </a>
                  <a href>
                    <h6
                      className={
                        selectedSort.sort === 'name' &&
                        selectedSort.order === 'ASC'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        const updatedCriteria = {
                          ...criteria,
                          sort: 'name',
                          order: 'ASC',
                        }
                        const newQueryString =
                          generateQueryString(updatedCriteria)
                        setCriteria(updatedCriteria)
                        setQueryString(newQueryString)
                        getPdData(newQueryString)
                        setSelectedSort({ sort: 'name', order: 'ASC' })
                      }}
                    >
                      商品名稱 A - Z
                    </h6>
                  </a>
                  <a href>
                    <h6
                      className={
                        selectedSort.sort === 'name' &&
                        selectedSort.order === 'DESC'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        const updatedCriteria = {
                          ...criteria,
                          sort: 'name',
                          order: 'DESC',
                        }
                        const newQueryString =
                          generateQueryString(updatedCriteria)
                        setCriteria(updatedCriteria)
                        setQueryString(newQueryString)
                        getPdData(newQueryString)
                        setSelectedSort({ sort: 'name', order: 'DESC' })
                      }}
                    >
                      商品名稱 Z - A
                    </h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="g-pdlist l-px-modified">
        <div className="container-fluid p-1">
          <div className="row row-cols-xl-4 row-cols-2">
            {pdData?.slice(0, visibleCount).map((product, i) => (
              <div className="col p-2" key={product.id}>
                <ProductCard data={product} handleDragStart={handleDragStart} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="g-more-sec d-flex justify-content-center align-items-center">
        {visibleCount < pdData.length ? (
          <button
            className="g-more-btn"
            onClick={() => {
              setVisibleCount((prev) => prev + 12)
            }}
          >
            <h6 className="mb-0">瀏覽更多</h6>
          </button>
        ) : (
          <h6 className="mb-0 g-all">- 已顯示所有商品 -</h6>
        )}
      </div>
      <FilterBar
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        criteria={criteria}
        setCriteria={setCriteria}
        defaultCriteria={defaultCriteria}
        generateQueryString={generateQueryString}
        queryString={queryString}
        setQueryString={setQueryString}
        // handleSearch={handleSearch}
        getPdData={getPdData}
        brandIds={brandIds}
        setBrandIds={(value) => setCriteriaByName('brandIds', value)}
        colorPids={colorPids}
        setColorPids={(value) => setCriteriaByName('colorPids', value)}
        colorIds={colorIds}
        setColorIds={(value) => setCriteriaByName('colorIds', value)}
        priceGte={priceGte}
        setPriceGte={(value) => setCriteriaByName('priceGte', value)}
        priceLte={priceLte}
        setPriceLte={(value) => setCriteriaByName('priceLte', value)}
        setSelectedSort={(value) => setSelectedSort(value)}
      />
      {/* comparision sec */}
      <section
        className={`g-compare-sec l-px-modified ${
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
                {selectedProducts.map((selectedProduct, index) => (
                  <div
                    className="g-compare-box d-flex justify-content-center align-items-center position-relative"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    {selectedProduct ? (
                      <>
                        <img
                          src={`/images/product/pd-images/${selectedProduct.image}`}
                          alt={selectedProduct.name}
                          className="g-guitar"
                        />
                        {/* 刪除按鈕 */}
                        <button
                          onClick={() => handleRemove(index)}
                          className="position-absolute"
                        >
                          <img src="/images/product/list/x.svg" />
                        </button>
                      </>
                    ) : (
                      <img src="/images/product/list/electric.svg" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex flex-column">
              <button
                disabled={selectedAmount > 1 ? false : true}
                className={`g-compare-btn text-center ${
                  selectedAmount > 1 ? 'active' : ''
                }`}
                onClick={toComparePage}
              >
                <h6 className="mb-0">{`比較 ${selectedAmount} 款電吉他`}</h6>
              </button>
              <button
                className="g-clear-btn text-center"
                onClick={() => setSelectedProducts([null, null, null, null])}
              >
                <h6 className="mb-0">清除全部</h6>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* </div> */}
    </>
  )
}
