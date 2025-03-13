'use client'
import React, { useState, useEffect, useMemo } from 'react'
import '../_styles/list.scss'
import Main from './_components/ListMain'
import Boottom from './_components/ListBottom'
import RentCardCarousel from './_components/rent-card-carousel/index'
import { useParams } from 'next/navigation'
import { useMyCart } from '@/hooks/use-cart'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import StoreSelector from '../_components/StoreSelector'
import { toastSuccess, toastError } from '@/hooks/use-toast'

export default function Page(props) {
  const CustomInput = ({ value, onClick }) => (
    <div className="date-picker-container">
      <input
        type="text"
        value={value}
        readOnly
        className="date-picker-input"
        onClick={onClick}
      />
      <FaCalendarAlt className="calendar-icon" onClick={onClick} />
    </div>
  )
  const initialStartDate = new Date()
  initialStartDate.setDate(initialStartDate.getDate() + 3) // 開始日期為當前日期＋3天

  const initialEndDate = new Date(initialStartDate)
  initialEndDate.setDate(initialStartDate.getDate() + 1)

  const [ListData, setListData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [quantity, setQuantity] = useState(1)
  const [selectedStore, setSelectedStore] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const { onAddRent } = useMyCart()

  const params = useParams()
  const pid = Number(params?.rentList)
  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/rent/${pid}`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const response = await res.json()
      console.log('API 回應資料:', response)
      const data = response.data

      if (data) {
        const rentData = {
          ...data,
          brand: data?.rentBrandName || '品牌未定義',
          store: data?.storeName || '商店未定義',
          rentList: data?.rentList || null,
          colors:
            Array.isArray(data?.colors) && data.colors.length > 0
              ? data.colors
              : [
                  {
                    name: '無顏色',
                    image: 'default_color_image.jpg',
                    stock: 0,
                  },
                ],
        }
        console.log('rentData:', rentData)
        setListData(rentData)
      } else {
        setIsError(true)
      }
    } catch (err) {
      console.log(err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleColorChange = (color) => {
    setSelectedColor(color) // 更新选中的颜色
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value)
  }
  // 计算日期差并更新租金
  const calculateTotalPrice = () => {
    if (!ListData || !startDate || !endDate) return

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end <= start) return // 確保結束日期大於開始日期

    const timeDiff = end.getTime() - start.getTime()
    const dayDiff = timeDiff / (1000 * 3600 * 24)
    const pricePerDay = ListData.price || 0 // 確保價格存在
    const total = pricePerDay * dayDiff * quantity

    setTotalPrice(total)
  }
  const maxEndDate = useMemo(() => {
    if (!startDate) return null
    const mEnd = new Date(startDate)
    mEnd.setDate(startDate.getDate() + 7)
    return mEnd
  }, [startDate])
  // 验证开始日期合法性
  const minStartDate = useMemo(() => {
    const now = new Date()
    const minDate = new Date(now)
    minDate.setDate(now.getDate() + 3) // 设置开始日期最小值为当前日期后3天
    return minDate
  }, [])

  // 验证开始日期合法性
  const handleStartDateChange = (date) => {
    const newStartDate = new Date(date)

    if (newStartDate < minStartDate) {
      toastError('麻煩預約租借必須要三天後才能預約')
      return
    }

    setStartDate(newStartDate)

    // 重新計算並檢查 `newEndDate` 是否在最大日期範圍內
    const newEndDate = new Date(newStartDate)
    newEndDate.setDate(newStartDate.getDate() + 1)

    if (newEndDate > maxEndDate) {
      setEndDate(maxEndDate)
    } else {
      setEndDate(newEndDate)
    }
  }

  // 修改后的 handleEndDateChange
  const handleEndDateChange = (date) => {
    if (!startDate) {
      toastWarning('請先選擇開始日期')
      return
    }

    if (date <= startDate) {
      toastError('結束日期無法小於或等於開始日期')
      return
    }

    setEndDate(date)
  }

  // 修改 minEndDate
  const minEndDate = useMemo(() => {
    if (!startDate) return null
    const newMinEndDate = new Date(startDate)
    newMinEndDate.setDate(startDate.getDate() + 1)
    return newMinEndDate
  }, [startDate])

  //日期
  // useEffect(() => {
  //   const today = new Date(); // 當前日期
  //   setStartDate(today);
  // }, []);
  useEffect(() => {
    if (startDate && endDate && endDate <= startDate) {
      const correctedEndDate = new Date(startDate)
      correctedEndDate.setDate(startDate.getDate() + 1)
      setEndDate(correctedEndDate)
    }
  }, [startDate])

  useEffect(() => {
    calculateTotalPrice()
  }, [startDate, endDate, quantity, selectedColor])

  useEffect(() => {
    getData()
  }, [pid])

  useEffect(() => {
    if (ListData?.colors?.length > 0 && !selectedColor) {
      setSelectedColor(ListData.colors[0]) // 默认选第一个颜色
    }
  }, [ListData])

  //店家
  useEffect(() => {
    const menu = document.querySelector('.c-addselect')

    if (menu) {
      const handleTouchStart = (e) => {
        e.stopPropagation() // 只阻止 `react-select` 组件内部的 `touchstart` 事件
      }

      menu.addEventListener('touchstart', handleTouchStart)

      return () => {
        menu.removeEventListener('touchstart', handleTouchStart)
      }
    }
  }, [])

  const handleAddToCart = () => {
    if (!ListData || ListData.stock <= 0) {
      toastError('商品缺貨，無法加入購物車')
      return
    }

    const cartData = {
      id: ListData.id,
      name: ListData.name,
      brand: ListData.brand,
      date_start: startDate.toISOString().split('T')[0],
      date_end: endDate.toISOString().split('T')[0],
      total_price: totalPrice,
      color: selectedColor?.name || '無顏色',
      image:
        `/images/Rent/pd-images/${selectedImages[0]}` ||
        '/images/default_image.jpg',
      description: ListData.description,
      specifications: ListData.rentList,
      stock: ListData.stock,
      rentStore: selectedStore,
    }

    console.log('Formatted Cart Data:', JSON.stringify(cartData, null, 2))

    // 檢查 onAddRent 是否存在
    if (typeof onAddRent === 'function') {
      onAddRent(cartData)

      // 減少庫存
      setListData((prevData) => ({
        ...prevData,
        stock: prevData.stock - 1,
      }))

      // toastSuccess('已成功加入購物車！')
    } else {
      toastError('加入購物車失敗，請稍後再試')
    }
  }
  // useMemo 保证选中颜色后能正确更新图片
  const selectedImages = useMemo(() => {
    const defaultColor = selectedColor || ListData?.colors?.images?.[0]
    if (!defaultColor) return []

    const colorData = ListData?.colors?.find(
      (c) => c.name.toLowerCase() === defaultColor.name.toLowerCase()
    )

    // 如果找不到颜色数据或图片数据为空，提供默认的图片
    if (!colorData?.images || colorData.images.length === 0) {
      console.warn(`No images found for color: ${defaultColor.name}`)
      return ['/images/default_image.jpg'] // 默认图片路径
    }

    // 移除重复的图片
    const uniqueImages = Array.from(
      new Set(colorData.images.map((img) => img.url))
    ).map((url) => colorData.images.find((img) => img.url === url))

    return uniqueImages?.length
      ? uniqueImages
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((img) => img.url)
      : []
  }, [ListData, selectedColor])

  if (isError) return <div>發生錯誤</div>

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div>載入中...</div>
        </div>
      ) : (
        <div>
          {/* section1 */}
          <div className="c-section1">
            <div className=" c">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-7 c-index1 ">
                    <Main images={selectedImages} brand={ListData.brand}/>
                  </div>
                  <div className="col-5 c-left ">
                    <div className="c-text">
                      <div className="c-title d-flex justify-content-start align-items-center">
                        <h3 className="h3 title-text">{ListData.name}</h3>
                      </div>
                      <div className="c-price">
                        <h3 className="c-price-1 m-0">
                          NT$:{ListData.price}/天
                        </h3>
                      </div>
                      <div className="c-brand">
                        <div className="bg-dark text-br c-band  d-flex justify-content-center align-items-center">
                          <h5 className="text-white p-1 m-0">
                            {ListData.brand}
                          </h5>
                        </div>
                      </div>
                      <div className="c-color">
                        <div className="c-co">
                          <div className="c-title-co d-flex justify-content-start">
                            <div className="h5 pe-3">顏色:</div>
                            <h5>{selectedColor?.name || '無顏色'}</h5>
                          </div>
                          <div className="circle d-flex gap-3">
                            {ListData?.colors?.map((color) => (
                              <button
                                key={color.name}
                                className="color-img"
                                style={{
                                  backgroundImage: `url(/images/Rent/color-images/${color.image})`,
                                  width: '30px',
                                  height: '30px',
                                  border:
                                    selectedColor?.name === color.name
                                      ? '2px solid black'
                                      : 'none',
                                  borderRadius: '50%',
                                  backgroundSize: 'cover',
                                  cursor: 'pointer',
                                }}
                                onClick={() => setSelectedColor(color)}
                                tabIndex="0"
                                aria-label={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 日期選擇器 */}
                      <div className="c-start gap-2 py-3">
                        <div className="c-sdata">
                          <h6 className=" title-start">租借起始日</h6>
                        </div>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          minDate={minStartDate} // 设置开始日期最小值为当前日期的三天后
                          placeholderText="開始日期"
                          dateFormat="yyyy/MM/dd"
                          disabled={!startDate}
                          customInput={<CustomInput />}
                          className="custom-datepicker"
                        />
                      </div>

                      <div className="c-end gap-2 py-3">
                        <div className="c-edata">
                          <h6 className=" title-start">租借結束日</h6>
                        </div>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => handleEndDateChange(date)}
                          minDate={minEndDate} // 改為來自 useMemo 的變數
                          maxDate={maxEndDate}
                          placeholderText="結束日期"
                          dateFormat="yyyy/MM/dd"
                          disabled={!startDate}
                          customInput={<CustomInput />}
                          className="custom-datepicker"
                        />
                      </div>

                      {/* 总价显示 */}
                      <div className="c-price-total">
                        <h6>總金額: {totalPrice} 元</h6>
                      </div>
                      <div className="c-addr gap-2 ">
                        <div className="c-add-title">
                          <h6>自取地點</h6>
                        </div>
                        <StoreSelector
                          selectedStore={selectedStore}
                          setSelectedStore={setSelectedStore}
                          className="c-addr-in gap-2"
                        />
                      </div>


                      <div className="btn1">
                        <button
                          className="btn btn-dark btnbot"
                          onClick={handleAddToCart}
                          disabled={ListData?.stock <= 0}
                          style={{
                            opacity: ListData?.stock <= 0 ? 0.5 : 1,
                            cursor:
                              ListData?.stock <= 0 ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <h6 className="text-white m-0">加入購物車</h6>
                        </button>

                        <div className="g-stock d-flex align-items-center gap-2 pt-3">
                          <img
                            src={
                              ListData?.stock > 0
                                ? '/images/product/detail/stock.svg' // 库存图片
                                : '/images/product/detail/no_stock.svg' // 缺货图片
                            }
                            width="18px"
                            alt=""
                          />
                          <div
                            className={`m-0 h6 ${
                              ListData?.stock > 0
                                ? 'text-success'
                                : 'text-danger'
                            }`}
                          >
                            {ListData?.stock > 0
                              ? `尚有庫存 (${ListData.stock})`
                              : '缺貨'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* section2 & section3 */}
          <div className="c-section2">
            <div className="container-fluid ">
              <div className="row">
                <div className="col-7 c-prduct c-index1">
                  <div className="product-top">
                    <h6 className=" pb-3 m-0 c-List-body">商品描述</h6>
                    <div className="product-list-text">
                      <p className="list">{ListData.description}</p>
                    </div>
                  </div>

                  <div
                    className="product-title"
                    style={{ paddingTop: '1.75rem' }}
                  >
                    <h6 className=" pb-3 m-0 c-List-title">電子裝置規格</h6>
                  </div>
                  {/* 第一行 */}
                  <div className="product-body d-flex">
                    <div className="product-list">
                      <div className="product-bo-1">
                        <p className=" pb-3 m-0">琴頸拾音器</p>
                      </div>
                      <div className="product-bo-2">
                        <p className="pb-3 m-0">
                          {ListData.rentList?.neckPickup}
                        </p>
                      </div>
                    </div>
                    <div className="product-list">
                      <div className="product-bo-1">
                        <p className=" pb-3 m-0">中段拾音器</p>
                      </div>
                      <div className="product-bo-2">
                        <h6 className="pb-3 m-0">
                          {ListData.rentList?.middlePickup}
                        </h6>
                      </div>
                    </div>
                    <div className="product-list">
                      <div className="product-bo-1">
                        <p className=" pb-3 m-0">琴橋拾音器</p>
                      </div>
                      <div className="product-bo-2">
                        <p className="pb-3 m-0">
                          {ListData.rentList?.bridgePickup}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 第二行 */}
                  <div className="product-body-2 d-flex pt-3">
                    <div className="product-list">
                      <div className="product-bo-1">
                        <p className=" pb-3 m-0">控制器</p>
                      </div>
                      <props className="product-bo-2">
                        <p className=" m-0">{ListData.rentList?.controls}</p>
                      </props>
                    </div>
                    <div className="product-list">
                      <div className="product-bo-1">
                        <p className=" pb-3 m-0">拾音器開關</p>
                      </div>
                      <div className="product-bo-2">
                        <p className=" pb-3 m-0">
                          {ListData.rentList?.switching}
                        </p>
                      </div>
                    </div>
                    <div className="product-list empty-placeholder" />
                  </div>
                </div>
                <div className="col-5 bo-gu ">
                  <div className="c-guide">
                    <div className="c-g pt-1">
                      <div className="c-gu-title-top">
                        <h6 className="r">租借指南:</h6>
                      </div>
                      <div className="text-gu pt-1">
                        <div className="p">
                        <span className='stores'>計費方式：</span>
                          <br />
                          以一日(24H)為單位。 <br />
                          如預期歸還以兩倍金額為預期租金。
                          <br />
                          <span className='stores'>注意事項：</span>
                          <br />
                          本網站最高租借時間為7日。
                          <br />
                          租借與歸還須於租借門市營業時間內。
                          <br />
                          租借或歸還時皆需要當場確認吉他情況，如歸還時有損壞照價賠償。
                          <br />
                          <span className='stores'>門市營業時間：</span>
                          <br />
                          周一至周五:
                          <br />
                          早上09:00 ~ 晚上20:00
                          <br />
                          周末
                          <br />
                          早上10:00 ~ 晚上20:00
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="c-readdr">
                    <div className="c-g pt-1 p-0">
                      <div className="c-gu-title pt-2">
                        <h6 className="r">租借地點</h6>
                      </div>
                      <div className="text-gu pt-1">
                        <p className="addr">
                          <span className='stores'>台北店：</span>
                          <br />
                          <a
                            href="https://www.google.com/maps/place/100%E5%8F%B0%E7%81%A3%E5%8F%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E6%AD%A3%E5%8D%80%E7%BE%85%E6%96%AF%E7%A6%8F%E8%B7%AF%E4%B8%89%E6%AE%B5140%E5%B7%B75%E8%99%9F/@25.0198989,121.5280768,17z/data=!3m1!4b1!4m6!3m5!1s0x3442a969f1687abd:0x1b197d1955f1e728!8m2!3d25.0198989!4d121.5280768!16s%2Fg%2F11bw3z9r7x?entry=ttu"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            台北市中正區羅斯福路三段140巷5號（點擊查看地圖）
                          </a>
                          <br />
                          電話號碼：&nbsp;02 2543 3319。
                          <br />
                          <span className='stores'> 台中店：</span>
                          <br />
                          <a
                            href="https://maps.app.goo.gl/M7XMATehs6uHnPvTA"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            台中市北區三民路三段270號（點擊查看地圖）
                          </a>
                          <br />
                          電話號碼：&nbsp;04 2238 5589。
                          <br />
                          <span className='stores'> 高雄店：</span>
                          <br />
                          <a
                            href="https://maps.app.goo.gl/nDz1Vc5KoatiXFeGA"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            高雄市三民區澄清路541號（點擊查看地圖）
                          </a>
                          <br />
                          話號碼：&nbsp;07 396 5555。
                          <br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* section3 */}
          <RentCardCarousel />
          {/* <div className="c-section3">
            <div className="container-fluid c-index">
              <div className="c-index-title d-none d-md-block">
                <div className="row align-items-center gap-0">
                  <div className="col-5 d-flex  gap-2">
                    <h1 className="h2 ">Recently popular rental products</h1>
                    <h5 className='h5 pt-2'>/</h5>
                    <h4 className=" h4 pt-2"> 最近熱門租借商品</h4>
                  </div>
                  <div className="col-6 pe-4 ps-0">
                    <h5 className=" h4 m-0"> / 最近熱門租借商品</h5>
                  </div>
                </div>
              </div>
              <Boottom />
            </div>
          </div> */}
        </div>
      )}
    </>
  )
}
