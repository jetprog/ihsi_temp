

# Plan: Build Statistiques Sub-pages + Update Logo Text

## Two tasks:

### 1. Header Logo Text Update

In `Header.tsx`, replace the plain "IHSI" text next to the logo with two lines matching the screenshot:
- **Line 1**: "IHSI" (bold, larger)
- **Line 2**: "Statistique & Informatique" (smaller, muted)

### 2. Build Statistiques Sub-pages

Currently `/statistiques/:slug` routes to the same `Statistiques` component which only shows the landing grid. Need to detect the `:slug` param and render topic-specific content.

**Approach**: Expand `Statistiques.tsx` to handle both the landing view (no slug) and individual topic views (with slug). Each topic page will follow a consistent template:

**Topic Page Template**:
- Breadcrumb: Accueil > Statistiques > [Topic]
- Page title + description
- KPI summary row (3-4 StatCards with key indicators)
- Key chart (AreaChart or BarChart with sample data)
- Data table with key indicators
- Source & methodology attribution footer

**Topics with sample data**:

| Slug | Title | Sample KPIs |
|------|-------|-------------|
| demographie | Démographie | Population 12.0M, Taux natalité 22.4‰, Espérance vie 64.7 ans, Densité 432/km² |
| economie | Économie | PIB $21.5B, Inflation 24.8%, Commerce ext. $5.2B, Investissement $1.8B |
| travail | Travail | Taux chômage 14.5%, Pop. active 4.8M, Salaire min. 685 HTG, Emploi informel 58% |
| social | Social | Taux alphabétisation 61.7%, Accès eau potable 52%, Pauvreté 58.5%, Scolarisation 78% |
| geographique | Géographique | 10 départements, Ouest 39% pop., Densité max 1,825/km², Rural 47% |

Each topic will include a time-series chart and a simple data table.

**No slug present** → show the existing landing grid of topic cards.

---

## Files to modify

| File | Change |
|------|--------|
| `src/components/layout/Header.tsx` | Replace "IHSI" span with two-line text block |
| `src/pages/Statistiques.tsx` | Add slug detection, topic config data, and topic page template |

No new files or dependencies needed. Reuses existing `StatCard`, `ChartContainer`, Recharts, and table components.

