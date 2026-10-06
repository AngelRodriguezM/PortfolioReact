# React Portfolio Recreation Guide

## Goal and priorities

Recreate Angel Rodriguez's existing portfolio in React. Preserve its distinctive CSS design, animations, content, and project order while replacing repeated static HTML with reusable components. This is a faithful migration, not a generic portfolio redesign.

Priority order: (1) correct personal and project information, (2) visual identity and layout, (3) faithful motion and interactions, (4) responsive, accessible implementation, (5) maintainable React structure.

## Source of truth

- Repository: https://github.com/AngelRodriguezM/Portfolio/tree/main
- Inspected revision: `5d909d7729dbb344e95d70f652094ef34dc4c70f` (5 October 2026).
- Existing site URL recorded in README: https://angelportfolioweb.netlify.app/
- Homepage: `docs/index.html`.
- Homepage design and motion: `docs/CSS/styles.css`.
- About, project details, and CV design: `docs/CSS/about.css`.
- Biography: `docs/HTML/about.html`.
- CV: `docs/HTML/projects/CV.html`.
- Project details: `docs/HTML/projects/project2.html`, `Elements-of-AI.html`, `project3.html`, `project4.html`, and `project5.html`.

This guide is based on source inspection, not a browser-rendered visual audit. CSS values below are source values; suggested React architecture and accessibility improvements are migration instructions. If the source changes, inspect the new revision before changing factual content. Read the original pages for exact wording; retain the meaning of all descriptions summarized here. Do not infer additional achievements from screenshots, filenames, or unrelated personal history.

## Portfolio subject and editorial rules

The subject is **Angel Rodriguez**, a **Junior Developer** and **Software Engineering Student**. The portfolio presents his software development, AI, cloud, automation, and web design work. Keep the visible content in English.

His biography describes a software engineering student who turns ideas into clean, usable web apps and small AI tools; works with JavaScript, HTML/CSS, and cloud services; values readable code, accessible design, and hands-on learning; and is a multilingual traveler who enjoys challenges and friendly teams.

Do not invent contact details, social links, employers, metrics, qualifications, or production capabilities. The project descriptions below report claims in the portfolio, not independently verified product behavior. Do not turn those descriptions into requirements to build the chatbot, newsletter backend, or Tetris game inside this portfolio.

### CV content

**Skills**

- Programming languages: HTML, CSS, C, JavaScript.
- Advanced proficiency in Excel and Microsoft 365.
- Experience with large language models and cloud computing.
- Phone and laptop repair.
- Spanish: native.
- English: C1, IELTS certified.

**Work**

- IT Assistant — EstudieMás Foundation; Panama City, Panama (remote); 2024–2025.
- Repair and maintenance of technological equipment.
- Collaboration on HTML, JavaScript, and CSS web development projects.
- Implementation of large language models to optimize internal processes.
- Management of Microsoft 365 platforms and the Azure cloud environment.
- Development of an Azure cloud-based AI assistant for English tutoring.

**Studies**

- VIA University College — Software Technology Engineering; Horsens, Denmark; August 2025–Present, as stated in the source.
- Technological University of Panama (UTP) — Software Engineering (Student); January–December 2024.
- Abeka Academy — High School Diploma; Pensacola, Florida, USA; graduated December 2023.

Preserve these source facts. Do not silently update dates or add skills merely because the rebuilt portfolio uses React.

## Pages and navigation

Homepage section order is **Hero → About → Projects & Skills → CV**. Keep IDs `main`, `about`, `projects`, and `cv` for section navigation.

Use a sticky navigation bar containing the circular cat image/home anchor, About, Projects, and CV. Homepage navigation scrolls to the matching sections. Detail pages have a Go Back link to the homepage; on small screens, the visual label can become an icon with an accessible name. Returning from a project should preferably restore the Projects section.

Suggested React routes:

| Page | Suggested route | Original source |
| --- | --- | --- |
| Home | `/` | `docs/index.html` |
| About | `/about` | `docs/HTML/about.html` |
| English tutor chatbot | `/projects/english-tutor-chatbot` | `project2.html` |
| Elements of AI | `/projects/elements-of-ai` | `Elements-of-AI.html` |
| Newsletter | `/projects/newsletter-system` | `project3.html` |
| Tetris | `/projects/javascript-tetris` | `project4.html` |
| Web design certification | `/projects/responsive-web-design` | `project5.html` |
| CV | `/cv` | `CV.html` |

