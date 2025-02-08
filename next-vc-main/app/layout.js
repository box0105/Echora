//套用全域樣式
import "@/styles/globals.scss"
// 載入context
// import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
