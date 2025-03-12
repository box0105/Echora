'use client'

import './detail.scss'
import ProductCardCarousel from '../../_components/product-card-carousel'
import ProductImagesCarousel from '../../_components/product-images-carousel'
import { useState, useEffect, useRef } from 'react'
import { useMyCart } from '@/hooks/use-cart'
import { useParams } from 'next/navigation'
import { useProductState } from '@/services/rest-client/use-products'
import { toastWarning, toastSuccess } from '@/hooks/use-toast'
import Swal from 'sweetalert2'

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
      price: discountPrice ? discountPrice : price,
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
  const { firstSkuId, setFirstSkuId } = useProductState()

  // fetch db for details
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
          color_id,
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
            colorId: color_id,
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
      // console.log(`http://localhost:3005/api/products/${pid}/${firstSkuId}`)
      setDetailData(Object.values(products))
      setSelectedSku(Object.values(products)[0].defaultSelectedSku)
      setColorId(Object.values(products)[0].colors[0].colorId)
    } catch (err) {
      console.log(err)
    }
  }

  //favorite
  const [favIcon, setFavIcon] = useState('heart.svg')
  const [favItems, setFavItems] = useState([])
  const [uid, setUid] = useState(null)
  const toggleFav = async () => {
    if (!uid) {
      Swal.fire({
        // title: '',
        text: '請先登入',
        icon: 'info',
        iconColor: 'var(--grey700)',
        confirmButtonColor: 'var(--grey900)',
      })
      return
    }

    if (!selectedSku) {
      toastWarning('請先選擇顏色')
      return
    }

    if (favItems.includes(selectedSku)) {
      // setFavIcon('heart.svg')
      await removeFromFav(uid, selectedSku)
    } else {
      // setFavIcon('heart-solid.svg')
      await addToFav(uid, selectedSku)
    }
    await getFav(uid)
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
        toastSuccess('已加入我的收藏')
        // console.log('已加入我的收藏')
      }
    } catch (err) {
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
        toastSuccess('已從我的收藏移除商品')
        // console.log('已從我的收藏移除商品')
      }
    } catch (err) {
      console.log(err)
    }
  }

  // fetch db for may also like
  const [colorId, setColorId] = useState(1)
  const [mayLikeData, setMayLikeData] = useState([])

  const getMayLikeData = async (colorId) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/products/maylike/${colorId}`
      )
      const data = await res.json()
      setMayLikeData(data.data)
    } catch (err) {
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

  useEffect(() => {
    getMayLikeData(colorId)
  }, [colorId])

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
              <div className="g-pd-imgs col-lg-7 h-100">
                <ProductImagesCarousel
                  detailData={detailData}
                  selectedSku={selectedSku}
                />
              </div>
              <div className="g-pd-discrip col-lg-5 h-100">
                <img
                  className="g-heart"
                  src={`/images/product/detail/${favIcon}`}
                  alt=""
                  onClick={toggleFav}
                />
                <h3 className="h3 mb-0 me-5">{detailData[0].name}</h3>
                {detailData[0].discountPrice ? (
                  <>
                    <div className='d-flex align-items-center gap-2'>
                      <h6
                        className="g-price h5 m-0"
                        style={{
                          color: 'var(--grey500)',
                          textDecoration: 'line-through',
                        }}
                      >
                        NT$ {detailData[0].price.toLocaleString()}
                      </h6>
                      <h6
                        className="g-price h5 m-0"
                        style={{ color: 'var(--red)' }}
                      >
                        NT$ {detailData[0].discountPrice.toLocaleString()}
                      </h6>
                    </div>
                  </>
                ) : (
                  <>
                    <h6 className="g-price h5 m-0">
                      NT$ {detailData[0].price.toLocaleString()}
                    </h6>
                  </>
                )}
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
                            setColorId(color.colorId)
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
                  disabled={detailData[0].stock[selectedSku] > 0 ? false : true}
                  onClick={() => {
                    console.log(getSku(selectedSku))
                    onAdd(getSku(selectedSku))
                    // onAdd(detailData[0], selectedColor)
                  }}
                >
                  <h6 className="m-0">加入購物車</h6>
                </button>
                <div className="g-stock d-flex align-items-center gap-2">
                  {detailData[0].stock[selectedSku] > 0 ? (
                    <>
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10.2325 1.39126C10.0833 1.33145 9.91673 1.33145 9.7675 1.39126L2.3075 4.37501L5.3125 5.57626L13.005 2.50001L10.2325 1.39126ZM14.6875 3.17376L6.995 6.25001L10 7.45126L17.6925 4.37501L14.6875 3.17376ZM18.75 5.29876L10.625 8.54876V18.4513L18.75 15.2013V5.29876ZM9.375 18.4525V8.54751L1.25 5.29876V15.2025L9.375 18.4525ZM9.30375 0.23001C9.75071 0.0512595 10.2493 0.0512595 10.6963 0.23001L19.6075 3.79501C19.7234 3.84144 19.8227 3.9215 19.8926 4.02487C19.9626 4.12824 20 4.25019 20 4.37501V15.2025C19.9998 15.4523 19.9249 15.6963 19.7847 15.903C19.6446 16.1098 19.4457 16.2698 19.2138 16.3625L10.2325 19.955C10.0833 20.0148 9.91673 20.0148 9.7675 19.955L0.7875 16.3625C0.555314 16.27 0.356178 16.1101 0.215803 15.9033C0.0754271 15.6965 0.000257912 15.4524 0 15.2025L0 4.37501C2.90499e-05 4.25019 0.0374297 4.12824 0.107384 4.02487C0.177338 3.9215 0.276641 3.84144 0.3925 3.79501L9.30375 0.23001Z"
                          fill='var(--black)'
                        />
                      </svg>
                      {/* <img
                        src="/images/product/detail/stock.svg"
                        width="18px"
                        alt=""
                      /> */}
                      {/* <h6 className="m-0" style={{ color: '#19D22E' }}> */}
                      <h6 className="m-0" style={{ color: 'var(--black)' }}>
                        尚有庫存
                      </h6>
                    </>
                  ) : (
                    <>
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10.2325 1.39126C10.0833 1.33145 9.91673 1.33145 9.7675 1.39126L2.3075 4.37501L5.3125 5.57626L13.005 2.50001L10.2325 1.39126ZM14.6875 3.17376L6.995 6.25001L10 7.45126L17.6925 4.37501L14.6875 3.17376ZM18.75 5.29876L10.625 8.54876V18.4513L18.75 15.2013V5.29876ZM9.375 18.4525V8.54751L1.25 5.29876V15.2025L9.375 18.4525ZM9.30375 0.23001C9.75071 0.0512595 10.2493 0.0512595 10.6963 0.23001L19.6075 3.79501C19.7234 3.84144 19.8227 3.9215 19.8926 4.02487C19.9626 4.12824 20 4.25019 20 4.37501V15.2025C19.9998 15.4523 19.9249 15.6963 19.7847 15.903C19.6446 16.1098 19.4457 16.2698 19.2138 16.3625L10.2325 19.955C10.0833 20.0148 9.91673 20.0148 9.7675 19.955L0.7875 16.3625C0.555314 16.27 0.356178 16.1101 0.215803 15.9033C0.0754271 15.6965 0.000257912 15.4524 0 15.2025L0 4.37501C2.90499e-05 4.25019 0.0374297 4.12824 0.107384 4.02487C0.177338 3.9215 0.276641 3.84144 0.3925 3.79501L9.30375 0.23001Z"
                          fill="var(--grey700)"
                        />
                      </svg>
                      {/* <img
                    src="/images/product/detail/no_stock.svg"
                    width="18px"
                    alt=""
                  /> */}
                      <h6 className="m-0" style={{ color: 'var(--grey700)' }}>
                        已無庫存
                      </h6>
                    </>
                  )}
                </div>
                <div className="g-pd-disc py-3">
                  <div className="g-disc-title d-flex justify-content-between align-items-center">
                    <h6 className="m-0">商品描述</h6>
                    {/* <img src="/images/product/detail/minus.svg" alt="" /> */}
                  </div>
                  <p className="mt-3 mb-0">{detailData[0].discription}</p>
                </div>
                <div className="g-pd-spec py-3">
                  <div className="g-spec-title d-flex justify-content-between align-items-center">
                    <h6 className="m-0">電子裝置規格</h6>
                    {/* <img src="/images/product/detail/minus.svg" alt="" /> */}
                  </div>
                  <ul className="list-unstyled">
                    {detailData[0]?.neckPickup && (
                      <li>
                        <p className="mb-1">琴頸拾音器</p>
                        <p className="p m-0" style={{ fontWeight: 400 }}>
                          {detailData[0].neckPickup}
                        </p>
                      </li>
                    )}
                    {detailData[0]?.middlePickup && (
                      <li>
                        <p className="mb-1">中段拾音器</p>
                        <p className="p m-0" style={{ fontWeight: 400 }}>
                          {detailData[0].middlePickup}
                        </p>
                      </li>
                    )}
                    {detailData[0]?.bridgePickup && (
                      <li>
                        <p className="mb-1">琴橋拾音器</p>
                        <p className="p m-0" style={{ fontWeight: 400 }}>
                          {detailData[0].bridgePickup}
                        </p>
                      </li>
                    )}
                    {detailData[0]?.controls && (
                      <li>
                        <p className="mb-1">控制器</p>
                        <p className="m-0" style={{ fontWeight: 400 }}>
                          {detailData[0].controls}
                        </p>
                      </li>
                    )}
                    {detailData[0]?.switching && (
                      <li>
                        <p className="mb-1">拾音器開關</p>
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
        <ProductCardCarousel data={mayLikeData} />
      </div>
    </>
  )
}