These route names are proposals, not existing routes. Choose a routing strategy compatible with the deployment target. Configure SPA rewrites for pathname routing, or use hash routing when the host cannot rewrite requests. Account for the repository base path if deploying to GitHub Pages. Internal navigation should use React links; external resources remain real anchors.

## Project content and assets

Keep the following five cards in this exact order. Projects & Skills deliberately includes certifications alongside projects.

| Homepage title | Detail title and information | Assets relative to `docs/IMAGES/` |
| --- | --- | --- |
| AI Chatbot for English Learning | Cloud Based Tutor Chatbot: Estudiemás English tutor built on GPT-4o mini and hosted as an Azure Web App with sign-in. Migrated from an initial Microsoft Teams plan because of packaging issues. Lessons and FAQs curated in Excel; settings tuned for accurate answers, token usage, and throughput. Intended to reduce teachers' after-hours workload and provide lesson-aligned answers. Project dates January 14–February 21, 2025; testing covered topic adherence, memory use, and open questions. | Card: `fundacion-estudie-mas-logo-xl.png`; detail: `Screenshot 2025-10-02 175039.png` |
| Elements Of AI Certificate | Elements Of AI: completed University of Helsinki's Elements of AI and Building AI courses. Covers AI concepts, problem solving, machine learning, neural networks, societal uses and limitations, then optimization, reasoning, learning, and light Python for outlining an AI idea. | `certificate-elements-of-ai.png`, `OG-IMAGE.png` |
| Newsletter System | Internship project at Estudiemás Foundation using Power Automate, SharePoint for audience/content management, and Azure for secure delivery/scaling. Source describes drafting, approvals, scheduled sends, open/click tracking, and audit run logs; emphasizes reliability, low maintenance, and extensibility. | `Newsletter.jpg`, `newsletterScreenshot.png` |
| JavaScript Tetris | Personal prototype built in two and a half hours; grid rendering, rotation, line clearing, input, and scoring. Subsequently styled with a Windows 95 theme: gray panels, pixel borders, classic UI chrome. Lightweight, responsive, extensible. The Windows 95 aesthetic belongs to the showcased game, not to the portfolio shell. | Card: `TetrisAppIcon.png`; detail: `Screenshot 2025-10-05 215307.png` |
| Web Design Certificate | Web Design Certified: freeCodeCamp Responsive Web Design certification. Semantic HTML, accessible components, Flexbox, Grid, CSS variables, forms, responsive patterns, reusable utilities, and performance. | `Screenshot 2025-10-05 221124.png` |

Preserve external destinations exactly:

- Chatbot Project Report: https://docs.google.com/document/d/1B3Z8PQCxeIKuTAu6q1quPLpFItKjo1sdEPXsZl__LBs/edit?tab=t.0#heading=h.jcdd2bf9s68c
- Tetris Project Link: https://github.com/AngelRodriguezM/TetrisJavaScript
- Web design Certificate Link: https://www.freecodecamp.org/certification/angelrodrigu3z/responsive-web-design

The homepage uses `Elgato.jpg` for the navigation avatar, About image, and CV image; retain it as the original visual choice, without describing it as a human portrait. The hero uses the `HeroTiles` SVG illustration (the original `Globe.gif` was removed); `AngelIcon.png` is the favicon. The repository also contains `docs/other/Angel RodriguezM CV_English (1).pdf`; an optional download link may reference this actual file, but the existing CV page is an HTML presentation and has no download link. Do not assume the PDF's contents match the HTML without checking it.

Copy source assets into `public/assets/` or import them from `src/assets/`. Preserve case, map names with spaces carefully, and use one asset mapping. Do not generate substitutes when original assets exist. Add descriptive alt text to meaningful screenshots and certificates; decorative imagery can use empty alt text. Preserve aspect ratios, use `object-fit: contain` for certificates where cropping would hide information, and reserve image space to prevent layout shifts.

## CSS visual identity

