'use client'
import './_styles/bootstrap.scss'
import './_styles/index.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

import Section1 from './_components/mainSection'
import Section2 from './_components/indexSection2'
import Section3 from './_components/indexSection3'
import ActivitySwiper from './_components/ActivitySwiper'
import React, { useEffect } from 'react'

export default function AppPage(props) {
  const useScrollEffect = () => {
    useEffect(() => {
      const handleScroll = () => {
        const elements = document.querySelectorAll('.m-anime')
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.75) {
            el.classList.add('is-visible')
          }
        })
      }

      window.addEventListener('scroll', handleScroll)
      handleScroll() // 初始檢查元素
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])

    return null
  }
  useScrollEffect()
  return (
    <>
      <div className="m-background">
        <div className="m-section1 container-fluid p-0">
          <Section1 />
        </div>
        <div className="m-section2">
          <Section2 />
        </div>
        <div className="m-section3">
          <Section3 />
        </div>
        <div className="m-section4">
          <div className="container-fluid m-index">
            <div className="m-index-title m-anime">
              <h1 className="h3">
                RECENT ACTIVITIES<span> / 近期活動</span>
              </h1>
            </div>
            <div className="m-anime m-section2-col5 m-section2-colx">
              <ActivitySwiper />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
