import React, { useState } from 'react'
import {
  Database,
  Layers,
  GraduationCap,
  Briefcase,
  Sliders,
  FileText,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

const MASTER_TABS = [
  { id: 'academic', label: 'Academic Years & Batches (24.1, 24.3)' },
  { id: 'departments', label: 'Departments & Programmes (24.2)' },
  { id: 'job_types', label: 'Job Categories & Tiers (24.4, 24.8)' },
  { id: 'rounds', label: 'Recruitment Round Types (24.6)' },
  { id: 'assessments', label: 'Assessment Criteria (24.7)' }
]

const INITIAL_DATA = {
  academic: [
    { id: 1, name: 'AY 2026-2027', status: 'Upcoming', code: 'AY26-27' },
    { id: 2, name: 'AY 2025-2026', status: 'Current / Active', code: 'AY25-26' },
    { id: 3, name: 'AY 2024-2025', status: 'Archived', code: 'AY24-25' }
  ],
  departments: [
    { id: 1, name: 'Computer Science & Engineering', code: 'CSE', head: 'Prof. S. Natarajan', intake: 240 },
    { id: 2, name: 'Information Technology', code: 'IT', head: 'Dr. V. Ramanathan', intake: 180 },
    { id: 3, name: 'Electronics & Communication', code: 'ECE', head: 'Dr. M. Swaminathan', intake: 180 },
    { id: 4, name: 'Electrical & Electronics', code: 'EEE', head: 'Dr. K. Chandran', intake: 120 },
    { id: 5, name: 'Mechanical Engineering', code: 'MECH', head: 'Dr. P. Sundaram', intake: 120 }
  ],
  job_types: [
    { id: 1, name: 'Super Dream (>25 LPA)', minPackage: 25.0, color: 'indigo' },
    { id: 2, name: 'Dream (15 - 25 LPA)', minPackage: 15.0, color: 'blue' },
    { id: 3, name: 'Core Industry (8 - 15 LPA)', minPackage: 8.0, color: 'emerald' },
    { id: 4, name: 'Standard IT/Services (4 - 8 LPA)', minPackage: 4.0, color: 'amber' }
  ],
  rounds: [
    { id: 1, name: 'Online Aptitude & Reasoning Screening', code: 'RND-APT' },
    { id: 2, name: 'Hands-on Technical Coding Assessment', code: 'RND-CODE' },
    { id: 3, name: 'Group Discussion & Case Study', code: 'RND-GD' },
    { id: 4, name: 'Technical Interview (Round 1 & 2)', code: 'RND-TECH' },
    { id: 5, name: 'Managerial & HR Fitment Round', code: 'RND-HR' }
  ],
  assessments: [
    { id: 1, name: 'Quantitative & Analytical Aptitude', duration: '60 mins', passMarks: '65%' },
    { id: 2, name: 'Core Data Structures & Algorithms', duration: '90 mins', passMarks: '70%' },
    { id: 3, name: 'Verbal & Professional Communication', duration: '45 mins', passMarks: '60%' }
  ]
}

export function MasterData() {
  const [activeTab, setActiveTab] = useState('academic')
  const [data, setData] = useState(INITIAL_DATA)
  const [newItemName, setNewItemName] = useState('')
  const [newItemCode, setNewItemCode] = useState('')

  const handleAddItem = (e) => {
    e.preventDefault()
    if (!newItemName) return
    const updatedTabList = [
      ...data[activeTab],
      {
        id: Date.now(),
        name: newItemName,
        code: newItemCode || `CUSTOM-${Date.now().toString().slice(-4)}`,
        status: 'Active'
      }
    ]
    setData({ ...data, [activeTab]: updatedTabList })
    setNewItemName('')
    setNewItemCode('')
  }

  const handleDeleteItem = (id) => {
    setData({
      ...data,
      [activeTab]: data[activeTab].filter(item => item.id !== id)
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Admin AD4</span>
            <h1 className="text-2xl font-bold text-slate-900">Master Data Configurations</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            System dropdowns, academic parameters, department taxonomies, recruitment rounds, and salary bracket dictionaries.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-medium overflow-x-auto">
        {MASTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAddItem} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="New entry label (e.g. Artificial Intelligence Dept, Super Dream 2, etc.)"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Code / Acronym (Optional)"
          value={newItemCode}
          onChange={(e) => setNewItemCode(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <Button type="submit" size="sm" variant="default" className="w-full sm:w-auto text-xs flex items-center gap-1.5 h-8">
          <Plus className="w-3.5 h-3.5" />
          Add Master Record
        </Button>
      </form>

      {/* Master Data Records Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Registered Dictionary Entries ({data[activeTab]?.length || 0})
          </h3>
          <span className="text-xs text-slate-400">Section 24.1 to 24.14 Spec</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Identification</th>
              <th className="py-3 px-4">Code / Tag</th>
              <th className="py-3 px-4">Parameters</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {data[activeTab]?.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">{item.name}</td>
                <td className="py-3 px-4 font-mono text-indigo-600">{item.code || 'N/A'}</td>
                <td className="py-3 px-4 text-slate-500">
                  {item.minPackage ? `Minimum Threshold: ${item.minPackage} LPA` : null}
                  {item.head ? `HOD: ${item.head} • Intake: ${item.intake}` : null}
                  {item.duration ? `Duration: ${item.duration} • Pass: ${item.passMarks}` : null}
                  {item.status ? `Status: ${item.status}` : null}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