Use hand-authored CSS with shared custom properties. Do not let a component library replace the original aesthetic. CSS Modules or clearly scoped plain CSS are suitable; Tailwind is optional only if it faithfully preserves the details.

### Design tokens

**The palette is light-only** (it replaced the original dark palette). No dark values, theme toggle, `prefers-color-scheme` rules or `dark:` classes. Tokens live in the `@theme` block of `src/index.css` and become Tailwind utilities (`bg-surface`, `text-ink`, `border-accent`, `shadow-card`, …) and CSS variables (`var(--color-accent)`).

| Token | Value | Use |
| --- | --- | --- |
| `surface` | `#f7f4f0` | Page background, hero, navbar |
| `surface-raised` | `#ffffff` | Content boxes, modal window, white hero tiles |
| `surface-sunken` | `#f2ede8` | About section band (behind the ASCII field) |
| `ink` | `#1a1a1a` | Headings and body text |
| `ink-muted` | `#57524d` | Paragraphs in boxes, panels and modals; subtitles |
| `ink-subtle` | `#8a847e` | Idle card titles and icons only (never body text) |
| `accent` | `#db0303` | Brand red: glows, borders, focus, navbar rule, solid fills, large text |
| `accent-deep` | `#c31432` | Nav hover bubble, pressed fills, About ring |
| `accent-text` | `#c31432` | Red text at body size |
| `accent-tint` | `#fde8e6` | Soft red hover wash |
| `on-accent` | `#ffffff` | Text on `accent` / `accent-deep` |
| `glass` | `rgba(255,255,255,.72)` | Frosted fill (with backdrop blur) |
| `glass-edge` | `rgba(255,255,255,.95)` | Top/bottom borders on glass |
| `gloss` | `rgba(255,255,255,.85)` | Shine on the top half of cards and pills |
| `line` / `line-strong` | `#e4ddd6` / `#cfc6bd` | Hairlines / control borders |
| `ring-teal` | `#659999` | Second colour of the About photo ring |

Shadows: `shadow-card` and `shadow-card-hover` (soft red halos replacing the old `0 0 5px` red glows), `shadow-active` (current nav pill), `shadow-lift` (nav pill hover), `shadow-navbar`.

- Page background `surface`; `ink` text. Red is used sparingly for glows, borders, focus rings, the active state and solid fills.
- Project cards are white frosted glass with a gloss sheen on the top half and a soft red halo (modelled on Wii U menu tiles).
- Motion, easing curves, durations, keyframes and layout are unchanged from the original; the light palette changed colour, borders, shadows and the hero illustration only.
- **DM Sans** for body text, navigation, project titles, and detail headings. The source loads weight 200; load additional weights only where needed for faithful rendering.
- **Oswald** for major headings, particularly the oversized name and About heading.
- **Ballet** cursive for the word Angel in the dedicated About page's “Who Is Angel” heading. Scope this effect to that word, not all spans.
- Rounded surfaces: mostly 15px cards, 10px inner surfaces/images, 30px navigation pills; 25px lower hero corners; circular avatars.
- Glass surfaces: translucent white fill, light top/bottom borders, and `backdrop-filter` blur. Provide a readable fallback when backdrop filtering is unavailable.
- Preserve ample spacing and the intentionally sparse, alternating desktop project layout.

### Layout specifications

**Navigation:** full-width sticky bar at top, z-index 10, four equally spaced columns, approximately `1rem 2rem` homepage padding. `surface` background, opacity 0.95, subtle backdrop blur, `shadow-navbar`, 2px solid `accent` bottom border. Avatar is 45×45px. Pills use `.5rem 1rem` padding, 1.2rem text, translucent fill, 20px backdrop blur, and 2px translucent top/bottom borders.

**Hero:** two equal columns with centered items; source padding `10% 0 10% 2%`, gap 2vh. Name uses Oswald, 15vh, line-height 1. Junior Developer uses 4vh, 5px letter spacing, `surface` fill, and an `ink` `-webkit-text-stroke` of .5px (.6px from md). Software Engineering Student uses 2vh and `accent-text`. The right column is `HeroTiles` (`src/components/HeroTiles.jsx`): an inline SVG 5×3 grid of 72px rounded tiles (16px gaps, 15px radius) with one red 2×2 tile with gloss, tiles popping in with a stagger, a pulsing red glow behind the big tile, and a bounce on tile hover. Use `clamp()` and width constraints to prevent text overflow while preserving the scale.

