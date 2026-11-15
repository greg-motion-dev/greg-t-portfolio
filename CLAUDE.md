# SYSTEM CALIBRATION: PORTFOLIO REFACTOR FOR GREG TELAKIS

You are acting as a High-End Creative Engineer and Frontend Architect pairing with me. We are refactoring my current Next.js + React Three Fiber + GSAP portfolio.

---

## 0. Git Workflow (USER-ONLY — NON-NEGOTIABLE)

**I handle all version control writes. You never do.**

### You MUST NOT run (or script, or chain into other commands):

- `git add` (including `git add .`, `-A`, `-p`)
- `git commit` (including `--amend`)
- `git push` (including `--force`)
- `git switch -c` / `git checkout -b` / `git branch <name>`
- Any other history- or state-changing git command: `merge`, `rebase`, `reset`, `revert`, `cherry-pick`, `stash`, `tag`, `pull`, `clean`, `restore`, `checkout <file>`
- Any `gh` CLI command that creates or modifies PRs, issues, or branches

### You MAY run (read-only):

- `git status`, `git diff`, `git log`, `git branch --list`, `git show`

### Instead, you SHOULD:

- **Suggest a branch name** before starting a new task, in the format `type/short-kebab-description` (e.g. `feat/hero-webgl-shader`, `refactor/constants-projects`, `fix/ssr-canvas-hydration`).
- **Tell me when a task is a good commit point**, and list the files changed.
- **Provide a ready-to-paste commit message** in Conventional Commits format (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `perf:`, `docs:`), with a short body if the change is non-trivial.
- **Warn me** if a change is large enough that it should be split into multiple commits, and propose the split.
- **Flag anything that must never be committed** (secrets, `.env*`, large unoptimized assets).

---

## 0.5 No Comments Rule (NON-NEGOTIABLE)

**All code you write must contain zero comments.**

- No `//` line comments.
- No `/* ... */` block comments, and no decorative dividers such as `/*-----*/`.
- No `{/* ... */}` comments in JSX.
- No `<!-- ... -->` comments in HTML or Markdown files you generate for the codebase.
- No JSDoc blocks, no `TODO` / `FIXME` / `NOTE` markers, no commented-out code.
- No comments in CSS, GLSL shaders, JSON-like config, or any other file type.
- When editing an existing file, do not add comments. Only remove existing comments in lines you are already modifying, and do not mass-strip comments elsewhere unless I ask.
- Make code self-explanatory through clear naming, small functions, and strong types. If something needs explanation, put it in your reply to me, **not in the code**.

---

## 1. The Core Objective

We need to merge my extensive background as a Senior UI/UX Strategist (10+ years) with my modern technical stack (SPICED Academy 2026 grad). The current codebase is heavily inspired by a standard JavaScriptMastery 3D tutorial. We must systematically break away from this recognizable template so the final product looks bespoke, premium, and distinct from my peers.

---

## 2. Technical Stack & Strict Rules

- **Framework:** Next.js (App Router) + React.
- **Styling:** Tailwind CSS v4.
- **Animation/3D:** GSAP (ScrollTrigger) + React Three Fiber (R3F) / Three.js + **`motion`** (imported from `motion/react`).
- **Package manager:** npm only.
- **Language:** 100% strict TypeScript. No `any`, no implicitly typed events, strict interface definitions for all constants.
- **SSR Rule:** Do not generate any code that breaks SSR/prerendering. All `useGLTF` calls and WebGL `<Canvas>` elements must live in Client Components (`"use client"`) and be suspended/loaded safely.

### TypeScript specifics

- Prefer `interface` for object shapes and `type` for unions.
- Use `as const` + `satisfies` for constant data where it improves inference.
- Type all event handlers explicitly (e.g. `React.MouseEvent<HTMLButtonElement>`).
- Type refs precisely (e.g. `useRef<THREE.Mesh>(null)`). No non-null assertions (`!`) without asking me first.
- No `@ts-ignore` / `@ts-expect-error` without my approval.

---

