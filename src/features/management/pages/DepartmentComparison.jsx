import React, { useState } from 'react'
import {
  Layers,
  BarChart2,
  TrendingUp,
  Download,
  Users,
  Award,
  Filter,
  CheckCircle,
  ArrowUpDown
} from 'lucide-react'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

const DEPT_PERFORMANCE_METRICS = [
  { name: 'Computer Science', registered: 210, eligible: 198, placed: 182, placementPct: 91.9, avgCTC: 17.4, medianCTC: 14.5, superDreamOffers: 34 },
  { name: 'Information Tech', registered: 140, eligible: 132, placed: 118, placementPct: 89.4, avgCTC: 14.8, medianCTC: 12.0, superDreamOffers: 18 },
  { name: 'Electronics & Comm', registered: 180, eligible: 165, placed: 134, placementPct: 81.2, avgCTC: 12.2, medianCTC: 10.0, superDreamOffers: 12 },
  { name: 'Electrical Engg', registered: 110, eligible: 96, placed: 68, placementPct: 70.8, avgCTC: 9.6, medianCTC: 8.2, superDreamOffers: 4 },
  { name: 'Mechanical Engg', registered: 150, eligible: 128, placed: 84, placementPct: 65.6, avgCTC: 8.5, medianCTC: 7.5, superDreamOffers: 3 },
  { name: 'Civil Engg', registered: 90, eligible: 74, placed: 42, placementPct: 56.8, avgCTC: 7.2, medianCTC: 6.0, superDreamOffers: 1 }
]

export function DepartmentComparison() {
  const [metricSort, setMetricSort] = useState('placementPct')

  const sortedDepts = [...DEPT_PERFORMANCE_METRICS].sort((a, b) => b[metricSort] - a[metricSort])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Management M2</span>
            <h1 className="text-2xl font-bold text-slate-900">Department & Programme Comparison</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Comparative institutional evaluation across engineering disciplines: placement ratios, package variances, and super-dream conversions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <Download className="w-4 h-4 text-emerald-600" />
            Export Comparative Matrix
          </Button>
        </div>
      </div>

      {/* High-Level Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Leading Department"
          value="CSE (91.9%)"
          icon={Award}
          change="Highest overall conversion"
          trend="up"
        />
        <StatCard
          title="Campus Wide Average CTC"
          value="INR 13.8 LPA"
          icon={TrendingUp}
          change="+14.2% vs previous cohort"
          trend="up"
        />
        <StatCard
          title="Super Dream Offers (>25 LPA)"
          value="72 Total"
          icon={Layers}
          change="Distributed across 6 depts"
          trend="up"
        />
        <StatCard
          title="Total Registered Cohort"
          value="880 Students"
          icon={Users}
          change="AY 2025-2026 Batch"
          trend="neutral"
        />
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Comparative Placement Conversion by Department (%)"
          subtitle="Percentage of eligible candidates placed across branches"
          type="bar"
          data={DEPT_PERFORMANCE_METRICS}
          dataKeys={[
            { key: 'placementPct', name: 'Placement %', color: '#6366f1' }
          ]}
          xAxisKey="name"
          height={320}
        />

        <ChartCard
          title="Average vs Median CTC Package by Department (LPA)"
          subtitle="Comparison of mean salary vs median salary benchmarks"
          type="bar"
          data={DEPT_PERFORMANCE_METRICS}
          dataKeys={[
            { key: 'avgCTC', name: 'Average CTC (LPA)', color: '#10b981' },
            { key: 'medianCTC', name: 'Median CTC (LPA)', color: '#3b82f6' }
          ]}
          xAxisKey="name"
          height={320}
        />
      </div>

      {/* Detailed Side-by-Side Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Department Performance League Table</h3>
            <p className="text-xs text-slate-400">Section 1.11 & 18.7 Multi-discipline analysis</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Sort By:</span>
            <select
              value={metricSort}
              onChange={(e) => setMetricSort(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700"
            >
              <option value="placementPct">Placement % (Highest First)</option>
              <option value="avgCTC">Average CTC</option>
              <option value="superDreamOffers">Super Dream Offers</option>
              <option value="placed">Total Placed</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Department / Programme</th>
              <th className="py-3 px-4">Registered</th>
              <th className="py-3 px-4">Eligible</th>
              <th className="py-3 px-4">Placed</th>
              <th className="py-3 px-4">Placement %</th>
              <th className="py-3 px-4">Avg CTC</th>
              <th className="py-3 px-4">Median CTC</th>
              <th className="py-3 px-4 text-right">Super Dream (&gt;25 LPA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {sortedDepts.map((d) => (
              <tr key={d.name} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-semibold text-slate-900">{d.name}</td>
                <td className="py-3.5 px-4">{d.registered}</td>
                <td className="py-3.5 px-4">{d.eligible}</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-600">{d.placed}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{d.placementPct}%</span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${d.placementPct}%` }} />
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-indigo-600">{d.avgCTC} LPA</td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{d.medianCTC} LPA</td>
                <td className="py-3.5 px-4 text-right font-bold text-purple-600">{d.superDreamOffers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
