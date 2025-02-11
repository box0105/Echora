//套用全域樣式
import '@/styles/globals.scss'

import Header from './_components/header'

// 載入context
<<<<<<< HEAD
import { Providers } from './providers'
import Footer from './_components/footer'
=======
// import { Providers } from './providers'
>>>>>>> evelyn

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
<<<<<<< HEAD
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Footer />
          </Providers>
        </Suspense>
=======
        <Header />
        {children}
        {/* <Footer /> */}
>>>>>>> evelyn
      </body>

    </html>
  )
}
