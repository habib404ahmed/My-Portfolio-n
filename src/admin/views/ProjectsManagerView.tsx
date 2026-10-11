import React, { useState } from 'react'
import type { PortfolioContent, ProjectItemData, ImageCropConfig } from '@/types/content.ts'
import { PhotoStudioModal } from '../components/PhotoStudioModal.tsx'
import {
  FolderGit2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Star,
  Camera,
  ExternalLink,
  Eye,
  EyeOff,
  Copy,
  Layers,
  Code,
  Globe,
  Sliders,
} from 'lucide-react'

interface ProjectsManagerViewProps {
  content: PortfolioContent
  onChange: (updatedProjects: ProjectItemData[]) => void
}

type ProjectEditorTab = 'basic' | 'description' | 'tech' | 'media' | 'links' | 'display'

const FALLBACK_CROP: ImageCropConfig = {
  x: 50,
  y: 50,
  scale: 1,
  rotate: 0,
  flipH: false,
  flipV: false,
  aspectRatio: '16:9',
  objectFit: 'cover',
  borderRadius: 16,
  shadowIntensity: 0.3,
  opacity: 1,
}

export function ProjectsManagerView({ content, onChange }: ProjectsManagerViewProps) {
  const projects = content.projects || []
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '')
  const [activeTab, setActiveTab] = useState<ProjectEditorTab>('basic')
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState(false)

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0]

  const handleAddProject = () => {
    const nextNum = String(projects.length + 1).padStart(2, '0')
    const newId = `project-${Date.now()}`
    const newProject: ProjectItemData = {
      id: newId,
      number: nextNum,
      title: 'New Engineering Project',
      tagline: 'High-Performance System Architecture',
      category: 'fullstack',
      categoryLabel: 'FULL-STACK DEVELOPMENT',
      shortDescription: 'Concise summary of architecture, implementation and performance results.',
      longDescription: 'Comprehensive technical narrative detailing architectural constraints and results.',
      technologies: ['TypeScript', 'React', 'Node.js'],
      features: ['Real-time sync pipeline', 'Modular architecture'],
      contribution: 'Lead Architect',
      githubUrl: 'https://github.com/habib404ahmed',
      liveUrl: '',
      accentColor: '#00D9FF',
      glowColor: 'rgba(0, 217, 255, 0.35)',
      featured: true,
      status: 'active',
      visible: true,
      pipeline: [{ step: '01', label: 'Architecture & Design' }],
    }
    onChange([...projects, newProject])
    setSelectedProjectId(newId)
  }

  const handleDuplicateProject = (projectToDup: ProjectItemData) => {
    const nextNum = String(projects.length + 1).padStart(2, '0')
    const newId = `project-${Date.now()}`
    const duplicated: ProjectItemData = {
      ...projectToDup,
      id: newId,
      number: nextNum,
      title: `${projectToDup.title} (Copy)`,
    }
    onChange([...projects, duplicated])
    setSelectedProjectId(newId)
  }

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const remaining = projects.filter((p) => p.id !== id)
      onChange(remaining)
      if (selectedProjectId === id && remaining.length > 0) {
        setSelectedProjectId(remaining[0].id)
      }
    }
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= projects.length) return
    const next = [...projects]
    const temp = next[index]
    next[index] = next[targetIndex]
    next[targetIndex] = temp
    onChange(next)
  }

  const handleUpdate = (id: string, updates: Partial<ProjectItemData>) => {
    onChange(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const handleSaveCoverCrop = (crop: ImageCropConfig, newUrl?: string) => {
    if (!selectedProject) return
    handleUpdate(selectedProject.id, {
      coverCrop: crop,
      coverImage: newUrl || selectedProject.coverImage,
    })
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto font-sans text-xs text-[#A8B4C2]">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-cyan-400" />
          <div>
            <h3 className="text-xs font-bold text-[#F5F8FA] uppercase font-mono">
              Projects Universe Manager
            </h3>
            <p className="text-[11px] text-[#8491A2] font-sans">
              Manage showcase projects, tech tags, cover image crops, and live links.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Compact Project List Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[75vh] overflow-y-auto custom-scrollbar pr-0.5">
          {projects.map((p, idx) => {
            const isSelected = p.id === selectedProjectId

            return (
              <div
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-[#F5F8FA] shadow-[0_0_15px_rgba(0,217,255,0.1)]'
                    : 'bg-[#10151D] border-[rgba(255,255,255,0.08)] text-[#A8B4C2] hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-400 font-bold font-mono text-[11px]">
                        {p.number}
                      </span>
                      <span className="font-bold font-mono text-xs text-[#F5F8FA] truncate">
                        {p.title}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#8491A2] font-mono mt-0.5 uppercase truncate">
                      {p.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {p.featured && (
                      <span title="Featured">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      </span>
                    )}
                    {p.visible ? (
                      <span title="Visible">
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      </span>
                    ) : (
                      <span title="Hidden">
                        <EyeOff className="w-3.5 h-3.5 text-[#8491A2]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex items-center justify-between pt-1.5 border-t border-[rgba(255,255,255,0.06)] text-[10px] text-[#8491A2]">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMove(idx, 'up')
                      }}
                      className="p-1 hover:text-white disabled:opacity-20 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === projects.length - 1}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMove(idx, 'down')
                      }}
                      className="p-1 hover:text-white disabled:opacity-20 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDuplicateProject(p)
                      }}
                      className="p-1 hover:text-cyan-300 transition-colors"
                      title="Duplicate project"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteProject(p.id)
                      }}
                      className="p-1 hover:text-red-400 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Grouped Project Editor (8 cols) */}
        {selectedProject ? (
          <div className="lg:col-span-8 p-4 sm:p-5 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-4">
            {/* Header with Title and Tab Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono font-bold">#{selectedProject.number}</span>
                <h4 className="text-sm font-mono font-bold text-[#F5F8FA] uppercase">
                  {selectedProject.title}
                </h4>
              </div>

              {/* Group Tabs */}
              <div className="flex items-center bg-black/40 border border-[rgba(255,255,255,0.07)] rounded-lg p-0.5 gap-0.5 overflow-x-auto">
                {(
                  [
                    { id: 'basic', label: 'Basic' },
                    { id: 'description', label: 'Description' },
                    { id: 'tech', label: 'Tech' },
                    { id: 'media', label: 'Media' },
                    { id: 'links', label: 'Links' },
                    { id: 'display', label: 'Display' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-[#8491A2] hover:text-[#F5F8FA]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab 1: Basic Information */}
            {activeTab === 'basic' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                      Project Number
                    </label>
                    <input
                      type="text"
                      value={selectedProject.number}
                      onChange={(e) => handleUpdate(selectedProject.id, { number: e.target.value })}
                      className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs font-mono text-[#F5F8FA]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={selectedProject.title}
                      onChange={(e) => handleUpdate(selectedProject.id, { title: e.target.value })}
                      className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs font-bold text-[#F5F8FA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={selectedProject.tagline || ''}
                    onChange={(e) => handleUpdate(selectedProject.id, { tagline: e.target.value })}
                    className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs text-[#F5F8FA]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                      Category
                    </label>
                    <select
                      value={selectedProject.category}
                      onChange={(e) =>
                        handleUpdate(selectedProject.id, {
                          category: e.target.value as 'ai' | 'cybersecurity' | 'fullstack',
                        })
                      }
                      className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs font-mono text-[#F5F8FA]"
                    >
                      <option value="ai">AI / Machine Learning</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="fullstack">Full-Stack Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                      Category Display Label
                    </label>
                    <input
                      type="text"
                      value={selectedProject.categoryLabel}
                      onChange={(e) =>
                        handleUpdate(selectedProject.id, { categoryLabel: e.target.value })
                      }
                      className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs text-[#F5F8FA]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Description */}
            {activeTab === 'description' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                    Short Description (Card Overview)
                  </label>
                  <textarea
                    rows={3}
                    value={selectedProject.shortDescription}
                    onChange={(e) =>
                      handleUpdate(selectedProject.id, { shortDescription: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs text-[#F5F8FA] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                    Long Technical Narrative (Modal / Case Study)
                  </label>
                  <textarea
                    rows={5}
                    value={selectedProject.longDescription}
                    onChange={(e) =>
                      handleUpdate(selectedProject.id, { longDescription: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs text-[#F5F8FA] resize-none"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Technologies */}
            {activeTab === 'tech' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                    Technologies (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={selectedProject.technologies.join(', ')}
                    onChange={(e) =>
                      handleUpdate(selectedProject.id, {
                        technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs font-mono text-[#F5F8FA]"
                  />
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Media & Cover */}
            {activeTab === 'media' && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {selectedProject.coverImage ? (
                      <img
                        src={selectedProject.coverImage}
                        alt="Project cover"
                        className="w-16 h-12 object-cover rounded-md border border-white/10"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-slate-800 rounded-md flex items-center justify-center text-slate-500">
                        No Img
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-mono font-bold text-[#F5F8FA]">Cover Photograph</div>
                      <div className="text-[10px] text-[#8491A2] font-mono">
                        {selectedProject.coverImage ? 'Custom Crop Configured' : 'Using Default Card Canvas'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPhotoStudioOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-[rgba(255,255,255,0.12)] text-xs font-mono text-[#F5F8FA] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Crop &amp; Position Cover</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 5: Links */}
            {activeTab === 'links' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={selectedProject.githubUrl || ''}
                    onChange={(e) => handleUpdate(selectedProject.id, { githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs font-mono text-[#F5F8FA]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                    Live Demo / Production URL
                  </label>
                  <input
                    type="url"
                    value={selectedProject.liveUrl || ''}
                    onChange={(e) => handleUpdate(selectedProject.id, { liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs font-mono text-[#F5F8FA]"
                  />
                </div>
              </div>
            )}

            {/* Tab 6: Display Settings */}
            {activeTab === 'display' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-[#F5F8FA] font-bold">Featured Status</div>
                      <div className="text-[10px] text-[#8491A2]">Showcase in primary grid</div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdate(selectedProject.id, { featured: !selectedProject.featured })
                      }
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedProject.featured
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-black/30 border-slate-800 text-slate-500'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-[#F5F8FA] font-bold">Visibility</div>
                      <div className="text-[10px] text-[#8491A2]">Display on public site</div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdate(selectedProject.id, { visible: !selectedProject.visible })
                      }
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedProject.visible
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-black/30 border-slate-800 text-slate-500'
                      }`}
                    >
                      {selectedProject.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8491A2] mb-1">
                    Accent Color Hex
                  </label>
                  <input
                    type="text"
                    value={selectedProject.accentColor}
                    onChange={(e) =>
                      handleUpdate(selectedProject.id, { accentColor: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs font-mono text-[#F5F8FA]"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-8 p-8 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] text-center text-[#8491A2] font-mono">
            No project selected. Click &quot;Add Project&quot; to create a new showcase.
          </div>
        )}
      </div>

      {/* Photo Studio Crop Modal for Project Cover */}
      {selectedProject && (
        <PhotoStudioModal
          isOpen={isPhotoStudioOpen}
          onClose={() => setIsPhotoStudioOpen(false)}
          imageSrc={selectedProject.coverImage || content.hero.profilePhoto?.path || ''}
          currentCrop={
            selectedProject.coverCrop ||
            content.hero.profilePhoto?.desktopCrop ||
            FALLBACK_CROP
          }
          onSaveCrop={handleSaveCoverCrop}
          title={`Project Cover — ${selectedProject.title}`}
        />
      )}
    </div>
  )
}
