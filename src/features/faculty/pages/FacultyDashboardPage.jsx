import React from 'react'
import { Link } from 'react-router-dom'
import { 
  GraduationCap, 
  Users, 
  Award, 
  ArrowRight, 
  AlertTriangle, 
  FileSpreadsheet
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
    <div className="space-y-6">
      {/* Header Banner - Restrained Enterprise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">{department} Department Operations</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Coordinator: {hodName} · Graduating Batch 2026 Telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/faculty/reports">
            <Button variant="secondary" size="sm">
              <FileSpreadsheet size={14} strokeWidth={1.75} /> NIRF Department Report
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Cohort"
          value={totalStudents.toString()}
          subtitle={`${placedStudents} placed (${placementRate}%)`}
          icon={GraduationCap}
        />
        <StatCard
          label="Average Package"
          value={`INR ${avgPackageLPA} LPA`}
          subtitle={`Highest: INR ${highestPackageLPA} LPA`}
          icon={Award}
        />
        <StatCard
          label="At-Risk Students"
          value={atRiskStudents.toString()}
          subtitle="Requires technical remedial"
          icon={AlertTriangle}
        />
        <StatCard
          label="Pending NOCs"
          value={pendingInternships.toString()}
          subtitle="Internship sign-offs needed"
          icon={Users}
        />
      </div>

      {/* Two Columns: Readiness & Internships */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readiness Overview */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
            <div>
              <h2 className="text-[14px] font-semibold text-fg">Student Skill Readiness Radar</h2>
              <p className="text-xs text-fg-muted mt-0.5">Mock assessments and technical preparation</p>
            </div>
            <Link to="/faculty/readiness" className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
              Readiness Hub <ArrowRight size={13} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="divide-y divide-line text-xs">
            {studentsReadiness.slice(0, 4).map((item) => (
              <div key={item.id} className="p-3.5 flex items-center justify-between hover:bg-surface-2/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-fg">{item.name}</span>
                    <span className="font-mono text-[11px] text-fg-muted">[{item.regNo}]</span>
                  </div>
                  <p className="text-fg-muted mt-0.5">CGPA: {item.cgpa} · Readiness: {item.readinessScore}%</p>
                </div>
                <span className={`badge ${
                  item.status === 'READY' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Internships */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
            <div>
              <h2 className="text-[14px] font-semibold text-fg">Internship Clearances (NOC)</h2>
              <p className="text-xs text-fg-muted mt-0.5">Corporate internships pending approval</p>
            </div>
            <Link to="/faculty/internships" className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
              Approvals <ArrowRight size={13} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="divide-y divide-line text-xs">
            {internships.map((intern) => (
              <div key={intern.id} className="p-3.5 flex items-center justify-between hover:bg-surface-2/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-fg">{intern.studentName}</span>
                    <span className="text-fg-muted">({intern.company})</span>
                  </div>
                  <p className="text-fg-muted mt-0.5">{intern.role} · Stipend: INR {intern.stipend} · {intern.duration}</p>
                </div>
                <span className={`badge ${
                  intern.status === 'APPROVED' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'
                }`}>
                  {intern.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
