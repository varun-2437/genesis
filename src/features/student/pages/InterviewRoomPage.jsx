import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MoreVertical, 
  Smile, 
  Hand, 
  MessageSquare, 
  Users, 
  Info, 
  Shield, 
  ChevronUp, 
  ScreenShare, 
  Settings,
  Sparkles,
  Check,
  X
} from 'lucide-react'

export function InterviewRoomPage() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [handRaised, setHandRaised] = useState(false)
  const [captionOn, setCaptionOn] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [currentTime, setCurrentTime] = useState('')
  const [hasAdmitted, setHasAdmitted] = useState(false)
  const [showWaitingCard, setShowWaitingCard] = useState(true)

  // Real-time clock update (like Google Meet top bar: "2:27 PM")
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Acquire webcam and microphone replicate
  useEffect(() => {
    let active = true

    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        if (!active) return

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setCameraError(null)
      } catch (err) {
        console.warn('Camera/mic access unavailable, falling back to simulated stream:', err)
        if (active) {
          setCameraError(err.message || 'Permission denied')
        }
      }
    }

    startMedia()

    return () => {
      active = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Toggle Camera
  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = !cameraOn
      })
    }
    setCameraOn((prev) => !prev)
  }

  // Toggle Microphone
  const toggleMic = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !micOn
      })
    }
    setMicOn((prev) => !prev)
  }

  // End Call
  const handleEndCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    navigate('/student/schedule')
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#202124] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
      {/* Top Bar: Meet Title & Admitted Guest Chip */}
      <header className="h-16 px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3 text-sm text-[#e8eaed]">
          <span className="font-medium tracking-wide">{currentTime}</span>
          <span className="text-[#9aa0a6]">|</span>
          <span className="font-medium tracking-tight">Placement Tech Interview · Google Cloud Team</span>
          <button 
            type="button" 
            aria-label="Meeting details" 
            className="p-1 rounded-full text-[#9aa0a6] hover:text-white hover:bg-white/10 transition-colors"
          >
            <Info size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {hasAdmitted ? (
            <div className="h-9 px-3.5 bg-[#1e4620] text-[#a8dab5] rounded-full flex items-center gap-2 text-xs font-medium border border-[#34a853]/40 animate-fade-in">
              <Check size={14} strokeWidth={2.5} />
              <span>Interviewer Admitted</span>
            </div>
          ) : (
            <button
              onClick={() => {
                setHasAdmitted(true)
                setShowWaitingCard(false)
              }}
              className="h-9 px-3.5 bg-[#137333] hover:bg-[#0f622a] text-white rounded-full flex items-center gap-2 text-xs font-medium transition-all shadow-sm cursor-pointer"
            >
              <Users size={14} strokeWidth={2} />
              <span>Admit 1 interviewer</span>
            </button>
          )}

          <div className="flex items-center gap-2 pl-2">
            <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white font-semibold flex items-center justify-center text-xs shadow-inner">
              V
            </div>
            <div className="w-8 h-8 rounded-full bg-[#3c4043] flex items-center justify-center text-xs text-[#9aa0a6]">
              1
            </div>
          </div>
        </div>
      </header>

      {/* Main Video Viewport */}
      <main className="flex-1 relative mx-4 mb-2 min-h-0 flex items-center justify-center">
        {/* Video Container Shell */}
        <div className="relative w-full h-full max-h-[82vh] max-w-[1280px] bg-[#3c4043] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/5">
          {cameraOn && !cameraError ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover -scale-x-100"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-24 h-24 rounded-full bg-[#1a73e8] text-white text-3xl font-semibold flex items-center justify-center shadow-lg">
                VM
              </div>
              <div>
                <p className="text-base font-medium text-[#e8eaed]">Varun M (You)</p>
                <p className="text-xs text-[#9aa0a6] mt-0.5">
                  {cameraError ? 'Camera access not granted — Virtual avatar enabled' : 'Camera is turned off'}
                </p>
              </div>
            </div>
          )}

          {/* Student Name Overlay (Bottom Left) */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-xs font-medium text-white border border-white/10 shadow-sm">
            {!micOn && <MicOff size={13} className="text-[#ea4335]" />}
            <span>Varun Murugesh (You)</span>
          </div>

          {/* Hand Raised Icon Tag */}
          {handRaised && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#1a73e8] text-white rounded-full text-xs font-medium shadow-md animate-bounce">
              <Hand size={14} />
              <span>Hand raised</span>
            </div>
          )}

          {/* Google Meet "Waiting to join" Admission Card (matching screenshot) */}
          {showWaitingCard && !hasAdmitted && (
            <div className="absolute top-5 right-5 z-20 w-[300px] bg-[#282a2d] border border-white/10 rounded-xl p-4 shadow-2xl text-left animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3">
                <div>
                  <h4 className="text-[13px] font-semibold text-white">Waiting to join</h4>
                  <p className="text-[11px] text-[#9aa0a6]">Visible to hosts</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWaitingCard(false)}
                  className="p-1 rounded-full text-[#9aa0a6] hover:text-white hover:bg-white/10"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setHasAdmitted(true)
                    setShowWaitingCard(false)
                  }}
                  className="py-1.5 px-3 bg-[#3c4043] hover:bg-[#4a4e52] text-white rounded-lg text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  Admit
                </button>
                <button
                  type="button"
                  onClick={() => setShowWaitingCard(false)}
                  className="py-1.5 px-3 bg-[#3c4043] hover:bg-[#4a4e52] text-[#ea4335] rounded-lg text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  Deny
                </button>
              </div>

              {/* Candidate Info Item */}
              <div className="p-2.5 bg-[#303336] rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f2994a] text-white font-bold flex items-center justify-center text-[10px]">
                    CH
                  </div>
                  <div>
                    <p className="font-semibold text-white leading-tight">1 unconfirmed user</p>
                    <p className="text-[11px] text-[#9aa0a6]">Chris Hoffman (Lead Evaluator)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Google Meet Bottom Controls Bar */}
      <footer className="h-20 px-6 flex items-center justify-between shrink-0 z-10">
        {/* Left Space: Meeting details */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#9aa0a6] min-w-[200px]">
          <span>Interview Code:</span>
          <span className="font-mono text-white">gen-meet-x94</span>
        </div>

        {/* Center: The Core GMeet Action Controls (Round pill-shaped buttons) */}
        <div className="flex items-center gap-2.5 mx-auto">
          {/* Microphone */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleMic}
              aria-label={micOn ? 'Turn off microphone' : 'Turn on microphone'}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                micOn ? 'bg-[#3c4043] hover:bg-[#4a4e52] text-white' : 'bg-[#ea4335] hover:bg-[#d93025] text-white'
              }`}
            >
              {micOn ? <Mic size={18} strokeWidth={2} /> : <MicOff size={18} strokeWidth={2} />}
            </button>
          </div>

          {/* Camera */}
          <button
            type="button"
            onClick={toggleCamera}
            aria-label={cameraOn ? 'Turn off camera' : 'Turn on camera'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              cameraOn ? 'bg-[#3c4043] hover:bg-[#4a4e52] text-white' : 'bg-[#ea4335] hover:bg-[#d93025] text-white'
            }`}
          >
            {cameraOn ? <Video size={18} strokeWidth={2} /> : <VideoOff size={18} strokeWidth={2} />}
          </button>

          {/* Screen Share */}
          <button
            type="button"
            onClick={() => alert('Screen share request triggered: Ready to present your coding screen to interview panel.')}
            aria-label="Share screen"
            className="w-11 h-11 rounded-full bg-[#3c4043] hover:bg-[#4a4e52] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ScreenShare size={18} strokeWidth={2} />
          </button>

          {/* Emoji Reactions */}
          <button
            type="button"
            onClick={() => alert('Reaction: 👍')}
            aria-label="Send reaction"
            className="w-11 h-11 rounded-full bg-[#3c4043] hover:bg-[#4a4e52] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <Smile size={18} strokeWidth={2} />
          </button>

          {/* Raise Hand */}
          <button
            type="button"
            onClick={() => setHandRaised(!handRaised)}
            aria-label="Raise or lower hand"
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              handRaised ? 'bg-[#8ab4f8] text-[#202124]' : 'bg-[#3c4043] hover:bg-[#4a4e52] text-white'
            }`}
          >
            <Hand size={18} strokeWidth={2} />
          </button>

          {/* Captions */}
          <button
            type="button"
            onClick={() => setCaptionOn(!captionOn)}
            aria-label="Toggle live captions"
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer font-bold text-xs ${
              captionOn ? 'bg-[#8ab4f8] text-[#202124]' : 'bg-[#3c4043] hover:bg-[#4a4e52] text-white'
            }`}
          >
            CC
          </button>

          {/* More Options */}
          <button
            type="button"
            aria-label="More options"
            className="w-11 h-11 rounded-full bg-[#3c4043] hover:bg-[#4a4e52] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <MoreVertical size={18} strokeWidth={2} />
          </button>

          {/* Leave Call (Red pill button) */}
          <button
            type="button"
            onClick={handleEndCall}
            aria-label="Leave call"
            className="h-11 px-6 rounded-full bg-[#ea4335] hover:bg-[#d93025] text-white flex items-center justify-center transition-colors cursor-pointer ml-1 shadow-md"
          >
            <PhoneOff size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Right Controls: Chat, People, Security */}
        <div className="hidden sm:flex items-center gap-1.5 justify-end min-w-[200px]">
          <button
            type="button"
            onClick={() => alert('Meeting details and placement instructions panel.')}
            aria-label="Details"
            className="w-10 h-10 rounded-full hover:bg-white/10 text-[#9aa0a6] hover:text-white flex items-center justify-center transition-colors"
          >
            <Info size={18} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => alert('Participant roster: Varun M (Candidate) & Chris Hoffman (Evaluator)')}
            aria-label="People"
            className="w-10 h-10 rounded-full hover:bg-white/10 text-[#9aa0a6] hover:text-white flex items-center justify-center transition-colors"
          >
            <Users size={18} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => alert('In-call chat opened.')}
            aria-label="In-call messages"
            className="w-10 h-10 rounded-full hover:bg-white/10 text-[#9aa0a6] hover:text-white flex items-center justify-center transition-colors"
          >
            <MessageSquare size={18} strokeWidth={2} />
          </button>

          <button
            type="button"
            aria-label="Host safety controls"
            className="w-10 h-10 rounded-full hover:bg-white/10 text-[#9aa0a6] hover:text-white flex items-center justify-center transition-colors"
          >
            <Shield size={18} strokeWidth={2} />
          </button>
        </div>
      </footer>
    </div>
  )
}
