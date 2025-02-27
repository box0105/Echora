'use client'
import React, { useState, useEffect, useMemo } from 'react'
import '../_styles/list.scss'
import Main from './_components/ListMain'
import Boottom from './_components/ListBottom'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'next/navigation'
import { useMyCart } from '@/hooks/use-cart'

export default function Page(props) {
  const [ListData, setListData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null) // 用来保存选中的颜色
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [quantity, setQuantity] = useState(1)
  const [selectedStore, setSelectedStore] = useState('台北店')
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
    if (ListData && startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const timeDiff = end.getTime() - start.getTime() // 获取时间差
      const dayDiff = timeDiff / (1000 * 3600 * 24) // 转换为天数
      const pricePerDay = ListData.price // 单日租金
      const total = pricePerDay * dayDiff * quantity // 总价格
      setTotalPrice(total)
    }
  }
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

  // 購物車
  // const handleAddToCart = () => {
  //   if (typeof onAddRent !== 'function') {
  //     console.error("onAddRent is not a function");
  //     return;
  //   }
  //   const cartData = {
  //     id: ListData.id,
  //     name: ListData.name,
  //     date_start: startDate.toISOString().split('T')[0],
  //     date_end: endDate.toISOString().split('T')[0],
  //     total_price: totalPrice,
  //     color: selectedColor?.name || '無顏色',
  //     image: selectedImages[0] || '/images/default_image.jpg',
  //     description: ListData.description,
  //     specifications: ListData.rentList,
  //     store: selectedStore,
  //     selectedTickets: quantity,
  //   }

  //   onAddRent(cartData)
  //   console.log(JSON.stringify(cartData, null, 2))
  // }
  const handleAddToCart = () => {
    const cartData = {
      id: ListData.id,
      name: ListData.name,
      date_start: startDate.toISOString().split('T')[0],
      date_end: endDate.toISOString().split('T')[0],
      total_price: totalPrice,
      color: selectedColor?.name || '無顏色',
      image: selectedImages[0] || '/images/default_image.jpg',
      description: ListData.description,
      specifications: ListData.rentList,
      store: ListData.stock,
    }

    // 在這裡打印 cartData
    console.log('Cart Data:', cartData)

    // 如果你需要格式化輸出 JSON 以便更清晰地查看，使用以下代碼：
    console.log('Formatted Cart Data:', JSON.stringify(cartData, null, 2))

    // 確保這裡的 onAddRent 是一個有效的函數（如果有的話）
    if (typeof onAddRent === 'function') {
      onAddRent(cartData)
    } else {
      console.error('onAddRent is not a function')
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
            <div className=" c-index1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-7 ">
                    <Main images={selectedImages} />
                  </div>
                  <div className="col-5 c-left">
                    <div className="c-text">
                      <div className="c-title d-flex justify-content-start align-items-center">
                        <h2 className="title-text">{ListData.name}</h2>
                      </div>
                      <div className="c-price">
                        <h3 className="c-price-1 m-0">
                          價錢:{ListData.price}/天
                        </h3>
                      </div>
                      <div className="c-brand">
                        <div
                          className="bg-dark text-br d-flex justify-content-center"
                          style={{ paddingBottom: '1.5rem' }}
                        >
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
                          <div className="h4 title-start">租借起始日</div>
                        </div>
                        <input
                          type="date"
                          className="w-100 p-0 border border-0 bg-white"
                          value={startDate.toISOString().split('T')[0]}
                          onChange={(e) =>
                            setStartDate(new Date(e.target.value))
                          }
                        />
                      </div>

                      <div className="c-end gap-2 py-3">
                        <div className="c-edata">
                          <div className="h4 title-start">租借結束日</div>
                        </div>
                        <input
                          type="date"
                          className="w-100 p-0 border border-0 bg-white"
                          value={endDate.toISOString().split('T')[0]}
                          onChange={(e) => setEndDate(new Date(e.target.value))}
                        />
                      </div>

                      {/* 总价显示 */}
                      <div className="c-price-total">
                        <h4>總金額: {totalPrice} 元</h4>
                      </div>

                      {/* 門店選擇 */}
                      <div className="c-addr gap-2 py-3">
                        <div className="c-add-title">
                          <div className=" h4 c-addtiele">自取地點</div>
                        </div>
                        <select
                          name
                          id
                          className="c-addselect w-100 h-100"
                          value={selectedStore}
                          onChange={handleStoreChange}
                        >
                          <option value="台北店" className="h5">
                            台北店
                          </option>
                          <option value="台中店" className="h5">
                            台中店
                          </option>
                          <option value="高雄店" className="h5">
                            高雄店
                          </option>
                        </select>
                      </div>

                      <div className="btn1">
                        <button
                          className="btn btn-dark btnbot"
                          onClick={handleAddToCart}
                        >
                          <div className="h4 text-white m-0">加入購物車</div>
                        </button>
                        <div className="g-stock d-flex align-items-center gap-2 pt-2">
                          <img
                            src="/images/product/detail/stock.svg"
                            width="18px"
                            alt=""
                          />
                          <h6 className="m-0">尚有庫存</h6>
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
            <div className="container-fluid c-index1">
              <div className="row">
                <div className="col-7 c-prduct">
                  <div className="product-top">
                    <div className="h3 pb-3 m-0">商品描述</div>
                    <div className="product-list-text">
                      <div className="h6">{ListData.description}</div>
                    </div>
                  </div>

                  <div
                    className="product-title"
                    style={{ paddingTop: '1.75rem' }}
                  >
                    <div className="h3 pb-3 m-0">電子裝置規格</div>
                  </div>
                  {/* 第一行 */}
                  <div className="product-body d-flex">
                    <div className="product-list">
                      <div className="product-bo-1">
                        <div className="h5 pb-3 m-0">琴頸拾音器</div>
                      </div>
                      <div className="product-bo-2">
                        <h6 className="pb-3 m-0">
                          {ListData.rentList?.neckPickup}
                        </h6>
                      </div>
                    </div>
                    <div className="product-list">
                      <div className="product-bo-1">
                        <div className="h5 pb-3 m-0">中段拾音器</div>
                      </div>
                      <div className="product-bo-2">
                        <h6 className="pb-3 m-0">
                          {ListData.rentList?.middlePickup}
                        </h6>
                      </div>
                    </div>
                    <div className="product-list">
                      <div className="product-bo-1">
                        <div className="h5 pb-3 m-0">琴橋拾音器</div>
                      </div>
                      <div className="product-bo-2">
                        <h6 className="pb-3 m-0">
                          {ListData.rentList?.bridgePickup}
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* 第二行 */}
                  <div className="product-body-2 d-flex pt-3">
                    <div className="product-list">
                      <div className="product-bo-1">
                        <div className="h5 pb-3 m-0">控制器</div>
                      </div>
                      <div className="product-bo-2">
                        <div className="h6 m-0">
                          {ListData.rentList?.controls}
                        </div>
                      </div>
                    </div>
                    <div className="product-list">
                      <div className="product-bo-1">
                        <div className="h5 pb-3 m-0">拾音器開關</div>
                      </div>
                      <div className="product-bo-2">
                        <div className="h6 pb-3 m-0">
                          {ListData.rentList?.switching}
                        </div>
                      </div>
                    </div>
                    <div className="product-list empty-placeholder" />
                  </div>
                </div>
                <div className="col-5 bo-gu">
                  <div className="c-guide">
                    <div className="c-g pt-1">
                      <div className="c-gu-title">
                        <div className="h4">租借指南</div>
                      </div>
                      <div className="text-gu pt-1">
                        <div className="h6">
                          <span> 計費方式：</span>
                          <br />
                          以一日(24H)為單位。 <br />
                          如預期歸還以兩倍金額為預期租金。
                          <br />
                          <span>注意事項：</span>
                          <br />
                          租借與歸還須於租借門市營業時間內。
                          <br />
                          租借或歸還時皆需要當場確認吉他情況，如歸還時有損壞照價賠償。
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="c-readdr">
                    <div className="c-g pt-1">
                      <div className="c-gu-title">
                        <div className="h4">租借地點</div>
                      </div>{' '}
                      <div className="text-gu pt-1">
                        <div className="h6">
                          台北店：
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
                          台中店：
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
                          高雄店：
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* section3 */}
          <div className="c-section3">
            <div className="container-fluid c-index">
              <div className="c-index-title d-none d-md-block">
                <div className="row align-items-center gap-0">
                  <div className="col-3 ps-4 pe-0">
                    <h1 className="m-0">YOU MAY ALSO LIKE</h1>
                  </div>
                  <div className="col-6 pe-4 ps-0">
                    <h5 className=" h5 m-0"> / 您可能也會喜歡</h5>
                  </div>
                </div>
              </div>
              <Boottom />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
