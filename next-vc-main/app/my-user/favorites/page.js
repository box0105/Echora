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
      console.log(data.data)
      setFavItems(data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const removeFavItem = async (uid, skuid) => {
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
        getFavItems()
      }
    } catch (err) {
      alert('移除失敗')
      console.log(err)
    }
  }

  useEffect(() => {
    const storedUid = localStorage.getItem('userId')
    setUid(storedUid)
  }, [])

  useEffect(() => {
    if (uid) {
      getFavItems()
    }
  }, [uid])

  return (
    <MemberLayout>
      <div className="section-title h4">我的收藏</div>
      <div className="container-fluid p-0">
        <div className="row row-cols-xl-3 row-cols-2">
          {favItems.length > 0 ? (favItems.map((favItem) => (
            <ProductCard 
            data={favItem} 
            key={favItem.product_sku_id}
            removeFavItem = {(skuid) => {removeFavItem(uid, skuid)}}
             />
          ))) : (<h5 className='col pt-2' style={{ color: "var(--grey500)", fontWeight: 400}}>尚無收藏的商品</h5>)}
        </div>
      </div>
    </MemberLayout>
  )
}
