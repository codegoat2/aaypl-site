export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  author: string
  imageUrl: string
  tags: string[]
}

export const newsArticles: NewsArticle[] = [
  {
    slug: 'aaypl-established',
    title: 'All Africa Young Political Leaders Organization Formally Established',
    excerpt: 'AAYPL is formally established as a continental non-governmental, non-partisan organization dedicated to developing young African leaders and promoting democratic governance across Africa.',
    content: `
The All Africa Young Political Leaders Organization (AAYPL) has been formally established as a continental non-governmental and non-partisan organization dedicated to developing young African leaders across all 54 member states of the African Union.

AAYPL was founded by young African leaders committed to building a generation of ethical, competent, visionary, and responsible leaders who are dedicated to peace, democracy, good governance, development, and African unity.

The organization operates under the motto "Unity, Leadership, Integrity and Service" — four principles that define both its character and its ambition for Africa's young political and public leaders.

**A Continental Mission**

AAYPL's establishment marks a significant step in organized pan-African youth leadership. The organization is designed to operate at every level of the continent — from continental governance through its Board of Trustees and Continental Executive Council, to regional councils, national chapters, and ultimately to local communities.

The founding of AAYPL reflects a recognition that Africa's future depends on developing a generation of young leaders who are not only skilled and knowledgeable but also genuinely committed to democratic values, peaceful political participation, and the collective progress of the continent.

**Non-Partisan by Design**

A cornerstone of AAYPL's identity is its non-partisan character. The organization is explicitly designed to welcome young leaders from all political backgrounds, bringing them together around shared values of democracy, integrity, and service — rather than any particular political ideology or party affiliation.

This approach, which is enshrined in the AAYPL Constitution, is central to the organization's ability to serve as a credible continental platform for all of Africa's young leaders regardless of their political perspectives.

**Looking Ahead**

AAYPL is now accepting applications for founding membership. Young Africans who share the organization's vision and are committed to its mission and values are encouraged to apply.

The organization expects to hold its inaugural Continental Leadership Summit in the near future, at which its founding leadership will be formally elected and the strategic agenda for the organization's first term will be adopted.
    `,
    category: 'News',
    date: '2026-01-01',
    author: 'AAYPL Secretariat',
    imageUrl: '',
    tags: ['Founding', 'Establishment', 'Pan-African', 'Youth Leadership'],
  },
  {
    slug: 'aaypl-constitution-adopted',
    title: 'AAYPL Constitution Adopted: A Foundation for Continental Leadership',
    excerpt: 'The organization adopts its founding constitution, establishing the governance framework, membership structure, and guiding principles for the All Africa Young Political Leaders Organization.',
    content: `
The founding members of the All Africa Young Political Leaders Organization (AAYPL) have adopted the organization's founding Constitution — the supreme governing document that will guide the organization, its members, and its operations across the African continent.

The AAYPL Constitution consists of 26 Articles covering every aspect of the organization's governance, from its name, nature, vision, and mission, to its membership structure, organizational organs, electoral processes, financial management, and constitutional amendment procedures.

**Key Provisions**

The Constitution establishes AAYPL as a "continental, non-governmental, and non-partisan organization" (Article 2) committed to democratic governance, the rule of law, and the peaceful participation of young people in political and public life.

The document sets out ten core objectives for the organization (Article 6) and fifteen guiding principles (Article 7) that govern both organizational conduct and the expected behavior of members.

**Governance Architecture**

The Constitution establishes a multi-tier governance structure including:

- The General Assembly as the supreme organ of AAYPL
- The Board of Trustees as the governance and oversight body
- The Continental Executive Council as the executive organ
- Regional Councils for the five African regions
- National, State/Provincial, and Local Chapters

**Membership Framework**

The Constitution defines five categories of membership: Founding Members, Ordinary Members, Associate Members, Honorary Members, and Institutional/Partner Members — creating a framework that can accommodate the full spectrum of those who wish to engage with AAYPL's mission.

**Political Independence**

Article 19 enshrines AAYPL's political independence, prohibiting the organization from endorsing or opposing any political party or candidate, while preserving the right of individual members to their personal political views — a balanced approach that reflects the organization's commitment to genuine non-partisanship.

The full AAYPL Constitution is available to read on the AAYPL website.
    `,
    category: 'Governance',
    date: '2026-01-01',
    author: 'AAYPL Secretariat',
    imageUrl: '',
    tags: ['Constitution', 'Governance', 'Founding', 'Legal'],
  },
  {
    slug: 'call-for-founding-members',
    title: 'AAYPL Opens Applications for Founding Membership',
    excerpt: 'Young African political and public leaders are invited to apply as Founding Members of the newly established All Africa Young Political Leaders Organization.',
    content: `
The All Africa Young Political Leaders Organization (AAYPL) is pleased to open applications for Founding Membership — an opportunity for young African leaders to be among the founding generation of this continental platform.

Founding membership is a special category of AAYPL membership available to eligible young Africans who join the organization during its founding period. Founding members hold a unique place in the history of the organization and will be formally recognized as part of AAYPL's founding generation.

**Who Should Apply**

AAYPL's founding membership invitation is directed at young Africans who:

- Are committed to democratic governance, the rule of law, and peaceful political participation
- Have demonstrated or aspire to demonstrate leadership in political or public life
- Share AAYPL's values of unity, leadership, integrity, and service
- Are willing to abide by the AAYPL Constitution and Code of Conduct

The organization welcomes applicants from all African countries, all political backgrounds, and all areas of public life — from elected officials and party members to civil society leaders, community organizers, students, academics, and young professionals.

**How to Apply**

Interested individuals can apply through the membership application form on the AAYPL website. The form asks for basic personal and professional information, the selection of a membership category, areas of interest, and a short statement explaining why you wish to join AAYPL and what you hope to contribute.

**Important Note**

Submission of a membership application does not automatically confer membership. All applications are subject to review in accordance with the AAYPL Constitution and membership procedures. Applicants will be notified of the outcome of their applications.

We look forward to welcoming the founding generation of AAYPL.
    `,
    category: 'Membership',
    date: '2026-01-01',
    author: 'AAYPL Secretariat',
    imageUrl: '',
    tags: ['Membership', 'Founding', 'Application', 'Youth'],
  },
]

export const newsCategories = [
  'All',
  'News',
  'Governance',
  'Leadership',
  'Events',
  'Policy',
  'Democracy & Governance',
  'Youth Development',
  'Peace & Security',
  'Pan-African Affairs',
  'Membership',
]
