'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/act.scss'
import '../_styles/act-detail.scss'
import '../_styles/act-font.scss'

import HeroSection from '../_components/HeroSection'
import BreadCrumb from '../_components/BreadCrumb'
import Title from '../_components/Title'
import IntroCard from '../_components/IntroCard'
import ArticleCard from '../_components/ArticleCard'
import PurchaseAside from '../_components/PurchaseAside'
import ActivityCardSm from '../_components/ActivityCardSm'

export default function DetailPage() {
  const searchParams = useSearchParams()
  const activityId = Number(searchParams?.get('id'))

  const initState = {
    category: {},
    genre: {},
    lineup: [{}],
    lineup: [{}],
    article: [{}],
  }
  const [act, setActivity] = useState(initState)
  const [acts, setActivities] = useState([initState])
  const [isLoading, setIsLoading] = useState(true)

  // Info Switch
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  // 網址上的單一活動
  useEffect(() => {
    if (activityId) {
      setIsLoading(true)
      fetch(`http://localhost:3005/api/activities/${activityId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setActivity(data.data.activity)
          } else {
            setError('活動資料載入失敗')
          }
          setIsLoading(false)
        })
        .catch((err) => console.log(err))
    }
  }, [activityId])

  // 所有活動
  useEffect(() => {
    if (activityId) {
      setIsLoading(true)
      fetch(`http://localhost:3005/api/activities`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setActivities(data.data.activities)
          } else {
            setError('活動資料載入失敗')
          }
          setIsLoading(false)
        })
        .catch((err) => console.log(err))
    }
  }, [])

  const formatDate = (isoDate) => {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('zh-TW', options)
  }

  if (isLoading) return <></>
  return (
    <div className="b-container">
      {/* 開發測試 */}
      {/* <pre>{JSON.stringify(act.article, null, 2)}</pre> */}
      <HeroSection images={act.media} />

      <main>
        <section className="b-main-info">
          <BreadCrumb
            breads={[act.category.name, act.genre.name, act.city, act.name]}
          />
          <Title _title={act.name} />
          <IntroCard
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(!isInfoOpen)}
            formatDate={formatDate}
            act={act}
          />
        </section>

        <div className="row g-5">
          <div className="col-12 col-xl-9 order-last order-xl-first">
            <article className="b-article-cards row g-0">
              {act.article.map((art, i) => {
                return (
                  <ArticleCard
                    isLeft={i % 2 == 0 ? true : false}
                    key={i}
                    article={art}
                  />
                )
              })}
            </article>
          </div>
          <div className="col-12 col-xl-3 order-first order-xl-last">
            <PurchaseAside ticket={act.type} />
          </div>
        </div>

        <section className="b-other-act">
          <Title _title="YOU MAY ALSO LIKE, 您可能也會喜歡" />

          <div className="b-act-list d-flex flex-column">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 gx-4 gy-5">
              {acts
                .filter((_, i) => i + 1 !== activityId)
                .map((data, i) => (
                  <ActivityCardSm key={i} data={data} />
                ))}
            </div>
            <button className="b-btn b-load-btn">瀏覽更多</button>
          </div>
        </section>
      </main>
    </div>
  )
}
