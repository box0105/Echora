'use client'

import './detail.scss'

export default function ProductDetailIdPage() {
  return (
    <>
      <div>
        <section className="g-pd-details">
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="g-pd-imgs col-lg-7 h-100">
                <div className="row h-100">
                  {/* react找套件 側邊圖片輪播 */}
                  <div className="g-side-scroll col-lg-3 d-lg-block d-none h-100">
                    <div className="w-100 h-100 d-flex flex-column justify-content-between gap-3">
                      <div className="g-img-box w-100 h-100" />
                      <div className="g-img-box w-100 h-100" />
                      <div className="g-img-box w-100 h-100" />
                      <div className="g-img-box w-100 h-100" />
                    </div>
                  </div>
                  <div className="g-main-img col-lg-9 text-center">
                    <img
                      className="h-100 object-fit-contain"
                      src="/images/product/detail/0113902803_fen_ins_frt_1_rr.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="g-pd-discrip col-lg-5 h-100">
                <img
                  className="g-heart"
                  src="/images/product/detail/heart.svg"
                  alt=""
                />
                <h3 className="h3 mb-0 me-5">Les Paul Mondern Lite</h3>
                <h6 className="g-price h6 m-0">NT$ 79,000</h6>
                <div className="g-pd-brand d-flex justify-content-center align-items-center">
                  <p className="h7 m-0">Gibson</p>
                </div>
                <div className="g-colors">
                  <div className="g-color-text d-flex align-items-center gap-3 mb-3">
                    <h5 className="m-0">顏色:</h5>
                    <p className="h7 m-0">Sky Blue</p>
                  </div>
                  <div className="g-color-balls d-flex">
                    <img
                      width="26px"
                      src="./product-list-imgs/lightblue.svg"
                      alt=""
                    />
                    <img
                      width="26px"
                      src="./product-list-imgs/darkblue.svg"
                      alt=""
                    />
                    <img
                      width="26px"
                      src="./product-list-imgs/purple.svg"
                      alt=""
                    />
                  </div>
                </div>
                <button className="g-add-to-cart d-flex justify-content-center align-items-center">
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
                  <p className="mt-3 mb-0">
                    它採用了桃花心木琴身搭配枫木面板，帶來飽滿且均衡的音色。琴頸為桃花心木材質，配有圓形半徑的烏木指板，擁有
                    24
                    顆中型加大品格及超級分裂區塊的珍珠母鑲嵌。琴頭裝飾有一個引人注目的全新珍珠母「吊燈鑲嵌」，靈感來自於
                    1940 年代的設計，該設計於 Gibson 檔案中被發現。配備
                    Burstbucker™ Pro（琴頸和中間位置）與 Burstbucker
                    Pro+（琴橋位置）拾音器，並搭載推/拉音量控制，可實現線圈分接，此外還有一個手工接線的主音控，搭配
                    Orange Drop® 電容器。
                  </p>
                </div>
                <div className="g-pd-spec py-3">
                  <div className="g-spec-title d-flex justify-content-between align-items-center">
                    <h6 className="m-0">電子裝置規格</h6>
                    <img src="/images/product/detail/minus.svg" alt="" />
                  </div>
                  <ul className="list-unstyled">
                    <li>
                      <p className="mb-2">琴頸拾音器</p>
                      <p className="p m-0" style={{ fontWeight: 400 }}>
                        Haymaker™ Humbucker
                      </p>
                    </li>
                    <li>
                      <p className="mb-2">中段拾音器</p>
                      <p className="p m-0" style={{ fontWeight: 400 }}>
                        Ultra II Noiseless™ Hot Strat®
                      </p>
                    </li>
                    <li>
                      <p className="mb-2" p>
                        琴橋拾音器
                      </p>
                      <p className="p m-0" style={{ fontWeight: 400 }}>
                        Ultra II Noiseless™ Hot Strat®
                      </p>
                    </li>
                    <li>
                      <p className="mb-2">控制器</p>
                      <p className="m-0">
                        主音量控制（帶 S-1™ 開關），音調
                        1：頸拾音器/中拾音器，音調 2：橋拾音器
                      </p>
                    </li>
                    <li>
                      <p className="mb-2">拾音器開關</p>
                      <p className="m-0">5 段拉桿切換</p>
                    </li>
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
        <section className="g-also-like px-modified">
          <div className="container-fluid">
            <div className="g-like-title d-flex align-items-baseline gap-1">
              <h1 className="h1">YOU MAY ALSO LIKE</h1>
              <h5 className="h5 px-1">/</h5>
              <h4>您可能也會喜歡</h4>
            </div>
            {/* react找套件 下方產品卡輪播欄 */}
            <div className="g-like-row row row-cols-4">
              <img
                className="g-left-arrow p-0"
                src="/images/product/detail/arrow.svg"
                alt=""
              />
              <div className="col p-0">
                <div className="g-product-card">
                  <div className="g-pd-img d-flex justify-content-center align-items-center">
                    <img
                      className="h-100"
                      src="./product-list-imgs/LPCS00NYNH1_front.png"
                      alt=""
                    />
                  </div>
                  <div className="g-pd-text">
                    {/* <hr> */}
                    <h6 className="h6">
                      Product Name Product Name Product Name
                    </h6>
                    <div className="d-flex gap-3">
                      <h6 className="h6">$79000</h6>
                      {/* <h6 class="h6">$72900</h6> */}
                    </div>
                    <div className="g-color-row">
                      <img
                        width="22px"
                        src="./product-list-imgs/lightblue.svg"
                        alt=""
                      />
                      <img
                        width="22px"
                        src="./product-list-imgs/darkblue.svg"
                        alt=""
                      />
                      <img
                        width="22px"
                        src="./product-list-imgs/purple.svg"
                        alt=""
                      />
                    </div>
                    <p className="p g-color-text">2 colors</p>
                  </div>
                </div>
              </div>
              <div className="col p-0">
                <div className="g-product-card">
                  <div className="g-pd-img d-flex justify-content-center align-items-center">
                    <img
                      className="h-100"
                      src="./product-list-imgs/LPCS00NYNH1_front.png"
                      alt=""
                    />
                  </div>
                  <div className="g-pd-text">
                    {/* <hr> */}
                    <h6 className="h6">
                      Product Name Product Name Product Name
                    </h6>
                    <div className="d-flex gap-3">
                      <h6 className="h6">$79000</h6>
                      {/* <h6 class="h6">$72900</h6> */}
                    </div>
                    <div className="g-color-row">
                      <img
                        width="22px"
                        src="./product-list-imgs/lightblue.svg"
                        alt=""
                      />
                      <img
                        width="22px"
                        src="./product-list-imgs/darkblue.svg"
                        alt=""
                      />
                      <img
                        width="22px"
                        src="./product-list-imgs/purple.svg"
                        alt=""
                      />
                    </div>
                    <p className="p g-color-text">2 colors</p>
                  </div>
                </div>
              </div>
              <div className="col p-0">
                <div className="g-product-card">
                  <div className="g-pd-img d-flex justify-content-center align-items-center">
                    <img
                      className="h-100"
                      src="./product-list-imgs/LPCS00NYNH1_front.png"
                      alt=""
                    />
                  </div>
                  <div className="g-pd-text">
                    {/* <hr> */}
                    <h6 className="h6">
                      Product Name Product Name Product Name
                    </h6>
                    <div className="d-flex gap-3">
                      <h6 className="h6">$79000</h6>
                      {/* <h6 class="h6">$72900</h6> */}
                    </div>
                    <div className="g-color-row">
                      <img
                        width="22px"
                        src="./product-list-imgs/lightblue.svg"
                        alt=""
                      />
                      <img
                        width="22px"
                        src="./product-list-imgs/darkblue.svg"
                        alt=""
                      />
                      <img
                        width="22px"
                        src="./product-list-imgs/purple.svg"
                        alt=""
                      />
                    </div>
                    <p className="p g-color-text">2 colors</p>
                  </div>
                </div>
              </div>
              <div className="col p-0">
                <div className="g-product-card">
                  <div className="g-pd-img d-flex justify-content-center align-items-center">
                    <img
                      className="h-100"
                      src="./product-list-imgs/LPCS00NYNH1_front.png"
                      alt=""
                    />
                  </div>
                  <div className="g-pd-text">
                    {/* <hr> */}
                    <h6 className="h6">
                      Product Name Product Name Product Name
                    </h6>
                    <div className="d-flex gap-3">
                      <h6 className="h6">$79000</h6>
                      {/* <h6 class="h6">$72900</h6> */}
                    </div>
                    <div className="g-color-row">
                      <img
                        width="22px"
                        src="./product-list-imgs/lightblue.svg"
                        alt=""
                      />
                      <img
                        width="22px"
                        src="./product-list-imgs/darkblue.svg"
                        alt=""
                      />
                      <img
                        width="22px"
                        src="./product-list-imgs/purple.svg"
                        alt=""
                      />
                    </div>
                    <p className="p g-color-text">2 colors</p>
                  </div>
                </div>
              </div>
              <img
                className="g-right-arrow p-0"
                src="/images/product/detail/arrow-right.svg"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
