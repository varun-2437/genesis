import React, { useState } from 'react'
import {
  CreditCard,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  PieChart,
  FileText,
  AlertCircle,
  Check,
  X
} from 'lucide-react'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const BUDGET_BREAKDOWN = [
  { name: 'External Trainers & Bootcamps', allocated: 450000, utilized: 380000, balance: 70000 },
  { name: 'Online Assessment Platforms', allocated: 250000, utilized: 210000, balance: 40000 },
  { name: 'Hospitality & Recruiter Travel', allocated: 200000, utilized: 145000, balance: 55000 },
  { name: 'Job Fairs & Venue Logistics', allocated: 180000, utilized: 120000, balance: 60000 },
  { name: 'Marketing & Student Materials', allocated: 70000, utilized: 45000, balance: 25000 }
]

const EXPENSE_APPROVAL_QUEUE = [
  {
    id: 'EXP-104',
    title: 'CodeNation DSA Final Bootcamp Invoice (Batch 2027)',
    category: 'Trainer / Consultant Payments (27.4)',
    amount: 'INR 1,20,000',
    vendor: 'CodeNation Learning Solutions Pvt Ltd',
    submittedBy: 'Training Lead',
    date: '2026-10-08',
    status: 'Pending Executive Sign-off',
    hasInvoice: true
  },
  {
    id: 'EXP-105',
    title: 'Executive Recruiter Transit & Hotel Accommodation',
    category: 'Travel and Accommodation (27.6)',
    amount: 'INR 48,500',
    vendor: 'Radisson Blu Corporate Booking',
    submittedBy: 'TPO Logistics Officer',
    date: '2026-10-09',
    status: 'Pending Executive Sign-off',
    hasInvoice: true
  },
  {
    id: 'EXP-106',
    title: 'Campus Drive Audio/Visual & Lab Equipment Hire',
    category: 'Logistics & Infrastructure (27.5)',
    amount: 'INR 28,000',
    vendor: 'Apex AV Rentals',
    submittedBy: 'Infrastructure Coordinator',
    date: '2026-10-07',
    status: 'Approved',
    hasInvoice: true
  }
]

export function BudgetExpenditure() {
  const [expenses, setExpenses] = useState(EXPENSE_APPROVAL_QUEUE)

  const handleApprove = (id) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'Approved' } : e))
  }

  const handleReject = (id) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'Rejected' } : e))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Management M4</span>
            <h1 className="text-2xl font-bold text-slate-900">Placement Budget & Training Expenditure</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Oversee placement cell annual expenditures (Section 27.1–27.12), vendor invoices, trainer compensations, and sign off high-value expenses.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Sanctioned Cell Budget"
          value="INR 11.50 Lakhs"
          icon={CreditCard}
          change="AY 2025-2026 Allocation"
          trend="neutral"
        />
        <StatCard
          title="Total Utilized (YTD)"
          value="INR 9.00 Lakhs"
          icon={DollarSign}
          change="78.2% Budget Burn"
          trend="neutral"
        />
        <StatCard
          title="Remaining Unspent"
          value="INR 2.50 Lakhs"
          icon={TrendingDown}
          change="21.8% Balance reserve"
          trend="up"
        />
        <StatCard
          title="Pending Sign-off Queue"
          value={expenses.filter(e => e.status.includes('Pending')).length}
          icon={Clock}
          change="Requires Principal signature"
          trend="neutral"
        />
      </div>

      {/* Budget Comparison Chart */}
      <ChartCard
        title="Budget Allocation vs Actual Expenditure (INR)"
        subtitle="Line-item analysis across placement operations and training verticals"
        type="bar"
        data={BUDGET_BREAKDOWN}
        dataKeys={[
          { key: 'allocated', name: 'Allocated Budget (INR)', color: '#94a3b8' },
          { key: 'utilized', name: 'Utilized Expenditure (INR)', color: '#6366f1' },
          { key: 'balance', name: 'Remaining Balance (INR)', color: '#10b981' }
        ]}
        xAxisKey="name"
        height={320}
      />

      {/* Expense Approval Queue Section */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-indigo-600" />
              Executive Expenditure Sign-off & Vendor Invoices (27.11)
            </h3>
            <p className="text-xs text-slate-400">Institutional review for items exceeding INR 25,000</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {expenses.map((exp) => (
            <div key={exp.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {exp.id}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{exp.title}</h4>
                  <StatusBadge status={exp.status} />
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-3 pt-0.5">
                  <span>Vendor: <strong>{exp.vendor}</strong></span>
                  <span>•</span>
                  <span>{exp.category}</span>
                  <span>•</span>
                  <span>Submitted: {exp.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-bold text-base text-slate-900">{exp.amount}</span>
                {exp.status.includes('Pending') ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-8 text-rose-600 border-rose-200 hover:bg-rose-50"
                      onClick={() => handleReject(exp.id)}
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleApprove(exp.id)}
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Authorize Payment
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-slate-400">Action Recorded</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
