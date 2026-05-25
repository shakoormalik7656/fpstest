import type { MetadataRoute } from 'next'
import { TOOLS } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog-posts/index'

const BASE_URL = 'https://fpstest.pro'
const CONTENT_DATE = new Date('2025-05-25')

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: CONTENT_DATE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map(tool => ({
    url: `${BASE_URL}/tools/${tool.id}`,
    lastModified: CONTENT_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...toolRoutes, ...blogRoutes]
}
