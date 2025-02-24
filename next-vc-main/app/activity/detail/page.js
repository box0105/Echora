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
  const activityId = searchParams?.get('id')

  const [act, setActivity] = useState({ category: {}, genre: {}, lineup: [{}] });
  const [acts, setActivities] = useState([{ category: {}, genre: {}, lineup: [{}] }])

  // 網址上的單一活動
  useEffect(() => {
    if (activityId) {
      fetch(`http://localhost:3005/api/activities/${activityId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setActivity(data.data.activity);
          } else {
            setError('活動資料載入失敗')
          }
        })
        .catch((err) => console.log(err))
    }
  }, [activityId])

  // 所有活動
  useEffect(() => {
    if (activityId) {
      fetch(`http://localhost:3005/api/activities`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setActivities(data.data.activities);
          } else {
            setError('活動資料載入失敗')
          }
        })
        .catch((err) => console.log(err))
    }
  }, [])

  const breadcrumb = ['音樂祭', '流行音樂', '台中市', '浮現祭']
  const intro = `
    ❝ 浮現祭，一場名為冒險的音樂祭。 ❞
        
      ▎記憶
      總有一個只有好朋友
      才知曉的秘密基地
       
      ▎夢境
      總有一座只有你自己
      創造的夢幻遊樂園
        
      ✪ 藏寶的秘密基地・華麗變身 ✨  
         
      ✪ 搖滾冒險遊樂園・熱鬧開張 🎢
        
      這些年來，踏入浮現祭的樂團和樂迷朋友們，不論是化身為發掘新聲音的音樂遊俠、來海線擴充好料圖鑑的美食獵人，還是漫遊在小鎮街道巷弄裡的探險家，每個人在浮現祭裡都有屬於自己的冒險故事集，一個無法被取代的回憶存檔。
        
      2025年，浮現祭將變身為「搖滾冒險遊樂園」!
        
      在這裡，你會遇見更多世界各地直送的新鮮音樂； 解鎖更多尚未被味蕾收錄的海線美食； 發掘更多小鎮文化秘境； 探索更多驚奇的限定跨域合作，更多更多超乎想像的驚喜，正等你收藏。
        
      百怪千奇的場景、千變萬化的遊樂園，唯有親身體驗，才能寫下新篇章。帶上冒險裝備，與我們一起啟動搖滾旅程，在這座冒險遊樂園裡邊聽邊玩，探尋屬於你的音樂寶藏 .ᐟ.ᐟ
    `
  const info = {
    dateStart: '2025/2/22 11:00',
    dateEnd: '2025/2/23 22:00',
    signupStart: '2024/11/05 12:00',
    signupEnd: '2025/02/21 23:59',
    city: '台中市',
    dist: '清水區',
    address: '鰲峰山運動公園',
  }
  const lineup = [
    `康士坦的變化球 ft. GIGO、怕胖團、拍謝少年、傷心欲絕、冰球樂團、ENTH (日本)、POT (日本)、溫蒂漫步、莉周她說、SHOOT UP、伯爵白、上山、桑尼、工口紳士`,
    `GEZEN(日本)、康先生、傻子與白痴、福夢、芒果醬、老破麻、hue、好大一把勇者劍、島嶼都市浪漫譚、郭子恆、NeaR Band 你阿伯`,
    `董事長樂團、The Chairman、JOYCE 就 以 斯、163braces、TORO(日本)、公館青少年、DIZLIKE、MAX'N(日本)、核果仁、GUJI 孤寂輔導室`,
  ]
  const articles = [
    {
      title: `✫ 浮現祭 EMERGE FEST 2025 ✫  
                藝人食堂介紹`,
      content: `暖心先暖胃！浮現祭藝人食堂店家大公開(っ˘ڡ˘ς)
                特搜台中、清水超強美食，網羅在地限定美味🥢
                 
                每次演出都是一場盛宴，音樂人們需要滿足的胃才能全力發揮！今年我們特別邀請了來自台中、清水的超強在地美食進駐浮現祭藝人食堂，希望能讓從全台、甚至亞洲各地遠道而來的音樂人們，在味蕾留下屬於清水的記憶，用舌尖感受來自清水的美味溫暖與飽足能量。

                難得來一趟清水，除了享受音樂，也不能放過任何美味😋
                快到這些店家一探究竟，跟你偶像品嘗同款餐點吧！
                一起解鎖屬於清水的味蕾驚喜 (๑ᵔ⤙ᵔ๑)👍`,
      images: [
        '浮現祭/1-1.jpg',
        '浮現祭/1-2.jpg',
        '浮現祭/1-3.jpg',
        '浮現祭/1-4.jpg',
        '浮現祭/1-5.jpg',
        '浮現祭/1-6.jpg',
      ],
    },
    {
      title: `✫ 浮現祭 EMERGE FEST 2025 ✫
                  第十七波陣容公開`,
      content: `━✪ 美秀集團
                   
                賽博台客，炫炮極樂，拜請電火王！
                中部集合，壓軸一刻，直攻鰲峰山！
                 
                ━✪ muque
                 
                〖 來自福岡的 muque
                是由Asakura(Vo&amp;Gt)、Kenichi(Gt)、Lenon(Ba)、takachi(Track
                make&amp;Dr)組成的四人樂團，團名融合了法語的「音樂
                (musique)」和日語的「無垢」，意指純粹無瑕、不受周圍環境影響，始終堅持創作自己喜愛之音樂的創作理念。
                 
                muque就像一股清新卻帶著鋒芒的音樂氣流，席捲日本音樂圈，急速上升的人氣讓他們在2025年《バズリズム02》的「今年這組一定紅！」榜單中奪下了冠軍。他們的音樂像一片不受外界雜音干擾的純淨土壤，充滿對音樂的真摯想像與實驗精神。或許你早已在社群平台上見過
                muque，簡單卻極具記憶點的音樂影片，就像一把無聲的種子，悄悄在腦海中生根發芽。〗
                 
                ━✪ KOLOR
                   
                〖
                KOLOR於2005年成立，以香港作為基地的流行搖滾樂隊，成員包括主唱
                Sammy、吉他手 Robin、貝斯手 Singz
                及鼓手Michael。KOLOR 由英文
                COLOR命名，代表各自對音樂不同的演繹，求生求變的為樂壇繪畫出專屬KOLOR色彩的樂章。
                 
                從出道開始KOLOR已備受關注並有著過人的人氣，更被譽為「BEYOND」接班人。多年來舉辦多場演出吸引破萬人次。今年，KOLOR
                邁向 20
                周年的里程碑，以全新的篇章再次出發，用音樂為這個時代塗上新的色彩。〗
                 
                ━✪ 擊沈女孩Destroyers
                  
                純正美式龐克，氣氛必熱！ 給我三十分鐘，現場必中！`,
      images: [
        '浮現祭/2-1.jpg',
        '浮現祭/2-2.jpg',
        '浮現祭/2-3.jpg',
        '浮現祭/2-4.jpg',
        '浮現祭/2-5.jpg',
        '浮現祭/2-6.jpg',
      ],
    },
    {
      title: `✫ 浮現祭 EMERGE FEST 2025 ✫ 
      敖犬舞台演出追加`,
      content: `敖犬舞台演出追加！日本音樂人與海線在地學子登入
      免費入場，歡迎大朋友小朋友一起來同樂🎵

      ✪ daisuke katayama
      兼具音樂人與手作地毯藝術家的身份，在日本積極展開多元創作活動。曾為日本動畫「寶可夢」、「火影忍者疾風傳」演唱主題曲。作為手作地毯藝術家，已在日本各地舉辦個展。2025年更將進軍台灣，挑戰在當地舉辦首次個展！

      ✪ 台中市海聲華德福學生弦樂合奏／親子校歌團
      自 105年成立以來，致力於在地化華德福教育，課程將藝術融入日常，透過音樂、戲劇、手工創作，激發孩子潛力。我們相信，每位孩子都是獨一無二的生命個體，應該按照自己的節奏成長、探索世界！

      這次演出，學生以弦樂合奏帶來「宮崎駿電影主題曲」，用悠揚樂聲展現純真想像力，並演奏 台灣民謠，傳遞對土地的深厚情感。親子校歌團則以〈海聲的呼喚〉唱出對大海與家園的熱愛，展現世代傳承的情感。邀請您一同感受這場音樂與教育交織的美好時刻！`,
      images: ['浮現祭/3-1.jpg', '浮現祭/3-2.jpg'],
    },
  ]
  // test data
  const coverImages = ['/浮現祭/main-1.jpg']
  const ticket = [
    { name: '冒險先知單人雙日票', amount: 2, price: 2466 },
    { name: '冒險旅人單人雙日票 ', amount: 2, price: 2666 },
    { name: '大冒險家單人雙日票', amount: 2, price: 2966 },
  ]

  // Info Switch
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  return (
    <div className="b-container">
      {/* 開發測試 */}
      {/* <pre>{JSON.stringify(acts, null, 2)}</pre> */}
      <HeroSection images={coverImages} />

      <main>
        <section className="b-main-info">
          <BreadCrumb breads={[act.category.name, act.genre.name, act.city, act.name]} />
          <Title _title={act.name} />
          <IntroCard
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(!isInfoOpen)}
            act={act}
          />
        </section>

        <div className="row g-5">
          <div className="col-12 col-xl-9 order-last order-xl-first">
            <article className="b-article-cards row g-0">
              {articles.map((art, i) => {
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
            <PurchaseAside ticket={ticket[0]} />
          </div>
        </div>

        <section className="b-other-act">
          <Title title="YOU MAY ALSO LIKE" subTitle="您可能也會喜歡" />

          <div className="b-act-list d-flex flex-column">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 gx-4 gy-5">
              {/* {acts.map((data) => {
                return <ActivityCardSm key={data.id} data={data} />
              })} */}
            </div>
            <button className="b-btn b-load-btn">瀏覽更多</button>
          </div>
        </section>
      </main>
    </div>
  )
}
