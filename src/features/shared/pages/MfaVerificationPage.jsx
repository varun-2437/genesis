import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui'
import { ShieldAlert, ArrowRight, RotateCcw } from 'lucide-react'

export function MfaVerificationPage() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (val, idx) => {
    if (isNaN(val)) return
    const newOtp = [...otp]
    newOtp[idx] = val.substring(val.length - 1)
    setOtp(newOtp)

    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      const prevInput = document.getElementById(`otp-input-${idx - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) {
      setError('Please enter all 6 digits of your one-time code.')
      return
    }

    setLoading(true)
    setError('')
    setTimeout(() => {
      setLoading(false)
      navigate('/student/dashboard')
    }, 500)
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-center">
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
        <ShieldAlert className="w-6 h-6" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900">Multi-Factor Authentication</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          For enhanced placement compliance, please enter the 6-digit authentication code sent to your device.
        </p>
      </div>

      {error && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-11 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900"
            />
          ))}
        </div>

        <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2">
          {loading ? 'Verifying...' : 'Verify Session'} <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-1">
        Didn't receive the SMS/Email code?
        <button
          type="button"
          onClick={() => alert('A fresh 6-digit OTP code has been re-dispatched.')}
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          Resend code
        </button>
      </div>
    </div>
  )
}
