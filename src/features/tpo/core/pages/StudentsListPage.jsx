import React, { useState } from 'react'
import { 
  Users, 
  UploadCloud, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Download, 
  ExternalLink,
  GraduationCap,
  Award
} from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { Drawer } from '@/components/shared/Drawer'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { VERIFICATION_STATUS, DEPARTMENTS } from '@/lib/constants'
import { StudentProfile360View } from '../components/StudentProfile360View'

export function StudentsListPage() {
  const { students, importStudents, updateStudentVerification } = useTpoCoreStore()

  const [filters, setFilters] = useState({
    department: 'ALL',
    placementStatus: 'ALL',
    verificationStatus: 'ALL',
  })
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isErpImportOpen, setIsErpImportOpen] = useState(false)
  const [erpStatus, setErpStatus] = useState({ loading: false, preview: null, imported: false })

  // Filter Students
  const filteredStudents = students.filter((s) => {
    if (filters.department !== 'ALL' && s.department !== filters.department) return false
    if (filters.placementStatus !== 'ALL' && s.placementStatus !== filters.placementStatus) return false
    if (filters.verificationStatus !== 'ALL' && s.verificationStatus !== filters.verificationStatus) return false
    return true
  })

  // ERP Import Simulation Handler (M2.2, M25.15)
  const handleSimulateErpFetch = () => {
    setErpStatus({ loading: true, preview: null, imported: false })
    setTimeout(() => {
      setErpStatus({
        loading: false,
        imported: false,
        preview: [
          {
            id: 'stu-erp-1',
            registerNumber: '22CS210',
            name: 'Divya R',
            email: 'divya.22cs@college.edu',
            department: 'Computer Science and Engineering',
            programme: 'B.Tech',
            graduationYear: 2026,
            cgpa: 8.94,
            activeBacklogs: 0,
            historicalBacklogs: 0,
            placementStatus: 'UNPLACED',
            verificationStatus: VERIFICATION_STATUS.VERIFIED,
            offersCount: 0,
            skills: ['Java', 'Spring', 'React', 'Cloud'],
            resumeUrl: '/resumes/22cs210_divya.pdf',
            eligibleForDream: true,
          },
          {
            id: 'stu-erp-2',
            registerNumber: '22IT145',
            name: 'Manoj Kumar',
            email: 'manoj.22it@college.edu',
            department: 'Information Technology',
            programme: 'B.Tech',
            graduationYear: 2026,
            cgpa: 7.65,
            activeBacklogs: 0,
            historicalBacklogs: 0,
            placementStatus: 'UNPLACED',
            verificationStatus: VERIFICATION_STATUS.VERIFIED,
            offersCount: 0,
            skills: ['Python', 'SQL', 'Networking'],
            resumeUrl: '/resumes/22it145_manoj.pdf',
            eligibleForDream: true,
          },
        ],
      })
    }, 800)
  }

  const handleConfirmImport = () => {
    if (erpStatus.preview) {
      importStudents(erpStatus.preview)
      setErpStatus({ loading: false, preview: null, imported: true })
      setTimeout(() => {
        setIsErpImportOpen(false)
        setErpStatus({ loading: false, preview: null, imported: false })
      }, 1000)
    }
  }

  // Columns for DataTable
  const columns = [
    {
      accessorKey: 'name',
      header: 'Student Name & Reg No.',
      cell: ({ row }) => {
        const stu = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
              {stu.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <button
                onClick={() => setSelectedStudent(stu)}
                className="font-semibold text-slate-900 hover:text-indigo-600 text-left transition-colors"
              >
                {stu.name}
              </button>
              <p className="text-xs font-mono text-slate-400 mt-0.5">{stu.registerNumber}</p>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'department',
      header: 'Department',
      cell: ({ row }) => (
        <span className="text-xs text-slate-700 font-medium truncate max-w-[200px] block">
          {row.original.department}
        </span>
      ),
    },
    {
      accessorKey: 'cgpa',
      header: 'Academics',
      cell: ({ row }) => {
        const stu = row.original
        return (
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-slate-900">{stu.cgpa} CGPA</span>
            <p className="text-[11px] text-slate-500">
              {stu.activeBacklogs > 0 ? (
                <span className="text-rose-600 font-semibold">{stu.activeBacklogs} Backlogs</span>
              ) : (
                <span className="text-emerald-600">0 Backlogs</span>
              )}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: 'placementStatus',
      header: 'Placement Status',
      cell: ({ row }) => {
        const isPlaced = row.original.placementStatus === 'PLACED'
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
              isPlaced
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {row.original.placementStatus}
          </span>
        )
      },
    },
    {
      accessorKey: 'verificationStatus',
      header: 'Verification',
      cell: ({ row }) => <StatusBadge status={row.original.verificationStatus} />,
    },
    {
      accessorKey: 'offersCount',
      header: 'Offers',
      cell: ({ row }) => {
        const stu = row.original
        return stu.offersCount > 0 ? (
          <div className="text-xs">
            <span className="font-bold text-emerald-700">{stu.offersCount} Offer</span>
            <p className="text-[11px] text-slate-400">{stu.currentOfferCompany}</p>
          </div>
        ) : (
          <span className="text-xs text-slate-400 font-normal">None</span>
        )
      },
    },
    {
      id: 'actions',
      header: 'Profile Actions',
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedStudent(row.original)}
          className="text-xs px-2.5 py-1"
        >
          360° View
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
            <Users className="w-6 h-6 text-indigo-600" /> Students Placement Registry
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse candidate database, check academic eligibility, synchronize records with college ERP.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsErpImportOpen(true)}
            className="text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50 gap-2"
          >
            <UploadCloud className="w-4 h-4" /> Import from ERP
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={[
          {
            key: 'department',
            label: 'Department',
            options: DEPARTMENTS.map((d) => ({ label: d, value: d })),
          },
          {
            key: 'placementStatus',
            label: 'Placement Status',
            options: ['UNPLACED', 'PLACED'],
          },
          {
            key: 'verificationStatus',
            label: 'Verification Status',
            options: Object.values(VERIFICATION_STATUS),
          },
        ]}
        values={filters}
        onChange={setFilters}
        onReset={() =>
          setFilters({ department: 'ALL', placementStatus: 'ALL', verificationStatus: 'ALL' })
        }
      />

      {/* Data Table */}
      <DataTable
        data={filteredStudents}
        columns={columns}
        searchPlaceholder="Search by student name, register number or skills..."
        emptyMessage="No students match the current filters."
      />

      {/* 360 Student Profile Drawer (T3) */}
      <Drawer
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent?.name || 'Student Profile'}
        subtitle={`Register No: ${selectedStudent?.registerNumber} • ${selectedStudent?.department}`}
        size="lg"
      >
        {selectedStudent && (
          <StudentProfile360View
            student={selectedStudent}
            onUpdateVerification={(status) => {
              updateStudentVerification(selectedStudent.id, status)
              setSelectedStudent((prev) => ({ ...prev, verificationStatus: status }))
            }}
          />
        )}
      </Drawer>

      {/* ERP Synchronization Modal (M2.2, M25.15) */}
      <Modal
        isOpen={isErpImportOpen}
        onClose={() => setIsErpImportOpen(false)}
        title="Synchronize Student Data from ERP"
        subtitle="Live automated pull of semester grades, arrears, and registration records"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Integration Source: College Autonomous ERP
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pulls active graduating batches with official CGPA, arrears clearance status, and department rosters.
              Records are reconciled and duplicate entries are automatically ignored.
            </p>
          </div>

          {!erpStatus.preview && !erpStatus.imported && (
            <div className="text-center py-6">
              <Button
                onClick={handleSimulateErpFetch}
                disabled={erpStatus.loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm text-xs"
              >
                <UploadCloud className="w-4 h-4" />
                {erpStatus.loading ? 'Querying Campus ERP API...' : 'Fetch & Validate ERP Records'}
              </Button>
            </div>
          )}

          {erpStatus.preview && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-700">
                Found {erpStatus.preview.length} New Unregistered Records:
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {erpStatus.preview.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{rec.name}</p>
                      <p className="font-mono text-[11px] text-slate-500">{rec.registerNumber} • {rec.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-700">{rec.cgpa} CGPA</p>
                      <p className="text-[11px] text-slate-400">0 Backlogs</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <Button variant="outline" onClick={() => setIsErpImportOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmImport} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                  Confirm & Sync into Placement Registry
                </Button>
              </div>
            </div>
          )}

          {erpStatus.imported && (
            <div className="p-6 text-center text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600" />
              <p className="text-sm font-bold">Successfully Synchronized Records</p>
              <p className="text-xs text-emerald-600">All student profiles have been imported into Genesis.</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
