import React, { useState } from 'react'
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  AlertTriangle, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Send,
  Building,
  UserCheck
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

// Mock Data for Offers
const INITIAL_OFFERS = [
  {
    id: 'OFF-1001',
    studentName: 'Aarav Sharma',
    rollNo: '21CS042',
    department: 'Computer Science',
    company: 'Microsoft',
    role: 'Software Development Engineer',
    ctc: '44.5 LPA',
    basePay: '24.0 LPA',
    offerType: 'Direct Campus',
    status: 'Accepted',
    issuedDate: '2026-09-15',
    deadline: '2026-09-30',
    joiningDate: '2027-07-01',
    hasLetter: true,
    multipleOffers: 2
  },
  {
    id: 'OFF-1002',
    studentName: 'Ananya Iyer',
    rollNo: '21IT019',
    department: 'Information Technology',
    company: 'Goldman Sachs',
    role: 'Analyst - Engineering',
    ctc: '32.0 LPA',
    basePay: '18.0 LPA',
    offerType: 'Direct Campus',
    status: 'Pending Verification',
    issuedDate: '2026-09-18',
    deadline: '2026-10-05',
    joiningDate: '2027-06-15',
    hasLetter: true,
    multipleOffers: 1
  },
  {
    id: 'OFF-1003',
    studentName: 'Rohan Gupta',
    rollNo: '21EC088',
    department: 'Electronics & Comm.',
    company: 'Texas Instruments',
    role: 'Embedded Design Engineer',
    ctc: '26.8 LPA',
    basePay: '16.5 LPA',
    offerType: 'PPO (Internship)',
    status: 'Accepted',
    issuedDate: '2026-09-12',
    deadline: '2026-09-26',
    joiningDate: '2027-07-10',
    hasLetter: true,
    multipleOffers: 1
  },
  {
    id: 'OFF-1004',
    studentName: 'Sneha Patel',
    rollNo: '21ME031',
    department: 'Mechanical Engg.',
    company: 'Tata Motors',
    role: 'Graduate Engineer Trainee',
    ctc: '10.5 LPA',
    basePay: '8.5 LPA',
    offerType: 'Direct Campus',
    status: 'Declined',
    issuedDate: '2026-09-20',
    deadline: '2026-10-02',
    joiningDate: null,
    hasLetter: false,
    multipleOffers: 1
  },
  {
    id: 'OFF-1005',
    studentName: 'Vikram Verma',
    rollNo: '21CS110',
    department: 'Computer Science',
    company: 'Amazon',
    role: 'Cloud Support Associate',
    ctc: '21.0 LPA',
    basePay: '14.0 LPA',
    offerType: 'Direct Campus',
    status: 'Offer Issued',
    issuedDate: '2026-10-02',
    deadline: '2026-10-16',
    joiningDate: '2027-08-01',
    hasLetter: true,
    multipleOffers: 1
  },
  {
    id: 'OFF-1006',
    studentName: 'Pooja Reddy',
    rollNo: '21EE054',
    department: 'Electrical Engg.',
    company: 'Schneider Electric',
    role: 'Associate R&D Engineer',
    ctc: '14.2 LPA',
    basePay: '11.0 LPA',
    offerType: 'Direct Campus',
    status: 'Offer Issued',
    issuedDate: '2026-10-04',
    deadline: '2026-10-18',
    joiningDate: '2027-07-15',
    hasLetter: true,
    multipleOffers: 1
  }
]