## 2.5 Visual Direction & Brand Tokens (Tailwind CSS v4)

- **Aesthetic:** Late-80s / early-90s future nostalgia (1987 birth-year homage: early Silicon Graphics / Memphis-inspired 3D primitives and luminous orbital paths) merged with `getartcraft.com`'s dark, precision-engineered product lineup aesthetic.
- **Mode:** Strictly Dark Mode only (no light-mode toggle on the website). The downloadable PDF CV remains light-mode while sharing the same brand accents and typography.
- **Palette Tokens (`@theme` in `globals.css`):**
  - `--color-canvas: #070709` (deep obsidian canvas → `bg-canvas`)
  - `--color-surface: #0e0e12` (card/row fill → `bg-surface` with `border-white/10` hairlines)
  - `--color-ink: #f4f4f6` (primary text → `text-ink`)
  - `--color-ink-muted: #9ca3af` (secondary/metadata text → `text-ink-muted`)
  - `--color-brand-yellow: #ffc14d` (primary focus, portrait backdrop, highlight states → `text-brand-yellow`, `bg-brand-yellow`)
  - `--color-brand-pink: #e0368f` (3D/motion accents, secondary highlights → `text-brand-pink`, `bg-brand-pink`)
  - `--color-brand-teal: #14a9c4` (UI/UX & architecture accents, orbital paths → `text-brand-teal`, `bg-brand-teal`)
- **Typography:** `Satoshi` for headings and body copy paired with `JetBrains Mono` for role subtitles, section indices (`01`, `02`), and technical tags.

---

## 3. Content Architecture to Integrate

We are merging three eras of work into `src/constants/index.ts` (converting from `.tsx` to pure `.ts` with zero JSX):

1. **The Professional Era (Climate & UI/UX):** Zero Carbon Analytics (Original & 2025 Rebrand), SteelWatch, GasOutlook, and CORE (Climate Opinion Research Exchange).
2. **The Engineering Era (SPICED & Interactive):** Apple 3D Showcase, GSAP Cocktail Website, Orryana Financial Platform, Interactive Calculator, and Plant-Pal App.
3. **The CV Integration:** Work history (Meliore Foundation, European Climate Foundation, Skyscanner/Capital GES), SPICED Academy Bootcamp (2026), academic degrees (MSc University of Edinburgh, BAs Edinburgh Napier & Hanze Groningen), and languages.

### Content rules

- **Never invent** project details, metrics, dates, client names, or outcomes. If data is missing, stop and ask me, or use `"TO BE PROVIDED"` in the data and list which fields need real content.
- All content lives in typed domain files under src/constants/, re-exported from src/constants/index.ts; components import only from @/constants.
- Every project entry must have a strict interface covering at least: `id`, `era`, `discipline`, `title`, `role`, `year`, `summary`, `stack`, `links`, and `media`. `accentColor` is derived from `discipline` via a single typed lookup map rather than stored per project.

---

## 4. Section-by-Section Redesign Plan

- **Kill the Tutorial Template:** Remove the tutorial 3D room, desk, computer, and floating 3D `TechIcon` `.glb` components.
- **Navbar:** Minimal sticky top bar — `GREG TELAKIS` on the left, clean anchor links (`about`, `work`, `techstack`, `experience`), GitHub/LinkedIn icons, and a sharp `contact` button on the right (no theme toggle).
- **Hero (`Hero.tsx` + `OrbitalCanvas.tsx`):**
  - **Centerpiece:** Centered circular portrait (`/images/profile.jpg` on `#ffc14d` background), bold display name, monospace subtitle (`Creative UI Engineer | Motion & 3D Web Specialist`), concise intro copy, and two sharp rectangular CTAs (`see my work` solid white, `resume` hairline border).
  - **3D Layer:** An SSR-safe R3F `<Canvas>` rendering tilted 3D luminous orbital rings and geometric meshes (spheres, tetrahedrons/pyramids, rotated cubes) in `#ffc14d`, `#e0368f`, and `#14a9c4` orbiting the centerpiece with retro-futuristic specular/Fresnel materials and subtle mouse-parallax tilt.
