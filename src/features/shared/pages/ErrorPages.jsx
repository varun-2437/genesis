import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { ShieldAlert, FileQuestion, ServerCrash, Home } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center">
        <FileQuestion className="w-8 h-8" />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-slate-800 mt-1">Page Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          The recruitment page or workflow resource you requested does not exist or has been archived.
        </p>
      </div>
      <Link to="/">
        <Button size="sm" className="flex items-center gap-2">
          <Home className="w-4 h-4" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  )
}

export function UnauthorizedPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">403</h1>
        <h2 className="text-lg font-bold text-slate-800 mt-1">Access Restricted</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          You lack authorized placement permissions to view this section or document. Contact your institution's placement cell.
        </p>
      </div>
      <Link to="/">
        <Button size="sm" variant="secondary" className="flex items-center gap-2">
          <Home className="w-4 h-4" /> Back to Safety
        </Button>
      </Link>
    </div>
  )
}

export function ServerErrorPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center">
        <ServerCrash className="w-8 h-8" />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">500</h1>
        <h2 className="text-lg font-bold text-slate-800 mt-1">Internal System Error</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          The recruitment service encountered an unexpected error. The incident has been recorded in the security audit logs.
        </p>
      </div>
      <Button size="sm" onClick={() => window.location.reload()}>
        Reload Page
      </Button>
    </div>
  )
}

export function SessionExpiredPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-3xl flex items-center justify-center">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Session Expired</h1>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          Your security token has expired due to inactivity. Please log in again to renew your placement session.
        </p>
      </div>
      <Link to="/login">
        <Button size="sm">
          Return to Sign In
        </Button>
      </Link>
    </div>
  )
}
