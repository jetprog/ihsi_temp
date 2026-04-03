

# IHSI Statistical Platform — Modernized UI/UX Plan

## 1. Refined Sitemap

Your sitemap is solid. Minor UX refinements:

| Menu | Submenu Items | Notes |
|------|--------------|-------|
| **Accueil** | — | Homepage with hero, KPIs, quick links |
| **Statistiques** | Démographie, Économie, Travail, Social, Géographique, Enquêtes, Recensements | Mega-menu dropdown with icons + short descriptions |
| **Tableaux de bord** | Démographie, IPC, PIB, Travail, Social | Each is an interactive dashboard page with charts/filters |
| **Données ouvertes** | Catalogue, API Docs, Clé API, Jeux de données | "Clé API" becomes a gated page (auth required) |
| **Publications** | Bulletins, Rapports, Communiqués, Méthodologies, Recensements | Filterable list with date sorting |

**Added**: A persistent **search bar** in the header and a **language toggle** (FR/EN/HT).

---

## 2. Navigation System

### Desktop
- **Top utility bar**: Country name, language switcher, accessibility toggle, search
- **Main nav**: Logo + 5 top-level items. "Statistiques" and "Publications" use **mega-menu dropdowns** (grid of links with icons). Others use simple dropdowns.
- **Sticky header** on scroll (compact version)

### Mobile
- **Hamburger menu** → full-screen slide-in drawer (Sheet component)
- Accordion-style expandable sections for submenus
- Bottom fixed bar with 4 quick-access icons: Home, Dashboards, Data, Search

---

## 3. Page Layouts

### Homepage
- **Hero carousel**: 3 rotating slides (announcements, latest publication, key event) with subtle map background
- **KPI ribbon**: 4 stat cards (Population, Inflation, Chômage, Croissance) with trend arrows and sparklines
- **Dashboard quick-links**: 5 icon cards in a horizontal row
- **Key trends section**: 2-column grid with mini charts (population trend, employment by sector)
- **Interactive map**: Department-level choropleth map
- **Latest publications**: 3 cards showing most recent bulletins/reports
- **Footer**: Sitemap links, contact, social, legal

### Dashboard Page (e.g., /tableaux-de-bord/demographie)
- **Sidebar filters**: Date range, region, indicator type (collapsible on mobile)
- **KPI summary row**: 3-4 metric cards at top
- **Chart grid**: 2x2 responsive grid of charts (line, bar, pie, table)
- **Data table below**: Sortable, paginated, with CSV/Excel export button
- **Source attribution**: Small text below each chart

### Open Data Page (/donnees-ouvertes)
- **Catalogue view**: Search bar + category filter chips + card grid of datasets
- Each dataset card shows: title, description, format badges (CSV, JSON, API), date, download button
- **API docs page**: Clean REST endpoint documentation with code examples
- **API Key page**: Simple form to request/manage API keys (behind auth)

### Publications Page
- **Filter bar**: Type tabs (Bulletins | Rapports | Communiqués | Méthodologies | Recensements) + date range + search
- **List view**: Cards with thumbnail, title, date, type badge, abstract snippet, download PDF button
- **Pagination**: Simple numbered pagination

---

## 4. Reusable Component System

| Component | Purpose |
|-----------|---------|
| `StatCard` | KPI display with label, value, trend arrow, sparkline |
| `DashboardCard` | Icon + title card linking to a dashboard |
| `ChartContainer` | Wrapper with title, subtitle, source, and responsive chart area |
| `DataTable` | Sortable/filterable table with pagination and export |
| `FilterBar` | Horizontal chip-based filters with search input |
| `PublicationCard` | Thumbnail, title, date, type badge, excerpt, download |
| `DatasetCard` | Title, description, format badges, download/preview |
| `MegaMenu` | Multi-column dropdown for nav items with icons |
| `MapViewer` | Interactive choropleth map component |
| `SearchOverlay` | Full-width search with autocomplete suggestions |
| `BreadcrumbNav` | Contextual breadcrumb for inner pages |

---

## 5. Design Tokens & Style

- **Colors**: Deep blue primary (#1B3A5C), white background, light gray surfaces, accent teal for interactive elements, red for negative trends, green for positive
- **Typography**: Inter or Plus Jakarta Sans, clear hierarchy (h1-h4 + body)
- **Spacing**: 8px grid system, generous whitespace
- **Border radius**: 8px for cards, 4px for buttons
- **Shadows**: Subtle elevation (shadow-sm for cards, shadow-md on hover)
- **Accessibility**: WCAG AA contrast, focus rings, aria labels, skip-to-content link

---

## 6. Implementation Scope

### Pages to build:
1. Homepage with hero, KPIs, dashboard links, trends, map, latest publications
2. Statistiques landing page with submenu grid
3. Dashboard template page (reusable for all 5 dashboards)
4. Données ouvertes catalogue page
5. Publications list page
6. Responsive navigation (mega-menu desktop + drawer mobile)
7. Footer

### Key libraries:
- Recharts for charts
- React Router for navigation
- Shadcn/ui components (already installed)
- Lucide icons

