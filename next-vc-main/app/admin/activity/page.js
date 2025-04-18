'use client'

import DataTable from '../_components/DataTable'
import TitleSearch from '../_components/TitleSearch'
// import FilterPanel from '../_components/FilterPanel'

export default function AdminActivity() {
  return (
    <div className="container-fluid">
      <div className="heading row justify-content-between align-items-center mb-4">
        <TitleSearch />
      </div>

      <div className="b-sm-none b-filter-card card p-4 shadow-sm">
        <></>
      </div>

      <div className="card mt-4 shadow-sm">
        <DataTable />
      </div>
    </div>
  )
}
