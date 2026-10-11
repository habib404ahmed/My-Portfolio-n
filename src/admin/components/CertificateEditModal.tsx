import React, { useState, useEffect, useRef } from 'react'
import type { CertificationData } from '@/types/content.ts'
import {
  X,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  Trash2,
  ExternalLink,
  Download,
  Award,
} from 'lucide-react'

interface CertificateEditModalProps {
  isOpen: boolean
  onClose: () => void
  certificate: CertificationData | null // null when adding, populated when editing
  onSave: (cert: CertificationData) => void
  totalCount: number
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.webp']

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return 'Unknown size'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function CertificateEditModal({
  isOpen,
  onClose,
  certificate,
  onSave,
  totalCount,
}: CertificateEditModalProps) {
  const isEditing = Boolean(certificate)

  // Form Fields
  const [title, setTitle] = useState('')
  const [issuer, setIssuer] = useState('')
  const [date, setDate] = useState('')
  const [credentialId, setCredentialId] = useState('')
  const [verificationUrl, setVerificationUrl] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<'ai' | 'security' | 'recognition'>('ai')
  const [categoryLabel, setCategoryLabel] = useState('AI / Machine Learning')
  const [verified, setVerified] = useState(true)
  const [visible, setVisible] = useState(true)

  // File Upload State
  const [documentUrl, setDocumentUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState<number | undefined>(undefined)
  const [fileType, setFileType] = useState<'image' | 'pdf'>('image')

  // Upload Process State
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  // Document Preview Modal State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Pre-fill form when certificate changes
  useEffect(() => {
    if (certificate) {
      setTitle(certificate.title || '')
      setIssuer(certificate.issuer || '')
      setDate(certificate.date || '')
      setCredentialId(certificate.credentialId || certificate.certificateId || '')
      setVerificationUrl(certificate.verificationUrl || '')
      setDescription(certificate.description || '')
      setCategory(certificate.category || 'ai')
      setCategoryLabel(certificate.categoryLabel || 'AI / Machine Learning')
      setVerified(certificate.verified !== false)
      setVisible(certificate.visible !== false)

      // Detect document URL & file type
      const docPath = certificate.downloadUrl || certificate.image || ''
      setDocumentUrl(docPath)
      const isPdf = /\.pdf$/i.test(docPath)
      setFileType(isPdf ? 'pdf' : 'image')
      setFileName(
        certificate.fileName ||
          docPath.split('/').pop() ||
          (isPdf ? 'Certificate.pdf' : 'Certificate.jpg')
      )
      setFileSize(certificate.fileSize)
    } else {
      // Defaults for new certificate
      setTitle('')
      setIssuer('')
      setDate(new Date().getFullYear().toString())
      setCredentialId('')
      setVerificationUrl('')
      setDescription('Technical certification verifying core competence.')
      setCategory('ai')
      setCategoryLabel('AI / Machine Learning')
      setVerified(true)
      setVisible(true)
      setDocumentUrl('')
      setFileName('')
      setFileSize(undefined)
      setFileType('image')
    }

    setUploadError(null)
    setValidationError(null)
    setUploadProgress(0)
    setIsUploading(false)
  }, [certificate, isOpen])

  if (!isOpen) return null

  // File Validation
  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size (${formatFileSize(file.size)}) exceeds the maximum 10 MB limit. Please select a smaller file.`
    }
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return `Unsupported file format (${ext}). Supported formats: PDF (.pdf), PNG (.png), JPEG (.jpg, .jpeg), WebP (.webp).`
    }
    return null
  }

  // Upload handler via XMLHttpRequest for live progress
  const handleUploadFile = (file: File) => {
    const error = validateFile(file)
    if (error) {
      setUploadError(error)
      return
    }

    setUploadError(null)
    setIsUploading(true)
    setUploadProgress(10)

    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/upload', true)
    xhr.withCredentials = true

    const token =
      (typeof window !== 'undefined' && sessionStorage.getItem('admin_token')) ||
      (typeof window !== 'undefined' && localStorage.getItem('admin_token'))
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    }

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100)
        setUploadProgress(Math.min(pct, 95))
      }
    }

    xhr.onload = () => {
      setIsUploading(false)
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText)
          if (res.url) {
            const isPdf = /\.pdf$/i.test(res.url)
            setDocumentUrl(res.url)
            setFileName(res.originalName || file.name)
            setFileSize(res.size || file.size)
            setFileType(isPdf ? 'pdf' : 'image')
            setUploadProgress(100)
            setUploadError(null)
          } else {
            setUploadError(res.error || 'Server did not return a valid file URL.')
          }
        } catch {
          setUploadError('Failed to parse server upload response.')
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText)
          setUploadError(errRes.error || `Upload failed (Status ${xhr.status}).`)
        } catch {
          setUploadError(`Upload failed with status code ${xhr.status}.`)
        }
      }
    }

    xhr.onerror = () => {
      setIsUploading(false)
      setUploadError('Network error occurred during file upload. Please check your connection and retry.')
    }

    xhr.send(formData)
  }

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleUploadFile(file)
    }
  }

  const handleRemoveFile = () => {
    if (
      confirm(
        'Remove this certificate document? The certificate record and metadata will be preserved.'
      )
    ) {
      setDocumentUrl('')
      setFileName('')
      setFileSize(undefined)
      setUploadError(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // Save handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setValidationError('Certificate title is required.')
      return
    }
    if (!issuer.trim()) {
      setValidationError('Issuing organization is required.')
      return
    }
    if (!date.trim()) {
      setValidationError('Issue date is required.')
      return
    }

    const nextNumber = isEditing
      ? certificate!.number
      : String(totalCount + 1).padStart(2, '0')
    const nextIndex = isEditing
      ? certificate!.index
      : String(totalCount + 1).padStart(2, '0')
    const nextId = isEditing ? certificate!.id : `cert-${Date.now()}`

    const updatedCert: CertificationData = {
      id: nextId,
      number: nextNumber,
      index: nextIndex,
      title: title.trim(),
      issuer: issuer.trim(),
      type: certificate?.type || 'Professional Credential',
      recipient: certificate?.recipient || 'Md Habib Munsar Ahmed',
      date: date.trim(),
      year: parseInt(date.replace(/\D/g, ''), 10) || new Date().getFullYear(),
      category,
      categoryLabel:
        category === 'ai'
          ? 'AI / Machine Learning'
          : category === 'security'
          ? 'Cybersecurity'
          : 'Honors & Recognition',
      image: documentUrl || '/assets/images/certifications/python.png',
      imageWebp: documentUrl || '/assets/images/certifications/python.webp',
      downloadUrl: documentUrl || '/assets/images/certifications/python.png',
      verified,
      description: description.trim(),
      visible,
      credentialId: credentialId.trim() || undefined,
      certificateId: credentialId.trim() || undefined,
      verificationUrl: verificationUrl.trim() || undefined,
      fileName: fileName || undefined,
      fileSize,
      fileType,
    }

    onSave(updatedCert)
    onClose()
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="relative max-w-2xl w-full bg-[#10151D] border border-[rgba(255,255,255,0.12)] rounded-2xl shadow-2xl p-6 space-y-5 my-8 text-xs text-[#A8B4C2] font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F5F8FA] font-mono uppercase tracking-wide">
                  {isEditing ? 'Edit Certificate & Document' : 'Add New Certificate'}
                </h3>
                <p className="text-[11px] text-[#8491A2] font-mono">
                  {isEditing
                    ? `Editing "${certificate?.title}"`
                    : 'Upload your verified certificate and configure credentials'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8491A2] hover:text-[#F5F8FA] hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {validationError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ─── 1. FILE UPLOAD AREA (Core Requirement) ─── */}
            <div className="p-4 rounded-xl bg-black/40 border border-[rgba(255,255,255,0.09)] space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#F5F8FA] uppercase tracking-wider">
                    Certificate Document
                  </label>
                  <p className="text-[11px] text-[#8491A2]">
                    Upload your certificate image or PDF.
                  </p>
                </div>
                {documentUrl && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase">
                    {fileType === 'pdf' ? 'PDF Document' : 'Image Document'}
                  </span>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUploadFile(file)
                }}
              />

              {/* Drag & Drop Area / Active File Preview Box */}
              {!documentUrl ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                    isDragOver
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,217,255,0.2)]'
                      : 'border-[rgba(255,255,255,0.15)] bg-white/[0.02] hover:border-cyan-400/50 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Upload className="w-5 h-5 animate-pulse" />
                  </div>

                  <div>
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 font-mono text-xs font-semibold mb-1 cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        fileInputRef.current?.click()
                      }}
                    >
                      Upload Certificate
                    </button>
                    <p className="text-[11px] text-[#A8B4C2] font-sans">
                      or drag and drop your file here
                    </p>
                    <p className="text-[10px] text-[#8491A2] font-mono mt-1">
                      Supports PDF, JPEG, PNG, WebP (Max 10 MB)
                    </p>
                  </div>
                </div>
              ) : (
                /* Selected File Display with Actions */
                <div className="p-3.5 rounded-xl bg-[#151C26] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                    {/* Thumbnail / Document Icon */}
                    <div
                      onClick={() => setIsPreviewOpen(true)}
                      className="w-12 h-12 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden group relative"
                      title="Click to preview document"
                    >
                      {fileType === 'pdf' ? (
                        <FileText className="w-6 h-6 text-red-400" />
                      ) : (
                        <img
                          src={documentUrl}
                          alt="Certificate thumbnail"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#F5F8FA] truncate">
                          {fileName || 'Uploaded Certificate'}
                        </span>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      </div>
                      <p className="text-[11px] text-[#8491A2] font-mono mt-0.5">
                        {formatFileSize(fileSize)} • Stored on server
                      </p>
                    </div>
                  </div>

                  {/* Actions: Preview, Replace, Remove */}
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setIsPreviewOpen(true)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[#F5F8FA] flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Preview Document"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[#F5F8FA] flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Replace with another file"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Replace</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-cyan-300">Uploading certificate to secure storage...</span>
                    <span className="text-cyan-400 font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-150"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Error Message */}
              {uploadError && (
                <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>

            {/* ─── 2. CERTIFICATE METADATA FORM FIELDS ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                  Certificate Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Introduction to Modern AI"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-[#F5F8FA] font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                  Issuing Organization <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cisco Networking Academy"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  className="w-full p-2 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-[#F5F8FA]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                  Issue Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 27 September 2025 or 2025"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-cyan-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                  Credential ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CISCO-AI-98421"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  className="w-full p-2 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-[#F5F8FA] font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                  Verification URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://verify.cisco.com/cert/..."
                  value={verificationUrl}
                  onChange={(e) => setVerificationUrl(e.target.value)}
                  className="w-full p-2 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    const val = e.target.value as 'ai' | 'security' | 'recognition'
                    setCategory(val)
                    setCategoryLabel(
                      val === 'ai'
                        ? 'AI / Machine Learning'
                        : val === 'security'
                        ? 'Cybersecurity'
                        : 'Honors & Recognition'
                    )
                  }}
                  className="w-full p-2 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-[#F5F8FA] font-mono"
                >
                  <option value="ai">AI / Machine Learning</option>
                  <option value="security">Cybersecurity & Systems</option>
                  <option value="recognition">Honors & Academic Recognition</option>
                </select>
              </div>

              <div className="flex items-center gap-6 pt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verified}
                    onChange={(e) => setVerified(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 rounded"
                  />
                  <span className="font-mono text-xs text-[#F5F8FA]">Verified Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 rounded"
                  />
                  <span className="font-mono text-xs text-[#F5F8FA]">Public Visibility</span>
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key competencies and practical topics validated by this credential."
                  className="w-full p-2 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-[#F5F8FA] resize-none"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[#F5F8FA] font-mono text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,217,255,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {isEditing ? 'Save Changes' : 'Create Certificate'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ─── 3. DOCUMENT PREVIEW MODAL (Image & PDF Safe Viewer) ─── */}
      {isPreviewOpen && documentUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#10151D] border border-[rgba(255,255,255,0.15)] rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.09)] flex-shrink-0">
              <div className="flex items-center gap-2">
                {fileType === 'pdf' ? (
                  <FileText className="w-5 h-5 text-red-400" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-cyan-400" />
                )}
                <div>
                  <h4 className="text-sm font-bold text-[#F5F8FA] font-mono truncate max-w-md">
                    {fileName || title || 'Certificate Document Preview'}
                  </h4>
                  <p className="text-[11px] text-[#8491A2] font-mono">
                    {issuer || 'Verified Credential'} • {formatFileSize(fileSize)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={documentUrl}
                  download={fileName || 'certificate'}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download</span>
                </a>

                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 transition-colors"
                  title="Open in new window"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[#F5F8FA] transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Body */}
            <div className="flex-1 min-h-[50vh] max-h-[70vh] rounded-xl overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center p-2">
              {fileType === 'pdf' ? (
                <iframe
                  src={`${documentUrl}#toolbar=0`}
                  title="PDF Certificate Preview"
                  className="w-full h-full min-h-[55vh] rounded border-0"
                />
              ) : (
                <img
                  src={documentUrl}
                  alt={title || 'Certificate document'}
                  className="max-h-[65vh] max-w-full object-contain rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
