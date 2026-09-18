import { useState, useEffect, useCallback } from 'react'
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Search, X, Save, ChevronDown,
  FileText, Tag, User, Calendar, Image,
} from 'lucide-react'
import {
  AdminPost, PostStatus,
  getPosts, savePost, updatePost, deletePost,
} from '../adminStore'

interface PostsSectionProps {
  type: 'news' | 'blog'
}

const STATUS_COLORS: Record<PostStatus, string> = {
  published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  draft:     'bg-amber-100  text-amber-700  border-amber-200',
  archived:  'bg-charcoal-100 text-charcoal-500 border-charcoal-200',
}

const CATEGORIES_NEWS  = ['News', 'Press Release', 'Announcement', 'Update']
const CATEGORIES_BLOG  = ['Leadership', 'Governance', 'Youth', 'Democracy', 'Opinion', 'Interview']

const EMPTY_FORM = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  author: '',
  imageUrl: '',
  tags: '',
  status: 'draft' as PostStatus,
}

export default function PostsSection({ type }: PostsSectionProps) {
  const [posts, setPosts]         = useState<AdminPost[]>([])
  const [search, setSearch]       = useState('')
  const [filterStatus, setFilter] = useState<PostStatus | 'all'>('all')
  const [editing, setEditing]     = useState<AdminPost | null>(null)
  const [creating, setCreating]   = useState(false)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saved, setSaved]         = useState(false)

  const load = useCallback(() => {
    setPosts(getPosts().filter((p) => p.type === type))
  }, [type])

  useEffect(() => { load() }, [load])

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || p.status === filterStatus
    return matchSearch && matchStatus
  })

  function openCreate() {
    setForm({ ...EMPTY_FORM, category: (type === 'news' ? CATEGORIES_NEWS : CATEGORIES_BLOG)[0] })
    setEditing(null)
    setCreating(true)
  }

  function openEdit(post: AdminPost) {
    setForm({
      title:    post.title,
      excerpt:  post.excerpt,
      content:  post.content,
      category: post.category,
      author:   post.author,
      imageUrl: post.imageUrl,
      tags:     post.tags.join(', '),
      status:   post.status,
    })
    setEditing(post)
    setCreating(false)
  }

  function closeForm() {
    setEditing(null)
    setCreating(false)
    setForm(EMPTY_FORM)
  }

  function handleSave() {
    if (!form.title.trim()) return
    const payload = {
      type,
      title:    form.title.trim(),
      excerpt:  form.excerpt.trim(),
      content:  form.content.trim(),
      category: form.category,
      author:   form.author.trim(),
      imageUrl: form.imageUrl.trim(),
      tags:     form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status:   form.status,
    }
    if (editing) {
      updatePost(editing.id, payload)
    } else {
      savePost(payload)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    closeForm()
    load()
  }

  function handleDelete(id: string) {
    deletePost(id)
    setDeleteConfirm(null)
    load()
  }

  function toggleStatus(post: AdminPost) {
    const next: PostStatus = post.status === 'published' ? 'draft' : 'published'
    updatePost(post.id, { status: next })
    load()
  }

  const categories = type === 'news' ? CATEGORIES_NEWS : CATEGORIES_BLOG
  const typeLabel  = type === 'news' ? 'News Post' : 'Blog Article'

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-heading font-black text-charcoal-900">
            {type === 'news' ? 'News Posts' : 'Blog Articles'}
          </h2>
          <p className="text-charcoal-400 text-sm mt-0.5">
            {posts.length} {posts.length === 1 ? typeLabel.toLowerCase() : (type === 'news' ? 'news posts' : 'blog articles')}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} aria-hidden="true" />
          New {typeLabel}
        </button>
      </div>

      {/* Saved toast */}
      {saved && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" aria-hidden="true" />
          {typeLabel} saved successfully.
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-300" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${type === 'news' ? 'news' : 'articles'}…`}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-charcoal-200 rounded-xl bg-white focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilter(e.target.value as PostStatus | 'all')}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-charcoal-200 rounded-xl bg-white focus:outline-none focus:border-navy-400 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-charcoal-400">
            <FileText size={32} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p className="text-sm">
              {search || filterStatus !== 'all'
                ? 'No posts match your filters.'
                : `No ${type === 'news' ? 'news posts' : 'blog articles'} yet. Create one above.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-charcoal-100 bg-charcoal-50/60">
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-5 py-3">Title</th>
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-3 py-3">Category</th>
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-3 py-3">Author</th>
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-3 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-3 py-3">Date</th>
                  <th className="px-3 py-3" aria-label="Actions" />
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-50">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-charcoal-50/40 transition-colors group">
                    <td className="px-5 py-3 font-medium text-charcoal-800 max-w-[220px] truncate">{post.title}</td>
                    <td className="px-3 py-3 text-charcoal-500">{post.category}</td>
                    <td className="px-3 py-3 text-charcoal-500 truncate max-w-[120px]">{post.author}</td>
                    <td className="px-3 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${STATUS_COLORS[post.status]}`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-charcoal-400 text-xs whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                        <button
                          onClick={() => toggleStatus(post)}
                          title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
                          aria-label={post.status === 'published' ? 'Unpublish post' : 'Publish post'}
                        >
                          {post.status === 'published' ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button
                          onClick={() => openEdit(post)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
                          aria-label="Edit post"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          aria-label="Delete post"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 id="delete-dialog-title" className="text-charcoal-900 font-bold text-lg mb-2">Delete Post?</h3>
            <p className="text-charcoal-500 text-sm mb-6">This action cannot be undone. The post will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-charcoal-200 text-charcoal-700 text-sm font-semibold hover:bg-charcoal-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit drawer */}
      {(creating || editing) && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-start justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-form-title"
        >
          <div className="relative bg-white h-full w-full max-w-xl overflow-y-auto shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100 sticky top-0 bg-white z-10">
              <h3 id="post-form-title" className="font-heading font-bold text-charcoal-900 text-lg">
                {editing ? `Edit ${typeLabel}` : `New ${typeLabel}`}
              </h3>
              <button
                onClick={closeForm}
                className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form body */}
            <div className="flex-1 px-6 py-5 space-y-5">
              {/* Title */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                  <FileText size={12} aria-hidden="true" /> Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={`${typeLabel} title`}
                  className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
                  required
                />
              </div>

              {/* Category + Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                    <Tag size={12} aria-hidden="true" /> Category
                  </label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full appearance-none border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 pr-8 bg-white cursor-pointer"
                    >
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                    <User size={12} aria-hidden="true" /> Author
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Author name"
                    className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                  <Calendar size={12} aria-hidden="true" /> Status
                </label>
                <div className="flex gap-2">
                  {(['draft', 'published', 'archived'] as PostStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, status: s })}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        form.status === s
                          ? STATUS_COLORS[s]
                          : 'border-charcoal-200 text-charcoal-400 hover:border-charcoal-300'
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5 block">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Short description shown in listings…"
                  className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5 block">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={10}
                  placeholder="Full article content… (Markdown supported)"
                  className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all resize-y font-mono"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                  <Image size={12} aria-hidden="true" /> Cover Image URL
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://…"
                  className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1.5">
                  <Tag size={12} aria-hidden="true" /> Tags <span className="text-charcoal-300 normal-case font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Leadership, Africa, Youth"
                  className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
                />
              </div>
            </div>

            {/* Drawer footer */}
            <div className="px-6 py-4 border-t border-charcoal-100 bg-charcoal-50/60 flex gap-3 sticky bottom-0">
              <button
                onClick={closeForm}
                className="flex-1 py-2.5 rounded-xl border border-charcoal-200 text-charcoal-700 text-sm font-semibold hover:bg-charcoal-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.title.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                <Save size={15} aria-hidden="true" />
                {editing ? 'Save Changes' : `Publish ${typeLabel}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
