'use client'

// 載入購物車context
import { MyCartProvider } from '@/hooks/use-cart'
//  載入認証用context
import { AuthProvider } from '@/hooks/use-auth'
//  載入商品搜尋條件context
import { ProductProvider } from '@/services/rest-client/use-products'
// 載入活動 context
import { ActivityProvider } from '@/hooks/use-activity'
//  載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'
// 自訂用載入動畫元件
import { CatLoader } from '@/hooks/use-loader/components'
// 載入優惠券context
import { MyCouponProvider } from '@/hooks/use-coupon'
// 載入管理員context
import { AdminAuthProvider } from '@/hooks/use-admin'

// 載入swr-devtools使用
import { SWRDevTools } from 'swr-devtools'
import { UserProvider } from '@/hooks/use-profile'

// 載入header height context
import { HeaderProvider } from '@/hooks/use-header'

export function Providers({ children }) {
  return (
    <SWRDevTools>
      <LoaderProvider close={2} CustomLoader={CatLoader}>
        <HeaderProvider>
          <MyCouponProvider>
            <AuthProvider>
              <UserProvider>
                <AdminAuthProvider>
                  <MyCartProvider>
                    <ActivityProvider>
                      <ProductProvider>{children}</ProductProvider>
                    </ActivityProvider>
                  </MyCartProvider>
                </AdminAuthProvider>
              </UserProvider>
            </AuthProvider>
          </MyCouponProvider>
        </HeaderProvider>
      </LoaderProvider>
    </SWRDevTools>
  )
}
