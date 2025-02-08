import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <h1 id="%E7%AF%84%E4%BE%8B">範例</h1>
      <h2 id="%E9%83%A8%E8%90%BD%E6%A0%BC">部落格</h2>
      <ul>
        <li>
          <Link href="/blog">部落格列表</Link>
        </li>
      </ul>
      <h2 id="%E8%B3%BC%E7%89%A9%E8%BB%8A">購物車</h2>
      <ul>
        <li>
          <Link href="/cart">購物車範例</Link>
        </li>
        <li>
          <Link href="/cart/coupon">購物車-折價券</Link>
        </li>
      </ul>
      <h2 id="%E7%B6%A0%E7%95%8Cecpay%E9%87%91%E6%B5%81">綠界(ECPay)金流</h2>
      <ul>
        <li>
          <Link href="/ecpay">綠界金流</Link>
        </li>
      </ul>
      <h2 id="%E6%88%91%E7%9A%84%E6%9C%80%E6%84%9B">我的最愛</h2>
      <ul>
        <li>
          <Link href="/fav">我的最愛範例</Link>
        </li>
      </ul>
      <h2 id="line-pay%E9%87%91%E6%B5%81">Line Pay金流</h2>
      <ul>
        <li>
          <Link href="/line-pay">Line Pay金流</Link>
        </li>
      </ul>
      <h2 id="%E8%BC%89%E5%85%A5%E5%8B%95%E7%95%AB">載入動畫</h2>
      <ul>
        <li>
          <Link href="/loader">手動載入用</Link>
        </li>
        <li>
          <Link href="/loader/placeholder">與佔位符配合用</Link>
        </li>
      </ul>
      <h2 id="%E5%95%86%E5%93%81%E6%90%9C%E5%B0%8B%E9%81%8E%E6%BF%BE%E5%88%86%E9%A0%81">
        商品搜尋過濾/分頁
      </h2>
      <ul>
        <li>
          <Link href="/product-no-db">無連接後端與資料庫</Link>
        </li>
        <li>
          <Link href="/product-fetch/list">只使用fetch</Link>
        </li>
        <li>
          <Link href="/product/list">一般列表-useSWR</Link>
        </li>
        <li>
          <Link href="/product/list-loadmore">載入更多列表-useSWR</Link>
        </li>
        <li>
          <Link href="/product/list-is">捲動載入列表-useSWR</Link>
        </li>
      </ul>
      <h2 id="7-11-%E9%81%8B%E9%80%81%E5%95%86%E5%BA%97%E9%81%B8%E6%93%87">
        7-11 運送商店選擇
      </h2>
      <ul>
        <li>
          <Link href="/ship">運送商店選擇</Link>
        </li>
      </ul>
      <h2 id="%E6%9C%83%E5%93%A1%E7%9B%B8%E9%97%9C">會員相關</h2>
      <ul>
        <li>
          <Link href="/user">會員登入/註冊/修改資料/忘記密碼</Link>
        </li>
        <li>
          <Link href="/user/google-login">Google登入整合</Link>
        </li>
        <li>
          <Link href="/user/line-login">Line登入整合</Link>
        </li>
        <li>
          <Link href="/user/forget-password">忘記密碼OTP單頁式</Link>
        </li>
        <li>
          <Link href="/user/forget-password-2p">忘記密碼OTP二頁式</Link>
        </li>
      </ul>
    </>
  )
}
