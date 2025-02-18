'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/act.scss'
import '../_styles/act-detail.scss'
import '../_styles/act-font.scss'

import HeroSection from '../_components/HeroSection'
import BreadCrumb from '../_components/BreadCrumb'
import Title from '../_components/Title'
import IntroCard from '../_components/IntroCard'
import ArticleCard from '../_components/ArticleCard'

export default function DetailPage() {
  const searchParams = useSearchParams()
  const activityId = searchParams?.get('id')
  console.log(activityId)

  // test data
  const coverImages = ['/浮現祭/main-1.jpg']
  const articleImages = ['浮現祭/1-1.jpg', '浮現祭/1-2.jpg']
  const breadcrumb = ['音樂祭', '流行音樂', '台中市', '浮現祭']
  const intro = `
    ❝ 浮現祭，一場名為冒險的音樂祭。 ❞
      <br /><br />
      ▎記憶
      總有一個只有好朋友
      才知曉的秘密基地
      <br />
      ▎夢境
      總有一座只有你自己
      創造的夢幻遊樂園
      <br /><br />
      ✪ 藏寶的秘密基地・華麗變身 ✨  
      <br />  
      ✪ 搖滾冒險遊樂園・熱鬧開張 🎢
      <br /><br />
      這些年來，踏入浮現祭的樂團和樂迷朋友們，不論是化身為發掘新聲音的音樂遊俠、來海線擴充好料圖鑑的美食獵人，還是漫遊在小鎮街道巷弄裡的探險家，每個人在浮現祭裡都有屬於自己的冒險故事集，一個無法被取代的回憶存檔。
      <br /><br />
      2025年，浮現祭將變身為「搖滾冒險遊樂園」!
      <br /><br />
      在這裡，你會遇見更多世界各地直送的新鮮音樂；<br />解鎖更多尚未被味蕾收錄的海線美食；<br />發掘更多小鎮文化秘境；<br />探索更多驚奇的限定跨域合作，更多更多超乎想像的驚喜，正等你收藏。
      <br /><br />
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

  // Info Switch
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  return (
    <div className="b-container">
      <HeroSection images={coverImages} />

      <main>
        <section className="b-main-info">
          <BreadCrumb breads={breadcrumb} />
          <Title title="浮現祭" subTitle=", EMERGE FEST 2025" />
          <IntroCard
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(!isInfoOpen)}
            intro={intro}
            info={info}
            lineup={lineup}
          />
        </section>
        <div className="row g-5">
          {/* article */}
          <div className="col order-last order-xl-first">
            <article className="b-article-card row g-0">
              <ArticleCard images={articleImages} />
              {/* article2 */}
              <div className="col-12">
                <div className="card">
                  <div className="row g-0">
                    {/* card-image */}
                    <div className="col-12 col-xl-6 order-first order-xl-last">
                      <Image
                        className="object-fit-cover w-100 h-100"
                        src={'./../images/activity/浮現祭/2-3.jpg'}
                        alt={'浮現祭'}
                        width={500}
                        height={300}
                      />
                    </div>
                    {/* card-body */}
                    <div className="col-12 col-xl-6 order-last order-xl-first">
                      <div className="card-body d-flex flex-column p-4">
                        <div className="b-text d-flex flex-column pt-2">
                          <h2 className="card-title mb-4 text-center">
                            ✫ 浮現祭 EMERGE FEST 2025 ✫
                            <br /> 第十七波陣容公開
                          </h2>
                          <h5 className="card-text">
                            ━✪ 美秀集團
                            <br />
                            <br />
                            賽博台客，炫炮極樂，拜請電火王！
                            中部集合，壓軸一刻，直攻鰲峰山！
                            <br />
                            <br />
                            ━✪ muque
                            <br />
                            <br />
                            〖 來自福岡的 muque
                            是由Asakura(Vo&amp;Gt)、Kenichi(Gt)、Lenon(Ba)、takachi(Track
                            make&amp;Dr)組成的四人樂團，團名融合了法語的「音樂
                            (musique)」和日語的「無垢」，意指純粹無瑕、不受周圍環境影響，始終堅持創作自己喜愛之音樂的創作理念。
                            <br />
                            <br />
                            muque
                            就像一股清新卻帶著鋒芒的音樂氣流，席捲日本音樂圈，急速上升的人氣讓他們在2025年《バズリズム02》的「今年這組一定紅！」榜單中奪下了冠軍。他們的音樂像一片不受外界雜音干擾的純淨土壤，充滿對音樂的真摯想像與實驗精神。或許你早已在社群平台上見過
                            muque，簡單卻極具記憶點的音樂影片，就像一把無聲的種子，悄悄在腦海中生根發芽。〗
                            <br />
                            <br />
                            ━✪ KOLOR
                            <br />
                            <br />
                            〖
                            KOLOR於2005年成立，以香港作為基地的流行搖滾樂隊，成員包括主唱
                            Sammy、吉他手 Robin、貝斯手 Singz
                            及鼓手Michael。KOLOR 由英文
                            COLOR命名，代表各自對音樂不同的演繹，求生求變的為樂壇繪畫出專屬KOLOR色彩的樂章。
                            <br />
                            從出道開始KOLOR已備受關注並有著過人的人氣，更被譽為「BEYOND」接班人。多年來舉辦多場演出吸引破萬人次。今年，KOLOR
                            邁向 20
                            周年的里程碑，以全新的篇章再次出發，用音樂為這個時代塗上新的色彩。〗
                            <br />
                            <br />
                            ━✪ 擊沈女孩Destroyers
                            <br />
                            <br />
                            純正美式龐克，氣氛必熱！ 給我三十分鐘，現場必中！
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          {/* aside */}
          <div className="col-12 col-xl-auto order-first order-xl-last">
            <aside className="b-aside">
              <h3 className="mb-4">購買門票</h3>
              <div className="b-price h3 pb-3">NT$ 1,000 / 人</div>
              <div className="b-amount row gx-4">
                <div className="col-auto d-flex align-items-center">
                  <h4 className="mb-0">數量</h4>
                </div>
                <div className="col-auto">
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={1}
                    name="ticket_price"
                    min={1}
                    max={50}
                    step={1}
                    required
                  />
                </div>
              </div>
              <div className="b-purchaseBtn b-btn b-load-btn w-100">
                購買門票
              </div>
              <div className="b-warning mt-5">
                <h3 className="mt-4 mb-3">注意事項</h3>
                <ul className="ps-3">
                  <li>全區站席。</li>
                  <li>每筆訂單最多購買 4 張票券。</li>
                  <li>各票種數量皆有限，售完為止。</li>
                  <li>一人一票、憑票現場兌換手環入場，遺失恕不補發。</li>
                  <li>
                    如遇不可抗力因素，本活動將公布變動，詳細活動內容及未盡事宜請洽浮現祭臉書粉絲專頁。
                  </li>
                  <li>所有票種皆為雙日入場資格，越早購買價格越優惠！</li>
                  <li>
                    每位身心障礙人士含陪同者僅限購最多 2
                    張愛心票，必要陪同者需同時入場，
                    進場時敬請攜帶有效證件，未帶證件、資格不符者、或非本人者需補票價差額始得入場。
                    身心障礙者與陪同者須同時憑同一身心障礙證明驗證進場。
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* 其他活動 */}
        <section className="b-other-act">
          {/* title */}
          <div className="b-title d-flex align-items-baseline pb-0">
            <div className="h1">YOU MAY ALSO LIKE</div>
            <h4>/ 您可能也會喜歡</h4>
          </div>
          {/* act list */}
          <div className="b-act-list d-flex flex-column">
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 gx-4 gy-5">
              {/* act */}
              <div className="col">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-4 col-xl-3">
                      <Image
                        className="object-fit-cover w-100 h-100"
                        src="../../images/activity/共生音樂節/main-1.jpeg"
                        alt={'共生音樂節'}
                        width={500}
                        height={300}
                      />
                    </div>
                    <div className="col-8 col-xl-9">
                      <div className="card-body d-flex flex-column">
                        <div className="b-text d-flex flex-column">
                          <h2 className="card-title">
                            <a href="true">
                              裂變景觀 jonCates 與 Jason Cole Mager雙人展
                              Two-person show
                            </a>
                          </h2>
                          <div className="h5">日期 : 114/01/05 ~ 114/03/02</div>
                          <h5 className="card-text b-tag">流行音樂</h5>
                          <h6 className="card-text ">票價 : 免費入場</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="b-btn b-load-btn">瀏覽更多</button>
          </div>
        </section>
      </main>
    </div>
  )
}
