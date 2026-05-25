export interface BlogPostSection {
  heading: string
  body: string
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
  sections: BlogPostSection[]
  faqs: BlogPostFaq[]
  showInlineTool: boolean
}
