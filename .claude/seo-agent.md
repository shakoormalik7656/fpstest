# SEO Agent — ToolsBracker
# Last updated: 2026-04-27

---

## SEO Architecture (IMPORTANT — read first)

The site has TWO layers of SEO:

1. **Homepage** (`/`) — targets brand queries and "all tools" broad keywords
2. **Individual tool pages** (`/cps-test`, `/reaction-time`, etc.) — PRIMARY ranking targets for tool-specific keywords

**Never try to rank the homepage for individual tool keywords. Each tool page owns its keyword.**

---

## Current SEO Stack (what is already implemented)

### On Every Tool Page (`app/[tool]/page.tsx`)
- ✅ Unique `<title>` — format: `{Tool Name} - Free Online Test | ToolsBracker`
- ✅ Unique `<meta description>` from `TOOL_CONTENT[id].metaDescription`
- ✅ Canonical tag pointing to `https://toolsbracker.com/{tool-id}`
- ✅ OpenGraph tags (type, url, title, description, siteName, image 1200×630)
- ✅ Twitter card (summary_large_image)
- ✅ keywords from `tool.keywords` array in constants.ts
- ✅ JSON-LD: **WebApplication** (name, url, description, offers price=0)
- ✅ JSON-LD: **BreadcrumbList** (ToolsBracker → Tool Name)
- ✅ JSON-LD: **HowTo** (steps from content.howTo)
- ✅ JSON-LD: **FAQPage** (from content.faqs)
- ✅ Visible breadcrumb nav (ToolsBracker → Tool Name) with aria-label
- ✅ ToolContentBlock: What Is / How To / Good Score / Tips / FAQs / Also Try / Back to all tools
- ✅ Internal linking via "Also Try" related tools grid (added 2026-04-27)
- ✅ "Back to all tools" link on every tool page (added 2026-04-27)
- ✅ Static generation via `generateStaticParams` — all 33 pages pre-rendered

### On Homepage (`app/page.tsx`)
- ✅ JSON-LD: **WebApplication** (site-level)
- ✅ JSON-LD: **ItemList** (all 33 tools linking to `/{tool.id}`)
- ✅ JSON-LD: **FAQPage** (general site FAQs)
- ✅ Hero, Features, ToolsGrid, FAQ sections

### Root Layout (`app/layout.tsx`)
- ✅ `lang="en"` on `<html>`
- ✅ Google verification meta tag
- ✅ Title template: `%s | ToolsBracker`
- ✅ Global robots: index=true, follow=true, max-snippet=-1
- ✅ Google Fonts with `display: swap`
- ✅ Vercel Analytics + Speed Insights

### Technical
- ✅ Sitemap at `/sitemap.xml` — homepage (priority 1.0) + all 33 tool pages (priority 0.9)
- ✅ robots.txt — allow all, disallow /api/
- ✅ Vercel deployment (CDN edge, fast TTFB)
- ✅ `dynamic({ ssr: false })` for all interactive tool components (good INP)

---

## Individual Tool Page Rules

### Title Format
```
{Tool Name} - Free Online Test | ToolsBracker
```
Exception — games category tools should use:
```
{Tool Name} - Free Online Game | ToolsBracker
```

### Meta Description
- 140–155 characters
- Contains primary keyword naturally in first 60 characters
- Includes a call to action ("free", "no signup", "instant")
- Stored in `lib/tool-content.ts` as `metaDescription` per tool

### Canonical
- Must point to the individual tool URL: `https://toolsbracker.com/{tool-id}`
- Never point tool pages to homepage

### JSON-LD Required on Every Tool Page
1. **WebApplication** — name, url, description, offers (price: 0)
2. **BreadcrumbList** — ToolsBracker > Tool Name
3. **HowTo** — how to use the tool (steps from `content.howTo`)
4. **FAQPage** — all tool FAQs (from `content.faqs`)

### Content Block Required (`lib/tool-content.ts`)
Every tool page must have `<ToolContentBlock>` with ALL of:
- `whatIs` — What is the tool? (must include primary keyword + 1–2 natural synonym variations)
- `howTo` — Numbered steps (4 minimum)
- `goodScore` — What is a good score? (include data/statistics where possible)
- `tips` — Tips to improve (4 minimum)
- `faqs` — FAQs (minimum 4, aim for 6–7 for flagship tools)
- `relatedTools` — Array of 3–5 related tool IDs for internal linking

