# SEO Agent — FPS Test
# Last updated: 2026-05-25

---

## SEO Architecture (IMPORTANT — read first)

The site has TWO layers of SEO:

1. **Homepage** (`/`) — targets brand queries and "fps test" broad keywords
2. **Individual tool pages** (`/tools/[tool-name]`) — PRIMARY ranking targets for tool-specific keywords

**Never try to rank the homepage for individual tool keywords. Each tool page owns its keyword.**

---

## Current SEO Stack (what is already implemented)

### On Every Tool Page (`app/tools/[tool-name]/page.tsx`)
- Title — unique per tool, primary keyword first
- Meta description — unique per tool, 120-155 chars
- Canonical tag pointing to `https://fpstest.pro/tools/[tool-name]`
- OpenGraph tags (title, url, description, image 1200x630)
- Twitter card (summary_large_image)
- JSON-LD: FAQPage (from FAQ_ITEMS array on each page)
- RelatedTools component at bottom for internal linking

### On Homepage (`app/page.tsx`)
- JSON-LD: WebApplication (site-level)
- JSON-LD: FAQPage (general site FAQs)
- JSON-LD: WebSite (with SearchAction)
- Hero, tool embed, FPS ranges table, benchmarks, FAQ sections

### Root Layout (`app/layout.tsx`)
- `lang="en"` on `<html>`
- Title template: `%s | FPS Test`
- Global robots: index=true, follow=true, max-snippet=-1
- Global OG image: `/opengraph-image` (dynamic route via app/opengraph-image.tsx)
- Google Fonts with `display: swap`

### Technical
- Sitemap at `/sitemap.xml` — homepage + all tool pages + legal pages
- robots.ts — allow all crawlers, correct sitemap URL
- www to non-www redirect configured in next.config.ts
- 404 page at app/not-found.tsx

---

## Individual Tool Page Rules

### Title Format
```
[Tool Name] — [Primary Keyword Phrase]
```
Keep under 60 characters. Primary keyword must appear within first 30 characters.

### Meta Description
- 120-155 characters
- Contains primary keyword naturally in first 60 characters
- Includes a call to action ("free", "no download", "instant")

### Canonical
- Must point to: `https://fpstest.pro/tools/[tool-id]`
- Never point tool pages to homepage

### JSON-LD Required on Every Tool Page
1. **FAQPage** — minimum 3 FAQs, aim for 5

### Heading Hierarchy on Tool Pages
- `<h1>` — Tool name with primary keyword
- `<h2>` — Section headings (How It Works, Stats, FAQ)
- `<h3>` — Sub-sections within FAQs or benchmarks

### Internal Linking
- Every tool page uses `<RelatedTools toolIds={[...]} />` at bottom
- Link to 3 related tools per page
- No orphan pages — every tool must be linked from at least 2 other tools

---

## Homepage Rules (`app/page.tsx`)

### Title
`FPS Test: Free Online FPS Tester for PC and Browser`

### Canonical
`https://fpstest.pro` — homepage only

### JSON-LD on Homepage
1. WebApplication (the site overall)
2. FAQPage (general FAQs about FPS testing)
3. WebSite (with SearchAction for future blog search)

### Heading Hierarchy on Homepage
- ONE `<h1>` — main hero heading (contains "FPS Test" + keyword)
- Tool card names use `<p>` or styled `<div>` (not heading tags)
- Section titles use `<h2>`

---

## Technical SEO Rules

### OG Images
- Root layout: `/opengraph-image` (dynamic route, app/opengraph-image.tsx)
- All tool and static pages: explicitly set `images: [{ url: '/opengraph-image', width: 1200, height: 630 }]`
- Never reference `/og-image.png` (static file does not exist)

### URL Rules
- Tool pages: `fpstest.pro/tools/[tool-id]`
- No trailing slashes
- All lowercase, hyphenated

### Sitemap (`app/sitemap.ts`)
- Homepage: priority 1.0, changeFrequency weekly
- Tools index: priority 0.8, changeFrequency monthly
- Tool pages: priority 0.8, changeFrequency monthly
- Legal/about pages: priority 0.2-0.3, changeFrequency yearly
- Blog posts (when added): priority 0.7, changeFrequency monthly
- Use static `CONTENT_DATE` constant — do NOT use `new Date()` for stable content

### robots.ts
- Allow all crawlers
- Include sitemap URL: `https://fpstest.pro/sitemap.xml`

---

## Blog Clusters (write in this order when building blog)

Cluster 1 — FPS Test (pillar: fps-test)
Cluster 2 — Monitor FPS (pillar: fps-test-monitor)
Cluster 3 — UFO Test (pillar: ufo-fps-test) — KD 19, priority
Cluster 4 — FPS Reaction (pillar: fps-reaction-test)
Cluster 5 — How to Test FPS (pillar: how-to-test-fps)
Cluster 6 — Game-Specific spokes: minecraft, fortnite, valorant, warzone

### Blog Post Rules (CLAUDE.md)
- Min 4 internal links per blog post
- FAQPage schema on every blog post
- showInlineTool: true only when post title IS the tool name
- Do NOT add showInlineTool for posts starting with "How to", "Average", "What is a good"
- Gamer-to-gamer tone. Short paragraphs. No em dashes. Max 900 words unless topic demands more.

---

## Keyword Strategy

### Tier 1 — Primary tool pages
| Tool | Primary Keyword | H1 Target |
|---|---|---|
| fps-test | fps test | FPS Test Online |
| ufo-test | ufo fps test | UFO FPS Test |
| frame-comparison | fps comparison | Frame Rate Comparison |
| fps-reaction-test | fps reaction test | FPS Reaction Test |
| hz-detector | monitor hz detector | Monitor Hz Detector |
| input-lag-test | input lag test | Input Lag Test |

### Long-tail secondary targets
- "ufo fps test online"
- "fps test browser"
- "how to check monitor hz"
- "what is good fps for gaming"
- "fps reaction time test ms"
- "browser input lag test"

---

## Internal Linking Strategy

### Implemented
- RelatedTools component at bottom of every tool page (links to 3 related tools)
- Homepage tools grid links to all 6 tool pages
- Footer links to all tools + blog + about + privacy-policy

### Rules
- Each tool page links OUT to 3 related tools
- Every tool is linked TO from at least 2 other tool pages
- Homepage always reachable in 1 click from any tool page
- No orphan pages

---

## Monthly SEO Checklist

1. Check Google Search Console for crawl errors and newly indexed pages
2. Check Core Web Vitals report in Search Console
3. Add 1-2 new blog posts (fresh content signal)
4. Review which tool pages are ranking — optimize their FAQ and H2 content
5. Verify sitemap is submitted and being processed in Search Console
6. Check "People Also Ask" boxes for ranking keywords — add matching FAQ entries
7. Review internal linking: ensure all RelatedTools point to live tools

---

## What NOT to Do

- Never duplicate meta descriptions between pages
- Never keyword-stuff content
- Never reference `/og-image.png` — use `/opengraph-image` everywhere
- Never have tool pages without canonical tags
- Never skip FAQPage JSON-LD on tool pages
- Never skip alt text on images
- Never create orphan pages
