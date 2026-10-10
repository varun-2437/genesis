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
      <div className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-semibold text-fg tracking-tight">Placement Registration Profile</h1>
            <StatusBadge status="VERIFIED" />
          </div>
          <p className="text-xs text-fg-muted mt-0.5">
            Registered for Campus Drive Cycle 2026-27 · Roll No: <strong className="text-fg">{profile.regNo}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={syncFromERP}
            className="flex items-center gap-1.5 text-xs text-accent"
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
        <div className="p-3 bg-success-soft border border-success/20 text-success text-xs rounded-[6px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-success" /> Profile updated and logged for TPO compliance audit.
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
          { id: 'history', label: 'Placement & Change History', icon: Clock },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="card p-6 md:p-8">
        {/* Tab 1: Academic & Eligibility */}
        {activeTab === 'academic' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-fg uppercase tracking-wider">Academic Records & CGPA</h3>
                <p className="text-xs text-fg-muted">Official academic performance authenticated against university records</p>
              </div>
              <span className="text-xs font-semibold text-success bg-success-soft px-3 py-1 rounded-[4px] border border-success/20">
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
            <h3 className="text-sm font-semibold text-fg uppercase tracking-wider">Contact & Demographic Details</h3>
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
            <h3 className="text-sm font-semibold text-fg uppercase tracking-wider">Competencies & Certifications</h3>
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
            <h3 className="text-sm font-semibold text-fg uppercase tracking-wider">Portfolio & Repository URLs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="GitHub URL" value={profile.github} onChange={(e) => setProfile({...profile, github: e.target.value})} />
              <Input label="LinkedIn Profile" value={profile.linkedin} onChange={(e) => setProfile({...profile, linkedin: e.target.value})} />
              <Input label="Personal Portfolio URL" value={profile.portfolio} onChange={(e) => setProfile({...profile, portfolio: e.target.value})} />
            </div>

            <div className="pt-4 border-t border-line">
              <h4 className="text-xs font-semibold text-fg uppercase mb-3">Key Academic Projects</h4>
              <div className="space-y-3">
                {profile.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 bg-surface-2/60 rounded-[6px] border border-line">
                    <p className="text-xs font-semibold text-fg">{proj.title}</p>
                    <p className="text-[11px] text-accent font-medium">{proj.tech}</p>
                    <p className="text-xs text-fg-muted mt-1">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Preferences */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-fg uppercase tracking-wider">Career Preferences & Consent</h3>
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

              <div className="p-4 bg-surface-2/60 rounded-[6px] border border-line flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="consent"
                  checked={profile.placementConsent}
                  onChange={(e) => setProfile({...profile, placementConsent: e.target.checked})}
                  className="rounded border-line-strong text-accent focus:ring-accent h-4 w-4 mt-0.5"
                />
                <label htmlFor="consent" className="text-xs text-fg leading-relaxed cursor-pointer">
                  <strong>Formal Placement Cell Undertaking:</strong> I hereby declare that the academic scores, backlogs, and resumes submitted are genuine. I agree to abide by the institution's Campus Placement Policy and Offer Acceptance Regulations.
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Placement & Change History (2.16, 2.17) */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-fg uppercase tracking-wider">Audit Log & Modifications</h3>
            <div className="space-y-3">
              <div className="p-4 bg-surface-2/60 border border-line rounded-[6px] flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-fg">ERP Academic Scores Auto-Reconciled</p>
                  <p className="text-[11px] text-fg-muted mt-0.5">Automated COE Sync · CGPA updated to 8.82</p>
                </div>
                <span className="text-[10px] text-fg-muted font-medium">Oct 08, 2026 14:20</span>
              </div>
              <div className="p-4 bg-surface-2/60 border border-line rounded-[6px] flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-fg">Technical Resume (v2_Cloud) Approved</p>
                  <p className="text-[11px] text-fg-muted mt-0.5">Approved by TPO Staff Prof. Sharma</p>
                </div>
                <span className="text-[10px] text-fg-muted font-medium">Oct 05, 2026 11:15</span>
              </div>
              <div className="p-4 bg-surface-2/60 border border-line rounded-[6px] flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-fg">Placement Undertaking Signed</p>
                  <p className="text-[11px] text-fg-muted mt-0.5">Digitally executed by student (IP: 103.21.24.12)</p>
                </div>
                <span className="text-[10px] text-fg-muted font-medium">Sep 20, 2026 09:30</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
