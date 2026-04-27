const BASE = '/api'

async function request<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status}: ${text}`)
  }
  return res.json()
}

export type FileEntry = {
  path: string
  slug: string
  title: string
  status: string
  category_slug: string
  synced: boolean
  has_changes: boolean
  new: boolean
}

export type FileDetail = {
  path: string
  frontmatter: Record<string, unknown>
  body: string
  raw: string
}

export type SyncResult = {
  total: number
  created: number
  updated: number
  skipped: number
  failed: number
  details: Array<{
    file: string
    slug: string
    action: string
    ok?: boolean
    error?: string
    dry_run?: boolean
  }>
}

export type GitStatus = {
  ok: boolean
  changes: Array<{ status: string; file: string }>
  clean: boolean
  error?: string
}

export const api = {
  listFiles: () => request<{ files: FileEntry[] }>('/files'),
  readFile: (path: string) => request<FileDetail>(`/files/${path}`),
  saveFile: (path: string, frontmatter: Record<string, unknown>, body: string) =>
    request<{ ok: boolean }>(`/files/${path}`, {
      method: 'PUT',
      body: JSON.stringify({ frontmatter, body }),
    }),
  createFile: (path: string, title: string, category_slug: string) =>
    request<{ ok: boolean; path: string; slug: string }>('/files', {
      method: 'POST',
      body: JSON.stringify({ path, title, category_slug }),
    }),
  deleteFile: (path: string) =>
    request<{ ok: boolean }>(`/files/${path}`, { method: 'DELETE' }),

  sync: (dry_run = false, chunk_size = 10) =>
    request<SyncResult>('/sync', {
      method: 'POST',
      body: JSON.stringify({ dry_run, chunk_size }),
    }),

  gitStatus: () => request<GitStatus>('/git/status'),
  gitCommit: (message: string, files?: string[]) =>
    request<{ ok: boolean; output: string }>('/git/commit', {
      method: 'POST',
      body: JSON.stringify({ message, files }),
    }),
  gitPush: () =>
    request<{ ok: boolean; output: string }>('/git/push', { method: 'POST' }),

  getConfig: () => request<{ chatwoot_url: string; portal_slug: string; docs_dir: string }>('/config'),
  listCategories: () => request<{ categories: Array<{ id: number; name: string; slug: string }> }>('/categories'),
}

