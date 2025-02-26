'use client'

// 載入購物車context
import { MyCartProvider } from '@/hooks/use-cart'
//  載入認証用context
import { AuthProvider } from '@/hooks/use-auth'
//  載入商品搜尋條件context
import { ProductProvider } from '@/services/rest-client/use-product'
//  載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'
// 自訂用載入動畫元件
import { CatLoader } from '@/hooks/use-loader/components'
//
import { MyCouponProvider } from '@/hooks/use-coupon'

// 載入swr-devtools使用
import { SWRDevTools } from 'swr-devtools'

export function Providers({ children }) {
  return (
    <SWRDevTools>
      <LoaderProvider close={2} CustomLoader={CatLoader}>
        <MyCouponProvider>
        <AuthProvider>
          <MyCartProvider>
            <ProductProvider>{children}</ProductProvider>
          </MyCartProvider>
        </AuthProvider>
        </MyCouponProvider>
      </LoaderProvider>
    </SWRDevTools>
  )
}
