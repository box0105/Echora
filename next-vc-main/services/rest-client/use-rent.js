import { useQuery } from './use-fetcher'
import { createContext, useContext, useState } from 'react'


//products
// 預設搜尋條件
const defaultRent = {
  // page: 1,
  // perpage: 8,
  nameLike: '',
  rentBrandIds: [],  // 租赁品牌的ID
  rentAddressIds: [],  // 租赁地点的ID（例如租赁商店）
  rentLevelIds: [],    // 租赁产品的等级（基础版、高级版等）
  colorIds: [],        // 产品颜色ID
  sort: 'price',
  order: 'ASC',
}

//使用CONTEXT記錄搜尋條件與產品卡第一個產品的product_sku_id，勾子名稱為useProductState
// --start--
const RentContext = createContext(null)
RentContext.displayName = "RentContext"

export function RentProvider({children}){
  const [query, setQuery] = useState(defaultRent)
  const [firstSkuId, setFirstSkuId] = useState('')
return(
  <RentContext.Provider value={{query, setQuery, defaultRent, firstSkuId, setFirstSkuId}}>
    {children}
  </RentContext.Provider>
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


