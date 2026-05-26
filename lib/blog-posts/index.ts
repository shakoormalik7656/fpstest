import type { BlogPost } from './types'
import ufoPsFpsTest from './ufo-fps-test'

export const BLOG_POSTS: BlogPost[] = [ufoPsFpsTest]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
