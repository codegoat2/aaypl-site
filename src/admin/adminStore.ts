// ── Admin Data Store ─────────────────────────────────────────────────────────
// All data is persisted in localStorage so it survives page refreshes.
// In a production setup these would be Supabase tables.

import { logActivity } from './useAdminAuth'

// ── Types ─────────────────────────────────────────────────────────────────────

export type PostStatus = 'draft' | 'published' | 'archived'

export interface AdminPost {
  id: string
  type: 'news' | 'blog'
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  imageUrl: string
  tags: string[]
  status: PostStatus
  createdAt: string
  updatedAt: string
}

export type MemberStatus = 'pending' | 'approved' | 'rejected' | 'under_review'

export interface MemberApplication {
  id: string
  full_name: string
  email: string
  phone: string | null
  country: string
  city: string | null
  date_of_birth: string | null
  occupation: string | null
  organization: string | null
  leadership_role: string | null
  membership_category: string
  areas_of_interest: string[] | null
  statement_of_interest: string
  linkedin_url: string | null
  agreed_to_constitution: boolean
  consented_to_privacy: boolean
  status: MemberStatus
  created_at: string
  updated_at: string
}

export type MessageStatus = 'unread' | 'read' | 'replied'

export interface SupportMessage {
  id: string
  name: string
  email: string
  country: string | null
  subject: string
  message: string
  status: MessageStatus
  reply?: string
  created_at: string
}

// ── Keys ──────────────────────────────────────────────────────────────────────

const POSTS_KEY = 'aaypl_admin_posts'
const MEMBERS_KEY = 'aaypl_admin_members'
const SUPPORT_KEY = 'aaypl_admin_support'

// ── Generic helpers ───────────────────────────────────────────────────────────

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

function save<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // ignore quota errors
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

// ── Posts (News + Blog) ────────────────────────────────────────────────────────

export function getPosts(): AdminPost[] {
  return load<AdminPost>(POSTS_KEY)
}

export function getPost(id: string): AdminPost | undefined {
  return getPosts().find((p) => p.id === id)
}

export function savePost(post: Omit<AdminPost, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): AdminPost {
  const posts = getPosts()
  const now = new Date().toISOString()
  const newPost: AdminPost = {
    ...post,
    id: crypto.randomUUID(),
    slug: generateSlug(post.title),
    createdAt: now,
    updatedAt: now,
  }
  save(POSTS_KEY, [newPost, ...posts])
  logActivity('POST_CREATE', `Created ${post.type} post: "${post.title}"`)
  return newPost
}

export function updatePost(id: string, updates: Partial<Omit<AdminPost, 'id' | 'createdAt'>>): AdminPost | null {
  const posts = getPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return null
  const updated: AdminPost = {
    ...posts[idx],
    ...updates,
    slug: updates.title ? generateSlug(updates.title) : posts[idx].slug,
    updatedAt: new Date().toISOString(),
  }
  posts[idx] = updated
  save(POSTS_KEY, posts)
  logActivity('POST_UPDATE', `Updated post: "${updated.title}"`)
  return updated
}

export function deletePost(id: string): void {
  const posts = getPosts()
  const post = posts.find((p) => p.id === id)
  save(POSTS_KEY, posts.filter((p) => p.id !== id))
  if (post) logActivity('POST_DELETE', `Deleted post: "${post.title}"`)
}

// ── Members ────────────────────────────────────────────────────────────────────

export function getMembers(): MemberApplication[] {
  return load<MemberApplication>(MEMBERS_KEY)
}

export function updateMemberStatus(id: string, status: MemberStatus): MemberApplication | null {
  const members = getMembers()
  const idx = members.findIndex((m) => m.id === id)
  if (idx === -1) return null
  members[idx] = { ...members[idx], status, updated_at: new Date().toISOString() }
  save(MEMBERS_KEY, members)
  logActivity('MEMBER_STATUS', `Member ${members[idx].full_name} → ${status}`)
  return members[idx]
}

export function deleteMember(id: string): void {
  const members = getMembers()
  const m = members.find((x) => x.id === id)
  save(MEMBERS_KEY, members.filter((x) => x.id !== id))
  if (m) logActivity('MEMBER_DELETE', `Deleted member: ${m.full_name}`)
}

