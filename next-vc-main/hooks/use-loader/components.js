'use client'

// https://github.com/Gamote/lottie-react
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
// import Lottie from 'lottie-react'
import catAnimation from './assets/loader-cat.json'
import nikeAnimation from './assets/loader-nike.json'
import styles from './assets/loader.module.scss'

// 展示用載入元件
export function DefaultLoader({ show = false }) {
  return (
    <div
      className={`${styles['semi-loader']} ${
        show ? '' : styles['semi-loader--hide']
      }`}
    ></div>
  )
}

// 展示用載入文字元件
export function LoaderText({ text = 'loading', show = false }) {
  return (
    <div
      className={`${styles['loading-text-bg']} ${
        show ? '' : styles['loading-text--hide']
      }`}
    >
      <div
        className={`${styles['loading-text']} ${
          show ? '' : styles['loading-text--hide']
        }`}
      >
        {text}...
      </div>
    </div>
  )
}

// lottie-react
export function CatLoader({ show = false }) {
  return (
    <div
      className={`${styles['cat-loader-bg']} ${
        show ? '' : styles['cat-loader--hide']
      }`}
    >
      <Lottie
        className={`${styles['cat-loader']} ${
          show ? '' : styles['cat-loader--hide']
        }`}
        animationData={catAnimation}
      />
    </div>
  )
}

// lottie-react
export function NikeLoader({ show = false }) {
  return (
    <div
      className={`${styles['nike-loader-bg']} ${
        show ? '' : styles['nike-loader--hide']
      }`}
    >
      <Lottie
        className={`${styles['nike-loader']} ${
          show ? '' : styles['nike-loader--hide']
        }`}
        animationData={nikeAnimation}
      />
    </div>
  )
}

export function NoLoader() {
  return <></>
}
