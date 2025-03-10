'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useFetch } from '@/hooks/use-fetch'

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
import ActivityList from '../_components/ActivityList'

import { dateFormat } from '../_utils/dateFormat'

export default function ActivityDetailPage() {
  // Activity ID
  const params = useParams()
  const activityId = Number(params?.detail)
  // const searchParams = useSearchParams()
  // const activityId = Number(searchParams?.get('id'))

  // Fetch Data
  const { data: acts, isLoading } = useFetch(
    `http://localhost:3005/api/activities/`
  )
  const act = acts?.find((a) => a.id === activityId)

  // Info Switch
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  if (isLoading) return <h3>網頁載入中，請稍後...</h3>

  return (
    <div className="b-container b-detail-page">
      {/* 開發測試 */}
      {/* <pre>{JSON.stringify(act, null, 2)}</pre> */}
      <HeroSection images={act?.media} />

      <main>
        <section className="b-main-info">
          <BreadCrumb breads={act} />
          <Title _title={act?.name} />
          <IntroCard
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(!isInfoOpen)}
            dateFormat={dateFormat}
            act={act}
          />
        </section>

        <div className="row g-5">
          <div className="col-12 col-xl-9 order-last order-xl-first">
            <article className="b-article-cards row g-0">
              {act?.article?.map((art, i) => {
                return <ArticleCard isLeft={i % 2 == 0} key={i} article={art} />
              })}
            </article>
          </div>
          <div className="col-12 col-xl-3 order-first order-xl-last">
            <PurchaseAside data={act} />
          </div>
        </div>

        <section className="b-other-act">
          <Title _title="YOU MAY ALSO LIKE, 您可能也會喜歡" />
          <ActivityList data={acts} id={activityId} isSmall={true} />
        </section>
      </main>
    </div>
  )
}
