'use client'

import { useEffect } from 'react'
import MemberLayout from '../layouts/memberLayout'
export default function FavPage() {
  const [uid, setUid] = useState(null)
  const getFavItems =async () => {
    try{
        const res = fetch()

    }catch(err){

    }
  }
  useEffect(() => {
    const storedUid = localStorage.getItem('userId')
    setUid(storedUid)
  }, [])
  return (
    <MemberLayout>
      <div className="section-title h4 ms-2">我的收藏</div>
      <div></div>
    </MemberLayout>
  )
}
