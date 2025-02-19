import { createContext, useContext, useState } from 'react'

export const useGetBrands = async () => {
  try {
    const res = await fetch('http://localhost:3005/api/products/brands')
    const data = await res.json()
  } catch (err) {
    console.log(err)
  }

  const brands = data.data
  return brands
}

export const useGetColors = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/products/colors')
      const data = await res.json()
    } catch (err) {
      console.log(err)
    }
  
    const colors = data.data
    return colors
  }

  export const useGetColorPaltte = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/products/colorpalette')
      const data = await res.json()
    } catch (err) {
      console.log(err)
    }
  
    const colorPalette = data.data
    return colorPalette
  }
