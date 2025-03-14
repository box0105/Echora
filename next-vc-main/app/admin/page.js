'use client'

import React from 'react'
import TitleSearch from './_components/TitleSearch'

export default function AdminPage() {
  return (
    <div className="container-fluid">
      <div className="heading row justify-content-between align-items-center mb-4">
        <TitleSearch title="後台管理系統" />
      </div>
    </div>
  )
}
