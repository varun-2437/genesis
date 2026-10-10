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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">My Offers & Joining Confirmation</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Review formal offer letters, CTC compensation breakdowns, and submit digital acceptance evidence.
          </p>
        </div>
      </div>

      {/* Multiple-Offer Policy Alert */}
      <div className="card p-4 bg-warning-soft border border-warning/20 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <div className="text-xs text-fg space-y-1">
          <h4 className="font-semibold text-warning">Campus Multiple-Offer Regulation (M14.10, 7.11):</h4>
          <p className="text-fg-muted leading-relaxed">
            Under university guidelines, accepting a Dream category offer automatically de-registers you from parallel standard drives, while keeping you eligible for <strong className="text-fg font-semibold">Super Dream (&gt;15 LPA)</strong> opportunities only.
          </p>
        </div>
      </div>

      {actionDone && (
        <div className="p-4 bg-success-soft border border-success/20 rounded-[6px] text-success text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <span>Your decision has been logged and forwarded to the TPO placement directorate and company HR.</span>
        </div>
      )}

      {/* Offers List */}
      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="card p-6 md:p-8 space-y-6 hover:border-line-strong transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-line">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-fg">{offer.company}</h3>
                  <StatusBadge status={offer.status} />
                </div>
                <p className="text-sm font-medium text-fg-muted">{offer.role}</p>
                <p className="text-xs text-accent font-semibold">{offer.category}</p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold text-fg tabular-nums">{offer.ctc}</p>
                <p className="text-xs text-fg-muted mt-0.5">{offer.base}</p>
              </div>
            </div>

            {/* Offer Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-surface-2/60 p-4 rounded-[6px] border border-line">
              <div>
                <span className="text-fg-subtle block">Offer Release Date:</span>
                <span className="font-semibold text-fg">{offer.issueDate}</span>
              </div>
              <div>
                <span className="text-fg-subtle block">Acceptance Deadline:</span>
                <span className="font-semibold text-danger">{offer.expiryDate}</span>
              </div>
              <div>
                <span className="text-fg-subtle block">Tentative Joining:</span>
                <span className="font-semibold text-fg">{offer.joiningDate}</span>
              </div>
            </div>

            {/* Document Preview & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-surface-2 text-accent border border-line rounded-[6px]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-fg">{offer.letterName}</p>
                  <button
                    onClick={() => alert(`Downloading ${offer.letterName}`)}
                    className="text-[11px] text-accent hover:underline flex items-center gap-1 font-medium mt-0.5 cursor-pointer"
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
                    className="text-xs"
                    onClick={() => setRespondModal({ open: true, type: 'ACCEPT' })}
                  >
                    Accept & Upload Proof
                  </Button>
                </div>
              ) : (
                <span className="text-xs font-medium text-fg-muted">
                  Status: <strong className="text-success font-semibold">{offer.status}</strong>
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
        <div className="space-y-4 text-xs text-fg-muted">
          {respondModal.type === 'ACCEPT' ? (
            <>
              <p>
                By accepting this offer, you confirm your commitment to join <strong className="text-fg font-semibold">Cognizant</strong> as GenC Next Developer.
              </p>
              <FileUploader
                label="Upload Signed Offer Letter Copy / Acceptance Mail Screenshot (Optional)"
                accept=".pdf,.png,.jpg"
                maxSizeMB={5}
              />
            </>
          ) : (
            <div className="p-3 bg-danger-soft border border-danger/20 text-danger rounded-[6px]">
              Declining will permanently release your claim on this job offer. Please confirm with your TPO coordinator if unsure.
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