export function seedDemoMembers(): void {
  if (getMembers().length > 0) return
  const now = new Date().toISOString()
  const demo: MemberApplication[] = [
    {
      id: crypto.randomUUID(),
      full_name: 'Amara Diallo',
      email: 'amara.diallo@example.com',
      phone: '+221 77 000 0001',
      country: 'Senegal',
      city: 'Dakar',
      date_of_birth: '1998-04-12',
      occupation: 'Student',
      organization: 'University of Dakar',
      leadership_role: 'Student Union President',
      membership_category: 'Youth Member',
      areas_of_interest: ['Governance', 'Democracy'],
      statement_of_interest: 'I am passionate about youth-led democratic governance across Africa.',
      linkedin_url: null,
      agreed_to_constitution: true,
      consented_to_privacy: true,
      status: 'pending',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      full_name: 'Kwame Asante',
      email: 'kwame.asante@example.com',
      phone: '+233 50 000 0002',
      country: 'Ghana',
      city: 'Accra',
      date_of_birth: '1995-09-23',
      occupation: 'Lawyer',
      organization: 'Asante & Partners',
      leadership_role: 'Legal Officer',
      membership_category: 'Associate Member',
      areas_of_interest: ['Rule of Law', 'Human Rights'],
      statement_of_interest: 'My legal career is dedicated to advancing rule of law in West Africa.',
      linkedin_url: 'https://linkedin.com/in/kwameasante',
      agreed_to_constitution: true,
      consented_to_privacy: true,
      status: 'under_review',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      full_name: 'Fatima Nkosi',
      email: 'fatima.nkosi@example.com',
      phone: '+27 81 000 0003',
      country: 'South Africa',
      city: 'Johannesburg',
      date_of_birth: '2000-02-17',
      occupation: 'Journalist',
      organization: 'SA Youth Media',
      leadership_role: 'Editor',
      membership_category: 'Youth Member',
      areas_of_interest: ['Media', 'Leadership'],
      statement_of_interest: 'Using journalism to amplify youth voices in politics.',
      linkedin_url: null,
      agreed_to_constitution: true,
      consented_to_privacy: true,
      status: 'approved',
      created_at: now,
      updated_at: now,
    },
  ]
  save(MEMBERS_KEY, demo)
}

// ── Support Messages ───────────────────────────────────────────────────────────

export function getSupportMessages(): SupportMessage[] {
  return load<SupportMessage>(SUPPORT_KEY)
}

export function updateMessageStatus(id: string, status: MessageStatus, reply?: string): SupportMessage | null {
  const messages = getSupportMessages()
  const idx = messages.findIndex((m) => m.id === id)
  if (idx === -1) return null
  messages[idx] = { ...messages[idx], status, reply: reply ?? messages[idx].reply }
  save(SUPPORT_KEY, messages)
  logActivity('SUPPORT_UPDATE', `Support message from ${messages[idx].name} → ${status}`)
  return messages[idx]
}

export function deleteMessage(id: string): void {
  const messages = getSupportMessages()
  const m = messages.find((x) => x.id === id)
  save(SUPPORT_KEY, messages.filter((x) => x.id !== id))
  if (m) logActivity('SUPPORT_DELETE', `Deleted message from: ${m.name}`)
}

export function seedDemoMessages(): void {
  if (getSupportMessages().length > 0) return
  const now = new Date().toISOString()
  const demo: SupportMessage[] = [
    {
      id: crypto.randomUUID(),
      name: 'Ibrahim Touré',
      email: 'ibrahim.toure@example.com',
      country: 'Côte d\'Ivoire',
      subject: 'Membership Application Status',
      message: 'Hello, I submitted my membership application two weeks ago and have not received an update. Could you please advise on the status?',
      status: 'unread',
      created_at: now,
    },
    {
      id: crypto.randomUUID(),
      name: 'Grace Osei',
      email: 'grace.osei@example.com',
      country: 'Ghana',
      subject: 'Partnership Inquiry',
      message: 'Our NGO, African Women in Leadership, is interested in forming a partnership with AAYPL. Please get in touch.',
      status: 'read',
      created_at: now,
    },
    {
      id: crypto.randomUUID(),
      name: 'Moussa Traoré',
      email: 'moussa.traore@example.com',
      country: 'Mali',
      subject: 'Event Registration Question',
      message: 'I would like to attend the upcoming Continental Leadership Summit. Is registration open to non-members?',
      status: 'replied',
      reply: 'Thank you for your interest! Registration details will be announced shortly on our website. Non-members may attend select sessions.',
      created_at: now,
    },
  ]
  save(SUPPORT_KEY, demo)
}
