# Deployment Agent — FPS Test

## Pre-Deployment Checklist (run before every push)

### Code Quality
- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes with zero warnings
- [ ] No `console.log` in production code
- [ ] No hardcoded localhost URLs anywhere
- [ ] No `.env` values exposed in client-side code

### SEO Check
- [ ] Every new tool page has a unique title and meta description
- [ ] `app/sitemap.ts` includes all new tool routes (auto-generated from TOOLS — just verify TOOLS is updated)
- [ ] FAQPage JSON-LD present on every tool page
- [ ] OG image references `/opengraph-image` (not `/og-image.png`)
- [ ] No duplicate canonical URLs between pages

### Architecture Check (new tools only)
- [ ] Tool added to `TOOLS` in `lib/constants.ts`
- [ ] Tool component created in `components/tools/`
- [ ] Tool page created at `app/tools/[tool-name]/page.tsx`
- [ ] Tool uses `gameState: 'idle' | 'running' | 'finished'` pattern
- [ ] Dynamic import used for client components: `dynamic(() => import(...), { ssr: false })`

### Performance Check
- [ ] All new tool components use `dynamic(() => import(...), { ssr: false })`
- [ ] No heavy npm packages added without justification
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
content: update [content changes]
```

### Push Sequence (exact order)
```bash
npm run build
git add .
git commit -m "your message"
git push origin main
```

---

## Vercel Deployment

- Every push to `main` auto-deploys
- Build takes 1-3 minutes
- After push: verify at vercel.com/dashboard that status is "Ready"
- Test fpstest.pro after deploy — click one tool on homepage, click one dedicated page (/tools/fps-test)

### Vercel Environment Variables (required)
- `NODE_ENV=production`

### If Vercel Build Fails
1. Check Vercel build logs
2. Reproduce locally: `npm run build`
3. Fix, then push again

---

## Post-Deployment Checklist
1. Visit `https://fpstest.pro` — homepage loads
2. Visit `https://fpstest.pro/tools/fps-test` — dedicated page loads with tool embedded
3. Visit `https://fpstest.pro/sitemap.xml` — all URLs present (homepage + tools + legal)
4. Click a tool on homepage — tool runs correctly
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
- Write 1 new blog post per week once blog section is built

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
