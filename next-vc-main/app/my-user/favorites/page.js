'use client'

import ProductCard from '../_components/product-card'
import { useState, useEffect } from 'react'
import MemberLayout from '../layouts/memberLayout'
export default function FavPage() {
  const [uid, setUid] = useState(null)
  const [favItems, setFavItems] = useState([])
  const getFavItems = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/favorite/list/${uid}`)
      const data = await res.json()
      console.log(data.data);
      setFavItems(data.data)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const storedUid = localStorage.getItem('userId')
    setUid(storedUid)
  }, [])

  useEffect(() => {
    getFavItems()
  }, [uid])


  return (
    <MemberLayout>
      <div className="section-title h4 ms-2">我的收藏</div>
      <div className='container-fluid p-0'>
        <div className='row row-cols-xl-3 row-cols-2'>
          {favItems.map((favItem) => (
            <ProductCard data={favItem} key={favItem.product_sku_id} />
          ))}
        </div>
      </div>
    </MemberLayout>
  )
}
