'use client'

import { useContext, createContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthGet } from '@/services/rest-client/use-user'
import { loginRoute, protectedRoutes } from '@/config'

// 建立Context
const AuthContext = createContext(null)

// 提供在全域綁定的context狀態
export const AuthProvider = ({ children }) => {
  const [didAuthMount, setDidAuthMount] = useState(false)
  const { user, favorites, isLoading } = useAuthGet()
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const pathname = usePathname()


  useEffect(() => {
    setDidAuthMount(true)
  }, [])

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    console.log("use-auth.js");
    
    // console.log({user}); 沒有回寫入
    if (userId) {
      setIsAuth(true)
    } else {
      setIsAuth(!!user?.id)
    }
  }, [user])

  useEffect(() => {
    if (!isAuth && didAuthMount) {
      if (protectedRoutes.includes(pathname)) {
        router.push(loginRoute)
      }
    }
  }, [pathname, isAuth, didAuthMount])

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        didAuthMount,
        isAuth,
        setIsAuth,
        user,
        favorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
