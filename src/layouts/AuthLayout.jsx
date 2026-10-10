import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Sparkles, ShieldCheck } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Branding Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">GENESIS</span>
          </div>
          <p className="text-xs uppercase tracking-widest text-indigo-300 mt-1">Placement Operations Platform</p>
        </div>

        <div className="relative z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-indigo-200 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Enterprise Role-Based Access Control
          </div>
          <h2 className="text-3xl font-extrabold leading-tight">
            Streamlining campus recruitment from registration to joining.
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Unifying students, placement officers, corporate recruiters, and faculty mentors on a single governed network.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between border-t border-white/10 pt-4">
          <span>GENESIS v0.1.0 · ISO 27001 Ready</span>
          <span className="text-slate-400">© 2026 Campus Placement Cell</span>
        </div>
      </div>

      {/* Right Form Card Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
