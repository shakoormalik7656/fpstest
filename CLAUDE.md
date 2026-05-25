# fpstest.pro — Claude Code Rules

## Project
Site: fpstest.pro
What it is: Free browser-based FPS and gaming performance tests. No download, no signup, no ads.
Stack: Next.js 15 App Router, TypeScript, Tailwind CSS, Vercel deployment.

## Critical Files — Read Before ANY Change
Before touching any feature, always read these files first:
1. lib/constants.ts — tool names, slugs, categories, site config
2. lib/types.ts — all TypeScript interfaces
3. lib/blog-posts/index.ts — how blog posts are registered
4. lib/blog-posts/types.ts — BlogPost interface fields
5. app/layout.tsx — root metadata, font loading, global structure
6. next.config.ts — redirects, headers
7. components/ui/Header.tsx and Footer.tsx — sitewide nav

If writing a new blog post, also read:
- lib/blog-posts/[any-existing-post].ts — copy exact structure

If adding a new tool, also read:
- components/tools/[any-existing-tool].tsx — copy exact pattern
- app/tools/[tool-name]/page.tsx — copy exact page structure

## File Structure
fpstest/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── globals.css
│   ├── blog/
│   │   └── [slug]/page.tsx
│   └── tools/
│       └── [tool-name]/page.tsx
├── components/
│   ├── ui/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ToolCard.tsx
│   └── tools/
│       └── [EachTool].tsx
├── lib/
│   ├── constants.ts
│   ├── types.ts
│   ├── utils.ts
│   └── blog-posts/
│       ├── index.ts
│       ├── types.ts
│       └── [slug].ts
├── public/
│   └── images/blog/
├── CLAUDE.md
└── next.config.ts

## Branding
- Site name: FPS Test
- Domain: fpstest.pro
- Primary color: #00ff88 (neon green)
- Background: #0a0a0a (near black)
- Secondary text: #888888
- Accent: #00cc6a
- Logo initials: FT

## Coding Rules
1. NEVER add npm packages without asking first
2. ALL components TypeScript with proper types
3. NEVER use any type
4. ALL tool components go in components/tools/
5. After every major change run: npm run build
6. Every tool uses gameState: 'idle' | 'running' | 'finished' pattern

## SEO Rules
1. Every page needs: title, description, canonical, og:image
2. Blog images: JPEG to public/images/blog/, converted to WebP via sharp-cli
3. WebP command: npx sharp-cli input=X output=Y --quality 82 --format webp
4. Min 4 internal links per blog post
5. FAQ schema on every blog post
6. showInlineTool: true only when post title IS the tool name
7. Do NOT add showInlineTool for posts starting with "How to", "Average", "What is a good"

## Blog Voice
Gamer-to-gamer tone. Short paragraphs. No em dashes. No corporate words.
Max 900 words per post unless topic demands more.

## Tools (Build in This Order)
1. FPS Meter — canvas requestAnimationFrame counter, main tool
2. UFO Motion Test — scrolling balls at different fps
3. Frame Rate Comparison — 60 vs 120 vs 144 visual
4. FPS Reaction Test — click on color change
5. Monitor Hz Detector
6. Input Lag Test

## Blog Clusters (Write in This Order)
Cluster 1 — FPS Test (pillar: fps-test)
Cluster 2 — Monitor FPS (pillar: fps-test-monitor)
Cluster 3 — UFO Test (pillar: ufo-fps-test) — KD 19, priority
Cluster 4 — FPS Reaction (pillar: fps-reaction-test)
Cluster 5 — How to Test FPS (pillar: how-to-test-fps)
Cluster 6 — Game-Specific spokes: minecraft, fortnite, valorant, warzone

## Deployment
Platform: Vercel
Before every deploy: npm run build, fix all errors, then git push
Never push broken builds
