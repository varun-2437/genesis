import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react'

export function FileUploader({
  label,
  accept = '.pdf,.doc,.docx',
  maxSizeMB = 5,
  onFileSelect,
  className,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFile = (file) => {
    setError(null)
    if (!file) return

    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSizeMB) {
      setError(`File exceeds maximum size of ${maxSizeMB}MB`)
      return
    }

    setSelectedFile(file)
    onFileSelect?.(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const removeFile = (e) => {
    e.stopPropagation()
    setSelectedFile(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    onFileSelect?.(null)
  }

  return (
    <div className={cn('w-full space-y-2', className)}>
      {label && <label className="block text-xs font-semibold text-fg">{label}</label>}

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-[8px] p-6 text-center cursor-pointer transition-colors',
          dragOver ? 'border-accent bg-accent-soft' : 'border-line-strong hover:border-fg-subtle bg-surface-2/40',
          selectedFile && 'border-accent bg-accent-soft/40'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {selectedFile ? (
          <div className="flex items-center justify-between p-3 bg-surface rounded-[6px] border border-line">
            <div className="flex items-center gap-3 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-xs font-semibold text-fg truncate">{selectedFile.name}</p>
                <p className="text-[11px] text-fg-muted">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 rounded text-fg-muted hover:text-danger hover:bg-surface-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-surface rounded-full border border-line shadow-xs text-accent">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-fg">
                Click to upload or drag & drop
              </p>
              <p className="text-[11px] text-fg-muted mt-0.5">
                PDF, DOCX up to {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-danger font-medium">{error}</p>}
    </div>
  )
}
