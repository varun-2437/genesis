import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROLES } from '@/lib/constants'
import { Input, Button, Select } from '@/components/ui'
import { LogIn, KeyRound, Sparkles } from 'lucide-react'

const DEMO_ACCOUNTS = [
  { role: ROLES.STUDENT, email: 'varun@student.genesis.edu', name: 'Varun M (Student)' },
  { role: ROLES.TPO, email: 'tpo.head@genesis.edu', name: 'Dr. Sharma (Placement Officer)' },
  { role: ROLES.RECRUITER, email: 'recruiter@google.com', name: 'Ananya S (Google Recruiter)' },
  { role: ROLES.FACULTY, email: 'hod.cse@genesis.edu', name: 'Prof. Ramesh (HOD CSE)' },
  { role: ROLES.MANAGEMENT, email: 'principal@genesis.edu', name: 'Dr. K. Rao (Principal)' },
  { role: ROLES.ALUMNI, email: 'alumni.rahul@microsoft.com', name: 'Rahul V (Alumnus 2023)' },
  { role: ROLES.ADMIN, email: 'admin@genesis.edu', name: 'System Administrator' },
]

export function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  
  const [email, setEmail] = useState('varun@student.genesis.edu')
  const [password, setPassword] = useState('password123')
  const [role, setRole] = useState(ROLES.STUDENT)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e?.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      setUser({
        id: `usr_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        role,
        permissions: ['*'],
      })
      localStorage.setItem('genesis_auth_token', 'mock_jwt_session_token')
      setLoading(false)
      navigate(`/${role}/dashboard`)
    }, 400)
  }

  const quickSwitch = (account) => {
    setEmail(account.email)
    setRole(account.role)
    setUser({
      id: `usr_${account.role}`,
      name: account.name,
      email: account.email,
      role: account.role,
      permissions: ['*'],
    })
    localStorage.setItem('genesis_auth_token', 'mock_jwt_session_token')
    navigate(`/${account.role}/dashboard`)
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div>
        <div className="lg:hidden flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">GENESIS</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign in to your portal</h2>
        <p className="text-xs text-slate-500 mt-1">
          Enter your university credentials or choose a pre-configured role below.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Institutional Email / ID"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.id@genesis.edu"
        />

        <Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <Select
          label="Designated Portal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value={ROLES.STUDENT}>Student Portal</option>
          <option value={ROLES.TPO}>Placement Officer (TPO)</option>
          <option value={ROLES.RECRUITER}>Company Recruiter</option>
          <option value={ROLES.FACULTY}>Department Faculty / HOD</option>
          <option value={ROLES.MANAGEMENT}>Management & Principal</option>
          <option value={ROLES.ALUMNI}>Alumni Portal</option>
          <option value={ROLES.ADMIN}>System Administrator</option>
        </Select>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            Remember session
          </label>
          <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2">
          <LogIn className="w-4 h-4" /> {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      {/* Demo Fast-Switch Panel */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-indigo-500" /> 1-Click Demo Logins:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.role}
              type="button"
              onClick={() => quickSwitch(acc)}
              className="text-[11px] px-2.5 py-1 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 rounded-md transition-colors text-slate-600 font-medium"
            >
              {acc.role.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
