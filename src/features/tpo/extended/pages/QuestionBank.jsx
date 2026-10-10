import React, { useState } from 'react'
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  Code2,
  FileQuestion,
  Tag,
  CheckCircle,
  UploadCloud,
  Edit2,
  Trash2
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

const INITIAL_QUESTIONS = [
  {
    id: 'Q-101',
    title: 'Balanced Binary Search Tree Rotations',
    category: 'Technical (DSA)',
    type: 'Coding',
    difficulty: 'Hard',
    topic: 'Trees & Balanced BST',
    points: 20,
    tags: ['AVL Trees', 'Red-Black', 'Algorithms']
  },
  {
    id: 'Q-102',
    title: 'Probability of Non-overlapping Events',
    category: 'Quantitative Aptitude',
    type: 'MCQ',
    difficulty: 'Medium',
    topic: 'Probability & Combinatorics',
    points: 2,
    tags: ['Quant', 'Math', 'Screening']
  },
  {
    id: 'Q-103',
    title: 'Explain ACID Properties in Relational Databases',
    category: 'Technical (DBMS)',
    type: 'Descriptive',
    difficulty: 'Medium',
    topic: 'Database Systems',
    points: 10,
    tags: ['SQL', 'Transactions', 'Backend']
  },
  {
    id: 'Q-104',
    title: 'Syllogisms and Deductive Logic Statements',
    category: 'Logical Reasoning',
    type: 'MCQ',
    difficulty: 'Easy',
    topic: 'Analytical Reasoning',
    points: 2,
    tags: ['Logic', 'Aptitude']
  },
  {
    id: 'Q-105',
    title: 'Two Sum with Optimal Memory Complexity',
    category: 'Technical (DSA)',
    type: 'Coding',
    difficulty: 'Medium',
    topic: 'Arrays & HashMaps',
    points: 15,
    tags: ['Arrays', 'LeetCode-Style']
  }
]

export function QuestionBank() {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [diffFilter, setDiffFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newQ, setNewQ] = useState({
    title: '',
    category: 'Technical (DSA)',
    type: 'MCQ',
    difficulty: 'Medium',
    topic: '',
    points: 5
  })

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'All' || q.type === typeFilter
    const matchesDiff = diffFilter === 'All' || q.difficulty === diffFilter
    return matchesSearch && matchesType && matchesDiff
  })

  const handleAddQuestion = (e) => {
    e.preventDefault()
    if (!newQ.title) return
    const created = {
      id: `Q-${questions.length + 101}`,
      title: newQ.title,
      category: newQ.category,
      type: newQ.type,
      difficulty: newQ.difficulty,
      topic: newQ.topic || 'General',
      points: Number(newQ.points),
      tags: [newQ.category.split(' ')[0], newQ.type]
    }
    setQuestions([created, ...questions])
    setShowAddModal(false)
    setNewQ({ title: '', category: 'Technical (DSA)', type: 'MCQ', difficulty: 'Medium', topic: '', points: 5 })
  }

  const handleDelete = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T15</span>
            <h1 className="text-2xl font-bold text-slate-900">Assessment Question Bank</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Maintain MCQ, coding, and descriptive question pools categorized by quantitative, logical, verbal, and technical domains.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <UploadCloud className="w-4 h-4" />
            Bulk CSV Import
          </Button>
          <Button variant="default" onClick={() => setShowAddModal(true)} className="flex items-center gap-2 text-xs">
            <Plus className="w-4 h-4" />
            Add New Question
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Repository Items"
          value={questions.length}
          icon={HelpCircle}
          change="+18 items this week"
          trend="up"
        />
        <StatCard
          title="Coding Problems"
          value={questions.filter(q => q.type === 'Coding').length}
          icon={Code2}
          change="Evaluated via sandbox"
          trend="neutral"
        />
        <StatCard
          title="Aptitude & MCQs"
          value={questions.filter(q => q.type === 'MCQ').length}
          icon={FileQuestion}
          change="Auto-graded questions"
          trend="up"
        />
        <StatCard
          title="Tag Taxonomies"
          value="12 Topics"
          icon={Tag}
          change="Aptitude, DSA, DBMS, Logic"
          trend="neutral"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions by title, topic, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700"
            >
              <option value="All">All Types</option>
              <option value="MCQ">MCQ</option>
              <option value="Coding">Coding</option>
              <option value="Descriptive">Descriptive</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Difficulty:</span>
            <select
              value={diffFilter}
              onChange={(e) => setDiffFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700"
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Q-ID</th>
                <th className="py-3.5 px-4">Problem Statement & Category</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Topic & Tags</th>
                <th className="py-3.5 px-4">Weightage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-500">{q.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 text-sm">{q.title}</div>
                    <div className="text-[11px] text-slate-400">{q.category}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-700">
                      {q.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      q.difficulty === 'Hard' ? 'bg-rose-100 text-rose-800' :
                      q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-700 font-medium">{q.topic}</div>
                    <div className="flex gap-1 mt-0.5 flex-wrap">
                      {q.tags.map((t, i) => (
                        <span key={i} className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{q.points} Pts</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Question"
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddQuestion} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Question to Bank</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Problem Statement / Title</label>
                <input
                  type="text"
                  required
                  value={newQ.title}
                  onChange={(e) => setNewQ({ ...newQ, title: e.target.value })}
                  placeholder="e.g. Implement LRU Cache with O(1) ops"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Format Type</label>
                  <select
                    value={newQ.type}
                    onChange={(e) => setNewQ({ ...newQ, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Coding">Coding</option>
                    <option value="Descriptive">Descriptive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Difficulty</label>
                  <select
                    value={newQ.difficulty}
                    onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Category</label>
                <select
                  value={newQ.category}
                  onChange={(e) => setNewQ({ ...newQ, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                >
                  <option value="Technical (DSA)">Technical (DSA)</option>
                  <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                  <option value="Logical Reasoning">Logical Reasoning</option>
                  <option value="Verbal Ability">Verbal Ability</option>
                  <option value="Technical (DBMS/OS/Core)">Technical (DBMS/OS/Core)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Topic</label>
                <input
                  type="text"
                  value={newQ.topic}
                  onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })}
                  placeholder="e.g. HashMaps, Linked Lists, Permutations"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default">
                Save to Bank
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
