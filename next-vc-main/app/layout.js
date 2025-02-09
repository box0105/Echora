//套用全域樣式
import '@/styles/globals.scss'

import Header from './_components/header'

// 載入context
// import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