### Keyword Rules for `whatIs` (UPDATED 2026-04-27)
- Lead sentence must contain the primary keyword
- Naturally include 1–2 synonym variations in the first 2 sentences
- Include a data line ("Based on data from thousands of tests..." or benchmark stats)
- Example for CPS test: "The CPS test (Clicks Per Second test) measures how many mouse clicks you can make per second. This **click speed test** is the standard benchmark... Also known as a **mouse click test** or **click rate test**..."

### FAQ Rules (UPDATED 2026-04-27)
- Flagship tools (cps-test, reaction-time, typing-speed, aim-trainer): minimum 6–7 FAQs
- All other tools: minimum 4 FAQs
- At least one FAQ should be a "X vs Y" comparison question (boosts "People Also Ask" eligibility)
- FAQ answers must be self-contained (readable out of context for featured snippets)

### Heading Hierarchy on Tool Pages
- `<h1>` — Tool name (inside `ToolPageClient` component)
- `<h2>` — Section headings in ToolContentBlock (What is it, How to Use, FAQs, Also Try)
- `<h3>` — Individual FAQ questions

### `relatedTools` — Internal Linking (UPDATED 2026-04-27)
Every tool MUST have `relatedTools` defined. Link to semantically related tools:
- Click tools → link to other click tools + reaction-time
- Memory tools → link to other memory tools
- Keyboard tools → link to other keyboard + reaction tools
- Vision/Audio tools → link within their category
- Games → link to other games + relevant skill tests

---

## Homepage Rules (`app/page.tsx`)

### Title
`ToolsBracker — Free Online Speed & Skill Tests`

### Canonical
`https://toolsbracker.com` — homepage only

### JSON-LD on Homepage
1. WebApplication (the site overall)
2. FAQPage (general FAQs about the site)
3. ItemList (all tools — URLs use `/{tool.id}`)

### Heading Hierarchy on Homepage
- ONE `<h1>` — main hero heading
- Tool card names use `<h3>` or styled `<div>` (not heading tags to avoid h1-conflict)
- Section titles (All Tests, FAQ) use `<h2>`

---

## Technical SEO Rules

### Core Web Vitals
- LCP under 2.5s — next/image for all images, preload hero fonts
- CLS under 0.1 — set explicit dimensions on images, reserve space for tool zone
- INP under 200ms — lazy load all tool components with `dynamic({ ssr: false })`

### Images
- All images: `next/image` with explicit width + height
- OG images: include `alt` text in metadata (`images: [{ url: '...', alt: '...' }]`)
- Alt text: descriptive, keyword-natural

### URL Rules
- Individual tool pages: `toolsbracker.com/{tool-id}` (e.g., `/cps-test`)
- No trailing slashes
- All lowercase, hyphenated

### Sitemap (`app/sitemap.ts`)
- Homepage: priority 1.0, changeFrequency daily
- Tool pages: priority 0.9, changeFrequency weekly
- **IMPORTANT**: Use a static `lastModified` date when content hasn't changed — don't let it always return `new Date()` (Google may treat constantly-changing dates as a spam signal)

### robots.ts
- Allow all crawlers
- Disallow: /api/
- Include sitemap URL

---

## Missing / Not Yet Implemented (TODO)

These are known gaps to fix in future work:

| Item | Impact | Effort |
|---|---|---|
| `og:image:alt` on all pages | Low | Trivial |
| `Organization` JSON-LD in root layout | Medium | Small |
| `SiteLinksSearchBox` JSON-LD on homepage | Medium | Small |
| Static `lastModified` dates in sitemap.ts | Medium | Trivial |
| Game-category title suffix: "Free Online Game" instead of "Free Online Test" | Low | Small |
| `twitter:site` handle in metadata (use `@toolsbracker`) | Low | Trivial |
| `butterfly-click-test` tool — referenced in relatedTools but not yet built | High | Large |
| Per-tool OG images (tool-specific 1200×630 images) | High | Large |
| Expand `tool.keywords` array in constants.ts for each tool (currently 1–3 per tool) | Medium | Medium |

---

## Keyword Strategy

