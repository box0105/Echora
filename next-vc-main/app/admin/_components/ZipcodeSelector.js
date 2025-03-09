'use client'

import React, { useEffect } from 'react'

// https://marsz.tw/blog/articles/411
export default function ZipcodeSelector() {
  useEffect(() => {
    // 先載入 jQuery
    const jqueryScript = document.createElement('script')
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
    jqueryScript.async = true
    document.body.appendChild(jqueryScript)

    jqueryScript.onload = () => {
      // 再載入 zipcode-selector.js
      const script = document.createElement('script')
      script.src = 'https://demeter.5fpro.com/tw/zipcode-selector.js'
      script.async = true
      document.body.appendChild(script)
    }

    return () => {
      document.body.removeChild(jqueryScript)
    }
  }, [])

  return null
}
