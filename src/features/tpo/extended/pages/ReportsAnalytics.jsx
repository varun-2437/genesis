import React, { useState } from 'react'
import {
  BarChart3,
  Download,
  Calendar,
  Layers,
  Award,
  Users,
  Briefcase,
  TrendingUp,
  FileSpreadsheet,
  FileCheck,
  CheckCircle,
  ExternalLink
} from 'lucide-react'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

// Mock Analytics Datasets
const PLACEMENT_TRENDS = [
  { name: '2022', placed: 82, totalEligible: 95, averageCTC: 8.4 },
  { name: '2023', placed: 89, totalEligible: 98, averageCTC: 10.2 },
  { name: '2024', placed: 91, totalEligible: 100, averageCTC: 11.8 },
  { name: '2025', placed: 94, totalEligible: 102, averageCTC: 13.5 },
  { name: '2026 (Curr)', placed: 78, totalEligible: 88, averageCTC: 15.2 }
]

const DEPARTMENT_COMPARISON = [
  { name: 'CSE', registered: 210, eligible: 198, placed: 182, avgLpa: 17.4 },
  { name: 'IT', registered: 140, eligible: 132, placed: 118, avgLpa: 14.8 },
  { name: 'ECE', registered: 180, eligible: 165, placed: 134, avgLpa: 12.2 },
  { name: 'EEE', registered: 110, eligible: 96, placed: 68, avgLpa: 9.6 },
  { name: 'MECH', registered: 150, eligible: 128, placed: 84, avgLpa: 8.5 },
  { name: 'CIVIL', registered: 90, eligible: 74, placed: 42, avgLpa: 7.2 }
]

const SALARY_TIER_DATA = [
  { name: 'Super Dream (>25 LPA)', value: 42, color: '#6366f1' },
  { name: 'Dream (15-25 LPA)', value: 118, color: '#3b82f6' },
  { name: 'Core (8-15 LPA)', value: 240, color: '#10b981' },
  { name: 'Standard (4-8 LPA)', value: 228, color: '#f59e0b' }
]

const NIRF_COMPLIANCE_SUMMARY = [
  { metric: 'Graduating Batch Strength', value: '880 Candidates', target: 'N/A', status: 'Verified' },
  { metric: 'Median Salary of Placed Graduates', value: 'INR 11.5 LPA', target: 'INR 10.0 LPA', status: 'Compliant' },
  { metric: 'Graduates Selected for Higher Studies', value: '64 Students', target: '50 Students', status: 'Verified' },
  { metric: 'Overall Placement Percentage', value: '88.6%', target: '85.0%', status: 'Exceeds Goal' }
]

export function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState('overview')
  const [academicYear, setAcademicYear] = useState('2025-2026')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T30</span>
            <h1 className="text-2xl font-bold text-slate-900">Reports, NIRF & Placement Analytics</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Standardised institutional reports, department-wise breakdowns, salary distributions, and NIRF/NAAC compliant data.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select 
              value={academicYear} 
              onChange={(e) => setAcademicYear(e.target.value)}
              className="bg-transparent focus:outline-none"
            >
              <option value="2025-2026">AY 2025-2026 (Active)</option>
              <option value="2024-2025">AY 2024-2025</option>
              <option value="2023-2024">AY 2023-2024</option>
            </select>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export Excel
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download NIRF PDF
          </Button>
        </div>
      </div>

      {/* Primary KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Placement Conversion"
          value="88.6%"
          icon={TrendingUp}
          change="+4.2% vs last year"
          trend="up"
        />
        <StatCard
          title="Highest CTC Package"
          value="INR 58.0 LPA"
          icon={Award}
          change="Atlassian India"
          trend="up"
        />
        <StatCard
          title="Median Salary (NIRF)"
          value="INR 11.5 LPA"
          icon={Briefcase}
          change="+1.5 LPA YoY"
          trend="up"
        />
        <StatCard
          title="Total Offers Rolled Out"
          value="628 Offers"
          icon={Users}
          change="488 Unique Placed"
          trend="neutral"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Performance Overview
        </button>
        <button
          onClick={() => setActiveTab('departments')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'departments' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Department-Wise Breakdown
        </button>
        <button
          onClick={() => setActiveTab('nirf')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'nirf' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          NAAC / NBA & NIRF Compliance (Table 18.18)
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartCard
                title="Year-on-Year Placement Progress & CTC Growth"
                subtitle="Placement rates (%) and average CTC package (LPA)"
                type="area"
                data={PLACEMENT_TRENDS}
                dataKeys={[
                  { key: 'placed', name: 'Placement Rate (%)', color: '#6366f1' },
                  { key: 'averageCTC', name: 'Average CTC (LPA)', color: '#10b981' }
                ]}
                height={320}
              />
            </div>
            <div>
              <ChartCard
                title="Salary Tier Distribution"
                subtitle="Offers categorised by package bracket"
                type="pie"
                data={SALARY_TIER_DATA}
                dataKeys={[{ key: 'value', name: 'Offers' }]}
                height={320}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Departments */}
      {activeTab === 'departments' && (
        <div className="space-y-6">
          <ChartCard
            title="Department Placement & Average Package Comparison"
            subtitle="Comparing eligible candidates, placed count and average salary (LPA)"
            type="bar"
            data={DEPARTMENT_COMPARISON}
            dataKeys={[
              { key: 'eligible', name: 'Eligible Students', color: '#94a3b8' },
              { key: 'placed', name: 'Students Placed', color: '#6366f1' },
              { key: 'avgLpa', name: 'Avg CTC (LPA)', color: '#10b981' }
            ]}
            height={340}
          />

          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">Department Placement Summary Sheet</h3>
              <Button size="sm" variant="outline" className="text-xs">Download Department Matrix</Button>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Registered</th>
                  <th className="py-3 px-4">Eligible</th>
                  <th className="py-3 px-4">Placed</th>
                  <th className="py-3 px-4">Placement %</th>
                  <th className="py-3 px-4">Average Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {DEPARTMENT_COMPARISON.map((dept) => {
                  const pct = Math.round((dept.placed / dept.eligible) * 100)
                  return (
                    <tr key={dept.name} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-800">{dept.name}</td>
                      <td className="py-3 px-4">{dept.registered}</td>
                      <td className="py-3 px-4">{dept.eligible}</td>
                      <td className="py-3 px-4 font-medium text-emerald-600">{dept.placed}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-900">{pct}%</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-indigo-600">{dept.avgLpa} LPA</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: NIRF / NAAC Compliance */}
      {activeTab === 'nirf' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">National Institutional Ranking Framework (NIRF) Dataset</h3>
                <p className="text-xs text-slate-500 mt-0.5">Parameters formatted per NIRF Higher Education Placement Audit standards.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Ready for Submission
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {NIRF_COMPLIANCE_SUMMARY.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">{item.metric}</span>
                  <span className="text-lg font-bold text-slate-800 block mt-1">{item.value}</span>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                    <span className="text-slate-500">Benchmark: {item.target}</span>
                    <span className="font-semibold text-emerald-600">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