### Tier 1 — Flagship pages (highest traffic potential)
| Tool ID | Primary Keyword | Synonym Targets |
|---|---|---|
| cps-test | cps test | click speed test, mouse click test, click rate test |
| reaction-time | reaction time test | reflex test, response time test |
| typing-speed | typing speed test | wpm test, words per minute test, typing test |
| aim-trainer | aim trainer | online aim trainer, free aim trainer |
| number-memory | number memory test | digit span test, memory test |
| spacebar-test | spacebar test | spacebar speed test, spacebar CPS test |
| color-blind-test | color blind test | colour blind test, ishihara test online |
| chimp-test | chimp test | chimp memory test |
| hearing-test | hearing test | hearing age test, high frequency hearing test |
| double-click-test | double click test | double click speed test |

### Tier 2 — Secondary pages
| Tool ID | Primary Keyword |
|---|---|
| jitter-click-test | jitter click test |
| drag-click-test | drag click test |
| typing-speed | wpm test |
| keyboard-test | keyboard test online |
| mouse-accuracy | mouse accuracy test |
| whack-a-mole | whack a mole online |
| 2048-game | 2048 game online |
| snake-game | snake game online |

### Long-tail secondary targets (in content blocks)
- "cps test 10 seconds"
- "average reaction time human"
- "what is good cps minecraft"
- "reaction time test ms"
- "how to improve typing speed"
- "jitter clicking vs butterfly clicking"
- "cps test vs click speed test"
- "what is good wpm"

### Keyword density rules
- Max 2–3% in any content section
- Never repeat primary keyword more than 3 times in a paragraph
- Synonyms count separately — use them to diversify, not stack

---

## Internal Linking Strategy (UPDATED 2026-04-27)

### Implemented
- "Also Try" grid at bottom of every ToolContentBlock (links to 3–5 relatedTools)
- "Back to all tools" link on every tool page
- Homepage ToolsGrid → each tool card links to `/{tool.id}`
- BreadcrumbList JSON-LD links homepage ↔ tool pages
- ItemList JSON-LD on homepage links to all 33 tool pages

### Rules
- Each tool page links OUT to 3–5 related tools (via relatedTools)
- Most tool pages are linked TO from at least 3 other tool pages
- The homepage is always reachable within 1 click from any tool page
- Never create orphan pages (tools not linked to from anywhere)

---

## Content Expansion Strategy

### For Flagship Tools — Add These Sections Eventually
1. **Score Comparison Table** — "Average scores by age group / skill level" (data tables rank well)
2. **Technique Explainer** — For click tests: jitter vs butterfly vs drag comparison
3. **FAQ expansion** — Minimum 7 FAQs on flagship tools (each = a featured snippet candidate)
4. **"Why it matters" section** — Real-world applications (gaming, sports, driving safety)

### What NOT to Do
- Do not add content just to inflate word count
- Do not create separate pages for "cps test 5 seconds" vs "cps test 10 seconds" — use one page
- Do not duplicate content between the homepage and tool pages

---

## Content Voice Rules (applies to all blog and tool content)

Write like a gamer talking to another gamer. Not Wikipedia, not a health website. Someone who actually plays CS2, Minecraft PvP, or Valorant.

- Use "you" and "your" in almost every paragraph
- Every section needs one relatable gaming moment that grounds the data in real experience
- Short punchy sentences mixed with longer ones
- Facts need a "so what does this mean for you" follow-up. Don't drop a number without context.
- No em dashes (—) anywhere. Commas or short sentences only.
- No bullet starting with "Label: definition" format. Rewrite as full natural sentences.
- Intro must hook in the first sentence. No warmup paragraphs.
- Never use: "delve", "robust", "seamless", "Furthermore", "Additionally", "it's worth noting", "in conclusion"

---

## What NOT to Do

- Never duplicate meta descriptions between pages
- Never keyword-stuff content
- Never use `display:none` to hide keyword content
- Never block CSS/JS in robots.txt
- Never have tool pages without canonical tags
- Never skip JSON-LD on tool pages
- Never skip alt text on images
- Never reference tool IDs in `relatedTools` that don't exist in `TOOLS` array

---

## Monthly SEO Checklist

1. Check Google Search Console for crawl errors and newly indexed pages
2. Check Core Web Vitals report in Search Console
3. Add 1–2 new tool pages (fresh content signal)
4. Update `lib/tool-content.ts`: expand FAQs, improve `whatIs` keyword density for underperforming tools
5. Check which tool pages are ranking — optimize content for those tools first
6. Verify sitemap is submitted and being processed in Search Console
7. Check "People Also Ask" boxes for your ranking keywords — add matching FAQ entries
8. Review internal linking: ensure every tool page has `relatedTools` pointing to live tools
9. Check for 404s (dead `relatedTools` references) after removing or renaming tools
