

# Apply IHSI Client Feedback

## Summary of actionable changes

### 1. Make logo bigger and more prominent
**File**: `src/components/layout/Header.tsx`
- Increase logo from `h-10 w-10` to `h-14 w-14`
- Make the "IHSI" text larger (from `text-base` to `text-lg`)
- Show the text block on all screen sizes (remove `hidden sm:flex`)

### 2. Rename "Travail" to "Emploi" everywhere
**Files**: `src/lib/navigation.ts`, `src/pages/Statistiques.tsx`, `src/pages/Index.tsx`, `src/pages/DonneesOuvertes.tsx`
- Replace "Travail" label with "Emploi" in navigation items, dashboard links, dataset categories, and statistiques topic config
- Keep the URL slug as `travail` for consistency but display "Emploi"

### 3. Make homepage KPI cards clickable
**File**: `src/pages/Index.tsx`
- Wrap each `StatCard` in a `<Link>` pointing to the relevant statistiques or dashboard page (Population → `/statistiques/demographie`, Inflation → `/statistiques/economie`, Chômage → `/statistiques/travail`, Croissance → `/statistiques/economie`)

### 4. Add period/frequency filter to Publications
**File**: `src/pages/Publications.tsx`
- Add a frequency filter (Mensuel, Trimestriel, Annuel) similar to the existing year filter
- Add a `frequency` field to each publication entry and filter accordingly

### 5. Add document preview capability to Publications
**File**: `src/pages/Publications.tsx`
- Add an "Aperçu" (preview) button next to the download button on each publication card
- On click, open a modal/dialog showing the `fullSummary` text and metadata, with an option to then download

### 6. Données ouvertes: restructure download visibility
**File**: `src/pages/DonneesOuvertes.tsx`, `src/components/shared/DatasetCard.tsx`
- Move download buttons so they only appear on specific dataset items (sub-themes), not on category-level headings
- This is mostly a UX clarification — verify current behavior and adjust if download buttons appear at wrong levels

### 7. Add chart/graph export on Statistiques pages
**File**: `src/pages/Statistiques.tsx`
- Add a "Télécharger" button on the chart section (next to the existing CSV/PDF table export)
- Export chart as PNG using a canvas-based approach (html-to-image or recharts built-in)

---

## Files to modify

| File | Changes |
|------|---------|
| `src/components/layout/Header.tsx` | Bigger logo + text |
| `src/lib/navigation.ts` | Rename Travail → Emploi |
| `src/pages/Index.tsx` | Clickable KPI cards, rename Travail |
| `src/pages/Statistiques.tsx` | Rename Travail → Emploi, add chart export |
| `src/pages/DonneesOuvertes.tsx` | Rename Travail → Emploi in categories |
| `src/pages/Publications.tsx` | Add frequency filter + preview modal |
| `src/components/shared/DatasetCard.tsx` | Verify download button placement |

No new dependencies needed. Chart PNG export can use native canvas `toDataURL()` via a ref on the Recharts `ResponsiveContainer`.

