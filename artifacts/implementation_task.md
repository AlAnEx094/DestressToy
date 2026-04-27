# Implementation Task — DeStressToys Landing

## Objective
Implement the landing page UI matching reference_b.png as closely as practical.

## Inputs
- Reference image: ./artifacts/reference.png (= reference_b.png)
- UI spec: ./artifacts/ui_spec.json
- Acceptance criteria: ./artifacts/acceptance.md
- Stack: React 18 + Tailwind CSS v3 + Vite (already configured)

## Entry point
- Main landing: src/App.jsx
- Create additional files in src/ as needed (components, pages)
- Install react-router-dom if not already in package.json

## What to build

### Files to create
- src/App.jsx — router setup with / and /privacy routes
- src/pages/LandingPage.jsx — full landing page
- src/pages/PrivacyPage.jsx — minimal privacy policy page
- src/components/ — one component per section (optional, use judgment)

### Sections (in order)
See ui_spec.json sections array for exact layout, colors, content, and visual rules.

Summary:
1. Header — sticky, dark, DS logo, nav, coral CTA
2. Hero — dark bg, two-column, display headline, coral CTA, image placeholder right
3. Comparison — sandy bg, two columns "Обычный мерч" vs "DeStressToys", coral checkmarks
4. Why it works — sandy bg, 3 cards with coral numbers 01/02/03
5. Texture — dark bg, two-column, material details list, image placeholder
6. Gallery — light bg, grid of 5 image placeholders with labels
7. Welcome Box — sandy bg, two-column, tags, CTA
8. Process — dark bg, 4 horizontal steps with coral numbers
9. Use cases — sandy bg, 2x2 card grid
10. Trust — light bg, logo placeholders row, testimonial card, 4 risk-reducer stats
11. FAQ — sandy bg, accordion, all collapsed by default
12. Final CTA — dark bg, two-column: text+guarantees left, form right
13. Footer — dark bg, border-top, copyright + nav + privacy link

## Color tokens (use exact hex values)
- dark: #151716
- sandy: #f4efe8
- light: #ebe5dd
- coral: #ff6a3d
- gray-green: #7c847d
- white: #ffffff

## Typography
- Font: Inter (already loaded in index.html via Google Fonts)
- Display/H1: text-5xl md:text-6xl font-bold tracking-tight
- H2: text-4xl font-bold tracking-tight
- H3: text-2xl font-semibold
- Body: text-base leading-relaxed
- Label (eyebrow): text-xs font-medium uppercase tracking-widest

## Rules
- Use Tailwind utility classes only — no custom CSS unless absolutely necessary
- Coral (#ff6a3d) only on CTAs, eyebrow labels, card numbers, checkmarks, FAQ indicator
- Dark sections: header, hero, texture, process, final_cta, footer
- Light/sandy sections: all others (alternating as per spec)
- No gradients, no backdrop-blur, no glassmorphism
- No illustrations — use div placeholders for images (bg-gray-800, bg-gray-300, rounded-2xl)
- Image placeholders: rounded-2xl with minimum height, centered placeholder text in gray
- Transitions: only transition-colors on hover for buttons/links

## Form behavior
- Controlled form with React state
- On submit: show success state ("Заявка принята! Свяжемся в течение 1 рабочего дня.")
- No real HTTP call needed

## FAQ behavior
- Accordion: each item has open/closed state
- Click question to toggle
- Show coral + when closed, coral − when open

## After implementation
Run: node screenshot.js
This starts the dev server and takes screenshots at 1440px, 1024px, 390px.
Screenshots saved to: artifacts/screenshots/screen_1440.png, screen_1024.png, screen_390.png

## Deliverables
1. Working implementation in src/
2. Screenshots at all 3 viewports
3. Short notes: what was implemented, any deviations from spec, any risks
