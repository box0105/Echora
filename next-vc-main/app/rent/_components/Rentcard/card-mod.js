'use client'

import React, { useState } from 'react'
import './cardmod.scss'

export default function RentcardCardMod({ data }) {
  if (!data || data.length === 0) {
    return <p>目前沒有租賃商品。</p>
  }

  return <></>
  // <div className="row row-cols-1 row-cols-sm-2 g-3 mt-0">
  //   {data.map((item, index) => {
  //     const [mainImage, setMainImage] = useState(item.image)

  //     return (
  //       <div key={index} className="col p-2">
  //         <div className="g-product-card">
  //           <div className="g-pd-img d-flex justify-content-center align-items-center position-relative">
  //             <div className="g-brand-name d-flex justify-content-center align-items-center position-absolute">
  //               {item.brand_name}
  //             </div>
  //             <img
  //               className="h-100"
  //               src={`/images/Rent/pd-images/${mainImage}`}
  //               alt={item.name}
  //             />
  //           </div>
  //           <div className="g-pd-text">
  //             <h6 className="h6">{item.name}</h6>
  //             <div className="d-flex gap-3">
  //               <h6 className="h6">${item.price.toLocaleString()}</h6>
  //             </div>
  //             <div className="g-color-row">
  //               {item.colors.map((color) => (
  //                 <div
  //                   key={color.id}
  //                   onMouseEnter={() => setMainImage(item.images[color.skuId])}
  //                   onMouseLeave={() => setMainImage(item.image)}
  //                 >
  //                   <img
  //                     width="22px"
  //                     src={`/images/product/color-images/${color.image}`}

  //                     alt={color.name}
  //                   />
  //                 </div>
  //               ))}
  //             </div>
  //             <p className="p g-color-text">
  //               {item.colors.length} {item.colors.length > 1 ? 'colors' : 'color'}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   })}
  // </div>
}
