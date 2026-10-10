import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from '@/components/ui'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div>
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to login
        </Link>
        <h2 className="text-xl font-bold text-slate-900">Reset your password</h2>
        <p className="text-xs text-slate-500 mt-1">
          Enter your registered institutional email to receive a secure recovery link.
        </p>
      </div>

      {submitted ? (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-900">Reset instructions sent</h4>
            <p className="text-xs text-emerald-700 mt-1">
              We have dispatched a password recovery token to <strong>{email}</strong>. Please check your inbox.
            </p>
          </div>
          <Link to="/login" className="inline-block text-xs font-semibold text-emerald-800 underline pt-2">
            Return to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Institutional Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@genesis.edu"
          />

          <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> {loading ? 'Sending link...' : 'Send Recovery Link'}
          </Button>
        </form>
      )}
    </div>
  )
}
