

# UX Refinement Plan — From 70% to 95%

Based on the detailed feedback, here are the targeted fixes organized by priority.

---

## 1. Navigation Overhaul (CRITICAL)

**Problem**: Navigation feels like a landing page, not a data platform with depth.

**Changes to `Header.tsx`**:
- Make search bar **always visible** in the main nav bar (not hidden behind a toggle icon) — it's the primary action
- Increase language switcher visibility with flag-style pills and larger touch targets
- Add subtle bottom border highlight on active nav items for stronger hierarchy
- Add a "skip to content" accessibility link

**Changes to `MegaMenu.tsx`**:
- Increase dropdown width and add a subtle header label per group
- Add a "Voir tout" link at the bottom of each dropdown to the parent page
- Improve hover/focus states with better transition timing

**New: Mobile bottom bar** — Add a fixed bottom navigation bar (4 icons: Home, Tableaux de bord, Données, Search) visible on mobile only, for quick access without opening the drawer.

---

## 2. Homepage Hierarchy Fix

**Problem**: Not clear what user should do in 5 seconds.

**Changes to `Index.tsx`**:
- **Hero**: Make search bar larger and more prominent (bigger height, placeholder text that guides: "Rechercher population, IPC, emploi..."). Add 3 quick-action pills below search: "Explorer les données" | "Voir les tableaux de bord" | "Télécharger les données"
- **Dashboard cards**: Make them bigger — increase to a 3-column grid (not 5) with larger icons, colored left border accent, and hover lift animation. These are the core product.
- **KPI strip**: Add subtle card hover effect with scale transform
- **Publications section**: Add type badge colors (Bulletin = blue, Rapport = green, Communiqué = orange)

---

## 3. Dashboard Page Emphasis

**Problem**: Dashboards feel like just another section, not the core product.

**Changes to `Dashboard.tsx`**:
- Add a colored header banner at the top (using the primary color) with the dashboard title + breadcrumb
- Make KPI cards more visually impactful: add sparkline data to all cards, larger font for values
- Add a "Que voulez-vous explorer ?" prompt above the filters for user guidance
- Improve chart container: add a subtle gradient background, bigger chart height

**Changes to `DashboardCard.tsx`**:
- Increase card size, add a colored left border accent
- Add a preview data snippet (e.g., "12.0M habitants") on hover or always visible
- Add hover scale transform + shadow-lg

---

## 4. User Guidance / CTAs

**Problem**: Users don't know what to click first.

**Changes**:
- **Homepage**: Add a "Quick Actions" section right after the hero with 3 large, clear buttons:
  - "Explorer les données" → /donnees-ouvertes
  - "Voir les tableaux de bord" → /tableaux-de-bord  
  - "Dernières publications" → /publications
- Each button has an icon, description, and arrow — styled as prominent cards, not small links

---

## 5. Visual Polish

**Changes across components**:
- **Cards**: Add `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200` to all interactive cards
- **Typography**: Increase h1 sizes, add letter-spacing to section labels, use font-weight 800 for hero titles
- **Section separators**: Add subtle background color alternation between homepage sections (white → gray-50 → white)
- **Buttons**: Make primary CTAs larger with more padding, use the secondary (teal) color for key actions
- **StatCard**: Add a subtle left border color matching trend (green/red/gray)

---

## 6. AI Chatbot Entry Point

**New component: `ChatbotFAB.tsx`**
- Floating action button (bottom-right corner, above mobile nav if present)
- Teal accent color, chat bubble icon, subtle pulse animation on first visit
- On click: opens a Sheet/Dialog with a simple chat interface placeholder
- Label: "Posez une question" tooltip on hover
- Add to `Layout.tsx` so it appears on all pages

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/layout/Header.tsx` | Always-visible search, bigger lang switcher |
| `src/components/layout/MegaMenu.tsx` | "Voir tout" links, wider dropdowns |
| `src/components/layout/BottomNav.tsx` | **New** — Mobile bottom navigation bar |
| `src/components/layout/Layout.tsx` | Add BottomNav + ChatbotFAB |
| `src/components/shared/ChatbotFAB.tsx` | **New** — Floating chat button |
| `src/pages/Index.tsx` | Bigger search, quick actions, bigger dashboard cards, polish |
| `src/pages/Dashboard.tsx` | Header banner, guidance prompt, visual emphasis |
| `src/components/shared/DashboardCard.tsx` | Larger, hover effects, colored border |
| `src/components/shared/StatCard.tsx` | Trend-colored left border, hover effects |
| `src/components/shared/PublicationCard.tsx` | Type badge colors |
| `src/index.css` | Any utility classes needed |

No new dependencies required.

