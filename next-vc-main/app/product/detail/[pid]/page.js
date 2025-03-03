'use client'

import './detail.scss'
import ProductCardCarousel from '../../_components/product-card-carousel'
import ProductImagesCarousel from '../../_components/product-images-carousel'
import { useState, useEffect, useRef } from 'react'
import { useMyCart } from '@/hooks/use-cart'
import { useParams } from 'next/navigation'
import { useProductState } from '@/services/rest-client/use-products'


export default function ProductDetailIdPage() {

  //for 購物車
  let skuSelected = {}
  const getSku = (skuId) => {
    if (!detailData[0]) {
      return
    }
    const { name, brand, discription, price, discountPrice } = detailData[0]
    const selectedColorInfo = detailData[0].colors.find(
      (color) => color.skuId === skuId
    )
    skuSelected = {
      name,
      brand_name: brand,
      price,
      discount_price: discountPrice,
      discription,
      color_name: selectedColorInfo.name,
      color_image: selectedColorInfo.image,
      product_sku_id: skuId,
      image: detailData[0].images[skuId][0],
      stock: detailData[0].stock[skuId],
    }
    return skuSelected
  }
  const { onAdd } = useMyCart()
  // const [selectedColor, setSelectedColor] = useState()
  // 購物車 end

  const [colorName, setColorName] = useState()
  const [selectedSku, setSelectedSku] = useState()

  //用useProductState()取得firstSkuId
  const { firstSkuId } = useProductState()

  // fetch db
  const [detailData, setDetailData] = useState([])
  // 取得網址上的動態參數
  const params = useParams()
  const pid = Number(params.pid)
  const getDetailData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/products/${pid}/${firstSkuId}`
      )
      const data = await res.json()
      // 資料整理
      const products = {}
      data?.data.forEach((item) => {
        const {
          id,
          name,
          price,
          brand_name,
          discription,
          neck_pickup,
          middle_pickup,
          bridge_pickup,
          controls,
          switching,
          product_sku_id,
          stock,
          // color_id,
          color_name,
          color_image,
          image,
          discount_price,
        } = item

        if (!products[id]) {
          products[id] = {
            id,
            name,
            price,
            discountPrice: discount_price,
            brand: brand_name,
            discription,
            neckPickup: neck_pickup,
            middlePickup: middle_pickup,
            bridgePickup: bridge_pickup,
            controls,
            switching,
            colors: [],
            images: {},
            stock: {},
            defaultSelectedSku: product_sku_id,
            defaultColorName: color_name,
            defaultImage: image,
          }
        }
        if (
          !products[id].colors.some((color) => color.skuId === product_sku_id)
        ) {
          products[id].colors.push({
            skuId: product_sku_id,
            name: color_name,
            image: color_image,
          })
        }

        if (!products[id].images[product_sku_id]) {
          products[id].images[product_sku_id] = []
        }
        products[id].images[product_sku_id].push(image)

        if (!products[id].stock[product_sku_id]) {
          products[id].stock[product_sku_id] = stock
        }
      })

      console.log(Object.values(products))
      console.log(`http://localhost:3005/api/products/${pid}/${firstSkuId}`)
      setDetailData(Object.values(products))
      setSelectedSku(Object.values(products)[0].defaultSelectedSku)
    } catch (err) {
      console.log(err)
    }
  }

  //favorite
  const [favIcon, setFavIcon] = useState('heart.svg')
  const [favItems, setFavItems] = useState([])
  const [uid, setUid] = useState(null)
  const toggleFav = () => {
    if (!uid) {
      alert('請先登入')
      return
    }

    if (!selectedSku) {
      alert('請先選擇顏色')
      return
    }

    if (favItems.includes(selectedSku)) {
      // setFavIcon('heart.svg')
      removeFromFav(uid, selectedSku)
    } else {
      // setFavIcon('heart-solid.svg')
      addToFav(uid, selectedSku)
    }
    getFav(uid)
  }
  const getFav = async (uid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/favorite/${uid}`)
      const data = await res.json()
      setFavItems(data.data)
      if (selectedSku && data.data.includes(selectedSku)) {
        setFavIcon('heart-solid.svg')
      } else {
        setFavIcon('heart.svg')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addToFav = async (uid, skuid) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/favorite/${uid}/${skuid}`,
        {
          method: 'PUT',
        }
      )
      const result = await res.json()
      if (result.status === 'success') {
        // alert('已加入我的收藏')
        console.log('已加入我的收藏')
      }
    } catch (err) {
      // alert('加入失敗')
      console.log(err)
    }
  }

  const removeFromFav = async (uid, skuid) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/favorite/${uid}/${skuid}`,
        {
          method: 'DELETE',
        }
      )
      const result = await res.json()
      if (result.status === 'success') {
        // alert('已從我的收藏移除商品')
        console.log('已從我的收藏移除商品')
      }
    } catch (err) {
      // alert('移除失敗')
      console.log(err)
    }
  }

  //didmount後執行getDetailData()
  useEffect(() => {
    getDetailData()
    const storedUid = localStorage.getItem('userId')
    setUid(storedUid)
  }, [firstSkuId])

  useEffect(() => {
    getFav(uid)
    // getSku(selectedSku)
  }, [selectedSku, uid])

  

  if (!detailData.length) {
    return (
      <>
        <h5 className="h5 g-loading text-center">loading...</h5>
      </>
    )
  }

  return (
    <>
      <div>
        <section className="g-pd-details">
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="g-pd-imgs col-xxl-7 h-100">
              <ProductImagesCarousel 
                detailData = {detailData}
                selectedSku = {selectedSku}
              />
              </div>
              <div className="g-pd-discrip col-xxl-5 h-100">
                <img
                  className="g-heart"
                  src={`/images/product/detail/${favIcon}`}
                  alt=""
                  onClick={toggleFav}
                />
                <h3 className="h3 mb-0 me-5">{detailData[0].name}</h3>
                <h6 className="g-price h6 m-0">NT$ {detailData[0].price}</h6>
                <div className="g-pd-brand d-flex justify-content-center align-items-center">
                  <p className="h7 m-0">{detailData[0].brand}</p>
                </div>
                <div className="g-colors">
                  <div className="g-color-text d-flex align-items-center gap-2 mb-3">
                    <h5 className="m-0">顏色 :</h5>
                    <p className="h6 m-0">
                      {colorName ? colorName : detailData[0].defaultColorName}
                    </p>
                  </div>
                  <div className="g-color-balls d-flex">
                    {detailData[0].colors.map((color) => (
                      <>
                        <button
                          key={color.skuId}
                          className={
                            selectedSku === color.skuId ? 'selected' : ''
                          }
                          onClick={() => {
                            setSelectedSku(color.skuId)
                            setColorName(color.name)
                            // console.log(color)
                            // box
                            // setSelectedColor(color)
                          }}
                        >
                          <img
                            className=""
                            width="26px"
                            src={`/images/product/color-images/${color.image}`}
                            alt={color.name}
                          />
                        </button>
                      </>
                    ))}
                  </div>
                </div>
                <button
                  className="g-add-to-cart d-flex justify-content-center align-items-center"
                  onClick={() => {
                    console.log(getSku(selectedSku))
                    // onAdd(detailData[0], selectedColor)
                  }}
                >
                  <h6 className="m-0">加入購物車</h6>
                </button>
                <div className="g-stock d-flex align-items-center gap-2">
                  <img
                    src="/images/product/detail/stock.svg"
                    width="18px"
                    alt=""
                  />
                  <h6 className="m-0">尚有庫存</h6>
                </div>
                <div className="g-pd-disc py-3">
                  <div className="g-disc-title d-flex justify-content-between align-items-center">
                    <h6 className="m-0">商品描述</h6>
                    <img src="/images/product/detail/minus.svg" alt="" />
                  </div>
                  <p className="mt-3 mb-0">{detailData[0].discription}</p>
                </div>
                <div className="g-pd-spec py-3">
                  <div className="g-spec-title d-flex justify-content-between align-items-center">
                    <h6 className="m-0">電子裝置規格</h6>
                    <img src="/images/product/detail/minus.svg" alt="" />
                  </div>
                  <ul className="list-unstyled">
                    {detailData[0]?.neckPickup && (
                      <li>
                        <p className="mb-2">琴頸拾音器</p>
                        <p className="p m-0" style={{ fontWeight: 400 }}>
                          {detailData[0].neckPickup}
                        </p>
                      </li>
                    )}
                    {detailData[0]?.middlePickup && (
                      <li>
                        <p className="mb-2">中段拾音器</p>
                        <p className="p m-0" style={{ fontWeight: 400 }}>
                          {detailData[0].middlePickup}
                        </p>
                      </li>
                    )}
                    {detailData[0]?.bridgePickup && (
                      <li>
                        <p className="mb-2">琴橋拾音器</p>
                        <p className="p m-0" style={{ fontWeight: 400 }}>
                          {detailData[0].bridgePickup}
                        </p>
                      </li>
                    )}
                    {detailData[0]?.controls && (
                      <li>
                        <p className="mb-2">控制器</p>
                        <p className="m-0" style={{ fontWeight: 400 }}>
                          {detailData[0].controls}
                        </p>
                      </li>
                    )}
                    {detailData[0]?.switching && (
                      <li>
                        <p className="mb-2">拾音器開關</p>
                        <p className="m-0">{detailData[0].switching}</p>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="g-pd-rating py-3">
                  <div className="g-disc-title d-flex justify-content-between align-items-center">
                    <h6 className="m-0">商品評價</h6>
                    <img src="/images/product/detail/small-arrow.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProductCardCarousel />
      </div>
    </>
  )
}
