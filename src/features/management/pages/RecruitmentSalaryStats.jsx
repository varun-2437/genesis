import React, { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  Award,
  Building,
  BarChart,
  Download,
  Filter,
  CheckCircle,
  Briefcase
} from 'lucide-react'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

const SALARY_HISTOGRAM = [
  { range: '3 - 6 LPA', count: 184 },
  { range: '6 - 10 LPA', count: 215 },
  { range: '10 - 15 LPA', count: 142 },
  { range: '15 - 25 LPA', count: 96 },
  { range: '25 - 40 LPA', count: 52 },
  { range: '40+ LPA', count: 18 }
]

const TOP_RECRUITERS_SALARY = [
  { company: 'Atlassian', highestCTC: '58.0 LPA', avgCTC: '58.0 LPA', offers: 4, tier: 'Super Dream' },
  { company: 'Microsoft', highestCTC: '44.5 LPA', avgCTC: '42.0 LPA', offers: 16, tier: 'Super Dream' },
  { company: 'Goldman Sachs', highestCTC: '32.0 LPA', avgCTC: '30.5 LPA', offers: 12, tier: 'Super Dream' },
  { company: 'Amazon', highestCTC: '30.0 LPA', avgCTC: '24.0 LPA', offers: 22, tier: 'Super Dream' },
  { company: 'Texas Instruments', highestCTC: '26.8 LPA', avgCTC: '25.0 LPA', offers: 8, tier: 'Super Dream' },
  { company: 'Cisco Systems', highestCTC: '21.0 LPA', avgCTC: '18.5 LPA', offers: 24, tier: 'Dream' },
  { company: 'Oracle', highestCTC: '19.5 LPA', avgCTC: '17.0 LPA', offers: 19, tier: 'Dream' }
]

export function RecruitmentSalaryStats() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Management M3</span>
            <h1 className="text-2xl font-bold text-slate-900">Recruitment & Salary Statistics</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Package frequency distributions, percentile analytics (Highest, Average, Median, Mode), and recruiter-wise hiring outcomes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <Download className="w-4 h-4 text-emerald-600" />
            Export Salary Distribution (CSV)
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Highest Package Released"
          value="INR 58.0 LPA"
          icon={Award}
          change="Atlassian India"
          trend="up"
        />
        <StatCard
          title="Average Campus CTC"
          value="INR 13.8 LPA"
          icon={TrendingUp}
          change="+1.8 LPA YoY"
          trend="up"
        />
        <StatCard
          title="Median Package (NIRF)"
          value="INR 11.5 LPA"
          icon={DollarSign}
          change="Statutory median baseline"
          trend="up"
        />
        <StatCard
          title="Super Dream Offers (&gt;25 LPA)"
          value="72 Offers"
          icon={Briefcase}
          change="11.4% of total offers"
          trend="up"
        />
      </div>

      {/* Salary Distribution Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="CTC Frequency Distribution (Number of Offers by Package Range)"
            subtitle="Histogram of campus offer packages across all graduating streams"
            type="bar"
            data={SALARY_HISTOGRAM}
            dataKeys={[
              { key: 'count', name: 'Offers in Range', color: '#6366f1' }
            ]}
            xAxisKey="range"
            height={320}
          />
        </div>
        <div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Key Percentile Benchmarks</h3>
              <p className="text-xs text-slate-500 mt-0.5">Statistical package thresholds</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">95th Percentile</span>
                <span className="font-bold text-indigo-600 text-sm">INR 32.5 LPA</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">75th Percentile</span>
                <span className="font-bold text-slate-800 text-sm">INR 18.0 LPA</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">50th Percentile (Median)</span>
                <span className="font-bold text-emerald-600 text-sm">INR 11.5 LPA</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">25th Percentile</span>
                <span className="font-bold text-slate-700 text-sm">INR 7.5 LPA</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
              *Calculated against 628 validated offer letters logged in T21 module.
            </div>
          </div>
        </div>
      </div>

      {/* Top Recruiters Package Matrix */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-slate-400" />
            Top Corporate Employers by Package & Offer Volume (18.8)
          </h3>
          <span className="text-xs text-slate-400">AY 2025-2026 Registry</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Company Name</th>
              <th className="py-3 px-4">Recruitment Category</th>
              <th className="py-3 px-4">Max CTC Released</th>
              <th className="py-3 px-4">Average CTC</th>
              <th className="py-3 px-4 text-right">Offers Released</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {TOP_RECRUITERS_SALARY.map((rec) => (
              <tr key={rec.company} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-semibold text-slate-900">{rec.company}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rec.tier === 'Super Dream' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {rec.tier}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-600">{rec.highestCTC}</td>
                <td className="py-3.5 px-4 font-medium text-indigo-600">{rec.avgCTC}</td>
                <td className="py-3.5 px-4 text-right font-bold text-slate-800">{rec.offers} Candidates</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