export function OffersManagement() {
  const [offers, setOffers] = useState(INITIAL_OFFERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [policyModal, setPolicyModal] = useState(false)

  // Computed metrics
  const totalOffers = offers.length
  const acceptedOffers = offers.filter(o => o.status === 'Accepted').length
  const pendingVerification = offers.filter(o => o.status === 'Pending Verification' || o.status === 'Offer Issued').length
  const multipleOfferStudents = offers.filter(o => o.multipleOffers > 1).length

  const filteredOffers = offers.filter(o => {
    const matchesSearch = 
      o.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApproveVerification = (id) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: 'Accepted' } : o))
    if (selectedOffer?.id === id) {
      setSelectedOffer(prev => ({ ...prev, status: 'Accepted' }))
    }
  }

  const handleRevokeOffer = (id) => {
    if (window.confirm('Are you sure you want to mark this offer as revoked?')) {
      setOffers(prev => prev.map(o => o.id === id ? { ...o, status: 'Revoked' } : o))
      if (selectedOffer?.id === id) {
        setSelectedOffer(prev => ({ ...prev, status: 'Revoked' }))
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T21</span>
            <h1 className="text-2xl font-bold text-slate-900">Offers & Joining Management</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track provisional/final offers, letter verifications, multi-offer policy enforcements, and joining dates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setPolicyModal(true)} className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Offer Policies ({multipleOfferStudents} flagged)
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Offers CSV
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Offers Recorded" 
          value={totalOffers} 
          icon={Briefcase} 
          change="+14% this drive"
          trend="up"
        />
        <StatCard 
          title="Offers Accepted" 
          value={acceptedOffers} 
          icon={CheckCircle2} 
          change="84% acceptance rate"
          trend="up"
        />
        <StatCard 
          title="Pending Verification" 
          value={pendingVerification} 
          icon={Clock} 
          change="Requires TPO verification"
          trend="neutral"
        />
        <StatCard 
          title="Multiple Offer Holders" 
          value={multipleOfferStudents} 
          icon={UserCheck} 
          change="Dream/Core policy active"
          trend="neutral"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, roll number, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Offer Issued">Offer Issued</option>
            <option value="Pending Verification">Pending Verification</option>
            <option value="Declined">Declined</option>
            <option value="Revoked">Revoked</option>
          </select>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Offer ID</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Company & Role</th>
                <th className="py-3.5 px-4">CTC Details</th>
                <th className="py-3.5 px-4">Offer Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Letter</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOffers.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <div className="font-medium text-slate-900 flex items-center gap-1.5">
                        {item.studentName}
                        {item.multipleOffers > 1 && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold" title="Holds multiple offers">
                            {item.multipleOffers} Offers
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">{item.rollNo} • {item.department}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {item.company}
                    </div>
                    <div className="text-xs text-slate-500">{item.role}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-emerald-600">{item.ctc}</div>
                    <div className="text-[11px] text-slate-400">Base: {item.basePay}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">
                    {item.offerType}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    {item.hasLetter ? (
                      <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium hover:underline cursor-pointer">
                        <FileText className="w-3.5 h-3.5" /> Letter.pdf
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not Uploaded</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedOffer(item)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {item.status === 'Pending Verification' && (
                        <button
                          onClick={() => handleApproveVerification(item.id)}
                          className="px-2 py-1 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOffers.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 text-sm">
                    No offer records found matching your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offer Detail Drawer / Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400">{selectedOffer.id}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedOffer.studentName}</h3>
                <p className="text-xs text-slate-500">{selectedOffer.rollNo} • {selectedOffer.department}</p>
              </div>
              <StatusBadge status={selectedOffer.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block">Employer</span>
                <span className="font-semibold text-slate-800 text-sm">{selectedOffer.company}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Job Designation</span>
                <span className="font-semibold text-slate-800 text-sm">{selectedOffer.role}</span>
              </div>
              <div>
                <span className="text-slate-400 block">CTC Package</span>
                <span className="font-bold text-emerald-600 text-sm">{selectedOffer.ctc}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Fixed / Base Pay</span>
                <span className="font-medium text-slate-700 text-sm">{selectedOffer.basePay}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Issued On</span>
                <span className="font-medium text-slate-700">{selectedOffer.issuedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Acceptance Deadline</span>
                <span className="font-medium text-slate-700">{selectedOffer.deadline}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Expected Joining</span>
                <span className="font-medium text-slate-700">{selectedOffer.joiningDate || 'TBD'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Multiple Offer Flags</span>
                <span className="font-medium text-amber-600">{selectedOffer.multipleOffers} Offer(s) on record</span>
              </div>
            </div>

            {selectedOffer.hasLetter && (
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div>
                    <div className="text-xs font-semibold text-indigo-900">Official_Offer_Letter.pdf</div>
                    <div className="text-[10px] text-indigo-500">Uploaded by recruiter & verified by system</div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  Preview Document
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <Button 
                variant="outline" 
                className="text-rose-600 hover:bg-rose-50 border-rose-200"
                onClick={() => handleRevokeOffer(selectedOffer.id)}
              >
                Revoke / Invalidate
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setSelectedOffer(null)}>
                  Close
                </Button>
                {selectedOffer.status !== 'Accepted' && (
                  <Button 
                    variant="default"
                    onClick={() => handleApproveVerification(selectedOffer.id)}
                  >
                    Approve Verification
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Institutional Multiple Offer Policy (Section 14.10)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under current policy rules (configured in <strong>T32 Policy Engine</strong>), students holding an initial offer below 12 LPA may participate only in <strong>Dream Companies (&ge;15 LPA)</strong> or <strong>Super Dream (&ge;25 LPA)</strong> drives.
            </p>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-semibold">Current Exceptions:</div>
              <div>• 21CS042 (Aarav Sharma): Holds Microsoft & Amazon offers. Requires final declaration within 7 days.</div>
            </div>
            <div className="flex justify-end">
              <Button variant="default" onClick={() => setPolicyModal(false)}>
                Acknowledge & Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