**Homepage About:** outer `surface-sunken` section with 5% padding and the animated ASCII field (`AsciiBackground`) behind it; inner panel max-width 1000px, 15px radius, `surface-raised` background, 2px `accent` border, two columns, 2vh gap, and 5% padding. Left: linked “About Me” heading, 5rem with 2.5px spacing. Right: circular 180px cat image linking to About.

**Projects:** centered DM Sans section heading with 2.5px spacing. Wrapper has two columns, 2vh gap, and source padding `5% 10% 10% 10%`. Cards occupy successive rows alternating left/right: left row 1, right row 2, left row 3, right row 4, left row 5. Do not compress them into a conventional tightly packed grid without instruction. Resting cards are 200×200px, 15px radius, translucent background, 150px backdrop blur, red `0 0 5px` shadow, and 3px translucent top/bottom borders. Center icon and title; title is 1.25rem with 2px spacing, opacity .5; icon is 4rem with opacity .7. Images start hidden, then reveal during interaction.

**Homepage CV:** centered 350×500px outer card with conic red/magenta border and 15px radius. Inner dark card has 10px radius, translucent top border, approximately 10% padding, and vertically spaced avatar and underlined My CV link. Inner avatar/link panels have translucent fill, soft shadows, and lighter hover surfaces.

**Dedicated About:** max-width 1000px `surface-raised` panel, 15px radius, `line` top border, subtle shadow, two columns, source padding `12% 5%`. Heading 5rem; biography 1.15rem, line-height 1.5, justified in source. Red highlight on “software engineering student.” On narrow screens prefer left-aligned paragraphs if justification creates uneven spacing.

**Project details:** two-column grid, 5vh gap, outer padding 5%. Text panel on right spanning the two media rows; two image/resource panels on left. Text panel has source width 400px, 2rem padding, translucent fill, 20px backdrop blur, 1px white border, 15px radius. Media panels use the same surface/border treatment, roughly 5% padding. Images have 10px radius and source max-width 250px; preserve readability on small screens. Detail text uses line-height 1.75. Resource links are underlined, white by default and red on hover.

**CV page:** grid width 75%, two columns; image and Skills share the first row, Work and Studies each span both columns. Info panels use `surface-raised`/glass surfaces, 15px radius, 2rem padding, `line` top border, and an `accent-tint` hover state. Retain the full lists.

## Animations and interaction contract

Prefer CSS transitions/keyframes. Do not introduce an animation library just for effects already expressible in CSS. Keep animation state declarative and avoid direct DOM mutation.

| Element | Source behavior | Timing / values |
| --- | --- | --- |
| Homepage navigation pills | Hover expands letter spacing to 3px and adds a small lower shadow | .5s `cubic-bezier(.61,.01,0,1.37)` |
| Detail-page back pill | Red blurred pseudo-element becomes visible; letter spacing expands | Pill .5s ease; glow opacity 1s ease and transform .5s ease |
| Navigation avatar | Hover reveals sharp and blurred rotating conic rings, red `#c31432` → teal `#659999` → red | 3s linear infinite rotation; .3s reveal; ring scales about 1.1 and glow about 1.2 |
| Project card | Expands from 200×200px to 350×275px on desktop; icon shrinks/fades, image grows to 55% width and opacity 1, title opacity becomes 1 | Card .30s `cubic-bezier(.42,0,.15,1.32)`; content .5s ease |
| Project glow | Centered red blurred pseudo-element pulses; hover expands it from 25% to 90% of card dimensions | `pulse` 2.5s infinite: opacity .1 at start, .35 at 15%, .1 at end; blur 1.5rem; expansion .5s ease |
| Homepage About image | Scales to 1.1 on hover | .5s `cubic-bezier(.02,.76,.58,1)` |
| Homepage CV border | Conic red `#db0303` → magenta `#d312c3` → red rotates continuously | `spin` 2s infinite; source uses default easing |
| Homepage CV card | Entire border card scales to 1.1; inner panels lighten | .3s `cubic-bezier(0,0,0,1.45)`; panels about .2s |
| Detail media/resource cards | Tilt in 3D and grow | `perspective(600px) rotateY(20deg) scale(1.05)`; .3s `cubic-bezier(.44,0,0,1.44)` |
| CV page image panel | Scales to 1.1 and gains stronger shadow | .2s ease-in-out |
| CV info cards | Background changes to `#3b3b3b` | .2s ease-in |
| Mobile navigation | Source hover bounce temporarily expands horizontal padding from .5rem to 2rem at 60%, returning at 100%; reddish background | .8s `cubic-bezier(0,1.39,.42,1.65)` |

