'use client'

import './comparison.scss'
import ProductCardCompare from '../_components/product-card-compare'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useHeaderHeight } from '@/hooks/use-header'

export default function ProductComparisonPage() {
  // header 動態捲動
  const { headerHeight } = useHeaderHeight()
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > prevScrollY && currentScrollY > 50) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }

    setPrevScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY])

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
      <div className="g-compare-title cp-px-modified" style={{top: isVisible ? `${headerHeight}px` : '0px'}}>
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center">
            <h4 className="h4 mb-0">COMPARE PRODUCTS</h4>
            <h4 className="mb-0">電吉他商品比較</h4>
          </div>
        </div>
      </div>
      <div className="g-pdcompare cp-px-modified">
        <div className="container-fluid p-0">
          <table class="table table-striped table-bordered" style={{tableLayout: 'fixed', width: '100%'}}>
            <thead>
              <tr>
                <th style={{width: '90px'}}></th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i} className='align-top'>
                    <ProductCardCompare data={compareData} />
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className='h6' style={{fontWeight: '700'}}>SPEC</th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i}></td>
                ))}
              </tr>
              <tr>
                <th className='align-middle'><h6 className='mb-0' style={{fontWeight: '600'}}>琴頸拾音器</h6></th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i} className='h7' style={{fontWeight: '400', padding: '12px'}}>
                    {compareData.neck_pickup ? compareData.neck_pickup : '-'}
                  </td>
                ))}
              </tr>
              <tr>
                <th className='align-middle'><h6 className='mb-0' style={{fontWeight: '600'}}>中段拾音器</h6></th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i} className='h7' style={{fontWeight: '400', padding: '12px'}}>
                    {compareData.middle_pickup
                      ? compareData.middle_pickup
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr>
                <th className='align-middle'><h6 className='mb-0' style={{fontWeight: '600'}}>琴橋拾音器</h6></th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i} className='h7' style={{fontWeight: '400', padding: '12px'}}>{compareData.bridge_pickup}</td>
                ))}
              </tr>
              <tr>
                <th className='align-middle'><h6 className='mb-0' style={{fontWeight: '600'}}>控制器</h6></th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i} style={{padding: '12px'}}><h6 className='mb-0' style={{fontWeight: '400'}}>{compareData.controls}</h6></td>
                ))}
              </tr>
              <tr>
                <th className='align-middle'><h6 className='mb-0' style={{fontWeight: '600'}}>拾音器開關</h6></th>
                {compareDatas?.map((compareData, i) => (
                  <td key={i} style={{padding: '12px'}}><h6 className='mb-0' style={{fontWeight: '400'}}>{compareData.switching}</h6></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
