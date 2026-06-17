import type { BlogPost } from './types'
import ufoPsFpsTest from './ufo-fps-test'
import whatIsGoodFps from './what-is-a-good-fps-for-gaming'
import onePercentLowFps from './1-percent-low-fps'
import minecraftFps from './how-to-increase-fps-in-minecraft'
import fortniteFps from './how-to-increase-fps-in-fortnite'
import valorantFps from './good-fps-for-valorant'

export const BLOG_POSTS: BlogPost[] = [
  whatIsGoodFps,
  onePercentLowFps,
  minecraftFps,
  fortniteFps,
  valorantFps,
  ufoPsFpsTest,
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
