import React, { useState } from 'react'
import { Briefcase, Plus, CheckCircle2, PauseCircle, XCircle, ArrowUpRight, Users, Calendar } from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { JOB_STATUS } from '@/lib/constants'
import { JobCreateModal } from '../components/JobCreateModal'

export function JobsListPage() {
  const { jobs, updateJobStatus } = useTpoCoreStore()

  const [filters, setFilters] = useState({
    status: 'ALL',
    workMode: 'ALL',
  })
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  // Filter Jobs
  const filteredJobs = jobs.filter((j) => {
    if (filters.status !== 'ALL' && j.status !== filters.status) return false
    if (filters.workMode !== 'ALL' && j.workMode !== filters.workMode) return false
    return true
  })

  // Table Columns
  const columns = [
    {
      accessorKey: 'title',
      header: 'Job Role & Company',
      cell: ({ row }) => {
        const job = row.original
        return (
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer">
              {job.title}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">{job.companyName}</span>
              <span>•</span>
              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[11px]">
                {job.jobType}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'totalCtcLPA',
      header: 'CTC Package',
      cell: ({ row }) => (
        <div>
          <span className="text-sm font-bold text-slate-900">₹{row.original.totalCtcLPA} LPA</span>
          <p className="text-[11px] text-slate-400">
            Fixed: ₹{row.original.ctcFixedLPA} + Var: ₹{row.original.ctcVariableLPA}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'minCgpa',
      header: 'Eligibility Criteria',
      cell: ({ row }) => {
        const job = row.original
        return (
          <div className="text-xs space-y-0.5">
            <p className="font-medium text-slate-800">Min CGPA: {job.minCgpa}</p>
            <p className="text-slate-500 text-[11px]">Max Arrears: {job.maxBacklogs}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'vacancies',
      header: 'Openings',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
          {row.original.vacancies} vacancies
        </span>
      ),
    },
    {
      accessorKey: 'applicantsCount',
      header: 'Applicants',
      cell: ({ row }) => (
        <div className="text-xs">
          <span className="font-bold text-slate-900">{row.original.applicantsCount}</span>
          <span className="text-slate-400 ml-1">applied</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Workflow Actions',
      cell: ({ row }) => {
        const job = row.original
        return (
          <div className="flex items-center gap-1.5">
            {job.status === JOB_STATUS.PENDING_APPROVAL && (
              <Button
                size="sm"
                onClick={() => updateJobStatus(job.id, JOB_STATUS.PUBLISHED)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1"
              >
                Approve & Publish
              </Button>
            )}

            {job.status === JOB_STATUS.PUBLISHED && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateJobStatus(job.id, JOB_STATUS.PAUSED)}
                className="text-amber-600 border-amber-200 hover:bg-amber-50 text-xs px-2.5 py-1"
              >
                Pause
              </Button>
            )}

            {job.status === JOB_STATUS.PAUSED && (
              <Button
                size="sm"
                onClick={() => updateJobStatus(job.id, JOB_STATUS.PUBLISHED)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2.5 py-1"
              >
                Resume
              </Button>
            )}

            {job.status !== JOB_STATUS.CLOSED && (
              <button
                onClick={() => updateJobStatus(job.id, JOB_STATUS.CLOSED)}
                className="text-xs text-slate-400 hover:text-rose-600 px-1.5 py-1 rounded transition-colors"
                title="Close Job Applications"
              >
                Close
              </button>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" /> Placement Job Postings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and publish campus job opportunities, configure selection rounds and manage deadlines.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </Button>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={[
          {
            key: 'status',
            label: 'Job Status',
            options: Object.values(JOB_STATUS),
          },
          {
            key: 'workMode',
            label: 'Work Mode',
            options: ['On-site', 'Hybrid', 'Remote'],
          },
        ]}
        values={filters}
        onChange={setFilters}
        onReset={() => setFilters({ status: 'ALL', workMode: 'ALL' })}
      />

      {/* Data Table */}
      <DataTable
        data={filteredJobs}
        columns={columns}
        searchPlaceholder="Search jobs by title, company name or skills..."
        emptyMessage="No job vacancies match the specified filters."
      />

      {/* Post New Job Wizard Modal (T8) */}
      <JobCreateModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  )
}
