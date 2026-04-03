

# Fix Publications Category Navigation

## Problem
Navigation menu links to category URLs like `/publications/communiques`, `/publications/bulletins`, etc. But the Publications page treats ALL slugs as individual publication detail views. Since "communiques" doesn't match any publication slug, it shows "Publication introuvable."

## Solution
Add a category-slug mapping so that category slugs (`bulletins`, `rapports`, `communiques`, `methodologies`, `recensements`) are treated as **filtered list views** instead of detail views.

## Changes

### `src/pages/Publications.tsx`
- Add a mapping from URL category slugs to publication type names:
  - `bulletins` → `Bulletin`
  - `rapports` → `Rapport`
  - `communiques` → `Communiqué`
  - `methodologies` → `Méthodologie`
  - `recensements` → `Recensement`
- When the slug matches a category key, render the **list view** with that type pre-selected as the active filter
- When the slug matches a publication's individual slug, render the **detail view** (existing behavior)
- When slug matches neither, show "Publication introuvable"

No other files need changes.

