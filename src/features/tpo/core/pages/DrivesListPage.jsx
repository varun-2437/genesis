import React, { useState } from 'react'
import { Calendar, Plus, MapPin, Users, CheckCircle2, Clock, ChevronRight } from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { Drawer } from '@/components/shared/Drawer'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { DRIVE_STATUS, DRIVE_TYPE, DEPARTMENTS } from '@/lib/constants'
import { DriveDetailView } from '../components/DriveDetailView'

export function DrivesListPage() {
  const { drives, companies, jobs, addDrive } = useTpoCoreStore()

  const [filters, setFilters] = useState({
    status: 'ALL',
    type: 'ALL',
  })
  const [selectedDrive, setSelectedDrive] = useState(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  // Drive Creation Form State
  const [formData, setFormData] = useState({
    name: '',
    companyId: companies[0]?.id || '',
    jobId: jobs[0]?.id || '',
    type: DRIVE_TYPE.ON_CAMPUS,
    status: DRIVE_STATUS.UPCOMING,
    startDate: '2026-11-12',
    endDate: '2026-11-15',
    venue: 'Campus Main Auditorium & Labs',
    pptDateTime: '2026-11-12T10:00:00',
    coordinatorName: 'Prof. Rajesh Khanna',
    coordinatorPhone: '+91 94443 21990',
  })

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    const comp = companies.find((c) => c.id === formData.companyId) || companies[0]
    const job = jobs.find((j) => j.id === formData.jobId) || jobs[0]

    addDrive({
      ...formData,
      companyName: comp.name,
      jobTitle: job.title,
      totalRounds: job.selectionRounds?.length || 4,
      currentRound: 'Stage 1: Pre-Placement Talk',
    })

    setIsCreateOpen(false)
  }

  // Filter Drives
  const filteredDrives = drives.filter((d) => {
    if (filters.status !== 'ALL' && d.status !== filters.status) return false
    if (filters.type !== 'ALL' && d.type !== filters.type) return false
    return true
  })

  // Table Columns
  const columns = [
    {
      accessorKey: 'name',
      header: 'Drive Name & Company',
      cell: ({ row }) => {
        const drv = row.original
        return (
          <div className="space-y-0.5">
            <button
              onClick={() => setSelectedDrive(drv)}
              className="font-semibold text-slate-900 hover:text-indigo-600 text-left transition-colors"
            >
              {drv.name}
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono text-slate-400">[{drv.driveCode}]</span>
              <span>•</span>
              <span className="font-medium text-slate-700">{drv.companyName}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Drive Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'type',
      header: 'Mode & Venue',
      cell: ({ row }) => {
        const drv = row.original
        return (
          <div className="text-xs space-y-0.5">
            <span className="font-semibold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
              {drv.type}
            </span>
            <p className="text-slate-500 flex items-center gap-1 text-[11px] mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" /> {drv.venue}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: 'startDate',
      header: 'Schedule',
      cell: ({ row }) => (
        <div className="text-xs text-slate-600">
          <p className="font-medium text-slate-900">{row.original.startDate}</p>
          <p className="text-[11px] text-slate-400">to {row.original.endDate}</p>
        </div>
      ),
    },
    {
      accessorKey: 'totalRegistered',
      header: 'Registered Candidates',
      cell: ({ row }) => (
        <div className="text-xs">
          <span className="font-bold text-slate-900">{row.original.totalRegistered}</span>
          <span className="text-slate-400 ml-1">students</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Operations',
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedDrive(row.original)}
          className="text-xs px-2.5 py-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
        >
          Execution Console
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" /> Placement Drives & Campus Visits
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Schedule on-campus, pooled, and virtual recruitment drives with logistics and coordinator tracking.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Schedule New Drive
        </Button>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={[
          {
            key: 'status',
            label: 'Drive Status',
            options: Object.values(DRIVE_STATUS),
          },
          {
            key: 'type',
            label: 'Drive Format',
            options: Object.values(DRIVE_TYPE),
          },
        ]}
        values={filters}
        onChange={setFilters}
        onReset={() => setFilters({ status: 'ALL', type: 'ALL' })}
      />

      {/* Data Table */}
      <DataTable
        data={filteredDrives}
        columns={columns}
        searchPlaceholder="Search drives by company, drive code or venue..."
        emptyMessage="No campus drives scheduled under current filters."
      />

      {/* 360 Drive Detail & Execution Console Drawer (T10) */}
      <Drawer
        isOpen={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
        title={selectedDrive?.name || 'Drive Execution'}
        subtitle={`Drive Code: ${selectedDrive?.driveCode} • ${selectedDrive?.companyName}`}
        size="lg"
      >
        {selectedDrive && <DriveDetailView drive={selectedDrive} />}
      </Drawer>

      {/* Create Drive Modal (T9) */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Schedule Recruitment Drive"
        subtitle="Configure campus visit dates, link job vacancies, venue logistics and assign faculty coordinators"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Drive Name / Title *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Amazon WOW Diversity Hiring Drive 2026"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Participating Company *</label>
              <select
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Associated Job Role *</label>
              <select
                value={formData.jobId}
                onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Drive Type / Mode</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                {Object.values(DRIVE_TYPE).map((t) => (
                  <option key={t} value={t}>
                    {t.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                {Object.values(DRIVE_STATUS).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Campus Venue & Logistics *</label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g. Auditorium Hall A & Computer Labs 3, 4"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Faculty Coordinator</label>
              <input
                type="text"
                value={formData.coordinatorName}
                onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
                placeholder="Faculty In-charge Name"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Coordinator Contact</label>
              <input
                type="text"
                value={formData.coordinatorPhone}
                onChange={(e) => setFormData({ ...formData, coordinatorPhone: e.target.value })}
                placeholder="+91 Phone"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Schedule Drive
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
