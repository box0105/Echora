'use client'
import { usePathname } from 'next/navigation'
import '@/styles/globals.scss'
import { Suspense } from 'react'
import { Providers } from './providers'
import Footer from './_components/footer'
import Header from './_components/header'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const noHeaderFooterPaths = [
    '/my-user',
    '/my-user/register',
    '/my-user/forget-password',
    '/my-user/forget-password-2p/reset',
  ]

  return (
    <html lang="en">
      <head>
        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script> */}
      </head>
      <body  className={pathname === '/' ? 'g-background' : ''}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
          {!noHeaderFooterPaths.includes(pathname) && !pathname.includes('admin')&& <Header />}
            <main style={{ minHeight: 'calc(100vh - 365px)' }}>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
            {!noHeaderFooterPaths.includes(pathname) && !pathname.includes('admin') && <Footer />}
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
