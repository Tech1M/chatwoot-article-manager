import { useState, useEffect, useCallback } from 'react'
import { api, type FileEntry, type FileDetail, type SyncResult, type GitStatus } from './api'
import { useToast, ToastContainer } from './toast'

// ── File Browser Sidebar ─────────────────────────────────────────────────

function FileBrowser({
  files,
  active,
  onSelect,
  onNew,
  onRefresh,
}: {
  files: FileEntry[]
  active: string | null
  onSelect: (path: string) => void
  onNew: () => void
  onRefresh: () => void
}) {
  const grouped = files.reduce<Record<string, FileEntry[]>>((acc, f) => {
    const parts = f.path.split('/')
    const cat = parts.length > 1 ? parts.slice(0, -1).join('/') : '(root)'
    ;(acc[cat] ??= []).push(f)
    return acc
  }, {})

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>Articles ({files.length})</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="btn btn-ghost" style={{ padding: '2px 8px', fontSize: 12 }} onClick={onRefresh}>↻</button>
          <button className="btn btn-primary" style={{ padding: '2px 8px', fontSize: 12 }} onClick={onNew}>+ New</button>
        </div>
      </div>
      <ul className="file-list">
        {Object.entries(grouped).map(([cat, catFiles]) => (
          <li key={cat}>
            <div style={{ padding: '6px 12px', fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>
              {cat}
            </div>
            {catFiles.map(f => (
              <div
                key={f.path}
                className={`file-item ${active === f.path ? 'active' : ''}`}
                onClick={() => onSelect(f.path)}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="title">{f.title}</div>
                  <div className="path">{f.path}</div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <SyncBadge file={f} />
                  <StatusBadge status={f.status} />
                </div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase()
  if (s === 'published' || s === 'ready') return <span className="badge badge-published">{s}</span>
  return <span className="badge badge-draft">{s}</span>
}

function SyncBadge({ file }: { file: FileEntry }) {
  if (file.new) return <span className="badge badge-new">new</span>
  if (file.has_changes) return <span className="badge badge-changed">changed</span>
  if (file.synced) return <span className="badge badge-synced">✓</span>
  return null
}

// ── Editor ──────────────────────────────────────────────────────────────

function Editor({
  detail,
  onSave,
  onDelete,
  saving,
}: {
  detail: FileDetail
  onSave: (fm: Record<string, unknown>, body: string, publish: boolean) => void
  onDelete: () => void
  saving: boolean
}) {
  const [fm, setFm] = useState<Record<string, unknown>>(detail.frontmatter)
  const [body, setBody] = useState(detail.body)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    setFm(detail.frontmatter)
    setBody(detail.body)
    setDirty(false)
  }, [detail])

  const updateFm = (key: string, value: unknown) => {
    setFm(prev => ({ ...prev, [key]: value }))
    setDirty(true)
  }

  const handleSaveDraft = () => {
    const updated = { ...fm, status: 'drafted' }
    onSave(updated, body, false)
    setDirty(false)
  }

  const handlePublish = () => {
    const updated = { ...fm, status: 'ready' }
    onSave(updated, body, true)
    setDirty(false)
  }

  const status = String(fm.status ?? 'drafted').toLowerCase()
  const isPublished = status === 'published' || status === 'ready'

  return (
    <div className="editor-area">
      <div className="editor-toolbar">
        <span style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{String(fm.title || detail.path)}</span>
        {dirty && <span className="badge badge-changed">unsaved</span>}
        <StatusBadge status={status} />
        <button className="btn btn-ghost" onClick={handleSaveDraft} disabled={saving}>
          Save Draft
        </button>
        <button className="btn btn-success" onClick={handlePublish} disabled={saving}>
          {isPublished ? '✓ Published' : 'Publish'}
        </button>
        <button className="btn btn-danger" onClick={onDelete} disabled={saving} style={{ padding: '6px 10px' }}>
          🗑
        </button>
      </div>

      <div className="editor-meta">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={String(fm.title ?? '')}
            onChange={e => updateFm('title', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Slug</label>
          <input
            type="text"
            value={String(fm.slug ?? '')}
            onChange={e => updateFm('slug', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Category Slug</label>
          <input
            type="text"
            value={String(fm.category_slug ?? '')}
            onChange={e => updateFm('category_slug', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Position</label>
          <input
            type="text"
            value={String(fm.position ?? '')}
            onChange={e => updateFm('position', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="editor-meta" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            value={String(fm.description ?? '')}
            onChange={e => updateFm('description', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={(() => {
              const meta = fm.meta as Record<string, unknown> | undefined
              const tags = meta?.tags
              return Array.isArray(tags) ? tags.join(', ') : ''
            })()}
            onChange={e => {
              const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              const meta = (fm.meta ?? {}) as Record<string, unknown>
              updateFm('meta', { ...meta, tags })
            }}
          />
        </div>
      </div>

      <div className="editor-content">
        <textarea
          value={body}
          onChange={e => { setBody(e.target.value); setDirty(true) }}
          spellCheck={false}
        />
      </div>
    </div>
  )
}

// ── New Article Modal ───────────────────────────────────────────────────

function NewArticleModal({ onClose, onCreate }: {
  onClose: () => void
  onCreate: (path: string, title: string, category: string) => void
}) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [filename, setFilename] = useState('')

  useEffect(() => {
    if (title && !filename) {
      // Auto-suggest filename from title
    }
  }, [title, filename])

  const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').trim()
  const autoPath = category ? `${category}/${slug}.md` : `${slug}.md`

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>New Article</h2>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="My New Article" autoFocus />
        </div>
        <div className="form-group">
          <label>Category Slug (folder)</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="getting-started" />
        </div>
        <div className="form-group">
          <label>File Path</label>
          <input type="text" value={filename || autoPath} onChange={e => setFilename(e.target.value)} />
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={!title} onClick={() => onCreate(filename || autoPath, title, category)}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Git Panel ───────────────────────────────────────────────────────────

function GitPanel({ addToast }: { addToast: (msg: string, type: 'success' | 'error' | 'info') => void }) {
  const [status, setStatus] = useState<GitStatus | null>(null)
  const [commitMsg, setCommitMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const s = await api.gitStatus()
      setStatus(s)
    } catch {
      setStatus(null)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const handleCommit = async () => {
    if (!commitMsg.trim()) return
    setLoading(true)
    try {
      await api.gitCommit(commitMsg)
      addToast('Committed successfully', 'success')
      setCommitMsg('')
      refresh()
    } catch (e: unknown) {
      addToast(`Commit failed: ${e instanceof Error ? e.message : e}`, 'error')
    }
    setLoading(false)
  }

  const handlePush = async () => {
    setLoading(true)
    try {
      await api.gitPush()
      addToast('Pushed to remote', 'success')
    } catch (e: unknown) {
      addToast(`Push failed: ${e instanceof Error ? e.message : e}`, 'error')
    }
    setLoading(false)
  }

  if (!status) return null

  return (
    <div className="git-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-dim)' }}>
          Git {status.clean ? '✓ clean' : `(${status.changes.length} changes)`}
        </span>
        <button className="btn btn-ghost" style={{ padding: '2px 8px', fontSize: 11 }} onClick={refresh}>↻</button>
      </div>
      {status.changes.length > 0 && (
        <>
          <div className="git-changes">
            {status.changes.map((c, i) => (
              <div key={i} className="git-change">
                <span className="git-status-code">{c.status}</span>
                <span>{c.file}</span>
              </div>
            ))}
          </div>
          <div className="commit-row">
            <input
              type="text"
              placeholder="Commit message..."
              value={commitMsg}
              onChange={e => setCommitMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCommit()}
            />
            <button className="btn btn-primary" onClick={handleCommit} disabled={loading || !commitMsg.trim()}>
              Commit
            </button>
            <button className="btn btn-ghost" onClick={handlePush} disabled={loading}>
              Push
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── Sync Panel ──────────────────────────────────────────────────────────

function SyncPanel({ addToast, onSyncDone }: {
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void
  onSyncDone: () => void
}) {
  const [results, setResults] = useState<SyncResult | null>(null)
  const [loading, setLoading] = useState(false)

  const runSync = async (dryRun: boolean) => {
    setLoading(true)
    try {
      const r = await api.sync(dryRun)
      setResults(r)
      const label = dryRun ? 'Dry run' : 'Sync'
      addToast(`${label}: ${r.created} created, ${r.updated} updated, ${r.skipped} skipped, ${r.failed} failed`, r.failed > 0 ? 'error' : 'success')
      if (!dryRun) onSyncDone()
    } catch (e: unknown) {
      addToast(`Sync failed: ${e instanceof Error ? e.message : e}`, 'error')
    }
    setLoading(false)
  }

  return (
    <div className="sync-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-dim)', flex: 1 }}>
          Chatwoot Sync
        </span>
        <button className="btn btn-ghost" onClick={() => runSync(true)} disabled={loading}>
          Dry Run
        </button>
        <button className="btn btn-primary" onClick={() => runSync(false)} disabled={loading}>
          {loading ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>
      {results && (
        <div className="sync-results">
          <div style={{ marginBottom: 8, fontSize: 12, color: 'var(--text-dim)' }}>
            Total: {results.total} | Created: {results.created} | Updated: {results.updated} | Skipped: {results.skipped} | Failed: {results.failed}
          </div>
          {results.details.map((d, i) => (
            <div key={i} className="detail">
              <span className={`badge ${d.action === 'create' ? 'badge-new' : d.action === 'update' ? 'badge-changed' : 'badge-synced'}`}>
                {d.action}
              </span>
              <span style={{ flex: 1 }}>{d.file}</span>
              {d.error && <span style={{ color: 'var(--red)', fontSize: 11 }}>{d.error}</span>}
              {d.dry_run && <span className="badge badge-draft">dry run</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── App ─────────────────────────────────────────────────────────────────

export function App() {
  const [files, setFiles] = useState<FileEntry[]>([])
  const [activePath, setActivePath] = useState<string | null>(null)
  const [detail, setDetail] = useState<FileDetail | null>(null)
  const [saving, setSaving] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const { toasts, addToast } = useToast()

  const loadFiles = useCallback(async () => {
    try {
      const { files } = await api.listFiles()
      setFiles(files)
    } catch (e: unknown) {
      addToast(`Failed to load files: ${e instanceof Error ? e.message : e}`, 'error')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { loadFiles() }, [loadFiles])

  const selectFile = async (path: string) => {
    try {
      const d = await api.readFile(path)
      setDetail(d)
      setActivePath(path)
    } catch (e: unknown) {
      addToast(`Failed to open: ${e instanceof Error ? e.message : e}`, 'error')
    }
  }

  const handleSave = async (fm: Record<string, unknown>, body: string, _publish: boolean) => {
    if (!activePath) return
    setSaving(true)
    try {
      await api.saveFile(activePath, fm, body)
      addToast(`Saved ${activePath}`, 'success')
      loadFiles()
      // Reload detail to get fresh data
      const d = await api.readFile(activePath)
      setDetail(d)
    } catch (e: unknown) {
      addToast(`Save failed: ${e instanceof Error ? e.message : e}`, 'error')
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!activePath || !confirm(`Delete ${activePath}?`)) return
    try {
      await api.deleteFile(activePath)
      addToast(`Deleted ${activePath}`, 'info')
      setActivePath(null)
      setDetail(null)
      loadFiles()
    } catch (e: unknown) {
      addToast(`Delete failed: ${e instanceof Error ? e.message : e}`, 'error')
    }
  }

  const handleCreate = async (path: string, title: string, category: string) => {
    try {
      await api.createFile(path, title, category)
      addToast(`Created ${path}`, 'success')
      setShowNew(false)
      await loadFiles()
      selectFile(path)
    } catch (e: unknown) {
      addToast(`Create failed: ${e instanceof Error ? e.message : e}`, 'error')
    }
  }

  return (
    <div className="layout">
      <div className="topbar">
        <h1>📝 Chatwoot Article Manager</h1>
        <div className="topbar-actions">
          <SyncPanel addToast={addToast} onSyncDone={loadFiles} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <FileBrowser
          files={files}
          active={activePath}
          onSelect={selectFile}
          onNew={() => setShowNew(true)}
          onRefresh={loadFiles}
        />
        <GitPanel addToast={addToast} />
      </div>

      {detail ? (
        <Editor detail={detail} onSave={handleSave} onDelete={handleDelete} saving={saving} />
      ) : (
        <div className="editor-empty">
          Select an article or create a new one
        </div>
      )}

      {showNew && <NewArticleModal onClose={() => setShowNew(false)} onCreate={handleCreate} />}
      <ToastContainer toasts={toasts} />
    </div>
  )
}

