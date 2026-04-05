

# Internationalization (i18n) — Full Translation System

## Overview

The language buttons (FR, HT, EN) in the header currently do nothing. This plan adds a complete translation system so every user-facing string switches when the language is changed. Three languages: **Français (FR)**, **Kreyòl Ayisyen (HT)**, **English (EN)**.

## Architecture

**Approach**: React Context + translation dictionary files. No external library needed — the project is manageable in scope.

```text
src/
├── i18n/
│   ├── context.tsx        # LanguageContext + useLanguage hook
│   ├── fr.ts              # French translations (default, copy from existing strings)
│   ├── ht.ts              # Haitian Creole translations
│   └── en.ts              # English translations
```

- `LanguageContext` wraps the app in `main.tsx` (or `Layout.tsx`)
- Provides `lang`, `setLang`, and `t(key)` function
- Header's `setLang` wired to context instead of local state
- All components call `t("key")` instead of hardcoded strings

## Translation Scope — Complete Inventory

### Layout Components (6 files)
| Component | Strings to translate |
|-----------|---------------------|
| **Header.tsx** | "Institut Haïtien de Statistique et d'Informatique", "IHSI", "Statistique & Informatique", "Aller au contenu principal", "Rechercher...", "Menu" |
| **Footer.tsx** | All section titles, link labels, address, phone description, "Tous droits réservés", "Mentions légales", "Politique de confidentialité" |
| **BottomNav.tsx** | "Accueil", "Tableaux", "Données", "Recherche" |
| **MobileNav.tsx** | Uses navigation items (auto-translated via nav config) |
| **MegaMenu.tsx** | "Voir tout [section]" pattern |
| **Layout.tsx** | No direct strings |

### Navigation (`navigation.ts`)
All navigation item titles and descriptions (5 groups, ~25 items). These will be stored as translation keys so nav labels update with language.

### Pages (7 files)
| Page | Key strings |
|------|-------------|
| **Index.tsx** | Hero slides (3 slides: title, subtitle, CTA), search placeholder, quick actions (3 items), dashboard links (5 items), section headings, publication excerpts, chart titles/labels |
| **Statistiques.tsx** | 5 topic configs (title, description, KPI labels, chart titles, table headers, source attributions), landing page heading, breadcrumb labels, export button labels |
| **Publications.tsx** | Filter labels, year/frequency labels, page heading, "Publication introuvable", button texts, preview modal labels, publication titles/excerpts/summaries |
| **DonneesOuvertes.tsx** | Category names, format labels, frequency labels, page heading, API section texts, code example comments |
| **TableauxDeBord.tsx** | Page heading, description |
| **Dashboard.tsx** | Dashboard configs (5 dashboards), filter labels, section headings, breadcrumb text, methodology section |
| **NotFound.tsx** | "404", "Page not found", "Return to Home" |

### Shared Components (7 files)
| Component | Strings |
|-----------|---------|
| **ChatbotFAB.tsx** | "Assistant IHSI", "Posez une question", helper text, input placeholder |
| **PublicationCard.tsx** | "PDF" button label |
| **DatasetCard.tsx** | "Aperçu", "Télécharger" |
| **FilterBar.tsx** | "Rechercher..." default placeholder |
| **ChartContainer.tsx** | "Source :" prefix |
| **StatCard.tsx** | No translatable text (receives props) |
| **DashboardCard.tsx** | No translatable text (receives props) |

## Implementation Steps

### Step 1: Create i18n infrastructure
- `src/i18n/context.tsx`: `LanguageProvider` component with `createContext`, stores lang in `localStorage`
- `useLanguage()` hook returning `{ lang, setLang, t }`
- `t(key, params?)` function with dot-notation key lookup and optional interpolation

### Step 2: Create French translation file (`fr.ts`)
- Extract every hardcoded string from the inventory above into a nested object
- This becomes the reference/default file

### Step 3: Create Creole translation file (`ht.ts`)
- Full Haitian Creole translations for all keys
- Navigation: "Akèy", "Estatistik", "Tablo kontwòl", "Done ouvè", "Piblikasyon"
- UI labels, page content, chart labels, etc.

### Step 4: Create English translation file (`en.ts`)
- Full English translations for all keys
- Navigation: "Home", "Statistics", "Dashboards", "Open Data", "Publications"

### Step 5: Wire context into app
- Wrap app with `LanguageProvider` in `main.tsx`
- Update `Header.tsx` to use `setLang` from context instead of local state

### Step 6: Update all components to use `t()`
- Replace every hardcoded string with `t("path.to.key")`
- For navigation items, translate titles and descriptions dynamically
- For data content (publications list, datasets list, topic configs), translate labels while keeping numeric data as-is

## Key Design Decisions

1. **Translation keys use dot notation**: `nav.home`, `pages.stats.title`, `common.download`
2. **Data values (numbers, dates, URLs) stay untranslated** — only labels, descriptions, and UI text translate
3. **Navigation items** get a translation key mapping so `navigation.ts` stays as the structural source but display text comes from translations
4. **Fallback**: If a key is missing in HT or EN, fall back to FR
5. **localStorage persistence**: Selected language persists across sessions

## Files to create

| File | Purpose |
|------|---------|
| `src/i18n/context.tsx` | Language context provider + hook |
| `src/i18n/fr.ts` | French translations (~300 keys) |
| `src/i18n/ht.ts` | Creole translations (~300 keys) |
| `src/i18n/en.ts` | English translations (~300 keys) |

## Files to modify

| File | Change |
|------|--------|
| `src/main.tsx` | Wrap with `LanguageProvider` |
| `src/components/layout/Header.tsx` | Use context `setLang`, translate strings |
| `src/components/layout/Footer.tsx` | Translate all strings |
| `src/components/layout/BottomNav.tsx` | Translate labels |
| `src/components/layout/MegaMenu.tsx` | Translate "Voir tout" |
| `src/components/layout/MobileNav.tsx` | No direct changes (uses nav items) |
| `src/lib/navigation.ts` | Keep structure, add key-based title/description |
| `src/pages/Index.tsx` | Translate all hero, section, card strings |
| `src/pages/Statistiques.tsx` | Translate topic configs, UI labels |
| `src/pages/Publications.tsx` | Translate filters, headings, modal text |
| `src/pages/DonneesOuvertes.tsx` | Translate categories, API section |
| `src/pages/TableauxDeBord.tsx` | Translate heading |
| `src/pages/Dashboard.tsx` | Translate dashboard configs, filters |
| `src/pages/NotFound.tsx` | Translate 404 text |
| `src/components/shared/ChatbotFAB.tsx` | Translate chatbot text |
| `src/components/shared/DatasetCard.tsx` | Translate button labels |
| `src/components/shared/PublicationCard.tsx` | Translate "PDF" label |
| `src/components/shared/ChartContainer.tsx` | Translate "Source :" |
| `src/components/shared/FilterBar.tsx` | Translate default placeholder |

No new dependencies needed.

