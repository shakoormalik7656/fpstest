# Deployment Agent — ToolsBracker

## Pre-Deployment Checklist (run before every push)

### Code Quality
- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run type-check` passes (no TypeScript errors)
- [ ] No `console.log` in production code
- [ ] No hardcoded localhost URLs anywhere
- [ ] No `.env` values exposed in client-side code

### SEO Check
- [ ] Every new tool page has a unique title and meta description in `lib/tool-content.ts`
- [ ] `lib/tool-content.ts` entry has: metaDescription, whatIs, howTo, goodScore, tips, faqs
- [ ] `app/sitemap.ts` includes all new tool routes (auto-generated from TOOLS — just verify TOOLS is updated)
- [ ] JSON-LD present on both homepage and new tool pages
- [ ] OG image exists at `/public/og-image.png`
- [ ] No duplicate canonical URLs between pages

### Architecture Check (new tools only)
- [ ] Tool added to `TOOLS` in `lib/constants.ts`
- [ ] Tool content added to `TOOL_CONTENT` in `lib/tool-content.ts`
- [ ] Tool component accepts `{ onClose: () => void }`
- [ ] Dynamic import added in `ActiveZone.tsx` (homepage inline)
- [ ] Dynamic import added in `ToolPageClient.tsx` (dedicated page)
- [ ] `TOOL_MAP` updated in BOTH `ActiveZone.tsx` AND `ToolPageClient.tsx`

### Performance Check
- [ ] All new tool components use `dynamic(() => import(...), { ssr: false })`
- [ ] No heavy npm packages added without justification
- [ ] All images use `next/image`
- [ ] No render-blocking code

### Security Check
- [ ] No API keys in any `.tsx`/`.ts` file
- [ ] No sensitive data in `constants.ts`
- [ ] `.env.local` in `.gitignore`
- [ ] No hardcoded passwords or tokens

---

## Git Workflow

### Commit Message Format
```
feat: add [tool name] tool
fix: fix [issue description]
seo: improve [what was improved]
perf: optimize [what was optimized]
style: update [what was styled]
content: update [tool-content.ts changes]
```

### Push Sequence (exact order)
```bash
npm run build
npm run lint
git add .
git commit -m "your message"
git push origin main
```

---

## Vercel Deployment

- Every push to `main` auto-deploys
- Build takes 1–3 minutes
- After push: verify at vercel.com/dashboard that status is "Ready"
- Test toolsbracker.com after deploy — click one tool on homepage, click one dedicated page (/cps-test)

### Vercel Environment Variables (required)
- `NEXT_PUBLIC_SITE_URL=https://toolsbracker.com`
- `NODE_ENV=production`

### If Vercel Build Fails
1. Check Vercel build logs
2. Reproduce locally: `npm run build`
3. Fix, then push again

---

## Post-Deployment Checklist
1. Visit `https://toolsbracker.com` — homepage loads
2. Visit `https://toolsbracker.com/cps-test` — dedicated page loads with content block
3. Visit `https://toolsbracker.com/sitemap.xml` — all 34 URLs present (1 homepage + 33 tools)
4. Click a tool on homepage — inline play works
5. Check mobile at 375px width

---

## After Adding New Tool
- [ ] Submit updated sitemap in Google Search Console
- [ ] Check tool page is indexed (Search Console > URL Inspection)
- [ ] Verify JSON-LD at https://validator.schema.org/ for the new tool page

---

## Weekly Reminders
- Check Vercel Analytics for traffic trends
- Check Core Web Vitals in Vercel dashboard
- Check Google Search Console for crawl errors and new indexed pages
- Add 1 new tool per week for fresh content signal

---

## .gitignore Must Include
```
.env.local
.env*.local
node_modules/
.next/
.vercel/
*.log
```
