import React, { useState } from 'react'
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { StatusBadge, Button, Modal, FileUploader } from '@/components/ui'
import { DownloadCloud, Upload, UserCheck, Eye, Search, AlertCircle, FileSpreadsheet } from 'lucide-react'
import { Link } from 'react-router-dom'

export function TpoStudentsListPage() {
  const [importModal, setImportModal] = useState(false)
  const [students, setStudents] = useState([
    {
      id: '21CS104',
      name: 'Varun Murugesh',
      dept: 'CSE',
      degree: 'B.Tech',
      cgpa: 8.82,
      backlogs: 0,
      placementStatus: 'UNPLACED',
      verificationStatus: 'VERIFIED',
      eligibleDrives: 4,
    },
    {
      id: '21CS088',
      name: 'Pooja Iyer',
      dept: 'CSE',
      degree: 'B.Tech',
      cgpa: 9.15,
      backlogs: 0,
      placementStatus: 'PLACED',
      verificationStatus: 'VERIFIED',
      eligibleDrives: 6,
    },
    {
      id: '21IT045',
      name: 'Karthik Raja',
      dept: 'IT',
      degree: 'B.Tech',
      cgpa: 7.42,
      backlogs: 1,
      placementStatus: 'UNPLACED',
      verificationStatus: 'REQUIRES_UPDATE',
      eligibleDrives: 1,
    },
    {
      id: '21EC024',
      name: 'Ananya Sharma',
      dept: 'ECE',
      degree: 'B.Tech',
      cgpa: 8.54,
      backlogs: 0,
      placementStatus: 'PLACED',
      verificationStatus: 'VERIFIED',
      eligibleDrives: 3,
    },
  ])

  const columns = [
    {
      accessorKey: 'id',
      header: 'Roll / Reg No',
      cell: ({ row }) => (
        <span className="font-mono font-bold text-indigo-600">{row.original.id}</span>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Student Name',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-900">{row.original.name}</p>
          <p className="text-[11px] text-slate-400">{row.original.dept} · {row.original.degree}</p>
        </div>
      ),
    },
    {
      accessorKey: 'cgpa',
      header: 'CGPA / Arrears',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-slate-800">{row.original.cgpa}</span>
          <span className="text-[11px] text-slate-400 block">
            {row.original.backlogs === 0 ? '0 Backlogs' : `${row.original.backlogs} Active Backlog`}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'verificationStatus',
      header: 'TPO Verification',
      cell: ({ row }) => <StatusBadge status={row.original.verificationStatus} />,
    },
    {
      accessorKey: 'placementStatus',
      header: 'Placement Status',
      cell: ({ row }) => (
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
          row.original.placementStatus === 'PLACED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
        }`}>
          {row.original.placementStatus}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '360° Profile',
      cell: ({ row }) => (
        <Link to={`/tpo/students/${row.original.id}`}>
          <Button size="sm" variant="secondary" className="text-xs flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> View 360°
          </Button>
        </Link>
      ),
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Student Placement Roster (T2)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse registered students, reconcile academic scores with ERP, and track eligibility across departments.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setImportModal(true)}
            className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 border-indigo-200"
          >
            <DownloadCloud className="w-4 h-4" /> Import from University ERP (M2.2, 25.15)
          </Button>
          <Button size="sm" className="text-xs flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4" /> Export CSV (M18.20)
          </Button>
        </div>
      </div>

      <FilterBar
        departments={['CSE', 'ECE', 'EEE', 'Mech', 'Civil', 'IT', 'AI & DS']}
        statuses={['VERIFIED', 'REQUIRES_UPDATE', 'PENDING']}
      />

      <DataTable
        data={students}
        columns={columns}
        searchPlaceholder="Search student name, roll number, or department..."
      />

      <Modal
        isOpen={importModal}
        onClose={() => setImportModal(false)}
        title="Import & Reconcile Students from University ERP"
        description="Pulls authenticated CGPA, active backlogs, and graduation years directly from the COE Oracle DB."
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setImportModal(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setImportModal(false); alert('ERP Sync Complete: 1,240 students verified with 0 duplicates!') }}>
              Start ERP Reconciliation
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 space-y-1">
            <p className="font-bold">ERP Integration Pipeline (M25.15):</p>
            <p>Database: <strong>COE-STUDENT-PROD-2026</strong> · Duplicate Detection: Active · CGPA Sync: Automatic</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Academic Department</label>
            <select className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none">
              <option>All Engineering & Technology Departments</option>
              <option>Computer Science and Engineering</option>
              <option>Electronics and Communication</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
