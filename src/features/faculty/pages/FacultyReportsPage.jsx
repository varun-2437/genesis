import React from 'react'
import { FileSpreadsheet, Download, Award, TrendingUp, Users, Building2 } from 'lucide-react'
import { useFacultyStore } from '../facultyStore'
import { Button } from '@/components/ui/Button'

export function FacultyReportsPage() {
  const { department, totalStudents, placedStudents, avgPackageLPA, highestPackageLPA } = useFacultyStore()
  const placementRate = Math.round((placedStudents / totalStudents) * 100)

  const downloadReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Department,Total Cohort,Placed Count,Placement Rate %,Avg Package LPA,Highest Package LPA\n' +
      `"${department}",${totalStudents},${placedStudents},${placementRate}%,${avgPackageLPA},${highestPackageLPA}\n`
    const encoded = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encoded)
    link.setAttribute('download', `Department_Placement_NIRF_Report_${new Date().getFullYear()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-indigo-600" /> Department Reports & Accreditation (NIRF / NBA)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Official department-level placement data formatted for annual NIRF, NBA, and NAAC accreditation filings.
          </p>
        </div>

        <Button
          onClick={downloadReport}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm text-xs"
        >
          <Download className="w-4 h-4" /> Export Accreditation CSV
        </Button>
      </div>

      {/* Metrics Summary Card */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-6">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
          {department} – Official Placement Summary
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase">Graduating Batch</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalStudents}</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl">
            <p className="text-xs text-emerald-700 font-semibold uppercase">Verified Placed</p>
            <p className="text-2xl font-extrabold text-emerald-800 mt-1">{placedStudents}</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl">
            <p className="text-xs text-indigo-700 font-semibold uppercase">Placement %</p>
            <p className="text-2xl font-extrabold text-indigo-800 mt-1">{placementRate}%</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl">
            <p className="text-xs text-amber-700 font-semibold uppercase">Median / Avg CTC</p>
            <p className="text-2xl font-extrabold text-amber-800 mt-1">₹{avgPackageLPA} LPA</p>
          </div>
        </div>
      </div>
    </div>
  )
}
