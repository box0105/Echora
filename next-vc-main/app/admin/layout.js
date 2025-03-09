'use client'

import React from 'react'
import AdminPanel from './_components/AdminPanel'
import './_styles/admin.scss'
import './../activity/_styles/act.scss'

export default function AdminLayout({ children }) {
  return (
    <div className="container-fluid b-admin">
      <div className="row px-2 py-3">
        <AdminPanel />
        <main className="col-md-10 px-0 ps-md-2">{children}</main>
      </div>
    </div>
  )
}
