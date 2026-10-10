import React, { useState } from 'react'
import { StatusBadge, Button, Modal, FileUploader } from '@/components/ui'
import { Award, FileText, CheckCircle2, XCircle, AlertTriangle, Download, ShieldCheck, Building2 } from 'lucide-react'

export function MyOffersJoiningPage() {
  const [offers, setOffers] = useState([
    {
      id: 'off-1',
      company: 'Cognizant',
      role: 'GenC Next Developer',
      ctc: '₹ 6,75,000 Per Annum',
      base: '₹ 5,80,000 + ₹ 95,000 Variable & Allowances',
      issueDate: 'Oct 04, 2026',
      expiryDate: 'Oct 14, 2026 (4 Days Left)',
      joiningDate: 'July 2027 Tentative',
      status: 'PENDING',
      letterName: 'Cognizant_Offer_Letter_21CS104.pdf',
      category: 'Regular Dream',
    },
  ])

  const [respondModal, setRespondModal] = useState({ open: false, type: 'ACCEPT' })
  const [actionDone, setActionDone] = useState(false)

  const handleResponse = () => {
    const newStatus = respondModal.type === 'ACCEPT' ? 'ACCEPTED' : 'DECLINED'
    setOffers(offers.map((o) => ({ ...o, status: newStatus })))
    setRespondModal({ open: false, type: 'ACCEPT' })
    setActionDone(true)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Offers & Joining Confirmation</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review formal offer letters, CTC compensation breakdowns, and submit digital acceptance evidence.
        </p>
      </div>

      {/* Multiple-Offer Policy Alert */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <h4 className="font-bold">Campus Multiple-Offer Regulation (M14.10, 7.11):</h4>
          <p>
            Under university guidelines, accepting a Dream category offer automatically de-registers you from parallel standard drives, while keeping you eligible for <strong>Super Dream (&gt;15 LPA)</strong> opportunities only.
          </p>
        </div>
      </div>

      {actionDone && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Your decision has been logged and forwarded to the TPO placement directorate and company HR.</span>
        </div>
      )}

      {/* Offers List */}
      <div className="space-y-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900">{offer.company}</h3>
                  <StatusBadge status={offer.status} />
                </div>
                <p className="text-sm font-semibold text-slate-700">{offer.role}</p>
                <p className="text-xs text-indigo-600 font-semibold">{offer.category}</p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-2xl font-extrabold text-slate-900">{offer.ctc}</p>
                <p className="text-xs text-slate-500 mt-0.5">{offer.base}</p>
              </div>
            </div>

            {/* Offer Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block">Offer Release Date:</span>
                <span className="font-bold text-slate-800">{offer.issueDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Acceptance Deadline:</span>
                <span className="font-bold text-rose-600">{offer.expiryDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Tentative Joining:</span>
                <span className="font-bold text-slate-800">{offer.joiningDate}</span>
              </div>
            </div>

            {/* Document Preview & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{offer.letterName}</p>
                  <button
                    onClick={() => alert(`Downloading ${offer.letterName}`)}
                    className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-semibold mt-0.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Official PDF Letter
                  </button>
                </div>
              </div>

              {offer.status === 'PENDING' ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    className="text-xs"
                    onClick={() => setRespondModal({ open: true, type: 'DECLINE' })}
                  >
                    Decline Offer
                  </Button>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                    onClick={() => setRespondModal({ open: true, type: 'ACCEPT' })}
                  >
                    Accept & Upload Proof
                  </Button>
                </div>
              ) : (
                <span className="text-xs font-bold text-slate-700">
                  Status: <strong className="text-emerald-600">{offer.status}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Response Modal */}
      <Modal
        isOpen={respondModal.open}
        onClose={() => setRespondModal({ open: false, type: 'ACCEPT' })}
        title={respondModal.type === 'ACCEPT' ? 'Confirm Offer Acceptance' : 'Confirm Offer Decline'}
        size="md"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setRespondModal({ open: false, type: 'ACCEPT' })}>
              Cancel
            </Button>
            <Button
              variant={respondModal.type === 'ACCEPT' ? 'primary' : 'danger'}
              size="sm"
              onClick={handleResponse}
            >
              Confirm Decision
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-600">
          {respondModal.type === 'ACCEPT' ? (
            <>
              <p>
                By accepting this offer, you confirm your commitment to join <strong>Cognizant</strong> as GenC Next Developer.
              </p>
              <FileUploader
                label="Upload Signed Offer Letter Copy / Acceptance Mail Screenshot (Optional)"
                accept=".pdf,.png,.jpg"
                maxSizeMB={5}
              />
            </>
          ) : (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg">
              Declining will permanently release your claim on this job offer. Please confirm with your TPO coordinator if unsure.
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
