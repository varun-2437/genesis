import React, { useState } from 'react'
import { Tabs, Input, Select, Button, StatusBadge } from '@/components/ui'
import { 
  User, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Award, 
  Briefcase, 
  Link as LinkIcon, 
  CheckCircle2, 
  DownloadCloud,
  Clock,
  Sparkles
} from 'lucide-react'

export function PlacementProfilePage() {
  const [activeTab, setActiveTab] = useState('academic')
  const [erpSynced, setErpSynced] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Profile Form Data state
  const [profile, setProfile] = useState({
    // Personal (2.3)
    fullName: 'Varun Murugesh',
    regNo: '21CS104',
    email: 'varun@student.genesis.edu',
    phone: '+91 98765 43210',
    gender: 'Male',
    dob: '2004-05-14',
    // Academic (2.4, 2.5, 2.6)
    department: 'Computer Science and Engineering',
    degree: 'B.Tech',
    gradYear: '2026',
    cgpa: '8.82',
    tenthMarks: '94.2%',
    twelfthMarks: '92.6%',
    activeBacklogs: '0',
    historyBacklogs: '0',
    // Skills (2.7, 2.8)
    technicalSkills: 'React, Node.js, Python, PostgreSQL, Docker, Tailwind CSS, TypeScript',
    softSkills: 'Technical Leadership, Problem Solving, Public Speaking',
    languages: 'English, Tamil, Hindi',
    // Projects (2.9)
    projects: [
      { title: 'GENESIS Placement Engine', tech: 'React, Node, PostgreSQL', desc: 'Centralized institutional placement automation system.' },
      { title: 'Distributed File Syncer', tech: 'Go, Raft Consensus', desc: 'Fault-tolerant distributed key-value storage.' }
    ],
    // Certifications (2.10)
    certifications: 'AWS Certified Cloud Practitioner, Google Cloud Cybersecurity Professional',
    // Work Experience / Internships (2.11)
    internship: 'Full Stack Intern at Zoho Corporation (May 2025 - July 2025)',
    // Links (2.12)
    github: 'https://github.com/varun-2437',
    linkedin: 'https://linkedin.com/in/varun-murugesh',
    portfolio: 'https://varun-portfolio.dev',
    // Preferences (2.13)
    preferredRoles: 'Software Development Engineer, Cloud Engineer, Systems Engineer',
    preferredLocations: 'Bengaluru, Hyderabad, Chennai, Remote',
    placementConsent: true,
  })

  const syncFromERP = () => {
    setErpSynced(true)
    setTimeout(() => {
      alert('Academic data successfully reconciled with University ERP Database! CGPA & backlogs verified.')
    }, 400)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 500)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header with Verification & ERP Sync */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900">Placement Registration Profile</h2>
            <StatusBadge status="VERIFIED" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered for Campus Drive Cycle 2026-27 · Roll No: <strong>{profile.regNo}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={syncFromERP}
            className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
          >
            <DownloadCloud className="w-4 h-4" /> Sync from ERP
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="text-xs"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile updated and logged for TPO compliance audit.
        </div>
      )}

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'academic', label: 'Academics & Eligibility', icon: GraduationCap },
          { id: 'personal', label: 'Personal Information', icon: User },
          { id: 'skills', label: 'Skills & Experience', icon: Code },
          { id: 'projects', label: 'Projects & Links', icon: FolderGit2 },
          { id: 'preferences', label: 'Placement Preferences', icon: Briefcase },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {/* Tab 1: Academic & Eligibility */}
        {activeTab === 'academic' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Academic Records & CGPA</h3>
                <p className="text-xs text-slate-500">Official academic performance authenticated against university records</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ERP Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Department" value={profile.department} disabled />
              <Input label="Degree / Programme" value={profile.degree} disabled />
              <Input label="Graduation Batch" value={profile.gradYear} disabled />
              <Input label="Cumulative CGPA (10.0 scale)" value={profile.cgpa} disabled helperText="Verified by COE" />
              <Input label="Active Arrears / Backlogs" value={profile.activeBacklogs} disabled helperText="Zero active backlogs" />
              <Input label="Historical Backlogs" value={profile.historyBacklogs} disabled />
              <Input label="10th Secondary Board %" value={profile.tenthMarks} onChange={(e) => setProfile({...profile, tenthMarks: e.target.value})} />
              <Input label="12th Higher Secondary %" value={profile.twelfthMarks} onChange={(e) => setProfile({...profile, twelfthMarks: e.target.value})} />
              <Input label="Institutional Roll / Reg No" value={profile.regNo} disabled />
            </div>
          </div>
        )}

        {/* Tab 2: Personal */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contact & Demographic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Legal Name" value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} />
              <Input label="University Email" value={profile.email} disabled />
              <Input label="Mobile Number" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
              <Input label="Gender" value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value})} />
              <Input label="Date of Birth" type="date" value={profile.dob} onChange={(e) => setProfile({...profile, dob: e.target.value})} />
            </div>
          </div>
        )}

        {/* Tab 3: Skills & Experience */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Competencies & Certifications</h3>
            <div className="space-y-4">
              <Input
                label="Technical Skills (Comma separated)"
                value={profile.technicalSkills}
                onChange={(e) => setProfile({...profile, technicalSkills: e.target.value})}
                helperText="Extracted into AI resume search vectors"
              />
              <Input
                label="Soft Skills & Competencies"
                value={profile.softSkills}
                onChange={(e) => setProfile({...profile, softSkills: e.target.value})}
              />
              <Input
                label="Languages Known"
                value={profile.languages}
                onChange={(e) => setProfile({...profile, languages: e.target.value})}
              />
              <Input
                label="Professional Certifications"
                value={profile.certifications}
                onChange={(e) => setProfile({...profile, certifications: e.target.value})}
              />
              <Input
                label="Prior Internship / Work Experience"
                value={profile.internship}
                onChange={(e) => setProfile({...profile, internship: e.target.value})}
              />
            </div>
          </div>
        )}

        {/* Tab 4: Projects & Links */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Portfolio & Repository URLs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="GitHub URL" value={profile.github} onChange={(e) => setProfile({...profile, github: e.target.value})} />
              <Input label="LinkedIn Profile" value={profile.linkedin} onChange={(e) => setProfile({...profile, linkedin: e.target.value})} />
              <Input label="Personal Portfolio URL" value={profile.portfolio} onChange={(e) => setProfile({...profile, portfolio: e.target.value})} />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase mb-3">Key Academic Projects</h4>
              <div className="space-y-3">
                {profile.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-900">{proj.title}</p>
                    <p className="text-[11px] text-indigo-600 font-medium">{proj.tech}</p>
                    <p className="text-xs text-slate-600 mt-1">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Preferences */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Career Preferences & Consent</h3>
            <div className="space-y-4">
              <Input
                label="Preferred Job Roles / Domains"
                value={profile.preferredRoles}
                onChange={(e) => setProfile({...profile, preferredRoles: e.target.value})}
              />
              <Input
                label="Preferred Work Locations"
                value={profile.preferredLocations}
                onChange={(e) => setProfile({...profile, preferredLocations: e.target.value})}
              />

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="consent"
                  checked={profile.placementConsent}
                  onChange={(e) => setProfile({...profile, placementConsent: e.target.checked})}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 mt-0.5"
                />
                <label htmlFor="consent" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
                  <strong>Formal Placement Cell Undertaking:</strong> I hereby declare that the academic scores, backlogs, and resumes submitted are genuine. I agree to abide by the institution's Campus Placement Policy and Offer Acceptance Regulations.
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
