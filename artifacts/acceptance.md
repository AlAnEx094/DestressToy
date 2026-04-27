# Acceptance Criteria — DeStressToys

## Structure
- All 13 sections present in exact order: header, hero, comparison, why_it_works, texture, gallery, welcome_box, process, use_cases, trust, faq, final_cta, footer
- Privacy page exists at route /privacy
- React Router handles navigation between / and /privacy

## Visual Fidelity
- Hero background: #151716 (dark). Must not be light.
- Hero headline: white, display-scale (≥56px desktop), max-width ~580px
- Coral (#ff6a3d) appears only on: CTA buttons, section labels/eyebrows, card numbers, checkmarks, FAQ expand indicator
- Sandy (#f4efe8) and light (#ebe5dd) backgrounds alternate on light sections as specified in ui_spec.json
- Dark (#151716) sections: header, hero, texture, process, final_cta, footer
- No gradients anywhere
- No glassmorphism / backdrop-filter
- No illustrations — only placeholder image blocks (bg-gray-800/bg-gray-300 divs)
- Font: Inter only (loaded from Google Fonts in index.html)

## Components
- Header: sticky, dark background, logo "DS" white left, nav center, coral CTA right
- Comparison: two columns — left muted gray-green, right dark with coral checkmarks
- Why it works: 3 cards with coral number (01/02/03), white card background, light border
- Process: 4 steps, coral numbers, horizontal connector line on desktop
- FAQ: accordion — all collapsed by default, coral +/− indicator
- Final CTA form: name, company, email, task (textarea), submit button full-width coral, success state implemented
- Footer: border-top separator, three-column layout

## Responsiveness
- No layout breakage at 1440px, 1024px, 768px, 390px
- Hero stacks at ≤768px: text on top, image below
- Why it works grid: 3 col desktop → 2 col tablet → 1 col mobile
- Use cases grid: 2 col desktop/tablet → 1 col mobile
- Process steps: horizontal desktop → vertical mobile
- Header on mobile: logo + hamburger (nav hidden or collapsible)
- Final CTA columns stack at ≤768px: text on top, form below

## Functional
- FAQ accordion: click to toggle open/closed, only one open at a time (or multi-open — either acceptable)
- Form success state: on submit, replace form with success message
- Privacy link in footer navigates to /privacy route
- No console errors on page load
- Dev server starts with: npm run dev

## Non-goals
- Pixel-perfect parity is not required
- No real backend integration required — form submits to a mock/no-op
- No animations beyond CSS hover transitions
- No SEO meta tags required
- Mobile hamburger menu does not need to open a drawer — can be a placeholder button
