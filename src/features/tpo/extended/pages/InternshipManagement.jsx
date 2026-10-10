import React, { useState } from 'react'
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Building,
  Award,
  Search,
  Filter,
  Download,
  Eye,
  Plus
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const INITIAL_INTERNSHIPS = [
  {
    id: 'INT-401',
    studentName: 'Aarav Sharma',
    rollNo: '21CS042',
    department: 'CSE',
    company: 'Microsoft India',
    supervisor: 'Rohit Kulkarni (Senior Staff Eng)',
    facultyMentor: 'Prof. S. Natarajan',
    duration: '6 Months (Jan - Jun 2027)',
    stipend: 'INR 1,25,000 / month',
    status: 'Ongoing',
    ppoConversion: 'High Probability (PPO Review Scheduled)',
    reportsSubmitted: '4/6 Monthly Logs'
  },
  {
    id: 'INT-402',
    studentName: 'Ananya Iyer',
    rollNo: '21IT019',
    department: 'IT',
    company: 'Goldman Sachs',
    supervisor: 'Sneha Chawla (VP Engineering)',
    facultyMentor: 'Dr. V. Ramanathan',
    duration: '2 Months Summer',
    stipend: 'INR 1,00,000 / month',
    status: 'Completed',
    ppoConversion: 'Converted to Full-Time (PPO Issued)',
    reportsSubmitted: '2/2 Monthly Logs'
  },
  {
    id: 'INT-403',
    studentName: 'Rohan Gupta',
    rollNo: '21EC088',
    department: 'ECE',
    company: 'Texas Instruments',
    supervisor: 'Manish Verma (Design Manager)',
    facultyMentor: 'Dr. M. Swaminathan',
    duration: '6 Months',
    stipend: 'INR 65,000 / month',
    status: 'Completed',
    ppoConversion: 'Converted to Full-Time (PPO Issued)',
    reportsSubmitted: '6/6 Monthly Logs'
  },
  {
    id: 'INT-404',
    studentName: 'Sneha Patel',
    rollNo: '21ME031',
    department: 'MECH',
    company: 'Tata Motors R&D',
    supervisor: 'Sunil Deshmukh (Powertrain Lead)',
    facultyMentor: 'Dr. P. Sundaram',
    duration: '6 Months',
    stipend: 'INR 35,000 / month',
    status: 'Ongoing',
    ppoConversion: 'Under Evaluation',
    reportsSubmitted: '3/6 Monthly Logs'
  }
]

export function InternshipManagement() {
  const [internships, setInternships] = useState(INITIAL_INTERNSHIPS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = internships.filter(i => {
    const matchesSearch =
      i.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T20</span>
            <h1 className="text-2xl font-bold text-slate-900">Internship & PPO Conversion Management</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track industry internships (13.1), company supervisors, faculty mentorship logs, attendance, and pre-placement offer conversions (13.15).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" className="flex items-center gap-2 text-xs">
            <Download className="w-4 h-4" />
            Export Internship Dossier
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Internships"
          value={internships.length}
          icon={Briefcase}
          change="AY 2026-2027 Cohort"
          trend="up"
        />
        <StatCard
          title="PPO Conversion Rate"
          value="72.4%"
          icon={Award}
          change="+8.2% vs previous year"
          trend="up"
        />
        <StatCard
          title="Highest Monthly Stipend"
          value="INR 1.25 L"
          icon={Building}
          change="Microsoft India"
          trend="up"
        />
        <StatCard
          title="Faculty Mentorship Coverage"
          value="100%"
          icon={Users}
          change="All interns mapped"
          trend="neutral"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student, roll number, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs text-slate-500">
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Company & Supervisor</th>
                <th className="py-3 px-4">Faculty Mentor</th>
                <th className="py-3 px-4">Duration & Stipend</th>
                <th className="py-3 px-4">PPO Outcome Status</th>
                <th className="py-3 px-4">Logs</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{item.studentName}</div>
                    <div className="text-[11px] text-slate-400">{item.rollNo} • {item.department}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{item.company}</div>
                    <div className="text-[11px] text-slate-500">{item.supervisor}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {item.facultyMentor}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-emerald-600">{item.stipend}</div>
                    <div className="text-[11px] text-slate-400">{item.duration}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-indigo-700">
                    {item.ppoConversion}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {item.reportsSubmitted}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
