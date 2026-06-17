export interface BlogPostSubSection {
  heading: string
  content: string
}

export interface BlogPostTable {
  headers: string[]
  rows: string[][]
}

export interface BlogPostImage {
  src: string
  alt: string
  caption?: string
}

export interface BlogPostSection {
  heading: string
  content: string
  image?: BlogPostImage
  subSections?: BlogPostSubSection[]
  table?: BlogPostTable
}

export interface BlogPostFaq {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  publishedAt: string
  lastModified: string
  heroImage: string
  heroAlt: string
  excerpt: string
  toolId?: string
  showInlineTool: boolean
  sections: BlogPostSection[]
  faqs: BlogPostFaq[]
  relatedToolIds?: string[]
}