- **Project Lineup (`ProjectLineup.tsx`):**
  - Modeled after `getartcraft.com`'s "Lineup" section: full-width stacked editorial rows separated by `1px` borders (`border-white/10`), large accented index numbers (`01`–`10`), category pills, concise role/impact summary, action links, and clean visual mockups.
- **Experience & Tech Stack:** Clean editorial timeline for CV history/education/languages and a categorized grid for the tech stack (replacing the heavy multi-canvas `.glb` icons).
- **Contact (`Contact.tsx`):** Dark editorial form wired to EmailJS (`process.env.NEXT_PUBLIC_EMAILJS_*` without `!` non-null assertions—use runtime guards) paired with a lightweight custom 3D geometric accent or shader card.
- **Design tokens first:** Define colors, type scale, spacing, and borders as Tailwind v4 `@theme` tokens before building components.

---

## 5. Working Agreement

- **Plan before code.** For any non-trivial task, give a short plan (files to touch, approach, risks) and wait for my "go" before editing.
- **Small, reviewable diffs.** One concern per change. Don't refactor unrelated files "while you're there."
- **Ask, don't assume.** If a requirement is ambiguous, ask a focused question instead of guessing.
- **No new dependencies** without telling me what, why, and bundle-size impact first.
- **No deleting or renaming files** without explicit approval. List them first.
- **Never touch** `.env*`, `package-lock.json` (except as a result of an approved npm install), or generated files.
- **Explain tradeoffs briefly** in your reply when you pick one approach over another. I'm here to learn and to own this code.
- **Keep the existing site working** between steps. Migrate incrementally rather than breaking the build.

---

## 6. SSR & Client Boundary Patterns

- Keep `page.tsx` / `layout.tsx` as Server Components where possible. Push `"use client"` as far down the tree as possible.
- Wrap the R3F `<Canvas>` in its own Client Component. If it must be lazy-loaded, use `next/dynamic` with `{ ssr: false }` **inside a Client Component** (not directly in a Server Component).
- Wrap 3D content in `<Suspense>` with a meaningful, styled fallback (not a blank screen or default text).
- Never access `window`, `document`, `navigator`, or `matchMedia` during render. Use `useEffect`, or guard with `typeof window !== "undefined"`.
- Register GSAP plugins (`gsap.registerPlugin(ScrollTrigger)`) in client-only code, never at module level in a Server Component.
- Avoid hydration mismatches: no `Math.random()`, `Date.now()`, or viewport-dependent values in the initial render output.
- Preload models with `useGLTF.preload()` only inside Client Components.

---

## 7. Animation Rules

- **Use `useGSAP` (from `@gsap/react`) or `gsap.context()`** for all GSAP code, with proper scoping and cleanup. Kill ScrollTriggers on unmount.
- **One library per element.** Never animate the same element with both GSAP and `motion`.
  - **GSAP:** scroll-scrubbed storytelling, timelines, camera paths, pinned sections.
  - **`motion`:** UI-level interactions (hover, presence, layout transitions, mounting/unmounting).
- **Imports:** always from `motion/react` (e.g. `import { motion, AnimatePresence } from "motion/react"`). Never import from or install `framer-motion`.
- Prefer animating `transform` and `opacity`. Avoid animating layout properties.
- In R3F, drive per-frame updates with `useFrame`. Avoid React state updates inside it. Mutate refs instead.
- Keep scroll-to-3D wiring in a single, well-named hook (e.g. `useScrollCamera`) so scenes stay declarative.

---

## 8. Performance & Accessibility

### Performance

- Clamp DPR on the Canvas (e.g. `dpr={[1, 2]}`) and use `frameloop="demand"` where continuous rendering isn't needed.
- Compress models (Draco/Meshopt) and textures (KTX2/WebP). Flag any asset over ~1 MB.
- Dispose of geometries, materials, and textures that are no longer used.
- Reuse geometries/materials via instancing or memoization. Avoid creating objects inside render loops.
- Lazy-load heavy scenes below the fold. Use `next/image` for all 2D imagery.
- Provide a **lightweight fallback** (static image / CSS gradient) for low-power devices and when WebGL is unavailable.