Register the angle once, globally:

```css
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes spin {
  from { --angle: 0deg; }
  to { --angle: 360deg; }
}
@keyframes pulse {
  0%, 100% { opacity: .1; }
  15% { opacity: .35; }
}
```

Place gradient/glow pseudo-elements on positioned wrappers with intentional stacking contexts. Animate the gradient angle rather than rotating the image or text. Do not copy the original magic translate offsets; center the ring using inset positioning. Provide a static gradient fallback if registered custom-property animation is unsupported.

The homepage defines a navigation glow pseudo-element but does not activate its opacity on hover; the detail stylesheet does. The homepage also attempts a pseudo-element on an `img`, which is not a reliable rendered effect. Preserve confirmed effects; any added homepage glow is an intentional enhancement, not an observed animation.

Do not add unrequested scroll reveals, page transitions, typing effects, particles, or parallax.

### Accessibility and motion improvements

- Apply comparable card reveals and nav feedback through `:focus-visible` or `:focus-within`, with a clear focus outline. Use one semantic link per project card, covering its usable area.
- Essential titles, routes, and information must remain available without hover. On `hover: none` / coarse pointers, show useful card imagery by default and keep stable card geometry. Do not require a first tap solely to expose a link.
- The source disables detail-card 3D effects on devices without hover; preserve that rule.
- Add `prefers-reduced-motion: reduce`: stop gradient rotation, pulsing, bounces, tilts, and scale transitions; use immediate state changes and normal scrolling. Hero tiles and the ASCII field must not animate under reduced motion.
- Preserve desktop expansion where practical, but prevent overlaps and horizontal scrolling. If intrinsic size animation causes disruptive reflow, use reserved interaction space or a restrained transform with equivalent visual emphasis; record any visual deviation.
- Limit transitioned properties rather than copying `transition: all`; avoid expensive animated blur. Keep glows decorative and behind readable content.
- Add `scroll-margin-top` to anchored sections so the sticky navbar does not cover headings.

## Responsive behavior

Source breakpoints include 900, 768, 600, 576, 426/425, 420, 400, and 320px. Consolidate overlapping rules only when the resulting layout stays faithful.

- At ≤768px: hero, homepage About, projects, project details, and CV become single-column layouts. Navigation stays a compact four-item row and shows icons above labels; pill text becomes .75rem. Hero name is about 10vh, hero tiles max width 280px. Homepage About heading is 3rem.
- Mobile project cards use 150×150px resting size, .8rem title, 3rem icon, and 20px gaps. Original hover uses width 45% and `scale(1.15,1.05)`; adapt this to safe touch behavior instead of reproducing overflow.
- At ≤425px: hero source sizes become 8vh, 2.5vh, and 1.5vh. Use accessible minimum text sizes while retaining the hierarchy.
- Homepage CV border card shrinks to 200×350px around ≤426px with 2% border padding.
- Dedicated About stacks at ≤900px; heading steps through 3.2rem, 2.4rem at ≤600px, and 2rem at ≤400px. Paragraphs remain around 1rem with generous line height.
- Project detail text width becomes automatic at ≤768px; images can grow to max-width 520px. At ≤576px use approximately .98rem paragraphs and 1.25rem headings; narrow cards use 12px corners and reduced padding.
- CV grid becomes width 100% and one column at ≤768px, with Work and Studies losing explicit column spans.

Check at 320, 375, 425, 768, 1024, and 1440px. No clipped headings, broken links, overlapping cards, or horizontal overflow.

## React implementation guidance

