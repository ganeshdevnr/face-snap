# FaceSnap — Claude Instructions

## Stack
- **Angular 21** — standalone components, signals, no NgModules
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/styles.css`, no `tailwind.config.js`
- **NgRx** — store, effects, devtools for state management
- **Supabase** — backend (auth, database, realtime)
- **TypeScript 5.9**

## Project Structure
```
src/
  app/
    core/        # Singleton UI: navbar, interceptors, services
    features/    # Reusable smart components: post-card, post-list, friend-suggestions, etc.
    pages/       # Route-level components: feed, friends, messages, login, sign-up
    shared/      # Models, pipes, utilities
    store/       # NgRx slices: auth, posts, friendSuggestions, messaging
    services/    # Domain services
  styles/
    tokens.css   # All raw design token values — single source of truth
  styles.css     # Tailwind entry: imports tokens, @theme mapping, global utilities
```

## Design Token System

Tokens flow in one direction — never backwards:

```
src/styles/tokens.css       src/styles.css @theme        Component templates
--token-color-primary:  →   --color-primary:          →  class="bg-primary"
  #E8442A;                    var(--token-color-primary)   class="text-primary"
```

- **`tokens.css`** holds raw values only (`--token-*` prefix). Never reference these in components.
- **`styles.css @theme`** maps tokens to Tailwind-facing names, which generates utility classes.
- **Components** only ever use Tailwind class names — never `var(--token-*)` or hardcoded values.

Design system: design-reference/FACESNAP-DESIGN-SYSTEM.md
Follow every rule in this document for all pages and components.

## Rules

### Styling
- Never hardcode colors, font sizes, spacing, or border-radius in templates or CSS.
- Always use Tailwind utility classes (`bg-primary`, `text-2xs`, `text-icon-fill`, etc.).
- To add a new value: add it to `tokens.css` first, map it in `styles.css @theme`, then use the generated class.
- SVG `stroke` and `fill` attributes cannot use Tailwind classes — use `stroke="currentColor"` or `fill="currentColor"` and control the color via a `text-*` class on the SVG element.

### Components
- One component per file.
- All components are standalone (`standalone: true`).
- Use Angular signals (`signal`, `computed`, `effect`) — not RxJS subscriptions in components.
- Mobile-first always — start with base styles, layer up with `md:` and `lg:` breakpoints.

### Code
- No `any` types.
- No `NgModule` — standalone APIs only.
- Keep components focused — if a component is doing too much, split it into a feature + a dumb presentational component.
- No comments explaining what the code does — only add a comment when the *why* is non-obvious.
