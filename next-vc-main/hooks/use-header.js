import { createContext, useContext, useState, useEffect, useRef } from 'react'

const HeaderContext = createContext(null)
HeaderContext.displayName = 'HeaderContext'

export function HeaderProvider({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef(null)

  // 監聽 header 高度變化
  const updateHeaderHeight = () => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateHeaderHeight)
    updateHeaderHeight() // 初始化時測量 header 高度

    // 組件卸載(unmount): 當 HeaderProvider 被移除時 (例如切換頁面)：
    // 移除 resize 事件監聽器，防止 記憶體洩漏 (memory leak) 或 不必要的事件觸發
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [])
  return (
  <HeaderContext.Provider value={ {headerHeight, headerRef} }>
  {children}
  </HeaderContext.Provider>
  )
}

export const useHeaderHeight = () => useContext(HeaderContext)