Use React with Vite and TypeScript as the recommended migration baseline; the source has no React build setup. Inspect the target workspace before scaffolding and respect any existing tooling. Do not blindly overwrite another application or pin unverified package versions.

Suggested structure:

```text
src/
  App.tsx
  main.tsx
  components/
    Navbar.tsx
    BackLink.tsx
    Hero.tsx
    AboutPreview.tsx
    ProjectCard.tsx
    ProjectGrid.tsx
    GradientBorder.tsx
    CVPreview.tsx
    MediaCard.tsx
  pages/
    HomePage.tsx
    AboutPage.tsx
    ProjectPage.tsx
    CVPage.tsx
  data/
    portfolio.ts
  styles/
    tokens.css
    global.css
    home.css
    details.css
public/assets/
```

- Keep biography, CV sections, project descriptions, asset paths, and external URLs in typed data. Render all five detail pages through a shared `ProjectPage` rather than duplicating markup.
- Keep global reset/tokens/font imports small; scope home and detail selectors to avoid collisions between original `.CV`, `.cvImg`, `.navbar`, and `.aboutGrid` rules.
- Use semantic `header`, `nav`, `main`, `section`, headings, lists, links, and images. One main page heading per route; use lower-level headings for sections.
- Choose one consistent SVG/icon solution rather than retaining multiple Font Awesome and Material Symbols CDNs. Preserve icon meanings: About/info, Projects/code folder, CV/person, chatbot/code file, AI/web certificates/ID card, newsletter/edit, Tetris/chess knight, back/left pointer.
- Use CSS for hover interactions; React state only where behavior requires it. Avoid effects/listeners for visual hover state. Clean up any listeners that are necessary.
- Keep the app static: no backend, authentication, database, chatbot API, or newsletter delivery service is required for the portfolio itself.
- Preserve title Angel Rodriguez on the homepage; give each route an appropriate document title. Keep the favicon. Add metadata only from confirmed content.
- Lazy-load below-the-fold images, but load the hero normally. Provide visible loading/fallback states only where needed.

## Repair source defects during migration

Do not reproduce these implementation defects:

1. Nested HTML pages reference `./CSS/about.css`, `./IMAGES/...`, and `./index.html` as if they lived at the root. Replace them with correct React navigation and centralized asset URLs.
2. `overflow-x: none` and `grid-column: 0/0` are invalid CSS. Use valid layout rules; fix overflow at its cause.
3. Duplicate `spin` keyframes and duplicated global CSS should become one shared definition.
4. Do not place decorative pseudo-elements directly on `<img>` or use fragile translated negative-z-index rings; use wrappers.
5. Correct mismatched/misnested About links and excess closing tags. Use valid JSX with `className` and properly nested links/headings.
6. Keep meaningful alt text and accessible labels on icon-only navigation; the originals frequently have empty alt text.
7. The detail text grid placement `grid-row: span 2/3` is awkward; explicitly place the text in the right column across two rows, then reset at the mobile breakpoint.
8. Avoid global `span` cursive styling, extremely small viewport-scaled text, and touch-dependent hover-only reveals.
9. Do not hide real overflow merely by applying `overflow-x: hidden` to the body.

## Working sequence and completion criteria

1. Inspect the source files and copy assets; record content and link mappings.
2. Build the React routes, semantic page structure, and typed content data.
3. Recreate tokens, typography, dark/glass surfaces, desktop layout, and mobile stacking.
4. Implement the source animation contract, then keyboard, touch, and reduced-motion alternatives.
5. Run the configured build, type checks, and lint checks. Manually verify every route, image, anchor, external link, keyboard interaction, and responsive layout.
6. Compare the original and React versions at matching viewport sizes, in resting and hovered states. Check gradient borders over time and project image/icon transitions. Report any intentional deviations.

Finished means: all five projects and the complete biography/CV are present; original project order is intact; light/red identity, typography, staggered cards, hero tiles, glows, rotating borders, and media tilts are recognizable; internal navigation and assets work after deployment; touch and keyboard access do not depend on hover; reduced motion is respected; and the production build succeeds.

Do not deploy or change the source repository as part of merely preparing this guide. When later asked to implement the recreation, deliver the working React app and explain what changed, how it was checked, and any remaining limitations.
