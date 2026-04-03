

# Implementation Plan: Homepage Tweaks + Page Redesigns

## Overview

Four areas of work: (1) Homepage hero search bar + section reorder, (2) Dashboard page redesign, (3) Open Data page redesign, (4) Publications page redesign. All following Haiti-specific UX principles: simplicity, source/date/methodology visibility, mobile-first, lightweight.

---

## 1. Homepage (`Index.tsx`)

**Search bar in hero**: Add a prominent search input with a Search icon directly below the subtitle in the hero section. Styled with a semi-transparent white background, rounded, large size. Searches across the site (navigates to a results context or filters in-page).

**Reorder sections**: Move "Dernières publications" section BEFORE "Tendances clés" section. Simple cut-paste of the two section blocks.

Final homepage order:
1. Hero (with search bar)
2. KPI Ribbon
3. Dashboard Quick Links
4. Dernières Publications
5. Tendances Clés

---

## 2. Dashboard Page (`Dashboard.tsx`) — Redesign

Restructure to match the spec with cleaner, simpler layout:

- **Title bar**: Dashboard name + action buttons (Export CSV, Export PNG, Embed link copy)
- **KPI summary row**: Keep existing 4 StatCards
- **Filters section**: Horizontal bar with Year Range (two selects), Region (select), Indicator (select) -- clean inline layout, collapsible on mobile
- **Main chart**: Single large chart area with a toggle (Line / Bar / Map tabs) instead of 4 charts at once. One clear chart + filters = simplicity principle
- **Data table**: Keep existing table but add Source + Methodology footer text below it
- **Source & Methodology section**: Small card at bottom with source attribution, date, and link to methodology document

Key change: Replace the 2x2 chart grid with a single main chart + view toggle. This follows the "1 clear chart + filters, progressive exploration" principle.

---

## 3. Open Data Page (`DonneesOuvertes.tsx`) — Redesign

Add missing sections while keeping the clean catalogue:

- **Header**: Keep title + description
- **Filters**: Add format filter chips (CSV, JSON, XLSX, API, GeoJSON) alongside existing category filters. Add frequency filter (Mensuel, Trimestriel, Annuel)
- **Dataset cards**: Keep existing but add "Last updated" more prominently
- **API Section**: New section below datasets with:
  - Link to API documentation
  - "Get API Key" button
  - Example API request in a styled code block (curl example with syntax highlighting via a `<pre>` tag)

---

## 4. Publications Page (`Publications.tsx`) — Redesign

Enhance with year filter and detail view:

- **Filters**: Add Year select dropdown alongside existing type filter chips
- **Publication cards**: Keep existing layout, already has title/date/summary/PDF
- **Detail route** (`/publications/:slug`): New view within the same component showing:
  - Full summary text
  - PDF download button (prominent)
  - Related dashboards/datasets links
  - Back button to list

---

## Technical Details

### Files to modify:
1. `src/pages/Index.tsx` — Add search input in hero, swap Publications and Trends sections
2. `src/pages/Dashboard.tsx` — Replace 2x2 grid with single chart + toggle tabs, add export options (PNG button), embed button, source/methodology footer, better filter bar
3. `src/pages/DonneesOuvertes.tsx` — Add format/frequency filters, API section with code example
4. `src/pages/Publications.tsx` — Add year filter, add detail view for `:slug` route

### New components:
- None strictly needed; will use existing Tabs, Select, Badge, Card components from shadcn/ui

### Dependencies:
- No new packages needed

