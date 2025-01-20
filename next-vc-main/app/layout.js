import { Suspense } from 'react'

// 載入context
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
