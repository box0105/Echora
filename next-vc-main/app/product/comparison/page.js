'use client'

import './comparison.scss'
import ProductCardCompare from '../_components/product-card-compare'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ProductComparisonPage() {
  const [compareDatas, setCompareDatas] = useState([])
  const searchParams = useSearchParams()

  const getCompareDatas = async () => {
    const products = searchParams.get('products')
    console.log(products)
    try {
      const res = await fetch(
        `http://localhost:3005/api/products/comparison?products=${products}`
      )
      const data = await res.json()
      setCompareDatas(data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCompareDatas()
  }, [])

  return (
    <>
      <div className="g-pdlist-title cp-px-modified">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center">
            <h4 className="h4 mb-0">COMPARE PRODUCTS</h4>
            <h4 className="mb-0">電吉他商品比較</h4>
          </div>
        </div>
      </div>
      <div className="g-pdcompare cp-px-modified py-5">
        <div className="container-fluid p-0">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th></th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i}>
                    <ProductCardCompare data={compareData} />
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>SPEC</th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i}></td>
                ))}
              </tr>
              <tr>
                <th>琴頸拾音器</th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i}>{compareData.neck_pickup ? compareData.neck_pickup : "-"}</td>
                ))}
              </tr>
              <tr>
                <th>中段拾音器</th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i}>{compareData.middle_pickup ? compareData.middle_pickup : "-"}</td>
                ))}
              </tr>
              <tr>
                <th>琴橋拾音器</th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i}>{compareData.bridge_pickup}</td>
                ))}
              </tr>
              <tr>
                <th>控制器</th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i}>{compareData.controls}</td>
                ))}
              </tr>
              <tr>
                <th>拾音器開關</th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i}>{compareData.switching}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
