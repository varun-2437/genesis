import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Select, Button, StatusBadge, Tabs } from '@/components/ui'
import { Search, MapPin, Building2, Briefcase, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

export const MOCK_JOBS = [
  {
    id: 'job-1',
    title: 'Associate Cloud Engineer',
    company: 'Google Cloud India',
    location: 'Bengaluru / Hyderabad',
    type: 'Full-Time',
    category: 'Super Dream (Tier 1)',
    ctc: '₹ 18.0 LPA',
    base: '₹ 15.0 LPA + Stocks',
    minCgpa: 8.0,
    backlogsAllowed: 0,
    deadline: 'Tonight, 11:59 PM',
    eligibility: { eligible: true, reasons: [] },
    description: 'Work with scalable Kubernetes infra, distributed systems, and real-time enterprise GCP clients.',
    rounds: ['Online Aptitude & Coding', 'Technical Interview 1', 'Technical Interview 2', 'HR & Culture Fit'],
  },
  {
    id: 'job-2',
    title: 'Software Developer 1',
    company: 'Oracle Corporation',
    location: 'Bengaluru / Pune',
    type: 'Full-Time',
    category: 'Dream (Tier 2)',
    ctc: '₹ 14.5 LPA',
    base: '₹ 12.0 LPA',
    minCgpa: 7.5,
    backlogsAllowed: 0,
    deadline: 'Oct 16, 2026',
    eligibility: { eligible: true, reasons: [] },
    description: 'Core backend engineering for Oracle Cloud Infrastructure (OCI) and database clustering systems.',
    rounds: ['Online Coding Test', 'Technical System Design', 'HR Round'],
  },
  {
    id: 'job-3',
    title: 'Full Stack Engineering Intern',
    company: 'Microsoft India',
    location: 'Hyderabad',
    type: 'Internship',
    category: 'Super Dream (Tier 1)',
    ctc: '₹ 80,000 / month',
    base: 'PPO Conversion Opportunity',
    minCgpa: 8.5,
    backlogsAllowed: 0,
    deadline: 'Oct 20, 2026',
    eligibility: { eligible: true, reasons: [] },
    description: '6-month intensive winter/summer engineering internship with Microsoft Azure Developer Experience teams.',
    rounds: ['Coding Assessment', 'DSA Problem Solving (2 Rounds)', 'Managerial'],
  },
  {
    id: 'job-4',
    title: 'Quantitative Systems Analyst',
    company: 'Goldman Sachs',
    location: 'Bengaluru',
    type: 'Full-Time',
    category: 'Super Dream (Tier 1)',
    ctc: '₹ 24.0 LPA',
    base: '₹ 20.0 LPA',
    minCgpa: 9.0,
    backlogsAllowed: 0,
    deadline: 'Oct 25, 2026',
    eligibility: { eligible: false, reasons: ['Requires minimum 9.0 CGPA (Current: 8.82)'] },
    description: 'Algorithmic trading platforms, low-latency execution systems, and financial risk simulations.',
    rounds: ['Math/Quant Assessment', 'Advanced Algorithms Round', 'Partner Interview'],
  },
]

export function JobBrowsePage() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')

  const filteredJobs = MOCK_JOBS.filter((job) => {
    if (activeTab === 'fulltime' && job.type !== 'Full-Time') return false
    if (activeTab === 'internship' && job.type !== 'Internship') return false
    if (categoryFilter !== 'ALL' && !job.category.includes(categoryFilter)) return false
    if (search && !job.title.toLowerCase().includes(search.toLowerCase()) && !job.company.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campus Jobs & Opportunities</h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified company job profiles, live eligibility evaluation, and drive deadlines.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'all', label: 'All Openings', badge: MOCK_JOBS.length },
          { id: 'fulltime', label: 'Full-Time Roles' },
          { id: 'internship', label: 'Internships' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role, company name, or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Categories</option>
            <option value="Super Dream">Super Dream (&gt;15 LPA)</option>
            <option value="Dream">Dream (8 - 15 LPA)</option>
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-indigo-300 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {job.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{job.title}</h3>
                  <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-slate-900">{job.ctc}</p>
                  <p className="text-[11px] text-slate-400">{job.type}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Deadline: {job.deadline}
                </span>
              </div>
            </div>

            {/* Eligibility & CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {job.eligibility.eligible ? (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Eligible to Apply
                </span>
              ) : (
                <span className="text-xs font-semibold text-rose-600 flex items-center gap-1" title={job.eligibility.reasons.join(', ')}>
                  <XCircle className="w-4 h-4" /> Ineligible (CGPA &lt; 9.0)
                </span>
              )}

              <Link to={`/student/jobs/${job.id}`}>
                <Button size="sm" className="text-xs flex items-center gap-1.5">
                  View & Apply <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
