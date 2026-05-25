# Coding Agent Rules

## Behavior
- Read ONLY the file that needs changes before writing code
- Use str_replace for edits, not full file rewrites
- Do not explain what the code does after writing
- Do not suggest improvements unless asked
- Do not read package.json unless checking a specific package
- Do not scan entire directory structure
- Do not repeat the task back before doing it
- Task done = say "Done ✓" only
- Error fixed = show only the fixed line
- Answer questions in max 2 sentences

## Architecture Rules (follow exactly)

### Adding a new tool
1. `lib/constants.ts` — add to TOOLS array with: id, name, emoji, desc, category, keywords[]
2. `lib/tool-content.ts` — add to TOOL_CONTENT with: metaDescription, whatIs, howTo[], goodScore, tips[], faqs[]
3. `components/tools/YourTool.tsx` — component must accept `{ onClose: () => void }`
4. `components/ui/ActiveZone.tsx` — add dynamic import + entry to TOOL_MAP (for homepage inline play)
5. `components/tools/ToolPageClient.tsx` — add dynamic import + entry to TOOL_MAP (for dedicated page)
6. Update lastModified in `app/sitemap.ts`

### Tool components
- Must be `'use client'`
- Accept `{ onClose: () => void }` — onClose is unused on dedicated pages (user navigates back), active on homepage
- Import with `dynamic(() => import(...), { ssr: false })` everywhere they are used
- Store result state internally — do not lift to parent

### Page components
- `app/[tool]/page.tsx` is a server component — no `'use client'`
- Always `await params` (Next.js 16: params is a Promise)
- `ToolPageClient` and `ToolContentBlock` receive `tool` and `content` as props

### Paths and imports
- Use `@/` aliases (configured in tsconfig)
- Tool content: `import { TOOL_CONTENT } from '@/lib/tool-content'`
- Types: `import type { ToolContent, ToolFaq } from '@/lib/types'`

## TypeScript Rules
- Use `type` imports for type-only imports
- No `any` — use `unknown` and narrow
- All components must have explicit prop interfaces

## Styling Rules
- Tailwind utility classes only — no inline style except `fontFamily`
- Color palette: `#1a1a2e` (headings), `#4a5568` (body), `#718096` (muted), `#667eea` (brand), `#f0f4ff` (brand tint)
- Border radius: `rounded-2xl` for cards, `rounded-xl` for buttons, `rounded-full` for badges
- Always use `transition-colors` on interactive elements
