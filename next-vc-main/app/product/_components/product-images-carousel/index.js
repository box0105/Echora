'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
// import "slick-carousel/slick/slick-theme.css";
import './detail.scss'
import { useState, useEffect, useRef } from 'react'

export default function ProductImagesCarousel({ detailData, selectedSku }) {
  function VerticalCarousel() {
    const [mainImage, setMainImage] = useState()
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      focusOnSelect: true,
      beforeChange: function (currentSlide, nextSlide) {
        console.log('before change', currentSlide, nextSlide)
      },
      afterChange: function (currentSlide) {
        console.log('after change', currentSlide)
      },
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {selectedSku
            ? detailData[0]?.images[selectedSku].map((img, index) => (
                <>
                  <div
                    key={index}
                    className="g-img-box w-100 h-100"
                    onClick={() => {}}
                  >
                    <img
                      className="h-100 w-100 object-fit-cover"
                      src={`/images/product/pd-images/${img}`}
                      alt={detailData[0].name}
                    />
                  </div>
                </>
              ))
            : detailData[0]?.images[detailData[0]?.defaultSelectedSku].map(
                (img, index) => (
                  <>
                    <div key={index} className="g-img-box w-100 h-100">
                      <img
                        className="h-100 w-100 object-fit-cover"
                        src={`/images/product/pd-images/${img}`}
                        alt={detailData[0].name}
                      />
                    </div>
                  </>
                )
              )}
        </Slider>
      </div>
    )
  }
  function HorizontalCarousel() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {selectedSku
            ? detailData[0]?.images[selectedSku].map((img, index) => (
                <>
                  <img
                    key={index}
                    className="h-100 w-100 object-fit-contain"
                    src={`/images/product/pd-images/${img}`}
                    alt={detailData[0].name}
                  />
                </>
              ))
            : detailData[0]?.images[detailData[0]?.defaultSelectedSku].map(
                (img, index) => (
                  <>
                    <img
                      key={index}
                      className="h-100 w-100 object-fit-contain"
                      src={`/images/product/pd-images/${img}`}
                      alt={detailData[0].name}
                    />
                  </>
                )
              )}
        </Slider>
      </div>
    )
  }
  return (
    <>
      <div className="row h-100">
        {/* react找套件 側邊圖片輪播 */}
        <div className="g-side-scroll col-lg-3 d-lg-block d-none h-100">
          <VerticalCarousel />
          {/* <div className="w-100 h-100 d-flex flex-column justify-content-between gap-3">
                      {selectedSku
                        ? detailData[0]?.images[selectedSku].map((img) => (
                            <>
                              <div className="g-img-box w-100 h-100">
                                <img
                                  className="h-100 w-100 object-fit-cover"
                                  src={`/images/product/pd-images/${img}`}
                                  alt={detailData[0].name}
                                />
                              </div>
                            </>
                          ))
                        : detailData[0]?.images[
                            detailData[0]?.defaultSelectedSku
                          ].map((img) => (
                            <>
                              <div className="g-img-box w-100 h-100">
                                <img
                                  className="h-100 w-100 object-fit-cover"
                                  src={`/images/product/pd-images/${img}`}
                                  alt={detailData[0].name}
                                />
                              </div>
                            </>
                          ))}
                    </div> */}
        </div>
        <div className="g-main-img col-lg-9 text-center">
          {/* <HorizontalCarousel /> */}
          <img
            className="h-100 object-fit-contain"
            src={`/images/product/pd-images/${
              selectedSku
                ? detailData[0]?.images[selectedSku][0]
                : detailData[0]?.defaultImage
            }`}
            alt={detailData[0].name}
          />
        </div>
      </div>
    </>
  )
}
