//套用全域樣式
import '@/styles/globals.scss'


import { Suspense } from 'react'


// 載入context
import { Providers } from './providers'
import Footer from './_components/footer'
import Header from './_components/header'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Footer />
          </Providers>
        </Suspense>
      </body>

    </html>
  )
}