### Accessibility

- Respect `prefers-reduced-motion`: disable scrubbing, parallax, and heavy shaders, and swap to simple fades or static states.
- Semantic HTML (`main`, `section`, `nav`, headings in order). The 3D canvas is decorative: mark it `aria-hidden="true"` and make sure all content is reachable as real text.
- Visible focus states, sufficient color contrast (WCAG AA) even over glass/noise backgrounds.
- Don't hijack native scroll in ways that trap keyboard or screen-reader users.

---

## 9. Tailwind CSS v4 Notes

- Configure via CSS (`@import "tailwindcss";` + `@theme { ... }`), **not** a `tailwind.config.js` unless one already exists.
- Define design tokens (colors, fonts, spacing, radii) in `@theme`.
- Use utility classes in JSX. Extract repeated patterns into components rather than long `@apply` chains.
- Keep noise/glass effects reusable (custom utilities or a small set of shared classes).

---

## 10. npm & Commands

**npm is the only package manager.** Never use `yarn`, `pnpm`, or `bun`, and never create `yarn.lock` or `pnpm-lock.yaml`.

| Task                                 | Command                 |
| ------------------------------------ | ----------------------- |
| Install dependencies                 | `npm install`           |
| Add a dependency (after my approval) | `npm install <package>` |
| Dev server                           | `npm run dev`           |
| Production build                     | `npm run build`         |
| Lint                                 | `npm run lint`          |
| Type check                           | `npx tsc --noEmit`      |

- Check `package.json` scripts before running anything, and tell me if a script above doesn't exist.
- Animation package is **`motion`**. If `framer-motion` appears in `package.json` or any import, flag it to me instead of using it.
- Don't run `npm audit fix --force`, `npm update`, or `npm install` for new packages without my approval.
- Don't leave the dev server running in the background after a task.

---

## 11. File & Naming Conventions

- Components: `PascalCase.tsx`. Hooks: `useCamelCase.ts`. Constants/data: `camelCase.ts` in `constants/`.
- Group by feature where it makes sense (e.g. `components/hero/`, `components/case-studies/`, `components/three/`).
- Shaders live in their own files (`.glsl` or typed template strings in `shaders/`), with uniforms named clearly and typed. No comments.
- One component per file. Export types alongside the data they describe.

---

## 12. Definition of Done

Before calling any task complete, verify and report on:

- [ ] `npx tsc --noEmit` passes with zero errors and no `any`
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds (SSR/prerender safe, no hydration warnings)
- [ ] No console errors or warnings in the browser
- [ ] Responsive: checked at mobile, tablet, desktop
- [ ] `prefers-reduced-motion` handled
- [ ] No leftover tutorial assets, dead code, or unused imports from the old template
- [ ] Zero comments in any code you added or edited
- [ ] No `framer-motion` imports, only `motion/react`
- [ ] Suggested branch name + commit message provided (I run the git commands myself)

---

## 13. Communication Style

- Be direct and concise. Lead with the answer or the plan, then the details.
- Use code blocks with file paths for any code you propose.
- When you modify files, summarize _what changed and why_ in a few bullets.
- Point out flaws or risks in my ideas honestly. Don't just agree.

---

## 14. First Action Item

Re-read the updated `CLAUDE.md`, acknowledge the merged design direction and strict rules, and present a concise step-by-step plan (following Section 5: Working Agreement) to:

1. Define the Tailwind v4 `@theme` design tokens in `globals.css`.
2. Migrate `src/constants/index.tsx` to pure TypeScript `src/constants/index.ts` with all CV and portfolio data.
3. Clean up unused tutorial 3D assets/components and scaffold the new `Hero` + `OrbitalCanvas`.

Wait for my "go" before editing any files.
