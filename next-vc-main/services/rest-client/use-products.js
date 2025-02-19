import { useQuery } from './use-fetcher'
import { createContext, useContext, useState } from 'react'

// 預設搜尋條件
const defaultCriteria = {
  page: 1,
  perpage: 8,
  nameLike: '',
  brandIds: [],
  colorPids: [],
  colorIds: [],
  priceGte: 0,
  priceLte: 1000000,
  sort: 'price',
  order: 'DESC',
}

//使用CONTEXT記錄搜尋條件，勾子名稱為useProductState
// --start--
const ProductContext = createContext(null)
ProductContext.displayName = "ProductContext"

export function ProductProvider({children}){
  const [criteria, setCriteria] = useState(defaultCriteria)
return(
  <ProductContext.Provider value={{criteria, setCriteria, defaultCriteria}}>
    {children}
  </ProductContext.Provider>
)
}

export const useProductState = () => useContext(ProductContext)
// --end--


export const useGetBrands = () => {
  const { data, error, isloading } = useQuery(
    'http://localhost:3005/api/products/brands'
  )

  let brands = []
  if (data && data?.status === 'success') {
    brands = data?.data
  }

  return { brands, error, isloading }
}

export const useGetColors = () => {
  const { data, error, isloading } = useQuery(
    'http://localhost:3005/api/products/colors'
  )

  let colors = []
  if (data && data?.status === 'success') {
    colors = data?.data
  }

  return { colors, error, isloading }
}

export const useGetColorPalette = () => {
  const { data, error, isloading } = useQuery(
    'http://localhost:3005/api/products/colorpalette'
  )

  let colorpalette = []
  if (data && data?.status === 'success') {
    colorpalette = data?.data
  }

  return { colorpalette, error, isloading }
}
