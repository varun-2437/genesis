import React, { useState } from 'react'
import { Input, Button, StatusBadge } from '@/components/ui'
import { Building2, ShieldCheck, CheckCircle2 } from 'lucide-react'

export function EmploymentProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'Rahul Venkat',
    email: 'rahul.v@microsoft.com',
    degree: 'B.Tech Computer Science and Engineering',
    graduationYear: '2023',
    currentEmployer: 'Microsoft India',
    designation: 'Software Development Engineer 2',
    workLocation: 'Bengaluru / Hybrid',
    linkedin: 'https://linkedin.com/in/rahul-v-microsoft',
    verificationStatus: 'VERIFIED',
  })

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Alumni Employment Profile (M16.1, 16.2)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Maintain your official corporate affiliation, verified by the placement directorate.
          </p>
        </div>
        <StatusBadge status={profile.verificationStatus} />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Corporate Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Current Employer" value={profile.currentEmployer} onChange={(e) => setProfile({...profile, currentEmployer: e.target.value})} />
          <Input label="Current Designation / Role" value={profile.designation} onChange={(e) => setProfile({...profile, designation: e.target.value})} />
          <Input label="Corporate Email Address" value={profile.email} disabled helperText="Verified with Microsoft Corporate SSO" />
          <Input label="Primary Work Location" value={profile.workLocation} onChange={(e) => setProfile({...profile, workLocation: e.target.value})} />
          <Input label="LinkedIn URL" value={profile.linkedin} onChange={(e) => setProfile({...profile, linkedin: e.target.value})} />
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button size="sm" onClick={() => alert('Profile updated and recorded in alumni database!')}>
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
