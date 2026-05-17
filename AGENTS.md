# FaceSnap: Essential OpenCode Guide

## How to Investigate

Focus on the following sources:
- `package.json`, `angular.json`, and root `tsconfig.json`
- Main app directory (`src/`), especially `main.ts`, `app.module.ts`
- Build scripts (`ng build`, `ng serve`, `ng test`)
- CLI shortcuts like `ng g`, `ng build --prod` and test command `ng test`

## Commands
- Start dev server: `ng serve` (default port 4200)
- Build for production: `ng build --production`
- Run tests: `ng test`
- Serve with production build: `NODE_ENV=production ng serve`
- Lint: `ng lint` (requires `tslint`)
- Format: `ng format`
- Test coverage: `ng test --code-coverage`
- Generate component: `ng g component component-name`

## Monorepo Structure
- Single root with `src/` containing components, services, and app shell (`app/`)
- No explicit subpackages
- Entry point: `src/main.ts`
- Core libraries: `@facesnap/*` under `src/lib`

## Style Guide
- Use Tailwind classes (e.g., `text-primary`, `bg-secondary`) instead of hardcoded colors
- No hardcoded values; rely on design tokens (`--token-...`)
- No `any` types; use TypeScript interfaces
- Prefer Angular signals over RxJS subscriptions

## Testing Quirks
- Integration tests require `ng serve` to start a dev server
- E2E tests need Chrome/Chromium
- Snapshot tests verify component outputs against golden files
- Tests run via `ng test`; coverage reports in `coverage/`

## Architecture Notes
- Uses standalone Angular components with Ivy engine
- No `NgModule`; components are pure functions of state
- State managed via Angular signals and services
- Auth uses Supabase for backend auth

## Common CLI Shortcuts
- Rebuild project: `ng serve --force-build`
- Clear cache: `ng cache --clean`
- Serve with specific env: `ng serve --env=prod`

## File Structure
- `src/app/`: Main components and services
- `src/lib/`: Reusable components and utilities
- `src/environments/`: Environment config
- `src/styles/`: Design tokens and global styles

## Verification Steps
1. Install deps: `npm install`
2. Build: `ng build`
3. Serve: `ng serve`
4. Test: `ng test`