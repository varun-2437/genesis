import React from 'react'
import { Link } from 'react-router-dom'
import { 
  GraduationCap, 
  Users, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  FileSpreadsheet,
  BookOpen
} from 'lucide-react'
import { useFacultyStore } from '../facultyStore'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

export function FacultyDashboardPage() {
  const { 
    department, 
    hodName, 
    totalStudents, 
    placedStudents, 
    avgPackageLPA, 
    highestPackageLPA,
    studentsReadiness,
    internships 
  } = useFacultyStore()

  const placementRate = Math.round((placedStudents / totalStudents) * 100)
  const pendingInternships = internships.filter((i) => i.status === 'PENDING_APPROVAL').length
  const atRiskStudents = studentsReadiness.filter((s) => s.status === 'NEEDS_REMEDIAL').length

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl text-white shadow-sm">
        <div>
          <span className="px-2.5 py-1 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full text-xs font-semibold uppercase tracking-wider">
            Department Portal
          </span>
          <h1 className="text-2xl font-bold mt-2 tracking-tight">
            {department} Placement Cell
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Head of Department: {hodName} • Academic Year 2025-2026 Graduating Batch
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/faculty/reports">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs gap-1.5 shadow-sm">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Department NIRF Report
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Cohort Placement Rate"
          value={`${placementRate}%`}
          subtitle={`${placedStudents} of ${totalStudents} Students Placed`}
          trend={12}
          icon={TrendingUp}
        />
        <StatCard
          title="Average Department CTC"
          value={`₹ ${avgPackageLPA} LPA`}
          subtitle="Top: ₹ 44.0 LPA"
          icon={Award}
        />
        <StatCard
          title="At-Risk Remedial Cohort"
          value={atRiskStudents.toString()}
          subtitle="Requires faculty intervention"
          icon={AlertTriangle}
        />
        <StatCard
          title="Pending Internship NOCs"
          value={pendingInternships.toString()}
          subtitle="Student applications to review"
          icon={BookOpen}
        />
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readiness Snapshot */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" /> Student Placement Readiness Radar
            </h3>
            <Link to="/faculty/readiness" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
              View all students <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {studentsReadiness.map((stu) => (
              <div
                key={stu.id}
                className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{stu.name}</span>
                    <span className="font-mono text-xs text-slate-400">[{stu.registerNumber}]</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    CGPA: <strong>{stu.cgpa}</strong> • Backlogs: <strong>{stu.activeBacklogs}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      stu.status === 'HIGH_READINESS'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : stu.status === 'NEEDS_REMEDIAL'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    Readiness: {stu.readinessScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Internship NOC Review */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Industry Internship NOC Approvals
            </h3>
            <Link to="/faculty/internships" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
              Manage Internships <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {internships.map((intItem) => (
              <div
                key={intItem.id}
                className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{intItem.studentName}</span>
                    <span className="font-mono text-xs text-slate-400">[{intItem.registerNumber}]</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {intItem.company} • Stipend: {intItem.stipend}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                    intItem.status === 'APPROVED'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {intItem.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
